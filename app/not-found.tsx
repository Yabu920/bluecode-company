import Link from "next/link"

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-slate-600">Check the address or return to the BlueCode homepage.</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-blue-700 underline underline-offset-4">Go to homepage</Link>
    </section>
  )
}
