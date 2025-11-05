"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/auth/signup", form);
      if (res.status === 201) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        { theme: "filled_blue", size: "large", width: "250" }
      );
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
      console.error("Google signup failed:", err);
      alert("Google signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div id="googleButton" className="flex justify-center mt-4"></div>

        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
