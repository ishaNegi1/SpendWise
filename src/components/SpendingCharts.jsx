"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SpendingCharts({ transactions }) {
  const pieRef = useRef();
  const barRef = useRef();

  useEffect(() => {
    if (!transactions.length) return;

    const categoryTotals = {};
    transactions.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Number(t.amount);
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    if (pieRef.current) pieRef.current.destroy();
    pieRef.current = new Chart(document.getElementById("pieChart"), {
      type: "pie",
      data: { labels, datasets: [{ data: values }] },
    });

    if (barRef.current) barRef.current.destroy();
    barRef.current = new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: { labels, datasets: [{ data: values }] },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-3 rounded shadow">
        <h3 className="text-center font-semibold mb-2">Spending by Category</h3>
        <div className="h-64">
          <canvas id="pieChart"></canvas>
        </div>
      </div>

      <div className="bg-white p-3 rounded shadow">
        <h3 className="text-center font-semibold mb-2">
          Category-wise Bar Chart
        </h3>
        <div className="h-64">
          <canvas id="barChart"></canvas>
        </div>
      </div>
    </div>
  );
}
