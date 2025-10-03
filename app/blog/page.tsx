"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"
import { useEffect, useState } from "react"

export default function BlogPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Our Blog",
      subtitle: "Latest insights on technology, business, and digital transformation",
      categories: ["All", "Strategy", "Design", "Marketing", "News"],
      posts: [
        {
          title: "Why Every Ethiopian Business Needs a Website in 2025",
          excerpt: "In Ethiopia, going digital isn't optional anymore. Discover how a simple, well-designed website can build trust, attract customers, and future-proof your business.",
          category: "Strategy",
          date: "January 15, 2025",
          author: "Dawit Mekonnen",
          image: "/webneed.jpg",
          readTime: "5 min read"
        },
        {
          title: "Mobile App Development Trends in Africa",
          excerpt: "Explore the latest mobile app development trends that are shaping the African tech landscape and how Ethiopian businesses can leverage them.",
          category: "Tech Tips",
          date: "January 10, 2025",
          author: "Hanan Ahmed",
          image: "/apps.jpg",
          readTime: "7 min read"
        },
        {
          title: "Social Media Marketing for Ethiopian Businesses",
          excerpt: "Learn effective social media strategies tailored specifically for the Ethiopian market. From Facebook to Instagram, discover what works.",
          category: "Marketing",
          date: "January 5, 2025",
          author: "Yonas Tadesse",
          image: "/marketing.jpg",
          readTime: "6 min read"
        },
        {
          title: "The Rise of E-commerce in Ethiopia",
          excerpt: "E-commerce is booming in Ethiopia. Learn how to set up your online store and tap into this growing market opportunity.",
          category: "Strategy",
          date: "December 28, 2024",
          author: "Dawit Mekonnen",
          image: "/rise.jpeg",
          readTime: "8 min read"
        },
        {
          title: "UI/UX Design Principles for Ethiopian Users",
          excerpt: "Understanding local user behavior and preferences is crucial for successful digital products. Here's what you need to know.",
          category: "Design",
          date: "December 20, 2024",
          author: "Hanan Ahmed",
          image: "/ui.jpg",
          readTime: "4 min read"
        },
        {
          title: "Digital Payment Solutions in Ethiopia",
          excerpt: "From mobile money to online banking, explore the digital payment landscape in Ethiopia and how to integrate these solutions.",
          category: "Tech Tips",
          date: "December 15, 2024",
          author: "Yonas Tadesse",
          image: "/payment.jpeg",
          readTime: "6 min read"
        }
      ],
      readMore: "Read More",
      filterBy: "Filter by category:"
    },
    am: {
      title: "የእኛ ብሎግ",
      subtitle: "ስለ ቴክኖሎጂ፣ ንግድ እና ዲጂታል ለውጥ የቅርብ ጊዜ ግንዛቤዎች",
      categories: ["ሁሉም", "ስትራቴጂ", "ዲዛይን", "ማርኬቲንግ", "ዜና"],
      posts: [
        {
          title: "ለምን እያንዳንዱ የኢትዮጵያ ንግድ በ2025 ድረ-ገጽ ያስፈልገዋል",
          excerpt: "በኢትዮጵያ ዲጂታል መሄድ አማራጭ አይደለም። ቀላል፣ በደንብ የተነደፈ ድረ-ገጽ እንዴት እምነት እንደሚገነባ፣ ደንበኞችን እንደሚስብ እና ንግድዎን ለወደፊት እንደሚያዘጋጅ ይወቁ።",
          category: "ስትራቴጂ",
          date: "ጃንዋሪ 15, 2025",
          author: "ዳዊት መኮንን",
          image: "/webneed.jpg",
          readTime: "5 ደቂቃ ንባብ"
        },
        {
          title: "በአፍሪካ የሞባይል መተግበሪያ ልማት አዝማሚያዎች",
          excerpt: "የአፍሪካን የቴክኖሎጂ መልክዓ ምድር የሚቀርጹትን የቅርብ ጊዜ የሞባይል መተግበሪያ ልማት አዝማሚያዎችን ያስሱ እና የኢትዮጵያ ንግዶች እንዴት ሊጠቀሙባቸው እንደሚችሉ።",
          category: "የቴክ ምክሮች",
          date: "ጃንዋሪ 10, 2025",
          author: "ሐናን አህመድ",
          image: "/apps.jpg",
          readTime: "7 ደቂቃ ንባብ"
        },
        {
          title: "ለኢትዮጵያ ንግዶች የማህበራዊ ሚዲያ ማርኬቲንግ",
          excerpt: "በተለይ ለኢትዮጵያ ገበያ የተበጁ ውጤታማ የማህበራዊ ሚዲያ ስትራቴጂዎችን ይማሩ። ከፌስቡክ እስከ ኢንስታግራም፣ ምን እንደሚሰራ ይወቁ።",
          category: "ማርኬቲንግ",
          date: "ጃንዋሪ 5, 2025",
          author: "ዮናስ ታደሰ",
          image: "/marketing.jpg",
          readTime: "6 ደቂቃ ንባብ"
        },
        {
          title: "በኢትዮጵያ የኢ-ኮሜርስ እድገት",
          excerpt: "በኢትዮጵያ ኢ-ኮሜርስ እያደገ ነው። የመስመር ላይ ሱቅዎን እንዴት እንደሚያዘጋጁ እና ይህን እያደገ ያለ የገበያ እድል እንዴት እንደሚጠቀሙ ይማሩ።",
          category: "ስትራቴጂ",
          date: "ዲሴምበር 28, 2024",
          author: "ዳዊት መኮንን",
          image: "/rise.jpeg",
          readTime: "8 ደቂቃ ንባብ"
        },
        {
          title: "ለኢትዮጵያ ተጠቃሚዎች የUI/UX ዲዛይን መርሆዎች",
          excerpt: "የአካባቢያዊ ተጠቃሚ ባህሪ እና ምርጫዎችን መረዳት ለተሳካ ዲጂታል ምርቶች ወሳኝ ነው። ማወቅ የሚገባዎት ነገር እዚህ አለ።",
          category: "ዲዛይን",
          date: "ዲሴምበር 20, 2024",
          author: "ሐናን አህመድ",
          image: "/ui.jpg",
          readTime: "4 ደቂቃ ንባብ"
        },
        {
          title: "በኢትዮጵያ ዲጂታል የክፍያ መፍትሄዎች",
          excerpt: "ከሞባይል ገንዘብ እስከ የመስመር ላይ ባንክ፣ በኢትዮጵያ ያለውን ዲጂታል የክፍያ መልክዓ ምድር ያስሱ እና እነዚህን መፍትሄዎች እንዴት እንደሚያዋህዱ።",
          category: "የቴክ ምክሮች",
          date: "ዲሴምበር 15, 2024",
          author: "ዮናስ ታደሰ",
          image: "/payment.jpeg",
          readTime: "6 ደቂቃ ንባብ"
        }
      ],
      readMore: "ተጨማሪ ያንብቡ",
      filterBy: "በምድብ ያጣሩ:"
    }
  }

  const t = content[language]

  const [blogPosts, setBlogPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        // API returns { projects, posts }
        setBlogPosts(data.posts ?? [])
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    }

    fetchBlogPosts()
  }, [])

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
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm text-gray-600 mb-4">{t.filterBy}</p>
            <div className="flex flex-wrap gap-3">
              {t.categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(blogPosts.length ? blogPosts : t.posts).map((post: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "./blog1.jpg"}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-600">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <Link 
                          href={`/blog/${index + 1}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                        >
                          {t.readMore}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              {language === 'en' ? 'Load More Posts' : 'ተጨማሪ ፖስቶች ይጫኑ'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Stay Updated' : 'ዝማኔ ይቆዩ'}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'en' 
                ? 'Subscribe to our newsletter and get the latest insights delivered to your inbox.'
                : 'ለዜና መልእክታችን ይመዝገቡ እና የቅርብ ጊዜ ግንዛቤዎችን በኢሜልዎ ይቀበሉ።'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'en' ? 'Enter your email' : 'ኢሜልዎን ያስገቡ'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                {language === 'en' ? 'Subscribe' : 'ይመዝገቡ'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
