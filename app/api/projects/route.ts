// app/api/projects/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";


export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { comments: true, techs: true },
      orderBy: { createdAt: 'desc' },
    });

    // ✅ Flatten `techs` → `tech`
    const normalized = projects.map(p => ({
      ...p,
      tech: p.techs.map(t => t.name),
    }));

    return NextResponse.json(normalized);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const created = await prisma.project.create({
      data: {
        title: body.title,
        type: body.type ?? '',
        description: body.description ?? '',
        category: body.category ?? null,
        year: body.year ?? null,
        image: body.image ?? null, // <-- URL from Cloudinary
        techs: { create: (body.tech ?? []).map((name: string) => ({ name })) },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
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
