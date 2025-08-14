import { Mulish } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"

const mulish = Mulish({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://minikadlar.com"),
  title: {
    default: "MinikAdlar - Bebek İsimleri ve Anlamları",
    template: "%s | MinikAdlar",
  },
  description: "Türkiye'nin en kapsamlı bebek isimleri sitesi. İsim anlamları, popüler isimler ve daha fazlası.",
  keywords: ["bebek isimleri", "isim anlamları", "popüler isimler", "Türk isimleri"],
  authors: [{ name: "MinikAdlar Ekibi" }],
  creator: "MinikAdlar",
  publisher: "MinikAdlar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "MinikAdlar",
  },
  twitter: {
    card: "summary_large_image",
    site: "@minikadlar",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MinikAdlar",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ff6b6b",
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "rss",
          title: "MinikAdlar - Bebek İsimleri ve Anlamları",
        },
      ],
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={mulish.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3211715013502788"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
