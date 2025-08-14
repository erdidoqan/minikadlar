import { getNotionNameEntries } from "@/lib/notion"
import { getNotionSlug, generateImageUrl } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Notion'dan verileri al
    const { results: names } = await getNotionNameEntries()

    // RSS feed başlığı oluştur
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>MinikAdlar - Bebek İsimleri ve Anlamları</title>
  <atom:link href="${process.env.NEXT_PUBLIC_SITE_URL}/rss" rel="self" type="application/rss+xml" />
  <link>${process.env.NEXT_PUBLIC_SITE_URL}</link>
  <description>Türkiye&apos;nin en kapsamlı bebek isimleri sitesi. İsim anlamları, popüler isimler, ve bebek ismi seçme rehberi.</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <language>tr-TR</language>
  <sy:updatePeriod>daily</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  <image>
    <url>${process.env.NEXT_PUBLIC_SITE_URL}/logo.png</url>
    <title>MinikAdlar - Bebek İsimleri ve Anlamları</title>
    <link>${process.env.NEXT_PUBLIC_SITE_URL}</link>
    <width>144</width>
    <height>144</height>
  </image>
  ${names
    .map((name) => {
      // Her isim için gerekli verileri çıkar
      const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
      const slug = getNotionSlug(name)
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/isim/${slug}`
      const publishDate = name.properties.Published?.date?.start || new Date().toISOString()
      const description = name.properties.Description?.rich_text?.[0]?.plain_text || ""

      // Görsel URL'sini oluştur
      const imageKey =
        name.cover?.type === "external"
          ? name.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
          : "default-image.webp"
      const imageUrl = generateImageUrl(imageKey, 1200, 630)

      // Her isim için RSS item oluştur
      return `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${url}</link>
    <pubDate>${new Date(publishDate).toUTCString()}</pubDate>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${description}]]></description>
    <media:content url="${imageUrl}" medium="image" width="1200" height="630" />
    <media:thumbnail url="${imageUrl}" width="1200" height="630" />
  </item>`
    })
    .join("")}
</channel>
</rss>`

    // XML içeriğini döndür
    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    })
  } catch (error) {
    console.error("RSS oluşturma hatası:", error)
    return new NextResponse("RSS oluşturulurken bir hata oluştu", { status: 500 })
  }
}

// XML için özel karakterleri escape et
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}
