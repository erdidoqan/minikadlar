import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { NameCard } from "@/components/name-card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Facebook, Mail, LinkIcon, Twitter } from "lucide-react"
import { MiniNameCard } from "@/components/mini-name-card"
import Script from "next/script"

export const metadata: Metadata = {
  title: "2025 Yılının En Popüler Bebek İsimleri",
  description:
    "2025 yılında Türkiye'de en çok tercih edilen bebek isimleri, anlamları ve kökenleri. En güncel bebek ismi trendlerini keşfedin.",
  openGraph: {
    title: "2025 Yılının En Popüler Bebek İsimleri",
    description:
      "2025 yılında Türkiye'de en çok tercih edilen bebek isimleri, anlamları ve kökenleri. En güncel bebek ismi trendlerini keşfedin.",
    url: "https://minikadlar.com/populer-isimler",
    siteName: "MinikAdlar",
    images: [
      {
        url: "https://minikadlar-gallery.vercel.app/api/image?key=populer-baby-name.jpg",
        width: 1200,
        height: 630,
        alt: "2025 Yılının En Popüler Bebek İsimleri",
      },
    ],
    locale: "tr_TR",
    type: "article",
  },
  alternates: {
    canonical: "https://minikadlar.com/populer-isimler",
  },
}

const categories = [
  { name: "Popüler İsimler", href: "/populer-isimler" },
  { name: "Erkek İsimleri", href: "/erkek-isimleri" },
  { name: "Kız İsimleri", href: "/kiz-isimleri" },
  { name: "Unisex İsimler", href: "/unisex-isimler" },
  { name: "A-Z İsimler", href: "/isimler-listesi" },
  { name: "İsim Kökenleri", href: "/isim-kokenleri" },
  { name: "Benzersiz İsimler", href: "/benzersiz-isimler" },
  { name: "Klasik İsimler", href: "/klasik-isimler" },
]

const popularNames = [
  {
    name: "Ali",
    meaning: "yüce, ulu, yüksek",
    gender: "Erkek",
    origin: "Arapça",
    popularity: 95,
    link: "/isim/ali-anlami",
  },
  {
    name: "Zeynep",
    meaning: "Babasının süsü",
    gender: "Kız",
    origin: "Arapça",
    popularity: 92,
    link: "/isim/zeynep",
  },
  {
    name: "Ahmet",
    meaning: "En çok övülen, en övgüye layık",
    gender: "Erkek",
    origin: "Arapça",
    popularity: 90,
    link: "/isim/ahmet-anlami",
  },
  {
    name: "Elif",
    meaning: "Nazik, ince, zarif",
    gender: "Kız",
    origin: "Arapça",
    popularity: 88,
    link: "/isim/elif",
  },
  {
    name: "Mustafa",
    meaning: "Seçilmiş, temizlenmiş",
    gender: "Erkek",
    origin: "Arapça",
    popularity: 87,
    link: "/isim/mustafa",
  },
  {
    name: "Fatma",
    meaning: "Erken sütten kesilen, kendini haramlardan uzak tutan",
    gender: "Kız",
    origin: "Arapça",
    popularity: 85,
    link: "/isim/fatma",
  },
]

const modernNames = [
  {
    name: "Eymen",
    meaning: "Uğurlu, bereketli",
    gender: "Erkek",
    origin: "Arapça",
    popularity: 75,
    link: "/isim/eymen",
  },
  {
    name: "Defne",
    meaning: "Güzellik ve zarafeti simgeleyen bir ağaç",
    gender: "Kız",
    origin: "Yunanca",
    popularity: 78,
    link: "/isim/defne",
  },
  {
    name: "Miraç",
    meaning: "Yükseliş, Hz. Muhammed'in göğe yücelişi",
    gender: "Erkek",
    origin: "Arapça",
    popularity: 72,
    link: "/isim/mirac",
  },
  {
    name: "Lina",
    meaning: "Hafif, yumuşak",
    gender: "Kız",
    origin: "Arapça",
    popularity: 70,
    link: "/isim/lina",
  },
]

export default function PopularNamesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "2025 Yılının En Popüler Bebek İsimleri",
    description:
      "2025 yılında Türkiye'de en çok tercih edilen bebek isimleri, anlamları ve kökenleri. En güncel bebek ismi trendlerini keşfedin.",
    image: "https://minikadlar-gallery.vercel.app/api/image?key=populer-baby-name.jpg",
    datePublished: "2025-02-17T00:00:00+03:00",
    dateModified: "2025-02-17T00:00:00+03:00",
    author: {
      "@type": "Person",
      name: "MinikAdlar Editör",
    },
    publisher: {
      "@type": "Organization",
      name: "MinikAdlar",
      logo: {
        "@type": "ImageObject",
        url: "https://minikadlar.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://minikadlar.com/populer-isimler",
    },
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://minikadlar.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "2025 Popüler İsimler",
        item: "https://minikadlar.com/populer-isimler",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">2025 Popüler İsimler</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0a1172] mb-6">
                2025 Yılının En Popüler Bebek İsimleri
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                TÜİK verilerine göre 2025 yılında en çok tercih edilen bebek isimleri ve anlamları
              </p>
            </div>
            <div className="relative h-[300px] lg:h-full rounded-lg overflow-hidden">
              <Image
                src="https://minikadlar-gallery.vercel.app/api/image?key=populer-baby-name.jpg"
                alt="Bebek İsimleri 2025"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Author and Share */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/placeholder.svg" alt="Yazar" width={48} height={48} className="rounded-full" />
              <div>
                <p className="text-sm text-gray-600">Yazar</p>
                <p className="font-medium">MinikAdlar Editör</p>
                <p className="text-sm text-gray-600">Yayınlanma: 17 Şubat 2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              2025 yılının en popüler bebek isimlerini arıyorsanız doğru yerdesiniz! TÜİK verilerine göre hazırladığımız
              bu listede, yılın en çok tercih edilen bebek isimlerini ve anlamlarını bulabilirsiniz. Modern ve
              geleneksel isimler arasından size en uygun olanı seçebilirsiniz.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-8">En Popüler İsimler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {popularNames.map((name, index) => (
              <NameCard key={index} {...name} />
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>İsim Seçerken Dikkat Edilmesi Gerekenler</h2>
            <p>
              Bebeğinize isim seçerken dikkat etmeniz gereken bazı önemli noktalar vardır. İsmin anlamı, telaffuzu,
              yazılışı ve çocuğunuzun gelecekte taşıyacağı kimliğe uygunluğu göz önünde bulundurulmalıdır.
            </p>

            <h2>Son Yıllarda Popülerlik Kazanan Modern İsimler</h2>
            <p>
              Geleneksel isimlerin yanı sıra, modern isimler de giderek popüler hale gelmektedir. Son yıllarda yeni
              kuşakta sık rastlanan isimlerden bazıları şunlardır:
            </p>

            <h3 className="text-xl font-semibold mb-4">Popüler Erkek İsimleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <MiniNameCard name="Eymen" rank={1} link="" />
              <MiniNameCard name="Miraç" rank={2} link="" />
              <MiniNameCard name="Kerem" rank={3} link="" />
              <MiniNameCard name="Doruk" rank={4} link="" />
            </div>

            <h3 className="text-xl font-semibold mb-4">Popüler Kadın İsimleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <MiniNameCard name="Defne" rank={5} link="" />
              <MiniNameCard name="Lina" rank={6} link="" />
              <MiniNameCard name="Ela" rank={7} link="" />
              <MiniNameCard name="Masal" rank={8} link="" />
            </div>

            <h2>Sonuç</h2>
            <p>
              2025 yılının en popüler bebek isimleri listesi, geleneksel ve modern tercihlerin bir karışımını
              yansıtmaktadır. Sizin favoriniz hangisi? Yorumlarda bizimle paylaşabilirsiniz!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
