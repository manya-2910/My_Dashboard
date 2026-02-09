import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/login?error=AccessDenied");
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-6">
            <h1 className="text-4xl font-extrabold text-red-700">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Welcome, {session.user.email}!</p>
            <div className="p-4 border rounded bg-gray-100">
                <p>Only admins can see this page.</p>
            </div>
            <Link href="/api/auth/signout" className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Sign Out</Link>
        </main>
    );
}