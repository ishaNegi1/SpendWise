import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "SpendWise",
  description: "Web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="font-bold text-lg text-blue-600">SpendWise</h1>
          <div className="space-x-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Signup</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </div>
        </nav>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
