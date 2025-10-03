// app/components/footer.tsx
"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from "../contexts/language-context"

export function Footer() {
  const { language, translations } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-blue-400">Blue</span>Code
            </div>
            <p className="text-gray-300">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white">
                {t.nav.about}
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white">
                {t.nav.services}
              </Link>
              <Link href="/portfolio" className="block text-gray-300 hover:text-white">
                {t.nav.portfolio}
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white">
                {t.nav.blog}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.services}</h3>
            <div className="space-y-2">
              <p className="text-gray-300">{t.services.web.title}</p>
              <p className="text-gray-300">{t.services.app.title}</p>
              <p className="text-gray-300">{t.services.marketing.title}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+251 912464134</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">bluecode.et@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Yeabsra Abera {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
