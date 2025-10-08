// // app/portfolio/page.tsx
// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github } from 'lucide-react'
// import Image from "next/image"
// import { useLanguage } from "../contexts/language-context"

// export default function PortfolioPage() {
//   const { language } = useLanguage()

//   const content = {
//     en: {
//       title: "Our Portfolio",
//       subtitle: "Showcasing our successful projects and satisfied clients",
//       projects: [
//         {
//           title: "Addis Foods",
//           type: "E-commerce Website",
//           tech: ["WordPress", "WooCommerce", "Payment Gateway"],
//           description: "Online grocery store with delivery system. Features include product catalog, shopping cart, secure payment processing, and order tracking.",
//           image: "/ecommerce1.jpeg",
//           category: "Web Development",
//           year: "2024"
//         },
//         {
//           title: "Yegna Delivery",
//           type: "Mobile App",
//           tech: ["Flutter", "Firebase", "Google Maps API"],
//           description: "App for booking and tracking deliveries. Real-time GPS tracking, push notifications, and integrated payment system.",
//           image: "/ecommerce.jpg",
//           category: "App Development",
//           year: "2024"
//         },
//         {
//           title: "Bole Fashion",
//           type: "Digital Marketing Campaign",
//           tech: ["Facebook Ads", "Instagram Marketing", "Analytics"],
//           description: "Facebook/Instagram boost campaign with 2x sales increase. Comprehensive social media strategy and content creation.",
//           image: "/fashion.jpg",
//           category: "Digital Marketing",
//           year: "2023"
//         },
//         {
//           title: "Habesha Restaurant",
//           type: "Restaurant Website",
//           tech: ["React", "Node.js", "Online Ordering"],
//           description: "Modern restaurant website with online menu, reservation system, and food ordering capabilities. Mobile-responsive design with beautiful food photography.",
//           image: "/resturant.jpeg",
//           category: "Web Development",
//           year: "2023"
//         },
//         {
//           title: "Tech Startup Dashboard",
//           type: "Web Application",
//           tech: ["Next.js", "TypeScript", "Chart.js"],
//           description: "Analytics dashboard for a local tech startup. Real-time data visualization, user management, and comprehensive reporting features.",
//           image: "startup.jpeg",
//           category: "Web Development",
//           year: "2024"
//         },
//         {
//           title: "Fitness Center App",
//           type: "Mobile App",
//           tech: ["React Native", "Firebase", "Stripe"],
//           description: "Fitness tracking app with workout plans, progress monitoring, and membership management. Integrated payment system for subscriptions.",
//           image: "/gym.jpg",
//           category: "App Development",
//           year: "2024"
//         }
//       ],
//       categories: ["All", "Web Development", "App Development", "Digital Marketing"],
//       viewProject: "View Project",
//       liveDemo: "Live Demo",
//       sourceCode: "Source Code"
//     },
//     am: {
//       title: "የእኛ ስራዎች",
//       subtitle: "የተሳካላቸውን ፕሮጀክቶቻችንን እና የረክተኛ ደንበኞቻችንን ማሳየት",
//       projects: [
//         {
//           title: "አዲስ ምግቦች",
//           type: "የኢ-ኮሜርስ ድረ-ገጽ",
//           tech: ["WordPress", "WooCommerce", "የክፍያ መግቢያ"],
//           description: "ከማድረሻ ስርዓት ጋር የመስመር ላይ የግሮሰሪ ሱቅ። የምርት ካታሎግ፣ የግዢ ጋሪ፣ ደህንነቱ የተጠበቀ የክፍያ ሂደት እና የትዕዛዝ መከታተያን ያካትታል።",
//           image: "/ecommerce1.jpeg",
//           category: "ድረ-ገጽ ልማት",
//           year: "2024"
//         },
//         {
//           title: "የኛ ዴሊቨሪ",
//           type: "ሞባይል መተግበሪያ",
//           tech: ["Flutter", "Firebase", "Google Maps API"],
//           description: "ማድረሻዎችን ለማስያዝ እና ለመከታተል መተግበሪያ። የእውነተኛ ጊዜ GPS መከታተያ፣ የግፊት ማሳወቂያዎች እና የተዋሃደ የክፍያ ስርዓት።",
//           image: "/ecommerce.jpg",
//           category: "መተግበሪያ ልማት",
//           year: "2024"
//         },
//         {
//           title: "ቦሌ ፋሽን",
//           type: "ዲጂታል ማርኬቲንግ ዘመቻ",
//           tech: ["Facebook Ads", "Instagram Marketing", "Analytics"],
//           description: "ከ2x የሽያጭ ጭማሪ ጋር የፌስቡክ/ኢንስታግራም ማበረታቻ ዘመቻ። ሁሉንም አቀፍ የማህበራዊ ሚዲያ ስትራቴጂ እና የይዘት ፈጠራ።",
//           image: "/fashion.jpg",
//           category: "ዲጂታል ማርኬቲንግ",
//           year: "2023"
//         },
//         {
//           title: "ሐበሻ ሬስቶራንት",
//           type: "የሬስቶራንት ድረ-ገጽ",
//           tech: ["React", "Node.js", "የመስመር ላይ ትዕዛዝ"],
//           description: "ከመስመር ላይ ምናሌ፣ የቦታ ማስያዝ ስርዓት እና የምግብ ትዕዛዝ አቅም ጋር ዘመናዊ የሬስቶራንት ድረ-ገጽ። ከሚያምር የምግብ ፎቶግራፊ ጋር ለሞባይል ምላሽ ሰጪ ዲዛይን።",
//           image: "/resturant.jpeg",
//           category: "ድረ-ገጽ ልማት",
//           year: "2023"
//         },
//         {
//           title: "የቴክ ስታርት አፕ ዳሽቦርድ",
//           type: "ድር መተግበሪያ",
//           tech: ["Next.js", "TypeScript", "Chart.js"],
//           description: "ለአካባቢያዊ ቴክ ስታርት አፕ የትንታኔ ዳሽቦርድ። የእውነተኛ ጊዜ የመረጃ ምስላዊነት፣ የተጠቃሚ አስተዳደር እና ሁሉንም አቀፍ የሪፖርት ባህሪያት።",
//           image: "/startup.jpeg",
//           category: "ድረ-ገጽ ልማት",
//           year: "2024"
//         },
//         {
//           title: "የአካል ብቃት ማዕከል መተግበሪያ",
//           type: "ሞባይል መተግበሪያ",
//           tech: ["React Native", "Firebase", "Stripe"],
//           description: "ከአካል ብቃት እቅዶች፣ የእድገት ክትትል እና የአባልነት አስተዳደር ጋር የአካል ብቃት መከታተያ መተግበሪያ። ለደንበኝነት ምዝገባዎች የተዋሃደ የክፍያ ስርዓት።",
//           image: "/gym.jpg",
//           category: "መተግበሪያ ልማት",
//           year: "2024"
//         }
//       ],
//       categories: ["ሁሉም", "ድረ-ገጽ ልማት", "መተግበሪያ ልማት", "ዲጂታል ማርኬቲንግ"],
//       viewProject: "ፕሮጀክት ይመልከቱ",
//       liveDemo: "ቀጥታ ማሳያ",
//       sourceCode: "ምንጭ ኮድ"
//     }
//   }

//   const t = content[language]

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-blue-50 to-white py-20">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//               {t.title}
//             </h1>
//             <p className="text-xl text-gray-600">
//               {t.subtitle}
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Portfolio Grid */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {t.projects.map((project, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
//                   <CardContent className="p-0">
//                     <div className="relative overflow-hidden">
//                       <Image
//                         src={project.image}
//                         alt={project.title}
//                         width={500}
//                         height={300}
//                         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
//                         <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
//                           <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
//                             <ExternalLink className="h-4 w-4 mr-2" />
//                             {t.liveDemo}
//                           </Button>
//                           <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
//                             <Github className="h-4 w-4 mr-2" />
//                             {t.sourceCode}
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-3">
//                         <Badge variant="secondary">{project.category}</Badge>
//                         <span className="text-sm text-gray-500">{project.year}</span>
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {project.title}
//                       </h3>
//                       <p className="text-blue-600 font-medium mb-3">
//                         {project.type}
//                       </p>
//                       <p className="text-gray-600 mb-4 text-sm">
//                         {project.description}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {project.tech.map((tech, techIndex) => (
//                           <Badge key={techIndex} variant="outline" className="text-xs">
//                             {tech}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-blue-600">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
//               {language === 'en' ? 'Ready to Start Your Project?' : 'ፕሮጀክትዎን ለመጀመር ዝግጁ ነዎት?'}
//             </h2>
//             <p className="text-xl text-blue-100 mb-8">
//               {language === 'en'
//                 ? "Let's create something amazing together. Contact us today to discuss your ideas."
//                 : "አብረን አስደናቂ ነገር እንፍጠር። ስለ ሀሳቦችዎ ለመወያየት ዛሬ ያግኙን።"
//               }
//             </p>
//             <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
//               {language === 'en' ? 'Start Your Project' : 'ፕሮጀክትዎን ይጀምሩ'}
//             </Button>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   )
// }


// app/portfolio/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  type: string;
  category: string;
  year: string;
  tech: string[];
  image?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        console.log("✅ API response:", data);

        // Handle both possible shapes: either an array or {projects: []}
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data.projects) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("❌ Failed to load projects:", err);
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-20">Loading projects...</p>;

  if (!projects.length)
    return (
      <p className="text-center py-20">
        No projects found. Add some in the dashboard!
      </p>
    );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {project.type} | {project.year}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-xs px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
