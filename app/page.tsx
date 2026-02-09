import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50">
            <h1 className="text-4xl font-extrabold text-blue-700">Enterprise Portal</h1>
            <p className="text-gray-600 text-lg">Secure role-based dashboard with Neon DB.</p>
            <div className="flex gap-4">
                <Link href="/login" className="px-6 py-2 border border-blue-600 rounded text-blue-600 hover:bg-blue-50 transition">Login</Link>
                <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Sign Up</Link>
            </div>
        </main>
    );
}
