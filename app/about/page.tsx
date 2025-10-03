"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Award, Users, Heart } from 'lucide-react'
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "About BlueCode",
      subtitle: "Building Digital Ethiopia, One Code at a Time",
      aboutText: "BlueCode is a team of passionate Ethiopian software engineers and digital experts. We believe every business — from local shops to large companies — deserves a strong digital presence. Our mission is to bring high-quality, affordable tech solutions to Ethiopian businesses.",
      vision: "A fully digital Ethiopia where businesses thrive using modern technology.",
      valuesTitle: "Our Core Values",
      values: [
        {
          icon: Lightbulb,
          title: "Innovation",
          description: "We embrace cutting-edge technologies and creative solutions to solve complex problems."
        },
        {
          icon: Award,
          title: "Quality Service",
          description: "We deliver exceptional results that exceed our clients' expectations every time."
        },
        {
          icon: Users,
          title: "Simplicity",
          description: "We believe in making technology accessible and easy to understand for everyone."
        },
        {
          icon: Heart,
          title: "Trust & Honesty",
          description: "We build lasting relationships through transparency, integrity, and reliable service."
        }
      ],
      teamTitle: "Meet Our Team",
      teamSubtitle: "Passionate professionals dedicated to your success"
    },
    am: {
      title: "ስለ ብሉኮድ",
      subtitle: "ዲጂታል ኢትዮጵያን እየገነባን፣ በአንድ ኮድ በአንድ ጊዜ",
      aboutText: "ብሉኮድ የተሞላ የኢትዮጵያ ሶፍትዌር ኢንጂነሮች እና ዲጂታል ባለሙያዎች ቡድን ነው። እያንዳንዱ ንግድ - ከአካባቢያዊ ሱቆች እስከ ትላልቅ ኩባንያዎች - ጠንካራ ዲጂታል መገኘት ይገባዋል ብለን እናምናለን። የእኛ ተልእኮ ለኢትዮጵያ ንግዶች ከፍተኛ ጥራት ያላቸውን፣ ተመጣጣኝ የቴክ መፍትሄዎችን ማምጣት ነው።",
      vision: "ንግዶች ዘመናዊ ቴክኖሎጂን በመጠቀም የሚበለጽጉበት ሙሉ በሙሉ ዲጂታል ኢትዮጵያ።",
      valuesTitle: "የእኛ ዋና እሴቶች",
      values: [
        {
          icon: Lightbulb,
          title: "ፈጠራ",
          description: "ውስብስብ ችግሮችን ለመፍታት ዘመናዊ ቴክኖሎጂዎችን እና ፈጠራ መፍትሄዎችን እንቀበላለን።"
        },
        {
          icon: Award,
          title: "ጥራት ያለው አገልግሎት",
          description: "በእያንዳንዱ ጊዜ የደንበኞቻችንን ተስፋ የሚበልጡ ልዩ ውጤቶችን እናቀርባለን።"
        },
        {
          icon: Users,
          title: "ቀላልነት",
          description: "ቴክኖሎጂን ለሁሉም ሰው ተደራሽ እና ለመረዳት ቀላል ማድረግ እንደሚቻል እናምናለን።"
        },
        {
          icon: Heart,
          title: "እምነት እና ታማኝነት",
          description: "በግልጽነት፣ በታማኝነት እና በአስተማማኝ አገልግሎት ዘላቂ ግንኙነቶችን እንገነባለን።"
        }
      ],
      teamTitle: "ቡድናችንን ያግኙ",
      teamSubtitle: "ለእርስዎ ስኬት የተወሰኑ ተሞላ ባለሙያዎች"
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
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.aboutText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              {language === 'en' ? 'Our Vision' : 'የእኛ ራዕይ'}
            </h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <p className="text-xl text-gray-700 italic">
                "{t.vision}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.valuesTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.teamTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.teamSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Yeabsra Abera",
                role: language === 'en' ? "Founder and Developer" : "ዋና ገንቢ",
                image: "/yabu.jpg"
              },
              {
                name: "samuel Tesfaye",
                role: language === 'en' ? "CEO and Developer" : "UI/UX ዲዛይነር",
                image: "/sami.jpg"
              },
              {
                name: "Anteneh Tesfaye",
                role: language === 'en' ? " Digital Marketing Manager " : "ዲጂታል ማርኬቲንግ",
                image: "/ante.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
