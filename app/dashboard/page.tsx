import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50">
            <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Welcome back, <span className="font-semibold text-blue-600">{session.user.email}</span>
                    </p>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-500">Your Role:</p>
                        <p className="font-mono text-lg">{session.user.role}</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-500">User ID:</p>
                        <p className="font-mono text-xs text-gray-600 break-all">{session.user.id}</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    {session.user.role === "ADMIN" && (
                        <Link href="/admin" className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                            Admin Panel
                        </Link>
                    )}
                    <Link href="/api/auth/signout" className="block w-full text-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition">
                        Sign Out
                    </Link>
                </div>
            </div>
        </main>
    );
}
