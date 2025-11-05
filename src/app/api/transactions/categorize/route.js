import { categorizeTransaction } from "@/lib/langchain/categorize";

export async function POST(req) {
  try {
    const { description } = await req.json();

    if (!description) {
      return new Response(JSON.stringify({ error: "Description required" }), { status: 400 });
    }

    const category = await categorizeTransaction(description);

    return new Response(JSON.stringify({ category }), { status: 200 });
  } catch (error) {
    console.error("Categorization Error:", error);
    return new Response(JSON.stringify({ error: "Failed to categorize" }), { status: 500 });
  }
}
