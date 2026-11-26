import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Explore website development, mobile app development and digital marketing from BlueCode.",
  alternates: { canonical: "/services" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
