"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "@/components/TransactionList";
import SpendingCharts from "@/components/SpendingCharts";
import UserSummary from "@/components/UserSummary";
import InsightsModal from "@/components/InsightsModal";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState("");
  const [showInsights, setShowInsights] = useState(false);

  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));

  const router = useRouter();

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/transactions/list", {
        withCredentials: true,
      });
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchAIInsights = async () => {
    try {
      setInsights("⏳ Generating insights...");
      setShowInsights(true);

      const { data } = await axios.post(
        "/api/ai/insights",
        {},
        { withCredentials: true }
      );

      setInsights(data?.insights || "No insights generated.");
    } catch (err) {
      console.error("AI Insights Error", err);
      setInsights("⚠ Failed to generate insights. Try again later.");
      setShowInsights(true);
    }
  };

  const downloadPDF = async () => {
    if (!insights || insights.trim() === "") {
      alert("Please generate AI insights first.");
      return;
    }

    try {
      const res = await fetch("/api/reports/monthly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: Number(month),
          year: Number(year),
          insights,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `SpendWise-Report-${month}-${year}.pdf`;
      a.click();
    } catch (err) {
      console.error("PDF Download Error:", err);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    const matchesMonth = month ? d.getMonth() + 1 === Number(month) : true;
    const matchesYear = year ? d.getFullYear() === Number(year) : true;
    return matchesMonth && matchesYear;
  });

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto sm:px-6 py-8 sm:mt-14 mt-5">
      <div className="flex sm:flex-row flex-col justify-between items-center mb-12">
        <h1 className="text-3xl mb-5 sm:mb-0 text-center font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81]">
          SpendWise Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 mb-12">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-8">
          Filter Transactions
        </h2>

        <div className="flex flex-wrap sm:gap-8 gap-6 justify-center sm:justify-normal">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-[#1e3a8a]"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-[#1e3a8a]"
          >
            <option value="">All Years</option>
            {Array.from({ length: 6 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>

          <button
            onClick={() => {
              const now = new Date();
              setMonth(String(now.getMonth() + 1));
              setYear(String(now.getFullYear()));
            }}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
          >
            Reset
          </button>

          <button
            onClick={fetchAIInsights}
            className="px-4 py-2 rounded-lg text-white bg-linear-to-r from-[#1e3a8a] to-[#312e81] hover:opacity-90 transition cursor-pointer text-lg mt-5 sm:mt-0"
          >
            🤖 Get Insights
          </button>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 rounded-lg text-white bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] hover:opacity-90 transition cursor-pointer text-lg"
          >
            📄 Download Report
          </button>
        </div>
      </div>

      <UserSummary transactions={filteredTransactions} />

      <SpendingCharts transactions={filteredTransactions} />

      <TransactionList transactions={filteredTransactions} />

      <InsightsModal
        open={showInsights}
        onClose={() => setShowInsights(false)}
        insights={insights}
      />
    </div>
  );
}
