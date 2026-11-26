import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth, signOut } from "@/lib/auth"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Admin dashboard", robots: { index: false, follow: false } }

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.AUTH_SECRET || !(await auth())?.user) redirect("/login")

  return (
    <div className="min-h-[70vh] bg-slate-50">
      <nav aria-label="Administration" className="border-b bg-slate-950 text-white">
        <div className="container mx-auto flex flex-wrap items-center gap-5 px-4 py-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/add">Add project</Link>
          <Link href="/dashboard/messages">Messages</Link>
          <form className="ml-auto" action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}>
            <button className="rounded-md border border-slate-500 px-4 py-2">Sign out</button>
          </form>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
