import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import LoginForm from "./login-form"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Admin sign-in", robots: { index: false, follow: false } }

export default async function LoginPage() {
  if (process.env.AUTH_SECRET && (await auth())?.user) redirect("/dashboard")
  return <LoginForm />
}
