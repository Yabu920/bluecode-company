import { v2 as cloudinary, type UploadApiErrorResponse, type UploadApiResponse } from "cloudinary"
import sharp from "sharp"
import { boundedBody, RequestError } from "@/lib/requests"

const maxFileBytes = 4 * 1024 * 1024

export async function readProjectForm(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) {
    throw new RequestError("Expected a multipart form.", 415)
  }
  const body = await boundedBody(request, maxFileBytes + 32_768)
  return body.formData().catch(() => { throw new RequestError("Invalid multipart form.", 400) })
}

export async function uploadProjectImage(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || !file.size) throw new RequestError("Choose an image to upload.", 400)
  if (file.size > maxFileBytes) throw new RequestError("Choose an image smaller than 4 MB.", 413)
  if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
    throw new RequestError("Use a JPEG, PNG, WebP or AVIF image.", 415)
  }

  const image = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 20_000_000 })
  const metadata = await image.metadata().catch(() => null)
  if (!metadata?.format || !["jpeg", "png", "webp", "heif"].includes(metadata.format)) {
    throw new RequestError("The selected file could not be read as a supported image.", 400)
  }

  const buffer = await image.rotate().resize({ width: 1440, height: 1440, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 83 }).toBuffer().catch(() => { throw new RequestError("Could not process the image.", 400) })

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "projects", resource_type: "image", timeout: 15_000 },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => error || !result?.secure_url ? reject(new Error("Image upload failed")) : resolve(result.secure_url),
    )
    stream.on("error", reject)
    stream.end(buffer)
  })
}
