"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { projectImageSource } from "@/lib/project-image"
import { FeaturedProjects } from "../components/featured-projects"
import { useLanguage } from "../contexts/language-context"

export interface PublicProject {
  id: string
  title: string
  description: string
  type: string
  category: string | null
  year: string | null
  tech: string[]
  image: string | null
}

export default function PortfolioView({ projects, page, hasNext, unavailable }: {
  projects: PublicProject[]
  page: number
  hasNext: boolean
  unavailable?: boolean
}) {
  const { language } = useLanguage()
  const en = language === "en"

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 px-5 py-14 text-center sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{en ? "Our portfolio" : "የእኛ ሥራዎች"}</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          {en ? "Explore the websites and software we build." : "የሠራናቸውን ድረ ገጾች እና ሶፍትዌሮች ይመልከቱ።"}
        </p>
      </section>
      {page === 1 && <FeaturedProjects />}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16" aria-label={en ? "Projects" : "ፕሮጀክቶች"}>
        {projects.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const image = projectImageSource(project.image)
              return (
                <li key={project.id} className="overflow-hidden rounded-2xl border border-slate-200">
                  {image && <Image src={image} alt="" width={600} height={360}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="aspect-[5/3] w-full object-cover" />}
                  <div className="p-5">
                    <h2 className="break-words text-xl font-bold">{project.title}</h2>
                    {[project.category || project.type, project.year].some(Boolean) &&
                      <p className="mt-1 text-sm font-medium text-blue-800">{[project.category || project.type, project.year].filter(Boolean).join(" · ")}</p>}
                    <p className="mt-3 whitespace-pre-line break-words text-slate-600">{project.description}</p>
                    {project.tech.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => <li key={`${tech}-${index}`} className="rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700">{tech}</li>)}
                    </ul>}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
            <p>{unavailable ? (en ? "The project gallery is temporarily unavailable." : "የፕሮጀክቶች ማሳያው ለጊዜው አይገኝም።") :
              (en ? "There are no additional projects on this page." : "በዚህ ገጽ ላይ ተጨማሪ ፕሮጀክቶች የሉም።")}</p>
          </div>
        )}
        {(page > 1 || hasNext) && <nav className="mt-8 flex flex-wrap items-center gap-3" aria-label={en ? "Portfolio pages" : "የፕሮጀክቶች ገጾች"}>
          {page > 1 && <Button asChild variant="outline"><Link href={page === 2 ? "/portfolio" : `/portfolio?page=${page - 1}`}>{en ? "Previous" : "ቀዳሚ"}</Link></Button>}
          <span className="text-sm">{en ? "Page" : "ገጽ"} {page}</span>
          {hasNext && page < 10_000 && <Button asChild variant="outline"><Link href={`/portfolio?page=${page + 1}`}>{en ? "Next" : "ቀጣይ"}</Link></Button>}
        </nav>}
      </section>
    </>
  )
}
