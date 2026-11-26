import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BlueCode",
  description: "Meet the team behind BlueCode Technology Solution in Addis Ababa.",
  alternates: { canonical: "/about" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
