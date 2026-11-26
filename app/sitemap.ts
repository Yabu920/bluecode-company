import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/services", "/portfolio", "/blog", "/contact"]
    .map((path) => ({ url: new URL(path, getSiteUrl()).href }))
}
