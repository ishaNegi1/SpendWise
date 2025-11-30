import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const decoded = await verifyToken();

    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userId = decoded._id || decoded.id;

    if (!userId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({ user }, { status: 200 });

  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
