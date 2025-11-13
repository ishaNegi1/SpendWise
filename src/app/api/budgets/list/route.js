import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import { verifyToken } from "@/lib/auth";
import BudgetGoal from "@/models/BudgetGoal";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const tokenData = await verifyToken();
    if (!tokenData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = tokenData._id;
    const goals = await BudgetGoal.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();

    return NextResponse.json(goals);
  } catch (err) {
    console.error("List Goals Error:", err);
    return NextResponse.json({ error: "Failed to fetch budget goals" }, { status: 500 });
  }
}
