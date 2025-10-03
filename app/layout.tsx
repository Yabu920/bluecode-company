// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { Analytics } from "@vercel/analytics/next"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlueCode - Building Digital Ethiopia, One Code at a Time",
  description: "BlueCode is a technology solutions company helping Ethiopian businesses grow through professional websites, mobile apps, and smart digital marketing strategies.",
  keywords: "web development, mobile apps, digital marketing, Ethiopia, technology solutions",
    // generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Analytics />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
