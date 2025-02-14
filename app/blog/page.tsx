import { Suspense } from "react"
import Link from "next/link"
import Script from "next/script"
import { getNotionBlogPosts } from "@/lib/notion"
import { formatDate, slugify, generateImageUrl } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingPosts } from "@/components/loading-posts"
import { ErrorMessage } from "@/components/error-message"
import Image from "next/image"
import type { Metadata } from "next"
import { generateBlogListingStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Blog | MinikAdlar",
  description: "Bebek isimleri, çocuk gelişimi ve ebeveynlik hakkında en güncel bilgiler ve öneriler.",
  alternates: {
    canonical: "/blog",
  },
}

async function BlogPostsList() {
  try {
    const { results: posts } = await getNotionBlogPosts()

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz blog yazısı bulunmamaktadır.</p>
        </div>
      )
    }

    const allTags = Array.from(new Set(posts.flatMap((post) => post.properties.Tags?.multi_select || [])))

    const structuredData = generateBlogListingStructuredData({
      title: "Blog | MinikAdlar",
      description: "Bebek isimleri, çocuk gelişimi ve ebeveynlik hakkında en güncel bilgiler ve öneriler.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      posts: posts.map((post) => {
        const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
        const slug = slugify(title)
        const tag = post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"
        const slugifiedTag = slugify(tag)
        const imageKey =
          post.cover?.type === "external"
            ? post.cover.external.url.split("key=")[1].split("&")[0]
            : "default-image.webp"

        return {
          title,
          description: post.properties.Description?.rich_text?.[0]?.plain_text || "",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slugifiedTag}/${slug}`,
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
      ],
    })

    return (
      <>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Kategoriler</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Button key={tag.name} variant="outline" asChild>
                <Link href={`/blog/${slugify(tag.name)}`}>{tag.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
            const slug = slugify(title)
            const tag = post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"
            const slugifiedTag = slugify(tag)
            const publishDate = post.properties.Published?.date?.start || new Date().toISOString()
            const description = post.properties.Description?.rich_text?.[0]?.plain_text || "No description available."
            const imageKey =
              post.cover?.type === "external"
                ? post.cover.external.url.split("key=")[1].split("&")[0]
                : "default-image.webp"

            return (
              <Card key={post.id} className="overflow-hidden flex flex-col">
                <Link href={`/blog/${slugifiedTag}/${slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={generateImageUrl(imageKey, 800, 600) || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, 100vw"
                    />
                    {post.icon?.emoji && <span className="absolute left-4 bottom-4 text-2xl">{post.icon.emoji}</span>}
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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <Suspense fallback={<LoadingPosts />}>
            <BlogPostsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

