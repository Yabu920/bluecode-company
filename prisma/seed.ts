import prisma from '../lib/prisma'

async function main() {
  const posts = [
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
    }
  ]

  for (const p of posts) {
    const existing = await prisma.blogPost.findFirst({ where: { title: p.title } })
    if (existing) {
      await prisma.blogPost.update({ where: { id: existing.id }, data: p })
    } else {
      await prisma.blogPost.create({ data: p })
    }
  }

  console.log('Seeded blog posts')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
