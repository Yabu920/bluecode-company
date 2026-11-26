import type { Metadata } from "next"
import { companySchema } from "@/lib/structured-data"
import { JsonLd } from "./components/json-ld"
import HomeView from "./home-view"

export const metadata: Metadata = { alternates: { canonical: "/" } }

export default function HomePage() {
  return (
    <>
      <JsonLd data={companySchema()} />
      <HomeView />
    </>
  )
}
