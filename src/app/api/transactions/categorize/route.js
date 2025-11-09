import { categorizeTransaction } from "@/lib/categorize";

export async function POST(req) {
  try {
    const { description } = await req.json();

    if (!description) {
      return new Response(JSON.stringify({ error: "Description required" }), {
        status: 400,
      });
    }

    const category = await categorizeTransaction(description);

    return new Response(JSON.stringify({ category }), { status: 200 });
  } catch (error) {
    console.error("Backend Categorization Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server Error" }),
      {
        status: 500,
      }
    );
  }
}
