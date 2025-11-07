"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "@/components/TransactionForm";
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
      const { data } = await axios.get("/api/transactions/list", { withCredentials: true });
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

  const handleAdd = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchAIInsights = async () => {
    try {
      setInsights("⏳ Generating insights...");
      setShowInsights(true);
      const { data } = await axios.post("/api/ai/insights", {}, { withCredentials: true });
      setInsights(data?.insights || "No insights generated.");
    } catch (err) {
      console.error("AI Insights Error", err);
      setInsights("⚠ Failed to generate insights. Try again later.");
      setShowInsights(true);
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SpendWise Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2 rounded">
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 rounded">
          <option value="">All Years</option>
          {Array.from({ length: 6 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>

        <button
          onClick={() => {
            const now = new Date();
            setMonth(String(now.getMonth() + 1));
            setYear(String(now.getFullYear()));
          }}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          Reset
        </button>
        <button
          onClick={fetchAIInsights}
          className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          🤖 Get AI Insights
        </button>
      </div>

      <TransactionForm onAdd={handleAdd} />
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
