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
    <div className="max-w-5xl mx-auto py-8 sm:px-6 sm:mt-14 mt-6">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81] mb-8 text-center sm:text-left">
        Spending Controls
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:gap-12 mb-12">
        <select
          value={viewMonth}
          onChange={(e) => setViewMonth(Number(e.target.value))}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
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
          className="border rounded-lg p-3 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
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

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 mb-16">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-4">
          Set Monthly Spending Limit
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-10 mb-4 mt-7">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
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
            className="border rounded-lg p-3 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
            placeholder="Limit ₹"
          />
        </div>

        <button
          onClick={handleSetLimit}
          className="w-full py-3 rounded-lg text-white font-semibold bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] shadow hover:opacity-90 transition cursor-pointer mt-5"
        >
          ➕ Add Limit
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">
        Your Limits
      </h2>

      {filteredGoals.length === 0 && (
        <p className="text-gray-800 text-base">
          No controls set for this month.
        </p>
      )}

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
            className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200 mb-5"
          >
            <div className="flex justify-between">
              <p className="capitalize text-lg font-semibold text-[#1e3a8a]">
                {goal.category}
              </p>
              <p className="text-gray-800 text-lg">
                ₹{total} /{" "}
                <span className="font-semibold text-lg">₹{gLimit}</span>
              </p>
            </div>

            <div className="w-full bg-gray-300 h-3 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-3 transition-all duration-500 ${
                  total > gLimit
                    ? "bg-red-600"
                    : pctDisplay > 70
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
                style={{ width: `${pctDisplay}%` }}
              ></div>
            </div>

            {alertMsg && (
              <p className="text-base mt-6 text-red-600 font-medium">
                {alertMsg}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
