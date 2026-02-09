import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }
    interface User {
        id: string;
        role: string;
        isApproved: boolean;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: { type: "text" }, password: { type: "password" } },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
                    throw new Error("Invalid credentials");
                }

                // THE GATEKEEPER LOGIC
                if (!user.isApproved && user.role !== "ADMIN") {
                    throw new Error("Your account is pending admin approval.");
                }

                return { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
