"use client";

export default function UserSummary({ transactions }) {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  return (
    <div className="bg-white p-4 rounded shadow mt-4 flex justify-between items-center">
      <div>
        <p className="font-bold">Total Spending:</p>
        <p className="text-xl">${total.toFixed(2)}</p>
      </div>
      <div>
        <p className="font-bold">Transactions:</p>
        <p className="text-xl">{transactions.length}</p>
      </div>
    </div>
  );
}
