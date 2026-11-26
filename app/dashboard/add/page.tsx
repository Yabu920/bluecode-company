"use client"

import { useRouter } from "next/navigation"
import ProjectForm from "../project-form"

export default function AddProjectPage() {
  const router = useRouter()
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-5 text-3xl font-bold">Add project</h1>
      <ProjectForm onSave={() => router.push("/dashboard")} />
    </section>
  )
}
