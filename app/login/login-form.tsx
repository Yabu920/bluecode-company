"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)
  const submitting = useRef(false)

  return (
    <section className="bg-slate-50 px-4 py-16">
      <form className="mx-auto grid max-w-md gap-4 rounded-2xl border bg-white p-7 sm:p-9" onSubmit={async (event) => {
        event.preventDefault()
        if (submitting.current) return
        submitting.current = true
        setPending(true)
        setMessage("")
        const values = new FormData(event.currentTarget)
        try {
          const token = await fetch("/api/auth/csrf", { cache: "no-store" })
          if (!token.ok) throw new Error("Could not start sign-in")
          const { csrfToken } = await token.json()
          const result = await fetch("/api/auth/callback/credentials", {
            method: "POST",
            headers: { "X-Auth-Return-Redirect": "1" },
            body: new URLSearchParams({
              email: String(values.get("email") ?? ""),
              password: String(values.get("password") ?? ""),
              csrfToken,
              callbackUrl: "/dashboard",
            }),
          })
          const data = await result.json()
          if (result.ok && data.url && new URL(data.url, window.location.origin).pathname === "/dashboard") {
            window.location.assign("/dashboard")
            return
          }
          setMessage(result.status === 429 ? "Too many attempts. Try again in 15 minutes." :
            result.status >= 500 ? "Sign-in is temporarily unavailable." : "Check your email and password.")
        } catch {
          setMessage("Sign-in is temporarily unavailable.")
        } finally {
          submitting.current = false
          setPending(false)
        }
      }}>
        <h1 className="mb-2 text-3xl font-bold text-slate-950">Admin sign-in</h1>
        <label htmlFor="login-email">Email</label>
        <Input id="login-email" name="email" type="email" autoComplete="username" required maxLength={191} />
        <label htmlFor="login-password">Password</label>
        <Input id="login-password" name="password" type="password" autoComplete="current-password" required maxLength={256} />
        <p role="alert" className="text-sm text-red-700">{message}</p>
        <Button disabled={pending}>{pending ? "Signing in…" : "Sign in"}</Button>
      </form>
    </section>
  )
}
