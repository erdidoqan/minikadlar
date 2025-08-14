import type { MetadataRoute } from "next"
import { getNotionSitemap } from "@/lib/notion"
import { getNotionSlug } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://minikadlar.com"

  // Fetch blog posts from Notion
  const { results: posts } = await getNotionSitemap()

  // Generate blog post URLs
  const blogUrls = posts.map((post) => {
    const slug = getNotionSlug(post)
    const publishDate = post.properties.Published?.date?.start || new Date().toISOString()

    return {
      url: `${baseUrl}/isim/${slug}`,
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
      url: `${baseUrl}/isim`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/populer-isimler`,
      lastModified: new Date(),
    },
    // Add more static pages as needed
  ]

  // Combine static pages and blog post URLs
  return [...staticPages, ...blogUrls]
}
