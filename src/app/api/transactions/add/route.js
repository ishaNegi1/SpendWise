import { connectDB } from "@/lib/dbConfig";
import Transaction from "@/models/Transaction";
import { verifyToken } from "@/lib/auth";
import { categorizeTransaction } from "@/lib/langchain/categorize";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const tokenData = verifyToken(token);

    if (!tokenData) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { description, amount, date } = await req.json();

    if (!description || !amount || !date) {
      return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });
    }

    const category = await categorizeTransaction(description);

    const transaction = await Transaction.create({
      userId: tokenData.id,
      description,
      amount,
      date,
      category,
    });

    return new Response(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    return new Response(JSON.stringify({ error: "Failed to add transaction" }), { status: 500 });
  }
}
