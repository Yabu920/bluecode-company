"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { contactEmail, contactPhone, contactPhoneLabel, telegramHandle } from "@/lib/contact-details"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react'
import { useLanguage } from "../contexts/language-context"

export default function ContactPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Let's build your digital solution today",
      headerText: "Need a website, app, or social media growth? We're here for you.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "Enter your email address",
        phonePlaceholder: "Enter your phone number",
        subjectPlaceholder: "What's this about?",
        messagePlaceholder: "Tell us about your project or question..."
      },
      contact: {
        title: "Get in Touch",

        address: "Addis Ababa, Ethiopia",
        hours: "Mon - Fri: 9:00 AM - 6:00 PM"
      },
      services: {
        title: "Our Services",
        web: "Website Development",
        app: "Mobile App Development",
        marketing: "Digital Marketing",
        consultation: "Free Consultation"
      }
    },
    am: {
      title: "ያግኙን",
      subtitle: "ዛሬ የዲጂታል መፍትሄዎን እንገንባ",
      headerText: "ድረ-ገጽ፣ መተግበሪያ ወይም የማህበራዊ ሚዲያ እድገት ይፈልጋሉ? እኛ እዚህ ለእርስዎ ነን።",
      form: {
        name: "ሙሉ ስም",
        email: "የኢሜል አድራሻ",
        phone: "የስልክ ቁጥር",
        subject: "ርዕስ",
        message: "መልእክትዎ",
        send: "መልእክት ይላኩ",
        namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
        emailPlaceholder: "የኢሜል አድራሻዎን ያስገቡ",
        phonePlaceholder: "የስልክ ቁጥርዎን ያስገቡ",
        subjectPlaceholder: "ይህ ስለ ምን ነው?",
        messagePlaceholder: "ስለ ፕሮጀክትዎ ወይም ጥያቄዎ ይንገሩን..."
      },
      contact: {
        title: "ያግኙን",

        address: "አዲስ አበባ፣ ኢትዮጵያ",
        hours: "ሰኞ - አርብ: 9:00 ጠዋት - 6:00 ምሽት"
      },
      services: {
        title: "አገልግሎቶቻችን",
        web: "ድረ-ገጽ ልማት",
        app: "ሞባይል መተግበሪያ ልማት",
        marketing: "ዲጂታል ማርኬቲንግ",
        consultation: "ነፃ ምክክር"
      }
    }
  }

  const t = content[language]
  const en = language === "en"
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "limited">("idle")
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    submitting.current = true
    setStatus("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      if (response.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus(response.status === 429 ? "limited" : "error")
      }
    } catch {
      setStatus("error")
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className="min-h-[65vh]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div

            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600">
              {t.headerText}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div

            >
              <Card>
                <CardContent className="p-5 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'en' ? 'Send us a Message' : 'መልእክት ይላኩልን'}
                  </h2>
                  <form id="enquiry" className="space-y-5" onSubmit={submit}>
                    <div hidden aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" autoComplete="off" tabIndex={-1} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">{t.form.name}
                        </label>
                        <Input id="contact-name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={t.form.namePlaceholder} />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">{t.form.phone}
                        </label>
                        <Input id="contact-phone" name="phone" type="tel" maxLength={50} autoComplete="tel" placeholder={t.form.phonePlaceholder} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">{t.form.email}
                      </label>
                      <Input id="contact-email" name="email" type="email" required maxLength={191} autoComplete="email" placeholder={t.form.emailPlaceholder} />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">{t.form.subject}
                      </label>
                      <Input id="contact-subject" name="subject" maxLength={160} placeholder={t.form.subjectPlaceholder} />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">{t.form.message}
                      </label>
                      <Textarea id="contact-message" name="message" required minLength={10} maxLength={4000}
                        rows={6}
                        placeholder={t.form.messagePlaceholder}
                      />
                    </div>
                    <Button size="lg" type="submit" disabled={status === "sending"} className="w-full bg-blue-700 hover:bg-blue-800">
                      <Send aria-hidden="true" className="h-5 w-5 mr-2" />
                      {status === "sending" ? (en ? "Sending…" : "በመላክ ላይ…") : t.form.send}
                    </Button>
                    <div aria-live="polite" className={status === "sent" ? "text-green-800" : "text-red-700"}>
                      {status === "sent" && (en ? "We received your message." : "መልእክትዎ ደርሶናል።")}
                      {status === "limited" && (en ? "Too many requests. Please try again in 15 minutes." : "ብዙ ሙከራዎች ነበሩ። ከ15 ደቂቃ በኋላ ይሞክሩ።")}
                      {status === "error" && (en ? "We couldn’t send your message. Try again or contact us by phone or email." : "መልእክትዎ አልተላከም። ደግመው ይሞክሩ ወይም በስልክ ወይም በኢሜል ያግኙን።")}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div

              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.contact.title}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'en' ? 'Phone' : 'ስልክ'}
                      </p>
                      <a className="text-blue-800 underline underline-offset-4" href={`tel:${contactPhone}`}>{contactPhoneLabel}</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'en' ? 'Email' : 'ኢሜል'}
                      </p>
                      <a className="break-all text-blue-800 underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telegram</p>
                      <a className="text-blue-800 underline underline-offset-4" href={`https://t.me/${telegramHandle}`}>@{telegramHandle}</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'en' ? 'Location' : 'አድራሻ'}
                      </p>
                      <p className="text-gray-600">{t.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'en' ? 'Business Hours' : 'የስራ ሰዓት'}
                      </p>
                      <p className="text-gray-600">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/services" className="inline-block font-semibold text-blue-800 underline underline-offset-4">
                {t.services.title}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
