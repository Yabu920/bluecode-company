import type { MetadataRoute } from "next"
import { featuredWork } from "@/lib/featured-work"
import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/about", "/services", "/portfolio", "/blog", "/contact",
    ...featuredWork.map(({ slug }) => `/portfolio/${slug}`),
  ]
  return paths.map((path) => ({ url: new URL(path, getSiteUrl()).href }))
}
