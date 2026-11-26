import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { deleteProject, formatProject, listProjects } from "@/lib/project-data"
import { blogFields, projectFields, recordId } from "@/lib/project-input"
import { errorResponse, readJson, requireAdmin } from "@/lib/requests"

const updates = z.union([
  blogFields.partial().extend({ id: recordId, model: z.literal("blog") }),
  projectFields.partial().extend({ id: recordId, model: z.literal("project").optional() }),
])

export async function GET(request: Request) {
  try {
    const page = z.coerce.number().int().min(1).max(10_000).parse(new URL(request.url).searchParams.get("page") ?? 1)
    const { projects, hasNext } = await listProjects(page)
    return NextResponse.json(projects, { headers: { "X-Has-Next-Page": String(hasNext) } })
  } catch (error) {
    return errorResponse(error, "Project listing failed")
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request)
    const { tech, ...fields } = await readJson(request, projectFields.extend({
      type: projectFields.shape.type.default(""),
      description: projectFields.shape.description.default(""),
      category: projectFields.shape.category.optional(),
      year: projectFields.shape.year.optional(),
      image: projectFields.shape.image.optional(),
      tech: projectFields.shape.tech.default([]),
    }))
    const project = await prisma.project.create({
      data: { ...fields, techs: { create: tech.map((name) => ({ name })) } },
      include: { techs: true },
    })
    revalidateTag("portfolio-projects", { expire: 0 })
    return NextResponse.json(formatProject(project), { status: 201 })
  } catch (error) {
    return errorResponse(error, "Project creation failed")
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin(request)
    const data = await readJson(request, updates)
    if (data.model === "blog") {
      const { id, model, ...fields } = data
      return NextResponse.json(await prisma.blogPost.update({ where: { id }, data: fields }))
    }

    const { id, model, tech, ...fields } = data
    const project = await prisma.project.update({
      where: { id },
      data: { ...fields, techs: tech ? { deleteMany: {}, create: tech.map((name) => ({ name })) } : undefined },
      include: { techs: true },
    })
    revalidateTag("portfolio-projects", { expire: 0 })
    return NextResponse.json(formatProject(project))
  } catch (error) {
    return errorResponse(error, "Project update failed")
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin(request)
    const params = new URL(request.url).searchParams
    const id = recordId.parse(params.get("id"))
    if (params.get("model") === "blog") await prisma.blogPost.delete({ where: { id } })
    else await deleteProject(id)
    revalidateTag("portfolio-projects", { expire: 0 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return errorResponse(error, "Project deletion failed")
  }
}
