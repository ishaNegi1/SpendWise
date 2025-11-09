import { connectDB } from "@/lib/dbConfig";
import Transaction from "@/models/Transaction";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const tokenData = await verifyToken();
    if (!tokenData) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const transactions = await Transaction.find({ userId: tokenData._id })
      .sort({ date: -1 })
      .lean();

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error("List Transaction Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transactions" }),
      { status: 500 }
    );
  }
}
