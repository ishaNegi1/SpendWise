import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "SpendWise",
  description: "Web application",
};

export default function RootLayout({ children }) {
  return (
        <html lang="en">
      <head>
        {/* Google Identity SDK */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body className="bg-gray-50 text-gray-800">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg text-blue-600">SpendWise</h1>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/addTransaction" className="hover:underline">Add Transaction</Link>
            <Link href="/setLimit" className="hover:underline">Control Spending</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </div>
        </nav>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
