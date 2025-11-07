"use client";

export default function InsightsModal({ open, onClose, insights }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">📊 AI Budget Insights</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-auto">
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
            {insights || "Generating insights..."}
          </pre>
        </div>

        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
