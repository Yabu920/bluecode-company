"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Smartphone, TrendingUp, CheckCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

export default function ServicesPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Our Services",
      subtitle: "Comprehensive digital solutions to transform your business",
      services: [
        {
          icon: Code,
          title: "Website Development",
          description: "We build fast, secure, and mobile-friendly websites tailored for your business needs — from e-commerce to company profiles.",
          features: [
            "Responsive Design",
            "E-commerce Integration",
            "SEO Optimization",
            "Content Management",
            "Payment Gateway Integration",
            "Analytics & Reporting"
          ],

          image: "/webdev.jpg"
        },
        {
          icon: Smartphone,
          title: "App Development",
          description: "Custom Android/iOS apps using modern frameworks like Flutter. Scalable, intuitive, and reliable.",
          features: [
            "Cross-platform Development",
            "Native Performance",
            "Push Notifications",
            "Offline Functionality",
            "Real-time Updates",
            "App Store Optimization"
          ],

          image: "/appdev.jpg"
        },
        {
          icon: TrendingUp,
          title: "Digital Marketing",
          description: "We boost your brand on Facebook and Instagram through targeted ads and engagement strategies.",
          features: [
            "Social Media Management",
            "Targeted Advertising",
            "Content Creation",
            "Analytics & Insights",
            "Brand Strategy",
            "Influencer Partnerships"
          ],

          image: "/digital1.jpg"
        }
      ],
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Let's discuss your project and create something amazing together.",
        button: "Get Free Consultation"
      }
    },
    am: {
      title: "አገልግሎቶቻችን",
      subtitle: "ንግድዎን ለመለወጥ ሁሉንም አቀፍ ዲጂታል መፍትሄዎች",
      services: [
        {
          icon: Code,
          title: "ድረ-ገጽ ልማት",
          description: "ለንግድዎ ፍላጎት የተበጀ ፈጣን፣ ደህንነቱ የተጠበቀ እና ለሞባይል ተስማሚ ድረ-ገጾች እንሰራለን - ከኢ-ኮሜርስ እስከ የኩባንያ መገለጫዎች።",
          features: [
            "ምላሽ ሰጪ ዲዛይን",
            "የኢ-ኮሜርስ ውህደት",
            "የSEO ማሻሻያ",
            "የይዘት አስተዳደር",
            "የክፍያ መግቢያ ውህደት",
            "ትንታኔ እና ሪፖርት"
          ],

          image: "/webdev.jpg"
        },
        {
          icon: Smartphone,
          title: "መተግበሪያ ልማት",
          description: "እንደ Flutter ያሉ ዘመናዊ ማዕቀፎችን በመጠቀም ብጁ አንድሮይድ/iOS መተግበሪያዎች። ሊሰፋ የሚችል፣ ቀላል እና አስተማማኝ።",
          features: [
            "ክሮስ-ፕላትፎርም ልማት",
            "ተወላጅ አፈጻጸም",
            "የግፊት ማሳወቂያዎች",
            "ከመስመር ውጭ ተግባር",
            "የእውነተኛ ጊዜ ዝመናዎች",
            "የመተግበሪያ ሱቅ ማሻሻያ"
          ],

          image: "/appdev.jpg"
        },
        {
          icon: TrendingUp,
          title: "ዲጂታል ማርኬቲንግ",
          description: "በታለመ ማስታወቂያዎች እና የተሳትፎ ስትራቴጂዎች በፌስቡክ እና ኢንስታግራም ላይ የንግድ ምልክትዎን እናሳድጋለን።",
          features: [
            "የማህበራዊ ሚዲያ አስተዳደር",
            "ታለመ ማስታወቂያ",
            "የይዘት ፈጠራ",
            "ትንታኔ እና ግንዛቤዎች",
            "የብራንድ ስትራቴጂ",
            "የተጽዕኖ ፈጣሪ አጋርነት"
          ],

          image: "/digital1.jpg"
        }
      ],
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
          <div

            className="text-center max-w-4xl mx-auto"
          >
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
      {t.services.map((service, index) => (
        <section key={index} id={["web", "app", "marketing"][index]} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div

                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <div className={`w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6`}>
                  <service.icon className="h-8 w-8 text-blue-600" />
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

              <div

                className={index % 2 === 1 ? 'lg:col-start-1' : ''}
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div

            className="max-w-3xl mx-auto"
          >
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
