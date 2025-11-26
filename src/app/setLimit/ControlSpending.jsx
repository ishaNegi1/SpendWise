"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ControlSpending() {
  const categories = [
    "food",
    "entertainment",
    "shopping",
    "transportation",
    "bills",
    "healthcare",
    "education",
    "finance",
    "other",
  ];

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [goals, setGoals] = useState([]);

  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/transactions/list", {
        withCredentials: true,
      });
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get("/api/budgets/list", {
        withCredentials: true,
      });
      setGoals(data);
    } catch (err) {
      console.error("Goal fetch error:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchTransactions();
  }, []);

  const handleSetLimit = async () => {
    if (!category || !limit) return;

    try {
      await axios.post(
        "/api/budgets/add",
        {
          category,
          limit: Number(limit),
          month: viewMonth,
          year: viewYear,
        },
        { withCredentials: true }
      );

      setCategory("");
      setLimit("");
      fetchGoals();
    } catch (err) {
      console.error("Add goal failed:", err);
    }
  };

  const getProgress = (goal) => {
    const gCat = goal.category.toLowerCase();
    const gLimit = Number(goal.limit);

    const total = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.category.toLowerCase() === gCat &&
          d.getMonth() + 1 === goal.month &&
          d.getFullYear() === goal.year
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const pctRaw = gLimit > 0 ? (total / gLimit) * 100 : 0;
    const pctDisplay = Math.min(100, Math.round(pctRaw));

    let alertMsg = "";
    if (total > gLimit) {
      alertMsg = `🚨 Exceeded by ₹${Math.round(total - gLimit)}`;
    } else if (pctRaw >= 90) {
      alertMsg = "⚠️ Very close to exceeding the limit!";
    } else if (pctRaw >= 70) {
      alertMsg = "⚠️ You have crossed 70% of your limit!";
    }

    return {
      total: Math.round(total),
      pctRaw,
      pctDisplay,
      alertMsg,
      limit: gLimit,
    };
  };

  const filteredGoals = goals.filter(
    (g) => g.month === Number(viewMonth) && g.year === Number(viewYear)
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛡️ Spending Controls</h1>

      <div className="flex gap-2 mb-4">
        <select
          value={viewMonth}
          onChange={(e) => setViewMonth(Number(e.target.value))}
          className="border p-2 rounded w-1/2"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={viewYear}
          onChange={(e) => setViewYear(Number(e.target.value))}
          className="border p-2 rounded w-1/2"
        >
          {Array.from({ length: 6 }, (_, i) => {
            const y = now.getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-3">Set Monthly Limit</h2>

        <div className="flex gap-2 mb-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border p-2 rounded w-1/2"
            placeholder="Limit ₹"
          />
        </div>

        <button
          onClick={handleSetLimit}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          ➕ Add Limit
        </button>
      </div>

      <div>
        <h2 className="font-semibold mb-4">Your Controls</h2>

        {filteredGoals.length === 0 && <p>No controls for this month.</p>}

        {filteredGoals.map((goal) => {
          const {
            total,
            pctDisplay,
            alertMsg,
            limit: gLimit,
          } = getProgress(goal);

          return (
            <div
              key={goal._id}
              className="mb-4 p-3 border rounded-lg bg-gray-50"
            >
              <div className="flex justify-between mb-1">
                <p className="font-medium capitalize">{goal.category}</p>
                <p className="text-sm text-gray-600">
                  ₹{total} / ₹{gLimit}
                </p>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                <div
                  className={`h-3 ${
                    total > gLimit ? "bg-red-600" : "bg-green-600"
                  }`}
                  style={{ width: `${pctDisplay}%` }}
                ></div>
              </div>

              {alertMsg && (
                <p className="text-xs mt-1 text-red-600">{alertMsg}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
