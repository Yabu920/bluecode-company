"use client"

import { Button } from "@/components/ui/button"
import { Code, Smartphone, TrendingUp, CheckCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { serviceDefinitions } from "@/lib/services"
import { ServiceQuestions } from "./service-questions"
import { useLanguage } from "../contexts/language-context"

const serviceIcons = { web: Code, app: Smartphone, marketing: TrendingUp }

export default function ServicesView() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Website, app, and digital marketing services",
      subtitle: "BlueCode is based in Addis Ababa and works with businesses across Ethiopia.",
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Let's discuss your project and create something amazing together.",
        button: "Get Free Consultation"
      }
    },
    am: {
      title: "የድረ ገጽ፣ የመተግበሪያና የዲጂታል ማርኬቲንግ አገልግሎቶች",
      subtitle: "BlueCode በአዲስ አበባ ይገኛል። በመላ ኢትዮጵያ ከሚገኙ ንግዶች ጋር ይሠራል።",
      cta: {
        title: "ለመጀመር ዝግጁ ነዎት?",
        subtitle: "ስለ ፕሮጀክትዎ እንወያይ እና አብረን አስደናቂ ነገር እንፍጠር።",
        button: "ነፃ ምክክር ያግኙ"
      }
    }
  }

  const t = content[language]

  return (
    <div className="min-h-[65vh]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {serviceDefinitions.map(({ id, image, ...copy }, index) => {
        const service = copy[language]
        const Icon = serviceIcons[id]
        return (
          <section key={id} id={id} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6`}>
                    <Icon aria-hidden="true" className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="lg" className="mt-3 bg-blue-700 hover:bg-blue-800">
                    <Link href="/contact#enquiry">{language === 'en' ? 'Discuss this service' : 'ስለዚህ አገልግሎት ያነጋግሩን'}</Link>
                  </Button>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Image
                    src={image}
                    alt=""
                    width={600}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <ServiceQuestions />

      {/* CTA Section */}
      <section className="py-20 bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.cta.subtitle}
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                {t.cta.button}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
