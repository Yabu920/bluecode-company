import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { recordId } from "@/lib/project-input"
import { enforceRateLimit } from "@/lib/rate-limit"
import { errorResponse, readJson, requireAdmin, verifyOrigin } from "@/lib/requests"

const fields = z.object({
  projectId: recordId,
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(191),
  body: z.string().trim().min(1).max(2_000),
})
const publicFields = { id: true, projectId: true, name: true, body: true, createdAt: true } as const

export async function GET(request: Request) {
  try {
    const projectId = recordId.parse(new URL(request.url).searchParams.get("projectId"))
    const comments = await prisma.comment.findMany({
      where: { projectId }, select: publicFields, orderBy: { createdAt: "desc" }, take: 50,
    })
    return NextResponse.json(comments)
  } catch (error) {
    return errorResponse(error, "Comment listing failed")
  }
}

export async function POST(request: Request) {
  try {
    verifyOrigin(request)
    const data = await readJson(request, fields)
    await enforceRateLimit(request, "comment", 10)
    const comment = await prisma.comment.create({ data, select: publicFields })
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return errorResponse(error, "Comment creation failed")
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin(request)
    const id = recordId.parse(new URL(request.url).searchParams.get("id"))
    await prisma.comment.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return errorResponse(error, "Comment deletion failed")
  }
}
