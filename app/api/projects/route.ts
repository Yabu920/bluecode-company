import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Return both projects and blog posts so the frontend can fetch blog data
    const projects = await prisma.project.findMany({ include: { comments: true }, orderBy: { createdAt: 'desc' } });
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ projects, posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Support creating either a project or a blog post depending on body.model
    if (body.model === 'blog') {
      const createdPost = await prisma.blogPost.create({ data: {
        title: body.title,
        excerpt: body.excerpt ?? '',
        category: body.category ?? null,
        date: body.date ?? null,
        author: body.author ?? null,
        image: body.image ?? null,
        readTime: body.readTime ?? null
      }});
      return NextResponse.json(createdPost, { status: 201 });
    }

    const created = await prisma.project.create({ data: {
      title: body.title,
      type: body.type ?? '',
      description: body.description ?? '',
      category: body.category ?? null,
      year: body.year ?? null,
      image: body.image ?? null,
      // `techs` is a relation (ProjectTech[]). Create relation entries for provided tech names.
      techs: { create: (body.tech ?? []).map((name: string) => ({ name })) }
    }});
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
    if (body.model === 'blog') {
      const updatedPost = await prisma.blogPost.update({ where: { id: body.id }, data: {
        title: body.title,
        excerpt: body.excerpt,
        category: body.category,
        date: body.date,
        author: body.author,
        image: body.image,
        readTime: body.readTime
      }});
      return NextResponse.json(updatedPost);
    }

    // For updates, replace techs if a new array is provided.
    const projectData: any = {
      title: body.title,
      type: body.type,
      description: body.description,
      category: body.category,
      year: body.year,
      image: body.image,
    }

    if (Array.isArray(body.tech)) {
      projectData.techs = {
        // remove existing relation entries and create new ones
        deleteMany: {},
        create: body.tech.map((name: string) => ({ name }))
      }
    }

    const updated = await prisma.project.update({ where: { id: body.id }, data: projectData });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
    const model = searchParams.get('model');
    if (model === 'blog') {
      await prisma.blogPost.delete({ where: { id } });
    } else {
      await prisma.project.delete({ where: { id } });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
