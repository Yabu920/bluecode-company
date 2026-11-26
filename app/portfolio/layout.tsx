import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore web and software projects built by BlueCode Technology Solution.",
  alternates: { canonical: "/portfolio" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
