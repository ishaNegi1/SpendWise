import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/User";
import { verifyGoogleToken } from "@/lib/googleAuth";
import { createToken, setTokenCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { idToken } = await req.json();

    const userData = await verifyGoogleToken(idToken);
    if (!userData) {
      return NextResponse.json({ message: "Invalid Google token" }, { status: 400 });
    }

    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = await User.create({
        name: userData.name,
        email: userData.email,
        provider: "google",
      });
    }

    const token = createToken(user);
    const res = NextResponse.json({ message: "Google login successful", user }, { status: 200 });
    setTokenCookie(res, token);
    return res;
  } catch (err) {
    console.error("Google Login Error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
