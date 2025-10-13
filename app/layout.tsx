// app/layout.tsx
import type { Metadata } from "next"
import LocalFont from 'next/font/local'
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { Analytics } from "@vercel/analytics/next"


const inter = LocalFont({
  src: [
    {
      path: '../public/fonts/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://bluecodes.com.et"), // ✅ update with your actual domain
  title: {
    default: "BlueCode - Building Digital Ethiopia, One Code at a Time",
    template: "%s | BlueCode"
  },
  description:
    "BlueCode helps Ethiopian businesses grow through professional websites, mobile apps, and smart digital marketing strategies.",
  keywords: [
    "web development",
    "mobile apps",
    "digital marketing",
    "Ethiopia",
    "software company",
    "BlueCode",
    "Addis Ababa",
    "IT consulting",
    "website design"
  ],
  authors: [{ name: "BlueCode", url: "https://bluecodes.com.et" }],
  creator: "BlueCode",
  publisher: "BlueCode",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "BlueCode - Building Digital Ethiopia, One Code at a Time",
    description:
      "We design modern websites, build apps, and deliver digital growth for Ethiopian companies.",
    url: "https://bluecodes.com.et",
    siteName: "BlueCode",
    locale: "en_ET",
    type: "website",
    images: [
      {
        url: "/logo-white.jpg", // ✅ Create this image later
        width: 1200,
        height: 630,
        alt: "BlueCode - Building Digital Ethiopia, One Code at a Time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueCode - Building Digital Ethiopia, One Code at a Time",
    description:
      "Empowering Ethiopian businesses with digital solutions — web, mobile, and marketing.",
    images: ["/og-image.jpg"],
    // creator: "@BlueCodeEt", // ✅ optional
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://bluecodes.com.et",
    languages: {
      en: "https://bluecodes.com.et/en",
      am: "https://bluecodes.com.et/am",
    },
  },
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
