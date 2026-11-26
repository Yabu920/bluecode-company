"use client"

import { useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { PublicProject } from "../portfolio/portfolio-view"

export async function apiResponse<T>(response: Response): Promise<T> {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(response.status === 401 ? "Your session has ended. Sign in again." : data.error || "Request failed.")
  }
  return data
}

export default function ProjectForm({ project, onSave, onCancel }: {
  project?: PublicProject
  onSave: (project: PublicProject) => void
  onCancel?: () => void
}) {
  const submitting = useRef(false)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const uploaded = useRef<{ file: File; url: string } | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setSaving(true)
    setError("")
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const file = formElement.querySelector<HTMLInputElement>('input[name="file"]')?.files?.[0]

    try {
      const hasImage = file instanceof File && file.size > 0
      if (!hasImage) form.delete("file")
      let response: Response

      if (project) {
        response = await fetch(`/api/projects/${encodeURIComponent(project.id)}`, { method: "PUT", body: form })
      } else {
        if (hasImage && (!uploaded.current || uploaded.current.file !== file)) {
          const image = await apiResponse<{ url: string }>(await fetch("/api/uploads", {
            method: "POST", body: form,
          }))
          uploaded.current = { file, url: image.url }
        }
        form.delete("file")
        response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...Object.fromEntries(form), image: hasImage ? uploaded.current?.url : null }),
        })
      }
      onSave(await apiResponse<PublicProject>(response))
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save the project.")
    } finally {
      submitting.current = false
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <label className="grid gap-2 font-medium">Title
        <Input name="title" required maxLength={191} defaultValue={project?.title} />
      </label>
      <label className="grid gap-2 font-medium">Description
        <Textarea name="description" maxLength={4000} rows={4} defaultValue={project?.description} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        {(["type", "category", "year"] as const).map((field) => (
          <label key={field} className="grid gap-2 font-medium">
            <span className="capitalize">{field}</span>
            <Input name={field} maxLength={191} defaultValue={project?.[field] ?? ""} />
          </label>
        ))}
      </div>
      <label className="grid gap-2 font-medium">Technologies, separated by commas
        <Input name="tech" defaultValue={project?.tech.join(", ")} />
      </label>
      <label className="grid gap-2 font-medium">{project ? "Replace image" : "Project image"}
        <Input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
        <span className="text-sm font-normal text-slate-600">JPEG, PNG, WebP or AVIF. Max 4 MB.</span>
      </label>
      <p role="alert" className="text-sm text-red-700">{error}</p>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save project"}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>Cancel</Button>}
      </div>
    </form>
  )
}
