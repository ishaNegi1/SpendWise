"use client";

export default function UserSummary({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const categories = {};
  transactions.forEach((t) => {
    categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
  });

  const topCategory = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-3 gap-3 my-4">
      <div className="p-3 bg-blue-100 rounded font-medium">Total Spend: ₹{total.toFixed(2)}</div>
      <div className="p-3 bg-green-100 rounded font-medium">Transactions: {transactions.length}</div>
      <div className="p-3 bg-purple-100 rounded font-medium">Top Category: {topCategory}</div>
    </div>
  );
}
