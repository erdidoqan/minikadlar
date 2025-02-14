import type { MetadataRoute } from "next"
import { getNotionBlogPosts } from "@/lib/notion"
import { slugify } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://minikadlar.com"

  // Fetch blog posts from Notion
  const { results: posts } = await getNotionBlogPosts()

  // Generate blog post URLs
  const blogUrls = posts.map((post) => {
    const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
    const slug = slugify(title)
    const tag = post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"
    const slugifiedTag = slugify(tag)
    const publishDate = post.properties.Published?.date?.start || new Date().toISOString()

    return {
      url: `${baseUrl}/blog/${slugifiedTag}/${slug}`,
      lastModified: new Date(publishDate),
    }
  })

  // Define static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    // Add more static pages as needed
  ]

  // Combine static pages and blog post URLs
  return [...staticPages, ...blogUrls]
}

