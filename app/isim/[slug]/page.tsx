import { notFound } from "next/navigation"
import Link from "next/link"
import { Mail, Facebook, Share2, CheckCircle2 } from "lucide-react"
import { getNotionNameEntries, getNotionBlocksByPageId, getNotionNameBySlug } from "@/lib/notion"
import { formatDate, slugify, generateImageUrl, generateSEODescription } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next"
import Script from "next/script"
import { generateStructuredData } from "@/lib/structured-data"
import { ErrorBoundary } from "@/components/error-boundary"
import { renderBlock } from "@/components/render-block"
import { RelatedNames } from "@/components/related-names"

interface PageProps {
  params: {
    slug: string
  }
}

// Statik yolları önceden oluştur - ISR için
export async function generateStaticParams() {
  try {
    const { results: names } = await getNotionNameEntries()
    return names.slice(0, 50).map((name) => {
      const title = name.properties.Name?.title?.[0]?.plain_text || ""
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
      return { slug }
    })
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Metadata oluşturma
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params?.slug) {
    return {}
  }

  try {
    const name = await getNotionNameBySlug(params.slug)
    if (!name) return {}

    const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
    const description = name.properties.Description?.rich_text?.[0]?.plain_text || ""
    const imageKey =
      name.cover?.type === "external" ? name.cover.external.url.split("key=")[1]?.split("&")[0] : "default-image.webp"
    const imageUrl = generateImageUrl(imageKey, 1200, 630)
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/isim/${params.slug}`

    return {
      title: `${title} - İsim Anlamı ve Özellikleri`,
      description: generateSEODescription(description),
      openGraph: {
        title,
        description: generateSEODescription(description),
        type: "article",
        publishedTime: name.properties.Published?.date?.start,
        modifiedTime: name.last_edited_time,
        authors: ["MinikAdlar Editör"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        url: url,
      },
      alternates: {
        canonical: `/isim/${params.slug}`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {}
  }
}

// Ana sayfa bileşeni
export default async function Page({ params }: PageProps) {
  // Slug kontrolü
  if (!params?.slug) {
    console.error("No slug provided")
    return notFound()
  }

  try {
    console.log("NameDetail: Fetching data for slug:", params.slug)

    // Doğrudan slug ile ismi al - cache stratejisi ile
    const name = await getNotionNameBySlug(params.slug)

    if (!name) {
      console.error("Name not found for slug:", params.slug)
      return notFound()
    }

    console.log("Found name:", name.id, name.properties.Name?.title?.[0]?.plain_text)

    // İçerik bloklarını al - cache stratejisi ile
    const blocks = await getNotionBlocksByPageId(name.id)
    console.log(`Fetched ${blocks.length} content blocks`)

    // İlgili isimler için tüm isimleri al - cache stratejisi ile
    const { results: allNames } = await getNotionNameEntries()

    const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
    const publishDate = name.properties.Published?.date?.start || new Date().toISOString()
    const author = "MinikAdlar Editör"
    const factChecker = "Uzman Editör"

    const imageKey =
      name.cover?.type === "external"
        ? name.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
        : "default-image.webp"

    const imageUrl = generateImageUrl(imageKey, 1200, 800)
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/isim/${params.slug}`

    const structuredData = generateStructuredData({
      title,
      description: name.properties.Description?.rich_text?.[0]?.plain_text || "",
      publishedTime: publishDate,
      modifiedTime: name.last_edited_time || publishDate,
      authorName: author,
      authorUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/yazar/${slugify(author)}`,
      organizationName: "MinikAdlar",
      organizationLogo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      organizationUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
      imageUrl,
      url: currentUrl,
      breadcrumbs: [
        {
          name: "Ana Sayfa",
          item: process.env.NEXT_PUBLIC_SITE_URL || "",
        },
        {
          name: "İsimler",
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/isim`,
        },
        {
          name: title,
          item: currentUrl,
        },
      ],
    })

    return (
      <ErrorBoundary>
        <>
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <div className="min-h-screen bg-white pt-16">
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4">
              <div className="container mx-auto px-4">
                <nav className="flex items-center gap-2 text-sm">
                  <Link href="/" className="text-gray-600 hover:text-primary">
                    Bebek İsimleri
                  </Link>
                  <span className="text-gray-400">&gt;</span>
                  <Link href="/isim" className="text-gray-600 hover:text-primary">
                    İsimler
                  </Link>
                </nav>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8">
              <article className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h1>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
                  <Image
                    src={generateImageUrl(imageKey, 1200, 800) || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1024px, 100vw"
                    priority={true}
                  />
                </div>

                {/* Article Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Yazar:</span>
                      <Link href="#" className="font-medium hover:text-primary">
                        {author}
                      </Link>
                      <span className="text-gray-300">•</span>
                      <time dateTime={publishDate} className="text-gray-600">
                        {formatDate(publishDate)}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Kontrol Eden:</span>
                      <Link href="#" className="font-medium hover:text-primary">
                        {factChecker}
                      </Link>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-2 sm:ml-auto">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook'ta Paylaş</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Pinterest'te Paylaş</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email ile Paylaş</span>
                    </Button>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {/* İçerik blokları yoksa veya az ise, temel bilgileri göster */}
                  {(!blocks || blocks.length < 2) && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 font-mulish">İsim Anlamı</h2>
                      <p>
                        {name.properties.Meaning?.rich_text?.[0]?.plain_text ||
                          name.properties.Description?.rich_text?.[0]?.plain_text ||
                          "Bu ismin anlamı henüz eklenmemiştir."}
                      </p>

                      <h2 className="text-2xl font-bold mt-8 mb-4 font-mulish">İsim Özellikleri</h2>
                      <ul>
                        <li>
                          <strong>Köken:</strong> {name.properties.Origin?.select?.name || "Belirtilmemiş"}
                        </li>
                        <li>
                          <strong>Cinsiyet:</strong> {name.properties.Gender?.select?.name || "Unisex"}
                        </li>
                      </ul>
                    </>
                  )}

                  {/* Notion içerik bloklarını göster */}
                  {blocks && blocks.length > 0 && blocks.map((block) => <div key={block.id}>{renderBlock(block)}</div>)}
                </div>

                {/* Related Names */}
                {allNames && allNames.length > 0 && <RelatedNames currentNameId={name.id} names={allNames} />}
              </article>
            </div>
          </div>
        </>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error("Error in NameDetail:", error)
    return notFound()
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}
