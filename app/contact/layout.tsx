import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BlueCode | Get in Touch for Digital Solutions in Ethiopia",
  description:
    "Contact BlueCode to discuss your web, mobile, or digital marketing needs. Our Ethiopian team is ready to help your business grow.",
  keywords: [
    "contact BlueCode",
    "Ethiopian tech company",
    "web development inquiry",
    "mobile app inquiry Ethiopia",
    "digital marketing contact",
  ],
  openGraph: {
    title: "Contact BlueCode | Digital Solutions in Ethiopia",
    description:
      "Reach out to BlueCode to start your digital project. Web development, mobile apps, and digital marketing services in Ethiopia.",
    url: "https://bluecodes.com.et/contact",
    siteName: "BlueCode",
    images: [
      {
        url: "https://bluecodes.com.et/public/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BlueCode",
      },
    ],
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact BlueCode | Digital Solutions in Ethiopia",
    description:
      "Get in touch with BlueCode for web, app, and digital marketing projects in Ethiopia.",
    images: ["https://bluecodes.com.et/public/logo-white.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
