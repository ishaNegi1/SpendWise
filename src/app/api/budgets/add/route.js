import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import { verifyToken } from "@/lib/auth";
import BudgetGoal from "@/models/BudgetGoal";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const tokenData = await verifyToken();
    if (!tokenData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = tokenData._id;
    const { category, limit, month, year } = await req.json();

    if (!category || !limit || !month || !year) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const goal = await BudgetGoal.create({
      userId: new mongoose.Types.ObjectId(userId),
      category,
      limit,
      month,
      year,
    });

    return NextResponse.json({ message: "Goal added", goal });
  } catch (err) {
    console.error("Add Goal Error:", err);
    return NextResponse.json({ error: "Failed to add budget goal" }, { status: 500 });
  }
}
