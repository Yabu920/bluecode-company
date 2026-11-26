import type { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"

export const pageSize = 12
const ordered = [{ createdAt: "desc" }, { id: "desc" }] satisfies Prisma.ProjectOrderByWithRelationInput[]
const withTech = { techs: { select: { name: true } } } satisfies Prisma.ProjectInclude

export function formatProject<T extends { techs: { name: string }[] }>({ techs, ...project }: T) {
  return { ...project, tech: techs.map(({ name }) => name) }
}

export async function listProjects(page: number) {
  const records = await prisma.project.findMany({
    include: withTech,
    orderBy: ordered,
    skip: (page - 1) * pageSize,
    take: pageSize + 1,
  })
  return { projects: records.slice(0, pageSize).map(formatProject), hasNext: records.length > pageSize }
}

export function deleteProject(id: string) {
  return prisma.$transaction([
    prisma.comment.deleteMany({ where: { projectId: id } }),
    prisma.projectTech.deleteMany({ where: { projectId: id } }),
    prisma.project.delete({ where: { id } }),
  ])
}
