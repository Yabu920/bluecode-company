import { unstable_cache } from "next/cache"
import { listProjects } from "@/lib/project-data"
import PortfolioView from "./portfolio-view"

const readPage = unstable_cache(listProjects, ["portfolio-projects-v1"], {
  tags: ["portfolio-projects"], revalidate: 60,
})

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const rawPage = Number((await searchParams).page ?? 1)
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 && rawPage <= 10_000 ? rawPage : 1
  const result = await readPage(page).catch(() => {
    console.error("Portfolio database unavailable")
    return { projects: [], hasNext: false, unavailable: true }
  })

  return <PortfolioView {...result} page={page} />
}
