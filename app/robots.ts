import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ["*", "OAI-SearchBot"].map((userAgent) => ({
      userAgent, allow: "/", disallow: ["/api/"],
    })),
    sitemap: new URL("/sitemap.xml", getSiteUrl()).href,
  }
}
