"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export function Navigation() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const open = openPath === pathname
  const { language, setLanguage, translations } = useLanguage()
  const t = translations[language]
  const en = language === "en"
  const navItems = [
    ["/", t.nav.home], ["/about", t.nav.about], ["/services", t.nav.services],
    ["/portfolio", t.nav.portfolio], ["/blog", t.nav.blog], ["/contact", t.nav.contact],
  ]

  const links = navItems.map(([href, label]) => (
    <li key={href}>
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 aria-[current=page]:bg-blue-50 aria-[current=page]:text-blue-800"
        onClick={() => setOpenPath(null)}
      >
        {label}
      </Link>
    </li>
  ))

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:p-3">
        {en ? "Skip to content" : "ወደ ዋናው ይዘት ይሂዱ"}
      </a>
      <nav aria-label={en ? "Main navigation" : "ዋና ማውጫ"} onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpenPath(null)
          menuButton.current?.focus()
        }
      }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded text-lg font-bold tracking-tight text-slate-950 sm:text-xl" onClick={() => setOpenPath(null)}>
            <Image src="/bluecode-mark.webp" alt="" width={34} height={34} unoptimized className="h-[34px] w-[34px] object-contain" />
            <span lang="en">BlueCode</span>
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">{links}</ul>
          <div className="flex items-center gap-1">
            <div role="group" aria-label={en ? "Language" : "ቋንቋ"} className="flex items-center rounded-lg border border-slate-200 p-0.5">
              <button type="button" lang="en" aria-label="EN English" aria-pressed={en} onClick={() => setLanguage("en")} className="min-h-10 rounded-md px-2.5 text-sm font-semibold aria-pressed:bg-slate-900 aria-pressed:text-white">EN</button>
              <button type="button" lang="am" aria-label="አማ አማርኛ" aria-pressed={!en} onClick={() => setLanguage("am")} className="min-h-10 rounded-md px-2.5 text-sm font-semibold aria-pressed:bg-slate-900 aria-pressed:text-white">አማ</button>
            </div>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={en ? "Toggle menu" : "ማውጫ ይክፈቱ ወይም ይዝጉ"}
              onClick={() => setOpenPath(open ? null : pathname)}
              className="grid h-11 w-11 place-items-center rounded-lg text-slate-900 hover:bg-blue-50 lg:hidden"
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        <ul id="mobile-navigation" hidden={!open} className="max-h-[70vh] overflow-auto border-t border-slate-100 p-3 lg:hidden">
          {links}
        </ul>
      </nav>
    </header>
  )
}
