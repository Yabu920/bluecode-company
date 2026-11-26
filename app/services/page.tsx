import { JsonLd } from "../components/json-ld"
import { servicesSchema } from "@/lib/structured-data"
import ServicesView from "./services-view"

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema()} />
      <ServicesView />
    </>
  )
}
