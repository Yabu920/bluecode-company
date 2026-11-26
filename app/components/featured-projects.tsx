"use client"

import Link from "next/link"
import { featuredWork } from "@/lib/featured-work"
import { useLanguage } from "../contexts/language-context"

export function FeaturedProjects() {
  const { language } = useLanguage()
  const en = language === "en"

  return (
    <section className="border-y border-blue-100 bg-blue-50/60" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 id="work-heading" className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {en ? "Selected projects" : "የተመረጡ ፕሮጀክቶች"}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {featuredWork.map((project) => (
            <li key={project.slug} className="rounded-2xl border border-blue-100 bg-white p-5 sm:p-6">
              <h3 className="text-lg font-bold text-slate-950">
                <Link href={`/portfolio/${project.slug}`} lang="en" className="underline decoration-blue-400 underline-offset-4 hover:text-blue-800">
                  {project.name}
                </Link>
              </h3>
              <p className="mt-2 text-slate-600">{project[language].summary}</p>
              {project.website && <a className="mt-4 inline-block py-2 font-semibold text-blue-700 underline underline-offset-4" href={project.website}
                aria-label={en ? `Visit website for ${project.name}` : `ድረ ገጹን ይጎብኙ፣ ${project.name}`}>
                {en ? "Visit website" : "ድረ ገጹን ይጎብኙ"}
              </a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
