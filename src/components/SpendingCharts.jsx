"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SpendingCharts({ transactions }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const radarRef = useRef(null);

  const pieCanvas = useRef(null);
  const barCanvas = useRef(null);
  const lineCanvas = useRef(null);
  const radarCanvas = useRef(null);

  useEffect(() => {
    if (!transactions.length) return;

    const categoryTotals = {};
    const dailyTotals = {};

    transactions.forEach((t) => {
      const amount = Number(t.amount);

      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;

      const day = new Date(t.date).toISOString().split("T")[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + amount;
    });

    const sortedDays = Object.keys(dailyTotals).sort(
      (a, b) => new Date(a) - new Date(b),
    );

    let runningTotal = 0;
    const cumulativeData = sortedDays.map((day) => {
      runningTotal += dailyTotals[day];
      return runningTotal;
    });

    const colorPalette = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#8DD17E",
    ];

    [pieRef, barRef, lineRef, radarRef].forEach((ref) => {
      if (ref.current) ref.current.destroy();
    });

    pieRef.current = new Chart(pieCanvas.current, {
      type: "pie",
      data: {
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            data: Object.values(categoryTotals),
            backgroundColor: colorPalette,
          },
        ],
      },
    });

    barRef.current = new Chart(barCanvas.current, {
      type: "bar",
      data: {
        labels: sortedDays,
        datasets: [
          {
            label: "Daily Spending",
            data: sortedDays.map((d) => dailyTotals[d]),
            backgroundColor: sortedDays.map(
              (_, i) => colorPalette[i % colorPalette.length],
            ),
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    lineRef.current = new Chart(lineCanvas.current, {
      type: "line",
      data: {
        labels: sortedDays,
        datasets: [
          {
            label: "Cumulative Spending",
            data: cumulativeData,
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54,162,235,0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
    });

    radarRef.current = new Chart(radarCanvas.current, {
      type: "radar",
      data: {
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            label: "Spending Pattern",
            data: Object.values(categoryTotals),
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "#FF6384",
          },
        ],
      },
    });
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ChartCard title="Spending by Category">
        <canvas ref={pieCanvas} />
      </ChartCard>

      <ChartCard title="Daily Spending">
        <canvas ref={barCanvas} />
      </ChartCard>

      <ChartCard title="Cumulative Spending Trend">
        <canvas ref={lineCanvas} />
      </ChartCard>

      <ChartCard title="Spending Pattern">
        <canvas ref={radarCanvas} />
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-center mb-6 text-[#1e3a8a]">{title}</h3>
      <div className="h-72 flex justify-center items-center">{children}</div>
    </div>
  );
}
