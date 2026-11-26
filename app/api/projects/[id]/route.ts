import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { deleteProject, formatProject } from "@/lib/project-data"
import { projectFields, recordId } from "@/lib/project-input"
import { readProjectForm, uploadProjectImage } from "@/lib/project-upload"
import { errorResponse, requireAdmin } from "@/lib/requests"

type Context = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Context) {
  try {
    await requireAdmin(request)
    const id = recordId.parse((await params).id)
    const form = await readProjectForm(request)
    const { tech, image, ...fields } = projectFields.parse({
      title: form.get("title"),
      description: form.get("description") ?? "",
      type: form.get("type") ?? "",
      year: form.get("year"),
      category: form.get("category"),
      tech: form.get("tech") ?? "",
      image: form.get("imageUrl") || null,
    })
    const file = form.get("file")
    const imageUrl = file ? await uploadProjectImage(file) : image
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...fields,
        image: imageUrl ?? undefined,
        techs: { deleteMany: {}, create: tech.map((name) => ({ name })) },
      },
      include: { techs: true },
    })

    revalidateTag("portfolio-projects", { expire: 0 })
    return NextResponse.json({ ...formatProject(project), _id: project.id })
  } catch (error) {
    return errorResponse(error, "Project update failed")
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireAdmin(request)
    await deleteProject(recordId.parse((await params).id))
    revalidateTag("portfolio-projects", { expire: 0 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return errorResponse(error, "Project deletion failed")
  }
}
