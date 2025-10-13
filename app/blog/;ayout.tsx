import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | BlueCode Insights on Technology & Innovation in Ethiopia",
  description:
    "Read the BlueCode blog for the latest news, tips, and insights on web development, mobile apps, and digital marketing in Ethiopia.",
  keywords: [
    "BlueCode blog",
    "technology tips Ethiopia",
    "web development insights",
    "mobile app development news",
    "digital marketing trends Ethiopia",
  ],
  openGraph: {
    title: "Blog | BlueCode - Technology & Innovation Insights in Ethiopia",
    description:
      "Stay updated with BlueCode’s blog on technology, web development, apps, and digital marketing in Ethiopia.",
    url: "https://bluecodes.com.et/blog",
    siteName: "BlueCode",
    images: [
      {
        url: "https://bluecodes.com.et/public/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "BlueCode Blog",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | BlueCode - Technology & Innovation Insights in Ethiopia",
    description:
      "BlueCode blog: web, mobile, and marketing tips for Ethiopian businesses.",
    images: ["https://bluecodes.com.et/public/logo-white.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
