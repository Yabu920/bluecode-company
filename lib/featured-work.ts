type ProjectText = {
  summary: string
  purpose: string
  features: readonly string[]
}

type FeaturedProject = {
  slug: string
  name: string
  website?: string
  en: ProjectText
  am: ProjectText
}

export const featuredWork: readonly FeaturedProject[] = [
  {
    slug: "konjo-buna-coffee-export",
    name: "Konjo Buna Coffee Export",
    website: "https://konjobuna.com",
    en: {
      summary: "A bilingual export website for buyers sourcing Ethiopian coffee.",
      purpose: "Help coffee buyers understand the available origins and processing methods, ask for a sample, or start a bulk export enquiry.",
      features: [
        "English and Amharic content",
        "Coffee origin and processing information",
        "Separate paths for sample requests and bulk enquiries",
      ],
    },
    am: {
      summary: "ለኢትዮጵያ ቡና ገዢዎች የተዘጋጀ ባለሁለት ቋንቋ ድረ ገጽ።",
      purpose: "የቡና ገዢዎች የቡና ምንጮችንና የአዘገጃጀት ዘዴዎችን እንዲያውቁ፣ ናሙና እንዲጠይቁ ወይም የጅምላ ግዢ ጥያቄ እንዲያቀርቡ ማገዝ።",
      features: [
        "የእንግሊዝኛና የአማርኛ ይዘት",
        "የቡና ምንጭና የአዘገጃጀት መረጃ",
        "ለናሙናና ለጅምላ ግዢ የተለያዩ መጠየቂያ መንገዶች",
      ],
    },
  },
  {
    slug: "omega-sportswear-garment",
    name: "Omega Sportswear Garment",
    website: "https://omegagarment.com.et",
    en: {
      summary: "A product showcase for an Ethiopian sportswear manufacturer.",
      purpose: "Give teams, schools, and organizations a way to browse sportswear and reach the manufacturer about orders and customization.",
      features: [
        "Product showcase for uniforms, T-shirts, and tracksuits",
        "Gallery and company information",
        "Contact page for product and order enquiries",
      ],
    },
    am: {
      summary: "የኢትዮጵያ የስፖርት ልብስ አምራች የምርት ማሳያ ድረ ገጽ።",
      purpose: "ቡድኖች፣ ትምህርት ቤቶችና ድርጅቶች የስፖርት ልብሶችን እንዲያዩና ለትዕዛዝ ወይም ለብጁ ዲዛይን አምራቹን እንዲያገኙ ማስቻል።",
      features: [
        "የዩኒፎርም፣ የቲሸርትና የትራክ ሱት ማሳያ",
        "የፎቶ ማዕከልና የኩባንያው መረጃ",
        "ለምርትና ለትዕዛዝ ጥያቄዎች የመገኛ ገጽ",
      ],
    },
  },
  {
    slug: "24-technology-school",
    name: "24 Technology School",
    en: {
      summary: "A school management system built for day-to-day administration.",
      purpose: "Provide the school team with software for managing routine administrative work.",
      features: [
        "Custom software for school administration",
        "Designed for the school’s internal workflow",
      ],
    },
    am: {
      summary: "የትምህርት ቤቱን ዕለታዊ አስተዳደር የሚያግዝ ሥርዓት።",
      purpose: "የትምህርት ቤቱ ቡድን የዕለት ተዕለት አስተዳደራዊ ሥራዎቹን በሶፍትዌር እንዲያስተዳድር ማስቻል።",
      features: [
        "ለትምህርት ቤት አስተዳደር የተበጀ ሶፍትዌር",
        "ለትምህርት ቤቱ የውስጥ የሥራ ሂደት የተዘጋጀ ሥርዓት",
      ],
    },
  },
]

export type { FeaturedProject }
