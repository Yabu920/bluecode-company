// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BlueCode | Empowering Digital Transformation in Ethiopia",
  description:
    "BlueCode is a technology solutions company based in Ethiopia. We help businesses build websites, mobile apps, and digital platforms that accelerate growth and innovation.",
  keywords: [
    "BlueCode Ethiopia",
    "Ethiopian tech company",
    "web development Ethiopia",
    "mobile app development",
    "digital transformation Ethiopia",
    "software company Addis Ababa",
    "IT services Ethiopia",
  ],
  openGraph: {
    title: "About BlueCode | Empowering Digital Transformation in Ethiopia",
    description:
      "Learn about BlueCode — a leading Ethiopian tech company creating innovative software, websites, and apps to help businesses thrive in the digital age.",
    url: "https://bluecodes.com.et/about",
    siteName: "BlueCode",
    images: [
      {
        url: "https://bluecodes.com.et/public/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "BlueCode - Technology Solutions Company in Ethiopia",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BlueCode | Empowering Digital Transformation in Ethiopia",
    description:
      "BlueCode helps Ethiopian businesses innovate through technology — web development, mobile apps, and digital solutions.",
    images: ["https://bluecodes.com.et/public/logo-white.jpg"],
  },
};

// ✅ Default layout component
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Wrap the children
}
