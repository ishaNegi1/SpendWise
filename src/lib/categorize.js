import { InferenceClient } from "@huggingface/inference";

export async function categorizeTransaction(description) {
  try {
    const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const labels = [
  "food",
  "entertainment",
  "shopping",
  "transportation",
  "bills",
  "healthcare",
  "education",
  "finance"
];

    const result = await hf.zeroShotClassification({
      model: "facebook/bart-large-mnli",
      inputs: description,
      parameters: { candidate_labels: labels }
    });

    if (Array.isArray(result) && result.length > 0) {
      return result[0].label;
    }

    if (result?.labels?.length > 0) {
      return result.labels[0]; 
    }

    return "Other";
  } catch (error) {
    console.error("❌ HF Error:", error);
    return "Other";
  }
}
