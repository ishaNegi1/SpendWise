"use client";

export default function InsightsModal({ open, onClose, insights }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn">

        <div className="bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] p-4 text-white flex justify-between items-center">
          <h3 className="text-xl font-semibold">📊 AI Budget Insights</h3>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:opacity-80 transition cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800 leading-relaxed text-[0.95rem] whitespace-pre-wrap shadow-inner">
            {insights || "Generating insights..."}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg text-white font-semibold bg-linear-to-r from-[#1e3a8a] to-[#312e81] hover:opacity-90 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
