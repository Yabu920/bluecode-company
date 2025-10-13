// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null
//         const { email, password } = credentials
//         // Demo user - replace with real logic
//         console.log('Login attempt:', email, process.env.DEMO_USER_EMAIL)
//         if (email === process.env.DEMO_USER_EMAIL && password === process.env.DEMO_USER_PASSWORD) {
//           return { id: '1', name: 'Demo User', email }
//         }
//         return null
//       },
//     }),
//   ],
//   session: { strategy: 'jwt' },
//   jwt: { secret: process.env.NEXTAUTH_SECRET },
//   pages: { signIn: '/login' },
// })

// export { handler as GET, handler as POST }


// app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import type { User } from "next-auth"

// const handler = NextAuth({
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, _request): Promise<User | null> {
//         if (!credentials) return null

//         // Explicitly cast email and password as strings
//         const email = credentials.email as string
//         const password = credentials.password as string

//         if (
//           email === process.env.DEMO_USER_EMAIL &&
//           password === process.env.DEMO_USER_PASSWORD
//         ) {
//           return {
//             id: "1",
//             name: "Admin",
//             email, // must be string | null | undefined
//           }
//         }

//         return null
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: { signIn: "/login" },
// })

// export { handler as GET, handler as POST }



import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🟡 authorize() called with", credentials)

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const email = String(credentials.email)
        const password = String(credentials.password)

        // Hardcoded admin credentials
        if (
          email === process.env.DEMO_USER_EMAIL &&
          password === process.env.DEMO_USER_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin",
            email, // ✅ string type
          }
        }

        console.log("❌ Invalid credentials")
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const, // ✅ must use literal
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
