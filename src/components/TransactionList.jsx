"use client";

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) return <p className="mt-4">No transactions yet.</p>;

  return (
    <div className="mt-6 space-y-2">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="p-2 border rounded flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{t.description}</p>
            <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p>₹{t.amount}</p>
            <p className="text-sm text-gray-500">{t.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
