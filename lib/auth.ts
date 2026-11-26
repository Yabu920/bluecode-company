import { createHash, timingSafeEqual } from "node:crypto"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { getSiteUrl } from "@/lib/site"

const credentialsSchema = z.object({
  email: z.string().trim().email().max(191),
  password: z.string().min(16).max(256),
})

function matchesSecret(value: string, expected: string) {
  const hash = (input: string) => createHash("sha256").update(input).digest()
  return timingSafeEqual(hash(value), hash(expected))
}

export const { auth, handlers, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  useSecureCookies: getSiteUrl().protocol === "https:",
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      authorize(credentials) {
        const input = credentialsSchema.safeParse(credentials)
        const email = process.env.ADMIN_EMAIL
        const password = process.env.ADMIN_PASSWORD
        if (!input.success || !email || !password || password.length < 16) return null

        const validPassword = matchesSecret(input.data.password, password)
        if (!validPassword || input.data.email.toLowerCase() !== email.toLowerCase()) return null
        return { id: "admin", name: "BlueCode administrator", email }
      },
    }),
  ],
})
