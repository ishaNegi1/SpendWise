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
    <div className=" mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
    
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-center bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81] mb-8">
          Spending by Category
        </h3>

        <div className="h-72 flex justify-center items-center">
          <canvas id="pieChart" className="w-full"></canvas>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-center bg-clip-text text-transparent bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] mb-8">
          Category-wise Spending (Bar Chart)
        </h3>

        <div className="h-72 flex justify-center items-center">
          <canvas id="barChart" className="w-full"></canvas>
        </div>
      </div>
    </div>
  );
}
