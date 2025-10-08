// app/api/uploads/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Use 'any' here for result/error to satisfy TypeScript,
    // since Cloudinary's types sometimes cause conflicts in Next.js routes
    const imageUrl: string = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "projects", resource_type: "image", public_id: `${Date.now()}_${file.name}` },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result?.secure_url || "");
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed", details: err }, { status: 500 });
  }
}
