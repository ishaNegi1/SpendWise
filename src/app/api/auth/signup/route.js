import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/user";
import { createToken, setTokenCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(user);
    const res = NextResponse.json({ message: "Signup successful", user }, { status: 201 });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
