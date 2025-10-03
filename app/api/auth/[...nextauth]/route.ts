import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials
        // Demo user - replace with real logic
        console.log('Login attempt:', email, process.env.DEMO_USER_EMAIL)
        if (email === process.env.DEMO_USER_EMAIL && password === process.env.DEMO_USER_PASSWORD) {
          return { id: '1', name: 'Demo User', email }
        }
        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  pages: { signIn: '/login' },
})

export { handler as GET, handler as POST }
