import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | BlueCode Projects & Digital Success in Ethiopia",
  description:
    "Check out BlueCode’s portfolio of web, mobile, and digital projects that have helped Ethiopian businesses grow.",
  keywords: [
    "BlueCode portfolio",
    "web projects Ethiopia",
    "mobile apps Ethiopia",
    "digital solutions Ethiopia",
    "technology projects Addis Ababa",
  ],
  openGraph: {
    title: "Portfolio | BlueCode - Digital Projects in Ethiopia",
    description:
      "Explore BlueCode’s portfolio of websites, apps, and digital solutions for Ethiopian businesses.",
    url: "https://bluecodes.com.et/portfolio",
    siteName: "BlueCode",
    images: [
      {
        url: "https://bluecodes.com.et/public/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "BlueCode Portfolio",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | BlueCode - Digital Projects in Ethiopia",
    description:
      "See BlueCode’s portfolio of successful projects: websites, apps, and digital solutions.",
    images: ["https://bluecodes.com.et/public/logo-white.jpg"],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
