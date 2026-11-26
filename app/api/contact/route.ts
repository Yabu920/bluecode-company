import { NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"
import prisma from "@/lib/prisma"
import { enforceRateLimit } from "@/lib/rate-limit"
import { errorResponse, readJson, verifyOrigin } from "@/lib/requests"

const fields = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(191),
  phone: z.string().trim().max(50).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(4_000),
  website: z.string().max(191).optional(),
})

export async function POST(request: Request) {
  try {
    verifyOrigin(request)
    const { website, ...data } = await readJson(request, fields)
    if (website) return NextResponse.json({ ok: true })
    await enforceRateLimit(request, "contact", 10)
    await prisma.contactMessage.create({ data })

    const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_RECEIVER_EMAIL } = process.env
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const secure = process.env.SMTP_SECURE === "true"
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
        secure,
        requireTLS: !secure,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 5_000,
        greetingTimeout: 5_000,
        socketTimeout: 8_000,
        disableFileAccess: true,
        disableUrlAccess: true,
      })
      await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: CONTACT_RECEIVER_EMAIL || SMTP_USER,
        replyTo: data.email,
        subject: "New BlueCode enquiry",
        text: [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "—"}`,
          `Subject: ${data.subject || "—"}`, "", data.message].join("\n"),
      }).catch(() => console.error("Contact message saved but email notification failed"))
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    return errorResponse(error, "Contact submission failed")
  }
}
