"use client";

export default function UserSummary({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const categories = {};
  transactions.forEach((t) => {
    categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
  });

  const topCategory =
    Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 mb-20">
      <div className="animated-border rounded-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold">₹</span>
          </div>
          <p className="text-gray-800 mt-3 text-lg">Total Spending</p>
          <p className="mt-1 text-2xl font-bold text-[#1e3a8a]">
            ₹{total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="animated-border rounded-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#1e3a8a] to-[#312e81] flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold">#</span>
          </div>
          <p className="text-gray-800 mt-3 text-lg">Total Transactions</p>
          <p className="mt-1 text-2xl font-bold text-[#1e3a8a]">
            {transactions.length}
          </p>
        </div>
      </div>

      <div className="animated-border rounded-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#5b21b6] to-[#312e81] flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold">★</span>
          </div>
          <p className="text-gray-800 mt-3 text-lg">Top Category</p>
          <p className="mt-1 text-2xl font-bold text-[#1e3a8a] capitalize">
            {topCategory}
          </p>
        </div>
      </div>
    </div>
  );
}
