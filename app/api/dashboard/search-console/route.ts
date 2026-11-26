import { NextResponse } from "next/server"
import { errorResponse, requireAdmin } from "@/lib/requests"

export async function GET(request: Request) {
  try {
    await requireAdmin(request)
    return NextResponse.json({ status: "not_configured" }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return errorResponse(error, "Analytics status failed")
  }
}
