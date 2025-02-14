import { Suspense } from "react"
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { getNotionBlogPosts } from "@/lib/notion"
import { formatDate, slugify, generateImageUrl } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingPosts } from "@/components/loading-posts"
import { ErrorMessage } from "@/components/error-message"
import { generateBlogListingStructuredData } from "@/lib/structured-data"
import type { Metadata } from "next"

export const dynamicParams = true

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
  return {
    title: `${decodedTag} | Blog | MinikAdlar`,
    description: `${decodedTag} kategorisindeki en güncel bebek isimleri ve ebeveynlik yazıları. MinikAdlar'ın uzman içerikleriyle bebeğiniz için en iyi ismi bulun.`,
    alternates: {
      canonical: `/blog/${params.tag}`,
    },
  }
}

export async function generateStaticParams() {
  const { results: posts } = await getNotionBlogPosts()
  const tags = new Set(posts.flatMap((post) => post.properties.Tags?.multi_select?.map((tag) => tag.name) || []))
  return Array.from(tags).map((tag) => ({ tag: slugify(tag) }))
}

async function BlogPostsList({ tag }: { tag: string }) {
  try {
    console.log("Fetching blog posts...")
    const { results: posts } = await getNotionBlogPosts()
    console.log("Fetched blog posts:", posts)

    if (!posts || posts.length === 0) {
      console.log("No blog posts found")
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Bu kategoride henüz blog yazısı bulunmamaktadır.</p>
        </div>
      )
    }

    const filteredPosts = posts.filter((post) =>
      post.properties.Tags?.multi_select?.some((t) => slugify(t.name) === tag),
    )

    console.log(`Filtered posts for tag '${tag}':`, filteredPosts)

    if (filteredPosts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Bu kategoride henüz blog yazısı bulunmamaktadır.</p>
        </div>
      )
    }

    const decodedTag = decodeURIComponent(tag)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())

    const structuredData = generateBlogListingStructuredData({
      title: `${decodedTag} | Blog | MinikAdlar`,
      description: `${decodedTag} kategorisindeki en güncel bebek isimleri ve ebeveynlik yazıları.`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${tag}`,
      posts: filteredPosts.map((post) => {
        const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
        const slug = slugify(title)
        const imageKey =
          post.cover?.type === "external"
            ? post.cover.external.url.split("key=")[1].split("&")[0]
            : "default-image.webp"

        return {
          title,
          description: post.properties.Description?.rich_text?.[0]?.plain_text || "",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${tag}/${slug}`,
          imageUrl: generateImageUrl(imageKey, 1200, 800),
          publishDate: post.properties.Published?.date?.start || new Date().toISOString(),
        }
      }),
      breadcrumbs: [
        {
          name: "Ana Sayfa",
          item: process.env.NEXT_PUBLIC_SITE_URL || "",
        },
        {
          name: "Blog",
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
        },
        {
          name: decodedTag,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${tag}`,
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
          {filteredPosts.map((post) => {
            const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
            const slug = slugify(title)
            const publishDate = post.properties.Published?.date?.start || new Date().toISOString()
            const description = post.properties.Description?.rich_text?.[0]?.plain_text || "No description available."

            // Safely extract the image key with a fallback
            const imageKey =
              post.cover?.type === "external"
                ? post.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
                : "default-image.webp"

            return (
              <Card key={post.id} className="overflow-hidden flex flex-col">
                <Link href={`/blog/${tag}/${slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={generateImageUrl(imageKey, 800, 600) || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, 100vw"
                    />
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
                      {post.properties.Tags?.multi_select?.map((tag) => (
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
  } catch (error) {
    console.error("Error in BlogPostsList:", error)
    return (
      <ErrorMessage
        message={`Blog yazıları yüklenirken bir hata oluştu: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`}
      />
    )
  }
}

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{decodedTag} Kategorisindeki Yazılar</h1>
          <Suspense fallback={<LoadingPosts />}>
            <BlogPostsList tag={params.tag} />
          </Suspense>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/blog">Tüm Yazıları Gör</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

