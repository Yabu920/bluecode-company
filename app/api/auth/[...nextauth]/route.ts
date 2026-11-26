import { NextRequest } from "next/server"
import { handlers } from "@/lib/auth"
import { enforceRateLimit } from "@/lib/rate-limit"
import { boundedBody, errorResponse, RequestError, verifyOrigin } from "@/lib/requests"

export const GET = handlers.GET

export async function POST(request: NextRequest) {
  try {
    verifyOrigin(request)
    if (!request.nextUrl.pathname.endsWith("/callback/credentials")) return handlers.POST(request)

    if (!process.env.AUTH_SECRET) throw new RequestError("Login is unavailable.", 503)
    const body = await boundedBody(request, 8192)
    await enforceRateLimit(request, "login", 12)
    return handlers.POST(new NextRequest(request.url, {
      method: "POST", headers: request.headers, body: await body.blob(),
    }))
  } catch (error) {
    return errorResponse(error, "Login request failed")
  }
}
