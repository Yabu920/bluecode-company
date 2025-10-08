
// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "projects" }, (error: unknown, result: any) => {
      if (error) return reject(error);
      if (!result?.secure_url) return reject(new Error("No URL returned"));
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;
    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const type = formData.get("type")?.toString() || "";
    const year = formData.get("year")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const techString = formData.get("tech")?.toString() || "";
    const techArray = techString ? techString.split(",").map((t) => t.trim()).filter(Boolean) : [];

    // file key is "file"
    const file = formData.get("file") as File | null;
    let imageUrl = formData.get("imageUrl")?.toString() || undefined; // existing URL if not replaced

    if (file && (file as File).size > 0) {
      const buffer = Buffer.from(await (file as File).arrayBuffer());
      imageUrl = await uploadToCloudinary(buffer);
    }

    const updateData: any = { title, description, type, year, category };
    if (imageUrl) updateData.image = imageUrl;

    if (techArray.length) {
      updateData.techs = {
        deleteMany: {},
        create: techArray.map((name) => ({ name })),
      };
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
      include: { techs: true },
    });

    // Normalize techs for frontend
    const normalized = {
      ...updated,
      tech: updated.techs.map((t: any) => t.name),
      _id: updated.id, // add _id for compatibility with frontend code using _id
    };

    return NextResponse.json(normalized);
  } catch (err) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;

    // 🧹 Remove related data first (comments + techs)
    await prisma.comment.deleteMany({ where: { projectId } });
    await prisma.projectTech.deleteMany({ where: { projectId } });

    // 🗑️ Now safe to delete the project itself
    await prisma.project.delete({ where: { id: projectId } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

