import { InferenceClient } from "@huggingface/inference";

export async function categorizeTransaction(description) {
  const hf = new InferenceClient({ apiKey: process.env.HUGGINGFACE_API_KEY });

  const prompt = `
You are an expense categorization assistant.
Categorize the following transaction into one of these categories:
["Food", "Transport", "Entertainment", "Bills", "Shopping", "Healthcare", "Education", "Other"]

Transaction: ${description}

Respond with only the category name.
`;

  const result = await hf.textGeneration({
    model: "facebook/bart-large-mnli",
    inputs: prompt,
    parameters: { max_new_tokens: 20, temperature: 0 },
  });

  const output = result?.generated_text || (Array.isArray(result) ? result[0]?.generated_text : "");
  return output?.trim() || "Other";
}
