"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/auth/login", form);
      if (res.status === 200) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(document.getElementById("googleButton"), {
        theme: "outline",
        size: "large",
        width: "250",
      });
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("/api/auth/google", {
        idToken: response.credential,
      });
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
      alert("Google sign-in failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <div id="googleButton" className="flex justify-center mt-4"></div>

        <div className="text-center text-sm text-gray-600">
          New user?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
