"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { PublicProject } from "../portfolio/portfolio-view"
import ProjectForm, { apiResponse } from "./project-form"

export default function DashboardPage() {
  const [projects, setProjects] = useState<PublicProject[]>([])
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const abort = new AbortController()
    async function load() {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(`/api/projects?page=${page}`, { cache: "no-store", signal: abort.signal })
        const records = await apiResponse<PublicProject[]>(response)
        if (!abort.signal.aborted) {
          setProjects(records)
          setHasNext(response.headers.get("X-Has-Next-Page") === "true")
        }
      } catch (caught) {
        if (!abort.signal.aborted) setError(caught instanceof Error ? caught.message : "Could not load projects.")
      } finally {
        if (!abort.signal.aborted) setLoading(false)
      }
    }
    void load()
    return () => abort.abort()
  }, [page, refresh])

  async function remove(project: PublicProject) {
    if (deleting || !window.confirm(`Delete “${project.title}” and its comments?`)) return
    setDeleting(project.id)
    setError("")
    setNotice("")
    try {
      await apiResponse(await fetch(`/api/projects/${encodeURIComponent(project.id)}`, { method: "DELETE" }))
      setNotice("Project deleted.")
      if (projects.length === 1 && page > 1) setPage(page - 1)
      else setRefresh((value) => value + 1)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not delete the project.")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Manage projects</h1>
        <Button asChild><Link href="/dashboard/add">Add project</Link></Button>
      </div>
      <p role="status" className="text-green-800">{loading ? "Loading projects…" : notice}</p>
      <p role="alert" className="text-red-700">{error}</p>
      {!loading && !error && projects.length === 0 && <p>No projects on this page.</p>}
      {!loading && <ul className="grid gap-4">
        {projects.map((project) => (
          <li key={project.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="min-w-0 break-words text-lg font-bold">{project.title}</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditing(project.id)} aria-label={`Edit ${project.title}`}>Edit</Button>
                <Button variant="destructive" disabled={deleting !== null} onClick={() => void remove(project)} aria-label={`Delete ${project.title}`}>
                  {deleting === project.id ? "Deleting…" : "Delete"}
                </Button>
              </div>
            </div>
            {editing === project.id ? (
              <div className="mt-4">
                <ProjectForm project={project} onCancel={() => setEditing(null)} onSave={(updated) => {
                  setProjects((records) => records.map((record) => record.id === updated.id ? updated : record))
                  setEditing(null)
                  setNotice("Project updated.")
                }} />
              </div>
            ) : <p className="mt-2 break-words text-slate-600">{project.description}</p>}
          </li>
        ))}
      </ul>}
      {(page > 1 || hasNext) && <nav aria-label="Project pages" className="mt-6 flex items-center gap-3">
        <Button variant="outline" disabled={page <= 1 || loading || !!deleting} onClick={() => { setEditing(null); setPage(page - 1) }}>Previous</Button>
        <span>Page {page}</span>
        <Button variant="outline" disabled={!hasNext || loading || !!deleting} onClick={() => { setEditing(null); setPage(page + 1) }}>Next</Button>
      </nav>}
    </section>
  )
}
