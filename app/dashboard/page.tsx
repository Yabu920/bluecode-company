"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  type: string;
  tech: string[];
  description: string;
  category: string;
  year: string;
  image: string | null;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ga4, setGa4] = useState<any | null>(null);
  const [sc, setSc] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [projectsRes, ga4Res, scRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/dashboard/ga4'),
        fetch('/api/dashboard/search-console')
      ])

      const [projectsData, ga4Data, scData] = await Promise.all([
        projectsRes.json(),
        ga4Res.json(),
        scRes.json()
      ])

      setProjects(projectsData || [])
      setGa4(ga4Data)
      setSc(scData)
      setLoading(false)
    }

    load()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Users</h3>
            <p className="text-2xl">{ga4?.summary?.users ?? '—'}</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Sessions</h3>
            <p className="text-2xl">{ga4?.summary?.sessions ?? '—'}</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-2xl">${ga4?.summary?.revenue ?? '—'}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Projects</h2>
          {projects.length === 0 ? (
            <p>No projects yet. Go to Add Project to start.</p>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project._id} className="p-4 border rounded">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-xs text-gray-500">{project.type} | {project.year}</p>
                  <p className="text-xs text-gray-500">Tech: {project.tech.join(', ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside>
          <h2 className="text-xl font-semibold mb-3">Search Console</h2>
          <div className="p-4 border rounded mb-4">
            <p>Clicks: <strong>{sc?.summary?.clicks ?? '—'}</strong></p>
            <p>Impressions: <strong>{sc?.summary?.impressions ?? '—'}</strong></p>
            <p>CTR: <strong>{Math.round((sc?.summary?.ctr ?? 0) * 10000) / 100}%</strong></p>
            <p>Position: <strong>{sc?.summary?.position ?? '—'}</strong></p>
          </div>

          <h3 className="font-semibold mb-2">Top Queries</h3>
          <div className="space-y-2">
            {(sc?.topQueries ?? []).map((q: any, idx: number) => (
              <div key={idx} className="p-2 border rounded">
                <p className="text-sm font-medium">{q.query}</p>
                <p className="text-xs text-gray-500">Clicks: {q.clicks} • Impr: {q.impressions} • CTR: {Math.round(q.ctr * 10000) / 100}%</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
