import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"
import type React from "react"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

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
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.png",
      },
    ],
  },
  manifest: "/manifest.json",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'