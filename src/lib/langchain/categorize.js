import { HuggingFaceInference } from "langchain/llms/hf";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

export async function categorizeTransaction(description) {
  const model = new HuggingFaceInference({
    model: "facebook/bart-large-mnli",
    apiKey: process.env.HUGGINGFACE_API_KEY,
  });

  const template = `You are an expense categorization assistant.
Categorize the following transaction into one of these categories:
["Food", "Transport", "Entertainment", "Bills", "Shopping", "Healthcare", "Education", "Other"]

Transaction: {text}

Respond with only the category name.`;

  const prompt = new PromptTemplate({
    template,
    inputVariables: ["text"],
  });

  const chain = new LLMChain({
    llm: model,
    prompt,
  });

  const result = await chain.call({ text: description });
  return result.text.trim();
}
