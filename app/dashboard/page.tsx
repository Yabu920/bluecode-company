// // app/dashboard/page.tsx
// "use client";

// import { useEffect, useState } from "react";

// interface Project {
//   _id: string;
//   title: string;
//   type: string;
//   tech: string[];
//   description: string;
//   category: string;
//   year: string;
//   image: string | null;
// }

// export default function DashboardPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [ga4, setGa4] = useState<any | null>(null);
//   const [sc, setSc] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       setLoading(true)
//       const [projectsRes, ga4Res, scRes] = await Promise.all([
//         fetch('/api/projects'),
//         fetch('/api/dashboard/ga4'),
//         fetch('/api/dashboard/search-console')
//       ])

//       const [projectsData, ga4Data, scData] = await Promise.all([
//         projectsRes.json(),
//         ga4Res.json(),
//         scRes.json()
//       ])

//       setProjects(projectsData || [])
//       setGa4(ga4Data)
//       setSc(scData)
//       setLoading(false)
//     }

//     load()
//   }, [])

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//       {loading ? (
//         <p>Loading analytics...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Users</h3>
//             <p className="text-2xl">{ga4?.summary?.users ?? '—'}</p>
//           </div>
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Sessions</h3>
//             <p className="text-2xl">{ga4?.summary?.sessions ?? '—'}</p>
//           </div>
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Revenue</h3>
//             <p className="text-2xl">${ga4?.summary?.revenue ?? '—'}</p>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <h2 className="text-xl font-semibold mb-3">Projects</h2>
//           {projects.length === 0 ? (
//             <p>No projects yet. Go to Add Project to start.</p>
//           ) : (
//             <div className="grid gap-4">
//               {projects.map((project) => (
//                 <div key={project._id} className="p-4 border rounded">
//                   <h3 className="text-lg font-medium">{project.title}</h3>
//                   <p className="text-sm text-gray-600">{project.description}</p>
//                   <p className="text-xs text-gray-500">{project.type} | {project.year}</p>
//                   <p className="text-xs text-gray-500">Tech: {project.tech.join(', ')}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <aside>
//           <h2 className="text-xl font-semibold mb-3">Search Console</h2>
//           <div className="p-4 border rounded mb-4">
//             <p>Clicks: <strong>{sc?.summary?.clicks ?? '—'}</strong></p>
//             <p>Impressions: <strong>{sc?.summary?.impressions ?? '—'}</strong></p>
//             <p>CTR: <strong>{Math.round((sc?.summary?.ctr ?? 0) * 10000) / 100}%</strong></p>
//             <p>Position: <strong>{sc?.summary?.position ?? '—'}</strong></p>
//           </div>

//           <h3 className="font-semibold mb-2">Top Queries</h3>
//           <div className="space-y-2">
//             {(sc?.topQueries ?? []).map((q: any, idx: number) => (
//               <div key={idx} className="p-2 border rounded">
//                 <p className="text-sm font-medium">{q.query}</p>
//                 <p className="text-xs text-gray-500">Clicks: {q.clicks} • Impr: {q.impressions} • CTR: {Math.round(q.ctr * 10000) / 100}%</p>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </div>
//   )
// }



// app/dashboard/page.tsx
// "use client";

// import { useEffect, useState } from "react";

// interface Project {
//   _id: string;
//   title: string;
//   type: string;
//   tech: string[];
//   description: string;
//   category: string;
//   year: string;
//   image: string | null;
// }

// export default function DashboardPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [ga4, setGa4] = useState<any | null>(null);
//   const [sc, setSc] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState<Project | null>(null);
//   const [formData, setFormData] = useState<Partial<Project>>({});

//   useEffect(() => {
//     async function load() {
//       setLoading(true);
//       const [projectsRes, ga4Res, scRes] = await Promise.all([
//         fetch("/api/projects"),
//         fetch("/api/dashboard/ga4"),
//         fetch("/api/dashboard/search-console"),
//       ]);

//       const [projectsData, ga4Data, scData] = await Promise.all([
//         projectsRes.json(),
//         ga4Res.json(),
//         scRes.json(),
//       ]);

//       setProjects(projectsData || []);
//       setGa4(ga4Data);
//       setSc(scData);
//       setLoading(false);
//     }

//     load();
//   }, []);

//   // 🗑️ Handle Delete (each project only)
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this project?")) return;

//     try {
//       const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete project");

//       // remove only the deleted project from local state
//       setProjects((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("❌ Delete failed:", err);
//       alert("Failed to delete project.");
//     }
//   };

//   // ✏️ Handle Edit (populate form)
//   const handleEdit = (project: Project) => {
//     setEditing(project);
//     setFormData({ ...project }); // prefill all editable fields
//   };

//   // 💾 Handle Update (save project)
//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editing) return;

//     try {
//       const res = await fetch(`/api/projects/${editing._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Update failed");
//       const updated = await res.json();

//       // update the specific project in the local list
//       setProjects((prev) =>
//         prev.map((p) => (p._id === updated._id ? updated : p))
//       );

//       setEditing(null);
//       alert("✅ Project updated successfully!");
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       alert("Failed to update project.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//       {loading ? (
//         <p>Loading analytics...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Users</h3>
//             <p className="text-2xl">{ga4?.summary?.users ?? "—"}</p>
//           </div>
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Sessions</h3>
//             <p className="text-2xl">{ga4?.summary?.sessions ?? "—"}</p>
//           </div>
//           <div className="p-4 border rounded">
//             <h3 className="font-semibold">Revenue</h3>
//             <p className="text-2xl">${ga4?.summary?.revenue ?? "—"}</p>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <h2 className="text-xl font-semibold mb-3">Projects</h2>
//           {projects.length === 0 ? (
//             <p>No projects yet. Go to Add Project to start.</p>
//           ) : (
//             <div className="grid gap-4">
//               {projects.map((project) => (
//                 <div
//                   key={project._id}
//                   className="p-4 border rounded bg-white shadow-sm"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-lg font-medium">{project.title}</h3>
//                     <div className="space-x-2">
//                       <button
//                         onClick={() => handleEdit(project)}
//                         className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(project._id)}
//                         className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600">{project.description}</p>
//                   <p className="text-xs text-gray-500">
//                     {project.type} | {project.year}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Tech: {project.tech.join(", ")}
//                   </p>
//                   {project.image && (
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="mt-2 w-40 h-24 object-cover rounded border"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <aside>
//           <h2 className="text-xl font-semibold mb-3">Search Console</h2>
//           <div className="p-4 border rounded mb-4">
//             <p>
//               Clicks: <strong>{sc?.summary?.clicks ?? "—"}</strong>
//             </p>
//             <p>
//               Impressions: <strong>{sc?.summary?.impressions ?? "—"}</strong>
//             </p>
//             <p>
//               CTR:{" "}
//               <strong>
//                 {Math.round((sc?.summary?.ctr ?? 0) * 10000) / 100}%
//               </strong>
//             </p>
//             <p>
//               Position: <strong>{sc?.summary?.position ?? "—"}</strong>
//             </p>
//           </div>

//           <h3 className="font-semibold mb-2">Top Queries</h3>
//           <div className="space-y-2">
//             {(sc?.topQueries ?? []).map((q: any, idx: number) => (
//               <div key={idx} className="p-2 border rounded">
//                 <p className="text-sm font-medium">{q.query}</p>
//                 <p className="text-xs text-gray-500">
//                   Clicks: {q.clicks} • Impr: {q.impressions} • CTR:{" "}
//                   {Math.round(q.ctr * 10000) / 100}%
//                 </p>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>

//       {/* ✏️ Edit Modal */}
//       {editing && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleUpdate}
//             className="bg-white p-6 rounded shadow-lg w-96"
//           >
//             <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

//             {formData.image && (
//               <img
//                 src={formData.image}
//                 alt="Project preview"
//                 className="mb-3 w-full h-40 object-cover rounded border"
//               />
//             )}

//             <input
//               type="text"
//               placeholder="Title"
//               className="border p-2 w-full mb-2 rounded"
//               value={formData.title || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               className="border p-2 w-full mb-2 rounded"
//               value={formData.description || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Type"
//               className="border p-2 w-full mb-2 rounded"
//               value={formData.type || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, type: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Year"
//               className="border p-2 w-full mb-2 rounded"
//               value={formData.year || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, year: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               placeholder="Tech (comma separated)"
//               className="border p-2 w-full mb-4 rounded"
//               value={formData.tech?.join(", ") || ""}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   tech: e.target.value.split(",").map((t) => t.trim()),
//                 })
//               }
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={() => setEditing(null)}
//                 className="px-3 py-1 rounded bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1 rounded bg-blue-600 text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }




// app/dashboard/page.tsx
// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Project {
  _id?: string; // support either _id or id shapes
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  // formData holds editable values; newImageFile stores selected File
  const [formData, setFormData] = useState<
    Partial<Project> & { newImageFile?: File | null }
  >({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        // If API returned { projects: [] } support it, otherwise expect array
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

  // helper to extract canonical id (handles id or _id)
  const getId = (p: Project) => p._id ?? p.id ?? "";

  // ---------- DELETE ----------
  const handleDelete = async (project: Project) => {
    const id = getId(project);
    if (!id) {
      alert("Missing project id");
      return;
    }
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Delete failed response:", res.status, text);
        throw new Error("Delete request failed");
      }
      // remove locally immediately
      setProjects((prev) => prev.filter((p) => getId(p) !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project. Check console for details.");
    }
  };

  // ---------- EDIT (open modal) ----------
  const handleEdit = (project: Project) => {
    setEditing(project);
    // Prefill formData; clear newImageFile
    setFormData({ ...project, newImageFile: undefined });
  };

  // ---------- UPDATE (submit) ----------
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const id = getId(editing);
    if (!id) {
      alert("Missing project id");
      return;
    }

    try {
      const fd = new FormData();
      // append text fields (use empty strings to avoid undefined)
      fd.append("title", formData.title ?? "");
      fd.append("description", formData.description ?? "");
      fd.append("type", formData.type ?? "");
      fd.append("year", formData.year ?? "");
      fd.append("category", formData.category ?? "");
      // tech: send as comma-separated string (backend will split)
      fd.append("tech", (formData.tech ?? []).join(","));

      // If a new image File was selected, append under key "file"
      if (formData.newImageFile instanceof File) {
        fd.append("file", formData.newImageFile);
      } else {
        // If user didn't change image, optionally include current image URL so backend can keep it
        if (formData.image) fd.append("imageUrl", formData.image as string);
      }

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: fd, // DO NOT set Content-Type; browser sets multipart boundary
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Update failed response:", res.status, text);
        throw new Error("Update request failed");
      }

      const updated = await res.json();
      // Normalize updated to include _id for UI comparision (API returns id from Prisma)
      const normalized = {
        ...updated,
        _id: (updated as any).id ?? (updated as any)._id,
      };

      setProjects((prev) =>
        prev.map((p) => (getId(p) === (normalized._id ?? normalized.id) ? normalized : p))
      );

      setEditing(null);
      setFormData({});
      alert("Project updated");
    } catch (err) {
      console.error("Failed to update project:", err);
      alert("Failed to update project. Check console for details.");
    }
  };

  // ---------- helper: preview URL for selected file ----------
  const previewUrl = formData.newImageFile ? URL.createObjectURL(formData.newImageFile) : undefined;

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
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {project.image && (
                <img src={project.image} alt={project.title} className="mb-2 w-full max-w-xs h-40 object-cover rounded" />
              )}

              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-500">{project.type} | {project.year}</p>
              <p className="text-xs text-gray-500">Tech: {Array.isArray(project.tech) ? project.tech.join(", ") : (project as any).techs?.map((t:any)=>t.name).join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

            {/* current image preview */}
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="mb-3 w-full h-40 object-cover rounded" />
            ) : (
              editing.image && <img src={editing.image} alt="Current" className="mb-3 w-full h-40 object-cover rounded" />
            )}

            <label className="block text-sm mb-1">Change image</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mb-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, newImageFile: e.target.files?.[0] ?? null })
              }
            />

            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-2 rounded"
              value={formData.title ?? editing.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2 rounded"
              value={formData.description ?? editing.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <input
              type="text"
              placeholder="Type"
              className="border p-2 w-full mb-2 rounded"
              value={formData.type ?? editing.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />

            <input
              type="text"
              placeholder="Year"
              className="border p-2 w-full mb-2 rounded"
              value={formData.year ?? editing.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />

            <input
              type="text"
              placeholder="Tech (comma separated)"
              className="border p-2 w-full mb-4 rounded"
              value={formData.tech?.join(", ") ?? (editing.tech ? (editing.tech as string[]).join(", ") : "")}
              onChange={(e) =>
                setFormData({ ...formData, tech: e.target.value.split(",").map((t) => t.trim()) })
              }
            />

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => { setEditing(null); setFormData({}); }} className="px-3 py-1 rounded bg-gray-300">Cancel</button>
              <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
