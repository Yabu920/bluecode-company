"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = 'en' | 'am'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: typeof translations
}

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact"
    },
    hero: {
      tagline: "Building Digital Ethiopia, One Code at a Time",
      subtext: "BlueCode is a technology solutions company helping businesses grow through professional websites, mobile apps, and smart digital marketing strategies.",
      cta1: "Get a Free Quote",
      cta2: "View Portfolio"
    },
    services: {
      title: "Our Services",
      subtitle: "We provide comprehensive digital solutions to help your business thrive in the modern world.",
      web: {
        title: "Web Development",
        description: "Fast, secure, and mobile-friendly websites tailored for your business needs."
      },
      app: {
        title: "App Development",
        description: "Custom Android/iOS apps using modern frameworks. Scalable, intuitive, and reliable."
      },
      marketing: {
        title: "Digital Marketing",
        description: "Boost your brand on social media through targeted ads and engagement strategies."
      }
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it - hear from our satisfied clients.",
      items: [
        {
          name: "Yiknubh Hailemichael",
          company: "24 Coding School",
          text: "BlueCode transformed our business with a beautiful School-Management-System. Client increased by 300% in just 3 months!"
        },
        {
          name: "Sara Mohammed",
          company: "Lole Orthodox Love chat",
          text: "The mobile app they built for us is exactly what we needed. Professional, fast, and our customers love it."
        },
        {
          name: "Ayalew Ahmed",
          company: "Export Company PLC",
          text: "Their digital marketing strategy helped us reach thousands of new customers. Highly recommended!"
        }
      ]
    },
    blog: {
      title: "Latest Insights",
      subtitle: "Stay updated with the latest trends in technology and digital marketing.",
      posts: [
        {
          title: "Why Every Ethiopian Business Needs a Website in 2025",
          excerpt: "In Ethiopia, going digital isn't optional anymore. Discover how a website can build trust and attract customers.",
          category: "Strategy",
          date: "Jan 15, 2025",
          image: "/webneed.jpg"
        },
        {
          title: "Mobile App Development Trends in Africa",
          excerpt: "Explore the latest mobile app development trends that are shaping the African tech landscape.",
          category: "Tech Tips",
          date: "Jan 10, 2025",
          image: "/apps.jpg"
        },
        {
          title: "Social Media Marketing for Ethiopian Businesses",
          excerpt: "Learn effective social media strategies tailored specifically for the Ethiopian market.",
          category: "Marketing",
          date: "Jan 5, 2025",
          image: "/marketing.jpg"
        }
      ]
    },
    cta: {
      title: "Ready to Transform Your Business?",
      subtitle: "Let's build your digital solution today and take your business to the next level.",
      button1: "Start Your Project",
      button2: "Schedule a Call"
    },
    footer: {
      description: "Building Digital Ethiopia, One Code at a Time",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact Info",
      rights: "All rights reserved."
    }
  },
  am: {
    nav: {
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      portfolio: "ስራዎች",
      blog: "ብሎግ",
      contact: "ያግኙን"
    },
    hero: {
      tagline: "ዲጂታል ኢትዮጵያን እየገነባን፣ በአንድ ኮድ በአንድ ጊዜ",
      subtext: "ብሉኮድ የቴክኖሎጂ መፍትሄዎች ኩባንያ ሲሆን ንግዶች በሙያዊ ድረ-ገጾች፣ ሞባይል መተግበሪያዎች እና ዘመናዊ ዲጂታል ማርኬቲንግ ስትራቴጂዎች እንዲያድጉ ይረዳል።",
      cta1: "ነፃ ዋጋ ይጠይቁ",
      cta2: "ስራዎችን ይመልከቱ"
    },
    services: {
      title: "አገልግሎቶቻችን",
      subtitle: "በዘመናዊው ዓለም ንግድዎ እንዲበለጽግ ለመርዳት ሁሉንም አቀፍ ዲጂታል መፍትሄዎችን እንሰጣለን።",
      web: {
        title: "ድረ-ገጽ ልማት",
        description: "ለንግድዎ ፍላጎት የተበጀ ፈጣን፣ ደህንነቱ የተጠበቀ እና ለሞባይል ተስማሚ ድረ-ገጾች።"
      },
      app: {
        title: "መተግበሪያ ልማት",
        description: "ዘመናዊ ማዕቀፎችን በመጠቀም ብጁ አንድሮይድ/iOS መተግበሪያዎች። ሊሰፋ የሚችል፣ ቀላል እና አስተማማኝ።"
      },
      marketing: {
        title: "ዲጂታል ማርኬቲንግ",
        description: "በታለመ ማስታወቂያዎች እና የተሳትፎ ስትራቴጂዎች በማህበራዊ ሚዲያ ላይ የንግድ ምልክትዎን ያሳድጉ።"
      }
    },
    testimonials: {
      title: "ደንበኞቻችን ምን ይላሉ",
      subtitle: "የእኛን ቃል ብቻ አይውሰዱ - ከረክተኛ ደንበኞቻችን ይስሙ።",
      items: [
        {
          name: "አለማየሁ ታደሰ",
          company: "አዲስ ፋሽን",
          text: "ብሉኮድ ንግዳችንን በሚያምር የኢ-ኮሜርስ ድረ-ገጽ ለወጠው። ሽያጭ በ3 ወር ውስጥ በ300% ጨምሯል!"
        },
        {
          name: "ሳራ መሐመድ",
          company: "የኛ ዴሊቨሪ",
          text: "ለእኛ የሠሩት ሞባይል መተግበሪያ በትክክል የምንፈልገው ነው። ሙያዊ፣ ፈጣን እና ደንበኞቻችን ይወዱታል።"
        },
        {
          name: "ዳንኤል በቀለ",
          company: "ቦሌ ሬስቶራንት",
          text: "የዲጂታል ማርኬቲንግ ስትራቴጂያቸው በሺዎች የሚቆጠሩ አዳዲስ ደንበኞችን እንድንደርስ ረድቶናል። በጣም ይመከራል!"
        }
      ]
    },
    blog: {
      title: "የቅርብ ጊዜ ግንዛቤዎች",
      subtitle: "በቴክኖሎጂ እና ዲጂታል ማርኬቲንግ ውስጥ ካሉት የቅርብ ጊዜ አዝማሚያዎች ጋር ተዘምኑ።",
      posts: [
        {
          title: "ለምን እያንዳንዱ የኢትዮጵያ ንግድ በ2025 ድረ-ገጽ ያስፈልገዋል",
          excerpt: "በኢትዮጵያ ዲጂታል መሄድ አማራጭ አይደለም። ድረ-ገጽ እንዴት እምነት እንደሚገነባ እና ደንበኞችን እንደሚስብ ይወቁ።",
          category: "ስትራቴጂ",
          date: "ጃንዋሪ 15, 2025",
          image: "/marketing.jpg"
          
        },
        {
          title: "በአፍሪካ የሞባይል መተግበሪያ ልማት አዝማሚያዎች",
          excerpt: "የአፍሪካን የቴክኖሎጂ መልክዓ ምድር የሚቀርጹትን የቅርብ ጊዜ የሞባይል መተግበሪያ ልማት አዝማሚያዎችን ያስሱ።",
          category: "የቴክ ምክሮች",
          date: "ጃንዋሪ 10, 2025",
          image: "/apps.jpg"
        },
        {
          title: "ለኢትዮጵያ ንግዶች የማህበራዊ ሚዲያ ማርኬቲንግ",
          excerpt: "በተለይ ለኢትዮጵያ ገበያ የተበጁ ውጤታማ የማህበራዊ ሚዲያ ስትራቴጂዎችን ይማሩ።",
          category: "ማርኬቲንግ",
          date: "ጃንዋሪ 5, 2025",
          image: "/marketing.jpg"
        }
      ]
    },
    cta: {
      title: "ንግድዎን ለመለወጥ ዝግጁ ነዎት?",
      subtitle: "ዛሬ የዲጂታል መፍትሄዎን እንገንባ እና ንግድዎን ወደ ቀጣይ ደረጃ እንውሰድ።",
      button1: "ፕሮጀክትዎን ይጀምሩ",
      button2: "ጥሪ ያስይዙ"
    },
    footer: {
      description: "ዲጂታል ኢትዮጵያን እየገነባን፣ በአንድ ኮድ በአንድ ጊዜ",
      quickLinks: "ፈጣን አገናኞች",
      services: "አገልግሎቶች",
      contact: "የመገናኛ መረጃ",
      rights: "ሁሉም መብቶች የተጠበቁ ናቸው።"
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem("bluecode-language")
    if (saved === "am" || saved === "en") updateLanguage(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function setLanguage(nextLanguage: Language) {
    updateLanguage(nextLanguage)
    localStorage.setItem("bluecode-language", nextLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
