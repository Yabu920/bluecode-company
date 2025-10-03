import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')
    const where = projectId ? { where: { projectId }, orderBy: { createdAt: 'desc' } } : { orderBy: { createdAt: 'desc' } }
    const comments = projectId ? await prisma.comment.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } }) : await prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(comments)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.comment.create({ data: {
      projectId: body.projectId,
      name: body.name,
      email: body.email,
      body: body.body,
    } })
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 })
    await prisma.comment.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
