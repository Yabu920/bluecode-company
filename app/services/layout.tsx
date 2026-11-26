import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website, App and Digital Marketing Services",
  description: "BlueCode provides website development, mobile app development, and digital marketing for Ethiopian businesses from Addis Ababa.",
  alternates: { canonical: "/services" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
