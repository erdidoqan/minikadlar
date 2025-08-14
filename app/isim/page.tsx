import { Suspense } from "react"
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { getNotionNameEntries } from "@/lib/notion"
import { formatDate, generateImageUrl, getNotionSlug } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingNames } from "@/components/loading-names"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Metadata } from "next"
import { generateNameListingStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "İsimler | MinikAdlar",
  description: "Türkçe bebek isimleri, anlamları ve özellikleri. Bebeğiniz için en güzel ismi bulun.",
  alternates: {
    canonical: "/isim",
  },
}

async function NameList() {
  const response = await getNotionNameEntries()

  if (!response || !response.results) {
    throw new Error("Veri alınamadı")
  }

  const names = response.results

  if (names.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Henüz isim bulunmamaktadır.</p>
      </div>
    )
  }

  const structuredData = generateNameListingStructuredData({
    title: "İsimler | MinikAdlar",
    description: "Türkçe bebek isimleri, anlamları ve özellikleri. Bebeğiniz için en güzel ismi bulun.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/isim`,
    names: names.map((name) => {
      const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
      const slug = getNotionSlug(name)
      const imageKey =
        name.cover?.type === "external" ? name.cover.external.url.split("key=")[1]?.split("&")[0] : "default-image.webp"

      return {
        title,
        description: name.properties.Description?.rich_text?.[0]?.plain_text || "",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/isim/${slug}`,
        imageUrl: generateImageUrl(imageKey, 1200, 800),
        publishDate: name.properties.Published?.date?.start || new Date().toISOString(),
      }
    }),
    breadcrumbs: [
      {
        name: "Ana Sayfa",
        item: process.env.NEXT_PUBLIC_SITE_URL || "",
      },
      {
        name: "İsimler",
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/isim`,
      },
    ],
  })

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {names.map((name) => {
          const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
          const slug = getNotionSlug(name)
          const publishDate = name.properties.Published?.date?.start || new Date().toISOString()
          const description = name.properties.Description?.rich_text?.[0]?.plain_text || "No description available."
          const imageKey =
            name.cover?.type === "external"
              ? name.cover.external.url.split("key=")[1]?.split("&")[0]
              : "default-image.webp"

          return (
            <Card key={name.id} className="overflow-hidden flex flex-col">
              <Link href={`/isim/${slug}`} className="flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={generateImageUrl(imageKey, 800, 600) || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, 100vw"
                  />
                  {name.icon?.emoji && <span className="absolute left-4 bottom-4 text-2xl">{name.icon.emoji}</span>}
                </div>

                <CardHeader>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{description}</p>
                </CardContent>

                <CardFooter className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {name.properties.Tags?.multi_select?.map((tag) => (
                      <Badge key={tag.name} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          )
        })}
      </div>
    </>
  )
}

function NameListWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingNames />}>
        <NameList />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">İsimler</h1>
          <NameListWrapper />
        </div>
      </div>
    </div>
  )
}
