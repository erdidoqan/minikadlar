import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      allow: "/_next/static/media",
      allow: "/_next/static/css",
      allow: "/_next/static/chunks",
      disallow: "/_next/",
      disallow: "/404.html",
      disallow: "/private/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    // RSS feed'i ekle
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_SITE_URL}/rss`],
  }
}
