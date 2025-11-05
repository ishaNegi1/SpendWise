"use client";

import { useState } from "react";
import axios from "axios";

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreviewCategory = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/transactions/categorize", { description });
      setCategory(data.category);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/transactions/add", {
        description,
        amount: parseFloat(amount),
        date,
      });
      onAdd(data);
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <label className="block font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={handlePreviewCategory}
          className="mt-1 px-2 py-1 bg-blue-500 text-white rounded"
        >
          {loading ? "Loading..." : "Preview Category"}
        </button>
        {category && <p className="mt-1 text-sm">Predicted: {category}</p>}
      </div>
      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
