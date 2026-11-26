import { contactEmail, contactPhone } from "@/lib/contact-details"
import { serviceDefinitions } from "@/lib/services"
import { getSiteUrl } from "@/lib/site"

export const businessName = "BlueCode Technology Solution"
export const businessDescription =
  "Based in Addis Ababa, BlueCode develops websites and mobile apps and provides digital marketing for Ethiopian businesses."

function businessReferences() {
  const site = getSiteUrl()
  return {
    url: new URL("/", site).href,
    organizationId: new URL("/#organization", site).href,
    websiteId: new URL("/#website", site).href,
  }
}

export function companySchema() {
  const { url, organizationId, websiteId } = businessReferences()

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: businessName,
        alternateName: "BlueCode",
        url,
        description: businessDescription,
        logo: new URL("/logo-white.jpg", url).href,
        address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
        areaServed: { "@type": "Country", name: "Ethiopia" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "project enquiries",
          email: contactEmail,
          telephone: contactPhone,
          url: new URL("/contact", url).href,
          availableLanguage: ["English", "Amharic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: businessName,
        alternateName: "BlueCode",
        url,
        inLanguage: ["en", "am"],
        publisher: { "@id": organizationId },
      },
    ],
  }
}

export function servicesSchema() {
  const { url, organizationId, websiteId } = businessReferences()
  const servicesUrl = new URL("/services", url).href
  const services = serviceDefinitions.map(({ id, en }) => ({
    "@type": "Service",
    "@id": `${servicesUrl}#${id}`,
    url: `${servicesUrl}#${id}`,
    name: en.title,
    description: en.description,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Ethiopia" },
  }))

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${servicesUrl}#page`,
        url: servicesUrl,
        name: "BlueCode services",
        isPartOf: { "@id": websiteId },
        mainEntity: services.map(({ "@id": id }) => ({ "@id": id })),
      },
      ...services,
    ],
  }
}
