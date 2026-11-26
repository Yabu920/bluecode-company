import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { featuredWork } from "@/lib/featured-work"
import { ProjectView } from "./project-view"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return featuredWork.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = featuredWork.find((item) => item.slug === slug)
  if (!project) notFound()

  const path = `/portfolio/${project.slug}`
  const title = `${project.name} | BlueCode`
  return {
    title: { absolute: title },
    description: project.en.summary,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: project.en.summary,
      url: path,
      type: "website",
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = featuredWork.find((item) => item.slug === slug)
  if (!project) notFound()

  return <ProjectView project={project} />
}
