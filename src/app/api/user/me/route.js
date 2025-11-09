import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded)
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const user = await User.findById(decoded.id).select("-password");
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
