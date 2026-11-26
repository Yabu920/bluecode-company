import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell BlueCode about your website, app or digital marketing project.",
  alternates: { canonical: "/contact" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
