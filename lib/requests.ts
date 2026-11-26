import { NextResponse } from "next/server"
import { z } from "zod"
import { getSiteUrl } from "@/lib/site"

export class RequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export function verifyOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (origin && origin !== getSiteUrl().origin) {
    throw new RequestError("Request origin is not allowed.", 403)
  }
}

export async function requireAdmin(request: Request) {
  verifyOrigin(request)
  const { auth } = await import("@/lib/auth")
  if (!process.env.AUTH_SECRET || !(await auth())?.user) {
    throw new RequestError("Sign in to continue.", 401)
  }
}

export async function boundedBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes) {
    throw new RequestError("Request is too large.", 413)
  }
  const reader = request.body?.getReader()
  if (!reader) throw new RequestError("Request body is required.", 400)

  let size = 0
  const parts: Uint8Array<ArrayBuffer>[] = []
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) {
        void reader.cancel().catch(() => undefined)
        throw new RequestError("Request is too large.", 413)
      }
      parts.push(new Uint8Array(value))
    }
  } finally {
    reader.releaseLock()
  }

  return new Response(new Blob(parts), {
    headers: { "content-type": request.headers.get("content-type") ?? "" },
  })
}

export async function readJson<Schema extends z.ZodType>(request: Request, schema: Schema): Promise<z.output<Schema>> {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    throw new RequestError("Expected JSON.", 415)
  }
  const response = await boundedBody(request, 24_576)
  const input: unknown = await response.json().catch(() => {
    throw new RequestError("Invalid JSON.", 400)
  })
  return schema.parse(input)
}

export function errorResponse(error: unknown, operation: string) {
  if (error instanceof RequestError) {
    return NextResponse.json({ error: error.message }, {
      status: error.status,
      headers: error.status === 429 ? { "Retry-After": "900" } : undefined,
    })
  }
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid fields." }, { status: 400 })
  }
  if (typeof error === "object" && error && "code" in error && error.code === "P2025") {
    return NextResponse.json({ error: "Record not found." }, { status: 404 })
  }

  console.error(operation, error instanceof Error ? error.name : "Unknown error")
  return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 })
}
