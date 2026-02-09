"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMsg("");

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }

            setMsg("Account created! Please wait for admin approval. Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSignup} className="p-8 bg-white shadow-md rounded-lg space-y-4 w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {msg && <p className="text-green-500 text-sm text-center">{msg}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email" required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password" required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Create Account
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
