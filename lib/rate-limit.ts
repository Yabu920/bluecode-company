import { createHash } from "node:crypto"
import { isIP } from "node:net"
import prisma from "@/lib/prisma"
import { RequestError } from "@/lib/requests"

type Scope = "login" | "contact" | "comment"

export async function enforceRateLimit(request: Request, scope: Scope, maximum: number) {
  const header = process.env.TRUSTED_CLIENT_IP_HEADER
  const address = header ? request.headers.get(header)?.trim() : undefined
  const identity = address && isIP(address) ? address : "shared"
  const key = createHash("sha256").update(scope + ":" + identity).digest("hex")
  const now = Date.now()
  const windowMs = 15 * 60_000
  const expiresAt = new Date(now + windowMs)

  const count = await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`
      INSERT INTO RateLimit (id, count, expiresAt) VALUES (${key}, 1, ${expiresAt})
      ON DUPLICATE KEY UPDATE
        count = IF(expiresAt <= UTC_TIMESTAMP(3), 1, LEAST(count + 1, ${maximum + 1})),
        expiresAt = IF(expiresAt <= UTC_TIMESTAMP(3), ${expiresAt}, expiresAt)
    `
    const record = await tx.rateLimit.findUniqueOrThrow({ where: { id: key } })
    return record.count
  })

  if (count > maximum) throw new RequestError("Too many requests. Try again in 15 minutes.", 429)

  if (Math.random() < 0.02) {
    await prisma.rateLimit.deleteMany({ where: { expiresAt: { lt: new Date(now - windowMs) } } })
      .catch(() => console.warn("Could not clean expired rate-limit records"))
  }
}
