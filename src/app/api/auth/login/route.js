import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/User";
import { createToken, setTokenCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.provider !== "credentials") {
      return NextResponse.json(
        { message: "Please login using Google" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createToken(user);
    const res = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
