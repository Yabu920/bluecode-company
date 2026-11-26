"use client"

import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

const questions = [
  {
    href: "/contact#enquiry",
    en: {
      question: "What should I include when requesting a website quote?",
      answer: "Tell us about your business, the pages or features you need, the languages you want to support, and your preferred launch date. If you already have a website, include its address and what you would like to improve.",
      link: "Request a quote",
    },
    am: {
      question: "የድረ ገጽ ዋጋ ስጠይቅ ምን መረጃ ልስጥ?",
      answer: "ስለ ንግድዎ፣ ስለሚፈልጓቸው ገጾች ወይም ተግባራት፣ ስለ ቋንቋ ምርጫዎ እና ለማስጀመር ስላሰቡበት ቀን ይንገሩን። ድረ ገጽ ካለዎት አድራሻውንና ማሻሻል የሚፈልጉትን ያካትቱ።",
      link: "የዋጋ ግምት ይጠይቁ",
    },
  },
  {
    href: "/portfolio/konjo-buna-coffee-export",
    en: {
      question: "Can BlueCode build a website in both Amharic and English?",
      answer: "Yes. BlueCode builds bilingual websites for Ethiopian businesses. The Konjo Buna Coffee Export website is one example of how we present product information and enquiry options in both languages.",
      link: "See the Konjo Buna project",
    },
    am: {
      question: "BlueCode በአማርኛና በእንግሊዝኛ ድረ ገጽ ይሠራል?",
      answer: "አዎ። BlueCode ለኢትዮጵያ ንግዶች ባለሁለት ቋንቋ ድረ ገጾችን ይሠራል። የኮንጆ ቡና ድረ ገጽ የምርት መረጃና መጠየቂያ መንገዶችን በሁለቱም ቋንቋዎች ያቀርባል።",
      link: "የኮንጆ ቡናን ፕሮጀክት ይመልከቱ",
    },
  },
  {
    href: "/portfolio/omega-sportswear-garment",
    en: {
      question: "Can customers request a quote from an online product catalogue?",
      answer: "Yes. A catalogue can show product categories and photos and direct buyers to an enquiry page. The Omega Sportswear Garment project gives schools, teams, and organizations a way to browse products and contact the manufacturer.",
      link: "See the Omega Sportswear project",
    },
    am: {
      question: "ደንበኞች ከድረ ገጽ የምርት ማሳያ በቀጥታ ዋጋ መጠየቅ ይችላሉ?",
      answer: "አዎ። የምርት ማሳያው የምርት ምድቦችና ፎቶዎችን አሳይቶ ገዢዎችን ወደ መጠየቂያ ገጽ ሊወስድ ይችላል። የኦሜጋ ድረ ገጽ ትምህርት ቤቶች፣ ቡድኖችና ድርጅቶች ምርቶቹን አይተው አምራቹን እንዲያገኙ ይረዳል።",
      link: "የኦሜጋ ፕሮጀክትን ይመልከቱ",
    },
  },
]

export function ServiceQuestions() {
  const { language } = useLanguage()

  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:py-20" aria-labelledby="service-questions">
      <div className="mx-auto max-w-3xl">
        <h2 id="service-questions" className="mb-7 text-3xl font-bold text-slate-950">
          {language === "en" ? "Questions about your project" : "ስለ ፕሮጀክትዎ የሚነሱ ጥያቄዎች"}
        </h2>
        <ul className="divide-y divide-slate-200">
          {questions.map(({ href, ...copy }) => {
            const { question, answer, link } = copy[language]
            return (
              <li key={href} className="py-5">
                <h3 className="text-lg font-bold text-slate-950">{question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{answer}</p>
                <Link href={href} className="mt-2 inline-block py-2 font-semibold text-blue-800 underline underline-offset-4">
                  {link}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
