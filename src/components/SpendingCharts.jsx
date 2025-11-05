"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SpendingCharts({ transactions }) {
  const categoryRef = useRef();
  const monthlyRef = useRef();

  useEffect(() => {
    if (!transactions.length) return;

    const categories = {};
    const months = {};

    transactions.forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;

      const m = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
      months[m] = (months[m] || 0) + t.amount;
    });

    const catChart = new Chart(categoryRef.current, {
      type: "pie",
      data: {
        labels: Object.keys(categories),
        datasets: [{ data: Object.values(categories), backgroundColor: ["#34D399","#60A5FA","#FBBF24","#F87171","#A78BFA","#F472B6","#FCD34D","#9CA3AF"] }],
      },
    });

    const monthlyChart = new Chart(monthlyRef.current, {
      type: "bar",
      data: {
        labels: Object.keys(months),
        datasets: [{ label: "Monthly Spending", data: Object.values(months), backgroundColor: "#3B82F6" }],
      },
      options: { responsive: true },
    });

    return () => {
      catChart.destroy();
      monthlyChart.destroy();
    };
  }, [transactions]);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Category-wise Spending</h3>
        <canvas ref={categoryRef} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Monthly Spending</h3>
        <canvas ref={monthlyRef} />
      </div>
    </div>
  );
}
