"use client";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorMsg = searchParams.get("error");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard"); // Or wherever you want to redirect
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg space-y-4 w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

            {errorMsg === "PendingApproval" && (
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm text-center">
                    Your account is pending admin approval.
                </div>
            )}
            {error && (
                <div className="bg-red-100 text-red-800 p-2 rounded text-sm text-center">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email" required placeholder="Email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password" required placeholder="Password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                Login
            </button>

            <p className="text-center text-sm text-gray-600">
                Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
