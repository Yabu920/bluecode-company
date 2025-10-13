import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Web, Mobile & Digital Marketing Solutions in Ethiopia",
  description:
    "BlueCode provides web development, mobile app design, and digital marketing services to help Ethiopian businesses grow and innovate.",
  keywords: [
    "web development Ethiopia",
    "mobile apps Ethiopia",
    "digital marketing Ethiopia",
    "BlueCode services",
    "IT solutions Addis Ababa",
  ],
  openGraph: {
    title: "Services | BlueCode - Digital Solutions in Ethiopia",
    description:
      "Explore BlueCode services: modern websites, mobile apps, and smart digital marketing tailored for Ethiopian businesses.",
    url: "https://bluecodes.com.et/services",
    siteName: "BlueCode",
    images: [
      {
        url: "https://bluecodes.com.et/public/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "BlueCode Services",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | BlueCode - Digital Solutions in Ethiopia",
    description:
      "BlueCode offers web, mobile, and marketing services for Ethiopian companies.",
    images: ["https://bluecodes.com.et/public/logo-white.jpg"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
