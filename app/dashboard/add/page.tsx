
//app/dashboard/add/page.tsx
"use client";
import { useState } from "react";

export default function AddProjectPage() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    tech: [] as string[],
    description: "",
    image: null as File | null,
    category: "",
    year: "",
  });

  const techOptions = ["Next.js", "React", "TailwindCSS", "TypeScript", "Flutter", "Firebase", "Google Maps API", "MongoDB"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setForm({ ...form, image: e.target.files[0] });
  };

  const handleTechChange = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      tech: prev.tech.includes(tech) ? prev.tech.filter((t) => t !== tech) : [...prev.tech, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagePath: string | null = null;
    if (form.image) {
      const fd = new FormData();
      fd.append("file", form.image);
      const up = await fetch("/api/uploads", { method: "POST", body: fd });
      if (up.ok) {
        const jd = await up.json();
        imagePath = jd.url;
      }
    }

    const projectData = {
      title: form.title,
      type: form.type,
      description: form.description,
      category: form.category,
      year: form.year,
      tech: form.tech,
      image: imagePath,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      alert("✅ Project added!");
      setForm({ title: "", type: "", tech: [], description: "", image: null, category: "", year: "" });
    } else alert("❌ Failed to add project");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="p-2 border rounded-md" required />
        <input type="text" placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded-md" required />
        
        <div>
          <p className="mb-2 font-semibold">Technologies Used:</p>
          <div className="grid grid-cols-2 gap-2">
            {techOptions.map((tech) => (
              <label key={tech} className="flex items-center gap-2">
                <input type="checkbox" checked={form.tech.includes(tech)} onChange={() => handleTechChange(tech)} />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded-md" rows={4} required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 border rounded-md" />
        <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="p-2 border rounded-md">
          <option value="">Select Year</option>
          {Array.from({ length: 6 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
        <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded-md" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add Project</button>
      </form>
    </div>
  );
}
