"use client";

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0)
    return <p className="mt-4 text-lg font-semibold text-center text-gray-700">No transactions yet.</p>;

   return (
    <div className=" space-y-4">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-300 flex justify-between items-center hover:shadow-xl transition cursor-pointer"
        >
          <div>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {t.description}
            </p>
            <p className="text-base text-gray-800 mt-1">
              {new Date(t.date).toLocaleDateString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-[#1e3a8a]">₹{t.amount}</p>

            <span className="inline-block mt-1 px-3 py-1 text-base rounded-full text-white bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6]">
              {t.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
