"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TransactionForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [previewCategory, setPreviewCategory] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

      setDescription("");
      setAmount("");
      setDate("");
      setPreviewCategory("");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className=" inline-block text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] mb-6">
        Add Transaction
      </h2>

      <form onSubmit={handleAdd} className="space-y-7">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (e.g., Swiggy food order)"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-8 pt-2">
          <button
            type="button"
            onClick={handlePreviewCategory}
            className="px-5 py-3 rounded-lg text-white font-semibold bg-linear-to-r from-[#1e3a8a] to-[#312e81] shadow hover:opacity-90 transition"
          >
            {loadingPreview ? "Predicting..." : "Preview Category"}
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-lg text-white font-semibold bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] shadow hover:opacity-90 transition cursor-pointer"
          >
            {loadingAdd ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>

      {previewCategory && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-800">
          <p>
            Predicted Category:{" "}
            <span className="font-bold text-[#1e3a8a] cursor-pointer">
              {previewCategory}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
