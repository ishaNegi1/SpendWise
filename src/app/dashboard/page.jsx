"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => setUser(res.data.user))
      .catch(() => router.push("/login"));
  }, [router]);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {user ? (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Signup or Login to access dashboard</p>
      )}
    </div>
  );
}
