import { Hero } from "@/components/hero"
import { ContentSection } from "@/components/content-section"
import { AlphabetList } from "@/components/alphabet-list"
import { NotionBlogPosts } from "@/components/notion-blog-posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MinikAdlar - Bebek İsimleri ve Anlamları",
  description:
    "Türkiye'nin en kapsamlı bebek isimleri sitesi. İsim anlamları, popüler isimler, ve bebek ismi seçme rehberi.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ContentSection />
      <AlphabetList />
      <NotionBlogPosts />
    </main>
  )
}

