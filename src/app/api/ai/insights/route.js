import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Transaction from "@/models/Transaction";
import { connectDB } from "@/lib/dbConfig";
import { verifyToken } from "@/lib/auth";
import {
  generateBudgetInsights,
  buildUserProfile,
  buildMonthComparison,
} from "@/lib/budgetCoach";

function monthKeyFromDate(d) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return `${y}-${String(m).padStart(2, "0")}`;
}

function bucketizeMonthly(transactions) {
  const map = new Map();
  for (const t of transactions) {
    const d = new Date(t.date);
    const key = monthKeyFromDate(d);
    if (!map.has(key)) map.set(key, { monthKey: key, total: 0, byCategory: {} });

    const row = map.get(key);
    const amt = Number(t.amount) || 0;
    row.total += amt;

    const cat = (t.category || "other").toLowerCase();
    row.byCategory[cat] = (row.byCategory[cat] || 0) + amt;
  }

  const arr = Array.from(map.values());
  arr.sort((a, b) => (a.monthKey > b.monthKey ? 1 : -1));
  return arr;
}

export async function POST() {
  try {
    await connectDB();

    const tokenData = await verifyToken();
    if (!tokenData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = tokenData._id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    const now = new Date();

    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const txns = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: from, $lte: now },
    })
      .sort({ date: 1 })
      .lean();

    if (!txns || txns.length === 0) {
      return NextResponse.json({
        insights: "No transactions found yet. Add some expenses and try again!",
      });
    }

    const monthlyBuckets = bucketizeMonthly(txns);
    const userProfile = buildUserProfile(monthlyBuckets);

    const currentKey = monthKeyFromDate(now);
    const currentBucket =
      monthlyBuckets.find((m) => m.monthKey === currentKey) || {
        monthKey: currentKey,
        total: 0,
        byCategory: {},
      };

    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 15);
    const prevKey = monthKeyFromDate(prevDate);

    const prevBucket =
      monthlyBuckets.find((m) => m.monthKey === prevKey) || {
        monthKey: prevKey,
        total: 0,
        byCategory: {},
      };

    const monthComparison = buildMonthComparison(currentBucket, prevBucket);

    const insights = await generateBudgetInsights({
      userProfile,
      monthComparison,
    });

    return NextResponse.json({ insights });
  } catch (err) {
    console.error("AI Insights Error:", err);
    return NextResponse.json(
      { error: "AI processing failed", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
