"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81] shadow-md py-6 px-6 flex justify-between items-center">
        <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-300 to-indigo-200">
          SpendWise
        </h1>

        <div className="hidden sm:flex space-x-8 items-center">
          <Link href="/" className="text-gray-200 hover:text-white transition text-[1.1rem]">Home</Link>
          <Link href="/addTransaction" className="text-gray-200 hover:text-white transition text-[1.1rem]">Add Transaction</Link>
          <Link href="/setLimit" className="text-gray-200 hover:text-white transition text-[1.1rem]">Control Spending</Link>
          <Link href="/dashboard" className="text-gray-200 hover:text-white transition text-[1.1rem]">Dashboard</Link>
        </div>

        <button 
          className="sm:hidden text-gray-200 font-bold text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-linear-to-b from-[#0b1a33] via-[#1e3a8a] to-[#312e81] text-gray-200 shadow-xl transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-6">
          <h1 className="font-bold text-xl">Menu</h1>
          <button className="text-gray-300 font-extrabold text-2xl" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <ul className="mt-8 space-y-8 px-6 text-lg">
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/addTransaction" onClick={() => setOpen(false)}>Add Transaction</Link></li>
          <li><Link href="/setLimit" onClick={() => setOpen(false)}>Control Spending</Link></li>
          <li><Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
        </ul>
      </div>
    </>
  );
}
