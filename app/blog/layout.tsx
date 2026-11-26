import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read BlueCode’s insights on websites, mobile apps and digital marketing in Ethiopia.",
  alternates: { canonical: "/blog" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
