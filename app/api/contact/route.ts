import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import prisma from '../../../lib/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Save to DB
    const saved = await prisma.contactMessage.create({ data: {
      name: body.name,
      email: body.email,
      message: body.message,
    }})

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    })

    const mailOptions = {
      from: process.env.SMTP_FROM || body.email,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      subject: `New contact message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    }

    if (transporter) {
      await transporter.sendMail(mailOptions)
    }

    return NextResponse.json({ ok: true, saved })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
