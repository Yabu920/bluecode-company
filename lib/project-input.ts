import { z } from "zod"

import { projectImageSource } from "@/lib/project-image"

const text = z.string().trim().max(191)
export const recordId = z.string().trim().min(1).max(191)
export const projectFields = z.object({
  title: text.min(1),
  type: text,
  description: z.string().trim().max(4_000),
  category: text.nullable(),
  year: text.nullable(),
  image: z.string().trim().max(2048).refine((value) => Boolean(projectImageSource(value)), "Choose a supported image.").nullable(),
  tech: z.preprocess((input) => typeof input === "string" ? input.split(",").map((value) => value.trim()).filter(Boolean) : input,
    z.array(z.string().trim().min(1).max(80)).max(20).transform((values) => [...new Set(values)])),
})

export const blogFields = z.object({
  title: text.min(1),
  excerpt: text.min(1),
  category: text.nullable(),
  date: text.nullable(),
  author: text.nullable(),
  image: projectFields.shape.image,
  readTime: text.nullable(),
})
