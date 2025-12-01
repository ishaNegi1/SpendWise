"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", form);
      if (res.status === 201) {
        setLoading(false);
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

      google.accounts.id.renderButton(document.getElementById("googleButton"), {
        theme: "outline",
        size: "large",
        width: "260",
        text: "continue_with",
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
      alert("Google signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center mt-16 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:p-10 p-7 rounded-2xl shadow-2xl space-y-6 border border-gray-200 sm:w-full sm:max-w-md"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81]">
          Create Your Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
          focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
          focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
          focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] shadow-md hover:opacity-90 transition"
        >
          {loading ? "Signing..." : "Sign Up"}
        </button>

        <div id="googleButton" className="flex justify-center mt-4"></div>

        <div className="text-center text-base text-gray-800">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#1e3a8a] font-bold text-lg hover:underline"
          >
            Login
          </Link>
        </div>

        {message && <p className="text-center text-base">{message}</p>}
      </form>
    </div>
  );
}
