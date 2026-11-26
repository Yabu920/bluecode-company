"use client"

import Image from "next/image"
import Link from "next/link"
import { Code2, Smartphone, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeaturedProjects } from "./components/featured-projects"
import { useLanguage } from "./contexts/language-context"

const serviceIcons = { web: Code2, app: Smartphone, marketing: TrendingUp }
export default function HomePage() {
  const { language, translations } = useLanguage()
  const t = translations[language]
  const en = language === "en"

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#172f72,_transparent_65%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
          <div>
            <p className="mb-5 text-sm font-semibold text-sky-300">BlueCode Technology Solution</p>
            <h1 className="max-w-[18ch] text-balance text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              {en ? "Websites and apps for Ethiopian businesses" : "ለኢትዮጵያ ንግዶች ድረ ገጾች እና መተግበሪያዎች"}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">{t.hero.subtext}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-500">
                <Link href="/contact">{t.hero.cta1}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-lg border-slate-500 bg-transparent px-6 text-white hover:bg-slate-800 hover:text-white">
                <Link href="/portfolio">{t.hero.cta2}</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/workspace.webp"
            alt=""
            width={1440}
            height={960}
            preload
            sizes="(max-width: 1023px) 100vw, (max-width: 1280px) 46vw, 560px"
            className="aspect-[4/3] w-full rounded-2xl border border-white/15 object-cover shadow-2xl shadow-blue-950/60"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{t.services.title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600">{t.services.subtitle}</p>
        <ul className="mt-9 grid gap-4 sm:grid-cols-3">
          {(Object.keys(serviceIcons) as (keyof typeof serviceIcons)[]).map((service) => {
            const Icon = serviceIcons[service]
            return (
              <li key={service} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <Icon aria-hidden="true" className="mb-5 h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-700" />
                <h3 className="text-lg font-bold">
                  <Link className="hover:text-blue-700 hover:underline" href={`/services#${service}`}>{t.services[service].title}</Link>
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{t.services[service].description}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <FeaturedProjects />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl bg-blue-800 px-6 py-9 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{en ? "Tell us about your project" : "ስለ ፕሮጀክትዎ ይንገሩን"}</h2>
            <p className="mt-2 text-blue-100">{t.cta.subtitle}</p>
          </div>
          <Button asChild size="lg" className="mt-5 h-12 rounded-lg bg-white px-6 text-blue-800 hover:bg-blue-50 sm:mt-0">
            <Link href="/contact">{t.cta.button1}</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
