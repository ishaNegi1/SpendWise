import { InferenceClient } from "@huggingface/inference";

export function buildUserProfile(lastNMonthsBuckets = []) {
  const monthsTracked = lastNMonthsBuckets.length;
  const totalAcross = lastNMonthsBuckets.reduce(
    (s, m) => s + (m.total || 0),
    0
  );
  const averageSpendPerMonth = monthsTracked
    ? Math.round(totalAcross / monthsTracked)
    : 0;

  const categorySums = {};
  for (const m of lastNMonthsBuckets) {
    for (const [cat, amt] of Object.entries(m.byCategory || {})) {
      categorySums[cat] = (categorySums[cat] || 0) + amt;
    }
  }

  const categoryAverages = {};
  for (const [cat, sum] of Object.entries(categorySums)) {
    categoryAverages[cat] = monthsTracked ? Math.round(sum / monthsTracked) : 0;
  }

  const topCategories = Object.entries(categoryAverages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cat]) => cat);

  const monthlySpendingTrend = {};
  for (const m of lastNMonthsBuckets) {
    monthlySpendingTrend[m.monthKey] = m.total || 0;
  }

  return {
    monthsTracked,
    averageSpendPerMonth,
    topCategories,
    categoryAverages,
    monthlySpendingTrend,
  };
}

export function buildMonthComparison(currentBucket, prevBucket) {
  const current = currentBucket || { total: 0, byCategory: {} };
  const previous = prevBucket || { total: 0, byCategory: {} };

  const allCats = new Set([
    ...Object.keys(current.byCategory || {}),
    ...Object.keys(previous.byCategory || {}),
  ]);

  const categoryDeltas = {};
  for (const c of allCats) {
    const cur = current.byCategory[c] || 0;
    const pr = previous.byCategory[c] || 0;
    const change = cur - pr;
    const changePct =
      pr > 0 ? Number(((change / pr) * 100).toFixed(1)) : cur > 0 ? 100 : 0;
    categoryDeltas[c] = { current: cur, previous: pr, change, changePct };
  }

  const totalChange = (current.total || 0) - (previous.total || 0);
  const totalChangePct =
    (previous.total || 0) > 0
      ? Number(
          (((current.total || 0) - (previous.total || 0)) / previous.total) *
            100
        ).toFixed(1)
      : (current.total || 0) > 0
      ? 100
      : 0;

  return {
    currentMonth: {
      key: currentBucket?.monthKey || "N/A",
      total: current.total || 0,
      byCategory: current.byCategory || {},
    },
    previousMonth: {
      key: prevBucket?.monthKey || "N/A",
      total: previous.total || 0,
      byCategory: previous.byCategory || {},
    },
    totalsDelta: { change: totalChange, changePct: Number(totalChangePct) },
    categoryDeltas,
  };
}

export async function generateBudgetInsights(spendingSnapshot) {
  const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

  const system = `
You are an AI Budget Coach for personal finance in India.
- Be concise, friendly, and data-driven.
- Always reference the user's own historical averages when relevant.
- Use bullet points. Prefer 4-8 bullets total.
- Always use the Indian Rupee symbol (₹) when mentioning amounts.
- Never use dollars ($) or USD formatting.
- Output sections:
  • Insights (3-5 bullets)
  • Tips (2-3 bullets)
  • Warnings (0-2 bullets, only if unusually high spending)
- Use INR symbol (₹) when mentioning amounts.
`;

  const user = `
USER PROFILE (from historical transactions):
${JSON.stringify(spendingSnapshot.userProfile, null, 2)}

CURRENT VS PREVIOUS MONTH:
${JSON.stringify(spendingSnapshot.monthComparison, null, 2)}

TASK:
- Analyze increases/decreases by category and overall against the user's averages.
- Mention top categories contributing to overspend if any.
- Give 2-3 practical saving tips based on the user's habits.
- Return ONLY bullet lists under the three section headers above.
`;

  try {
    const res = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: 650,
      temperature: 0.3,
    });

    let content = res?.choices?.[0]?.message?.content;

    if (content) {
      content = content.replace(/\$/g, "₹");
      content = content.replace(/\bUSD\b/gi, "INR");
      return content;
    }
  } catch (err) {
    console.warn(
      "HF chatCompletion failed, falling back to textGeneration:",
      err?.message || err
    );
  }

  try {
    const prompt = `SYSTEM:\n${system}\n\nUSER:\n${user}\n\nASSISTANT:`;
    const tg = await hf.textGeneration({
      model: "Qwen/Qwen2.5-7B-Instruct",
      inputs: prompt,
      parameters: {
        max_new_tokens: 600,
        temperature: 0.3,
        return_full_text: false,
      },
    });
    if (tg?.generated_text) return tg.generated_text;
  } catch (err) {
    console.error("HF textGeneration failed:", err);
  }

  return "Could not generate insights right now. Please try again later.";
}
