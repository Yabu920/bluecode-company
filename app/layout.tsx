import type { Metadata } from "next"
import LocalFont from "next/font/local"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { getSiteUrl } from "@/lib/site"

const inter = LocalFont({
  src: [
    { path: "../public/fonts/Inter_18pt-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Inter_18pt-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  fallback: ["Noto Sans Ethiopic", "Arial", "sans-serif"],
})

const title = "BlueCode Technology Solution"
const description = "BlueCode develops websites and mobile apps and provides digital marketing for Ethiopian businesses in Addis Ababa."

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: title, template: "%s | BlueCode" },
  description,
  openGraph: {
    title, description, siteName: title, locale: "en_ET", type: "website",
    images: [{ url: "/logo-white.jpg", width: 500, height: 300, alt: title }],
  },
  twitter: { card: "summary", images: ["/logo-white.jpg"] },
  icons: { icon: "/bluecode-mark.webp" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navigation />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
