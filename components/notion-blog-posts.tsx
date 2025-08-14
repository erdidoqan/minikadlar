import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { getNotionBlogPosts } from "@/lib/notion"
import { formatDate, generateImageUrl, getNotionSlug } from "@/lib/utils"
import { LoadingPosts } from "./loading-posts"
import { ErrorMessage } from "./error-message"
import type { NotionBlogPost } from "@/types/notion"

async function BlogPostsList() {
  try {
    console.log("Fetching blog posts...")
    const { results: posts } = await getNotionBlogPosts()
    console.log("Fetched blog posts:", posts)

    if (!posts || posts.length === 0) {
      console.log("No blog posts found")
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz blog yazısı bulunmamaktadır.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post: NotionBlogPost) => {
          console.log("Rendering post:", post.id)
          const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
          const tag = post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"
          const publishDate = post.properties.Published?.date?.start || new Date().toISOString()
          const description = post.properties.Description?.rich_text?.[0]?.plain_text || "No description available."

          // Safely extract the image key with a fallback
          const imageKey =
            post.cover?.type === "external"
              ? post.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
              : "default-image.webp"

          console.log(`Generated URL: /isim/${getNotionSlug(post)}`)

          return (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <Link href={`/isim/${getNotionSlug(post)}`} className="flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={generateImageUrl(imageKey, 800, 600) || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 25%, (min-width: 1024px) 33%, (min-width: 640px) 50%, 100vw"
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
                      <Badge key={tag.name} variant="secondary" className={`bg-${tag.color}-100 text-${tag.color}-800`}>
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

export function NotionBlogPosts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Blog Yazıları</h2>

          <Suspense fallback={<LoadingPosts />}>
            <BlogPostsList />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
