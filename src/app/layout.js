import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <body className="bg-linear-to-br from-[#f4f7ff] via-[#eef2ff] to-[#e8ecff]">
        <Navbar />

        <main className="p-8">{children}</main>

        <footer className="bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] text-gray-200 py-5 mt-24">
          <div className=" grid grid-cols-1 sm:grid-cols-3 mx-8 text-center sm:gap-30 gap-10 px-8">
            <div>
              <h1 className="text-xl font-semibold text-white"> SpendWise</h1>
              <p className="mt-2 text-gray-200">
                Track smarter. Spend better. Your personal AI-powered finance
                dashboard.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">
                Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-white text-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/addTransaction"
                    className="hover:text-white text-gray-200"
                  >
                    Add Transaction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/setLimit"
                    className="hover:text-white text-gray-200"
                  >
                    Set Spending Limit
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Connect</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/isha-negi-791a33296/"
                    target="_blank"
                    className="hover:text-white text-gray-200"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/ishaNegi1/SpendWise"
                    target="_blank"
                    className="hover:text-white text-gray-200"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center border-t border-[#68BBE3] mt-5 pt-5 text-[#ffffff]">
            © 2025 SpendWise. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
