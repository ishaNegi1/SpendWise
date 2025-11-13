"use client";
import { useState } from "react";
import axios from "axios";

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [previewCategory, setPreviewCategory] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");

  const handlePreviewCategory = async () => {
    if (!description.trim()) {
      setError("Please enter a transaction description.");
      setLoadingPreview(false);
      return;
    }
    setError("");
    setLoadingPreview(true);
    setPreviewCategory("");

    try {
      const { data } = await axios.post("/api/transactions/categorize", {
        description,
      });
      setPreviewCategory(data.category);
    } catch (err) {
      console.error(err);
      setError("Failed to predict category");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      setError("All fields are required");
      return;
    }
    setError("");
    setLoadingAdd(true);
    try {
      const { data } = await axios.post(
        "/api/transactions/add",
        {
          description,
          amount,
          date,
        },
        { withCredentials: true }
      );

      onAdd(data);
      setDescription("");
      setAmount("");
      setDate("");
      setPreviewCategory("");
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>

      <form onSubmit={handleAdd} className="space-y-3">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (ex: food order from swiggy)"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePreviewCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {loadingPreview ? "Predicting..." : "Preview Category"}
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {loadingAdd ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>

      {previewCategory && (
        <p className="mt-3 text-gray-700">
          Predicted Category: <strong>{previewCategory}</strong>
        </p>
      )}
    </div>
  );
}
