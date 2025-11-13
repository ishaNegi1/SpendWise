"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BudgetModal({ open, onClose, transactions }) {
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
    if (open) fetchGoals();
  }, [open]);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b p-4 shrink-0">
          <h3 className="text-lg font-semibold">🛡️ Spending Controls</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="pt-3 pb-1 text-gray-600 text-sm">
            <span className="font-medium">Showing limits for:</span>
            <span>
              {" "}
              {new Date(0, viewMonth - 1).toLocaleString("en", {
                month: "long",
              })}{" "}
              {viewYear}
            </span>
          </div>

          <div className="mb-4 flex gap-2">
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

          <div className="mb-4 border-t pt-4">
            <h4 className="font-semibold mb-2">Set Monthly Limit</h4>

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

          <div className="border-t pt-4 pb-6">
            <h4 className="font-semibold mb-3">Your Controls</h4>

            {filteredGoals.length === 0 && (
              <p>No controls found for this month.</p>
            )}

            {filteredGoals.map((goal) => {
              const {
                total,
                pctRaw,
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

                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <div>{Math.round(pctRaw)}%</div>
                    <div>
                      {alertMsg && (
                        <span className="font-medium">{alertMsg}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t shrink-0">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
