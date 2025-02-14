import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/types/blog"

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "İsim Anlamlarına Göre Bebek İsimleri",
    excerpt:
      "Size hitap eden bir anlamdan yola çıkarak bebeğinize isim bulun veya seçtiğiniz ismin anlamını öğrenin. İşte en popüler isim anlamları listesi...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ekran%20Resmi%202025-02-11%2021.58.27-QUrYH31Gl2MwrV7Csz2B0tYdjQy5hP.png",
    category: "İsim Rehberi",
    date: "11 Şubat 2025",
    slug: "isim-anlamlarina-gore-bebek-isimleri",
  },
  {
    id: 2,
    title: "2025'in En Popüler Bebek İsimleri",
    excerpt:
      "Bu yılın trend bebek isimleri ve popülerlik sebepleri. Modern ve geleneksel isimler arasında en çok tercih edilenler...",
    image: "/placeholder.svg?height=400&width=600",
    category: "Trendler",
    date: "10 Şubat 2025",
    slug: "2025-populer-bebek-isimleri",
  },
  {
    id: 3,
    title: "Osmanlı Sarayından İsimler",
    excerpt:
      "Tarihi değeri olan, asalet ve güç ifade eden Osmanlı dönemi isimleri ve anlamları. Geçmişten günümüze taşınan isimler...",
    image: "/placeholder.svg?height=400&width=600",
    category: "Tarihi İsimler",
    date: "9 Şubat 2025",
    slug: "osmanli-sarayindan-isimler",
  },
]

export function BlogPosts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Blog Yazıları</h2>

          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                {/* Görsel */}
                <div className="relative h-[400px] overflow-hidden rounded-xl">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>

                {/* İçerik */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{post.category}</span>
                      <span>•</span>
                      <time>{post.date}</time>
                    </div>

                    <h3 className="text-2xl font-bold">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>

                    <div className="pt-4">
                      <Button variant="outline" asChild>
                        <Link href={`/blog/${post.slug}`}>Devamını Oku</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Tüm Blog Yazıları Butonu */}
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Tüm Blog Yazılarını Gör</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

