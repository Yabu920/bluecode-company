import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

const pageSize = 20

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  if (!process.env.AUTH_SECRET || !(await auth())?.user) redirect("/login")
  const requested = Number((await searchParams).page ?? 1)
  const page = Number.isInteger(requested) && requested >= 1 && requested <= 10_000 ? requested : 1
  const records = await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * pageSize,
    take: pageSize + 1,
  }).catch(() => null)

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="mb-5 text-3xl font-bold">Contact messages</h1>
      {!records ? <p role="alert">Messages are temporarily unavailable.</p> : records.length === 0 ? <p>No messages on this page.</p> :
        <ul className="grid gap-4">
          {records.slice(0, pageSize).map((record) => (
            <li key={record.id} className="rounded-xl border bg-white p-5">
              <h2 className="break-words text-lg font-bold">{record.subject || "Website enquiry"}</h2>
              <p className="mt-1 break-words text-sm text-slate-700">{record.name} · {record.email}{record.phone ? ` · ${record.phone}` : ""}</p>
              <time dateTime={record.createdAt.toISOString()} className="text-sm text-slate-600">
                {record.createdAt.toLocaleString("en-ET", { timeZone: "Africa/Addis_Ababa" })} EAT
              </time>
              <p className="mt-3 whitespace-pre-line break-words">{record.message}</p>
            </li>
          ))}
        </ul>}
      {(page > 1 || (records?.length ?? 0) > pageSize) &&
        <nav className="mt-6 flex items-center gap-4" aria-label="Message pages">
          {page > 1 && <Link href={`?page=${page - 1}`} className="text-blue-800 underline">Previous</Link>}
          <span>Page {page}</span>
          {(records?.length ?? 0) > pageSize && <Link href={`?page=${page + 1}`} className="text-blue-800 underline">Next</Link>}
        </nav>}
    </section>
  )
}
