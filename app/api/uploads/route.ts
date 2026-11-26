import { NextResponse } from "next/server"
import { errorResponse, requireAdmin } from "@/lib/requests"
import { readProjectForm, uploadProjectImage } from "@/lib/project-upload"

export async function POST(request: Request) {
  try {
    await requireAdmin(request)
    const form = await readProjectForm(request)
    return NextResponse.json({ url: await uploadProjectImage(form.get("file")) })
  } catch (error) {
    return errorResponse(error, "Project upload failed")
  }
}
