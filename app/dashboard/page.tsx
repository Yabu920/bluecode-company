
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gtagPageView, gtagEvent } from "@/lib/ga";

interface Project {
  _id?: string;
  id?: string;
  title: string;
  type: string;
  tech: string[];
  description: string;
  category?: string;
  year?: string;
  image?: string | null;
}

export default function DashboardPage() {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project> & { newImageFile?: File | null }>({});

  // Track page view
  useEffect(() => {
    gtagPageView(pathname);
  }, [pathname]);

  // Load projects
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        const list: Project[] = Array.isArray(data) ? data : data.projects || [];
        setProjects(list);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getId = (p: Project) => p._id ?? p.id ?? "";

  // ---------- DELETE ----------
  const handleDelete = async (project: Project) => {
    const id = getId(project);
    if (!id) return;
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete request failed");

      setProjects((prev) => prev.filter((p) => getId(p) !== id));

      // Track GA4 event
      gtagEvent({ action: "delete_project", category: "dashboard", label: project.title });

      // Add to live panel
      addEventToPanel("delete_project", "dashboard", project.title);
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project.");
    }
  };

  // ---------- EDIT ----------
  const handleEdit = (project: Project) => {
    setEditing(project);
    setFormData({ ...project, newImageFile: undefined });
  };

  // ---------- UPDATE ----------
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const id = getId(editing);
    if (!id) return;

    try {
      const fd = new FormData();
      fd.append("title", formData.title ?? "");
      fd.append("description", formData.description ?? "");
      fd.append("type", formData.type ?? "");
      fd.append("year", formData.year ?? "");
      fd.append("category", formData.category ?? "");
      fd.append("tech", (formData.tech ?? []).join(","));

      if (formData.newImageFile instanceof File) {
        fd.append("file", formData.newImageFile);
      } else if (formData.image) {
        fd.append("imageUrl", formData.image as string);
      }

      const res = await fetch(`/api/projects/${id}`, { method: "PUT", body: fd });
      if (!res.ok) throw new Error("Update request failed");

      const updated = await res.json();
      const normalized = { ...updated, _id: (updated as any).id ?? (updated as any)._id };

      setProjects((prev) => prev.map((p) => (getId(p) === (normalized._id ?? normalized.id) ? normalized : p)));
      setEditing(null);
      setFormData({});

      // Track GA4 event
      gtagEvent({ action: "edit_project", category: "dashboard", label: normalized.title });
      addEventToPanel("edit_project", "dashboard", normalized.title);

      alert("Project updated");
    } catch (err) {
      console.error("Failed to update project:", err);
      alert("Failed to update project.");
    }
  };

  const previewUrl = formData.newImageFile ? URL.createObjectURL(formData.newImageFile) : undefined;

  // ---------- LIVE PANEL HELPER ----------
  const addEventToPanel = (action: string, category: string, label?: string) => {
    const list = document.getElementById("ga-events-list");
    if (list) {
      const li = document.createElement("li");
      li.textContent = `${action} | ${category} | ${label ?? "-"}`;
      list.prepend(li);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet. Go to Add Project to start.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={getId(project) || Math.random()} className="p-4 border rounded bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(project)} className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(project)} className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>

              {project.image && (
                <img src={project.image} alt={project.title} className="mb-2 w-full max-w-xs h-40 object-cover rounded" />
              )}

              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-500">{project.type} | {project.year}</p>
              <p className="text-xs text-gray-500">Tech: {Array.isArray(project.tech) ? project.tech.join(", ") : (project as any).techs?.map((t: any) => t.name).join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="mb-3 w-full h-40 object-cover rounded" />
            ) : (
              editing.image && <img src={editing.image} alt="Current" className="mb-3 w-full h-40 object-cover rounded" />
            )}

            <label className="block text-sm mb-1">Change image</label>
            <input type="file" accept="image/*" className="border p-2 w-full mb-2 rounded"
              onChange={(e) => setFormData({ ...formData, newImageFile: e.target.files?.[0] ?? null })} />

            <input type="text" placeholder="Title" className="border p-2 w-full mb-2 rounded"
              value={formData.title ?? editing.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

            <textarea placeholder="Description" className="border p-2 w-full mb-2 rounded"
              value={formData.description ?? editing.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <input type="text" placeholder="Type" className="border p-2 w-full mb-2 rounded"
              value={formData.type ?? editing.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />

            <input type="text" placeholder="Year" className="border p-2 w-full mb-2 rounded"
              value={formData.year ?? editing.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />

            <input type="text" placeholder="Tech (comma separated)" className="border p-2 w-full mb-4 rounded"
              value={formData.tech?.join(", ") ?? (editing.tech ? (editing.tech as string[]).join(", ") : "")}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(",").map((t) => t.trim()) })} />

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => { setEditing(null); setFormData({}); }} className="px-3 py-1 rounded bg-gray-300">Cancel</button>
              <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* LIVE GA EVENTS PANEL */}
      <div className="fixed bottom-4 right-4 p-3 bg-white shadow rounded w-80 max-h-60 overflow-auto text-sm z-50">
        <h4 className="font-bold mb-2">Analytics Events (Live)</h4>
        <ul id="ga-events-list" className="space-y-1"></ul>
      </div>
    </div>
  );
}
