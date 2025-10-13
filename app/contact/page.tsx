"use client"

import { motion } from "framer-motion"
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
        phone: "+251 912464134",
        email: "bluecode963@gmail.com",
        telegram: "@bluecode0",
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
        phone: "+251 912464134",
        email: "bluecode963@gmail.com",
        telegram: "@bluecode0",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'en' ? 'Send us a Message' : 'መልእክት ይላኩልን'}
                  </h2>
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault()
                    const formEl = e.currentTarget as HTMLFormElement
                    const fd = new FormData(formEl)
                    const payload: any = {
                      name: fd.get('name'),
                      phone: fd.get('phone'),
                      email: fd.get('email'),
                      subject: fd.get('subject'),
                      message: fd.get('message')
                    }
                    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                    if (res.ok) alert('✅ Message sent!')
                    else alert('❌ Failed to send message')
                    formEl.reset()
                  }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.name}
                        </label>
                        <Input name="name" placeholder={t.form.namePlaceholder} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.phone}
                        </label>
                        <Input name="phone" placeholder={t.form.phonePlaceholder} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.email}
                      </label>
                      <Input name="email" type="email" placeholder={t.form.emailPlaceholder} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.subject}
                      </label>
                      <Input name="subject" placeholder={t.form.subjectPlaceholder} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.message}
                      </label>
                      <Textarea name="message" 
                        rows={6} 
                        placeholder={t.form.messagePlaceholder}
                      />
                    </div>
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-5 w-5 mr-2" />
                      {t.form.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
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
                      <p className="text-gray-600">{t.contact.phone}</p>
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
                      <p className="text-gray-600">{t.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telegram</p>
                      <p className="text-gray-600">{t.contact.telegram}</p>
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

              {/* Services Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t.services.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{t.services.web}</span>
                      <Button size="sm" variant="ghost">
                        {language === 'en' ? 'Learn More' : 'ተጨማሪ'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{t.services.app}</span>
                      <Button size="sm" variant="ghost">
                        {language === 'en' ? 'Learn More' : 'ተጨማሪ'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{t.services.marketing}</span>
                      <Button size="sm" variant="ghost">
                        {language === 'en' ? 'Learn More' : 'ተጨማሪ'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-700 font-medium">{t.services.consultation}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {language === 'en' ? 'Book Now' : 'አሁን ይያዙ'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {language === 'en' ? 'Find Us' : 'እኛን ያግኙ'}
            </h2>

            {/* Google Maps iframe */}
            <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
              <iframe
                title="BlueCode Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.123456!2d38.736!3d9.034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8b6c123456%3A0xabcdef123456!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1697100000000!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
