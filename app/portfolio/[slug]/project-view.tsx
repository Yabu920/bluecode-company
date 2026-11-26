"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { FeaturedProject } from "@/lib/featured-work"
import { useLanguage } from "../../contexts/language-context"

export function ProjectView({ project }: { project: FeaturedProject }) {
  const { language } = useLanguage()
  const en = language === "en"
  const text = project[language]

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <Link href="/portfolio#work-heading" className="font-semibold text-blue-800 underline underline-offset-4">
        {en ? "Portfolio" : "የፕሮጀክቶች ማሳያ"}
      </Link>
      <h1 lang="en" className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{project.name}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">{text.summary}</p>
      <section className="mt-9" aria-labelledby="project-purpose">
        <h2 id="project-purpose" className="text-2xl font-bold">{en ? "Project goal" : "የፕሮጀክቱ ዓላማ"}</h2>
        <p className="mt-3 leading-7 text-slate-700">{text.purpose}</p>
      </section>
      <section className="mt-8" aria-labelledby="project-features">
        <h2 id="project-features" className="text-2xl font-bold">{en ? "What we built" : "የሠራናቸው ዋና ነገሮች"}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {text.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </section>
      <div className="mt-9 flex flex-wrap gap-3">
        {project.website && (
          <Button asChild variant="outline">
            <a href={project.website}>{en ? "Visit the project website" : "የፕሮጀክቱን ድረ ገጽ ይጎብኙ"}</a>
          </Button>
        )}
        <Button asChild className="bg-blue-700 hover:bg-blue-800">
          <Link href="/contact#enquiry">{en ? "Discuss a similar project" : "ስለ ተመሳሳይ ፕሮጀክት ያነጋግሩን"}</Link>
        </Button>
      </div>
    </article>
  )
}
