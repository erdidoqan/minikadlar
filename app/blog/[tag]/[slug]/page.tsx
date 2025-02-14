import type {
  NotionHeading1Block,
  NotionHeading2Block,
  NotionHeading3Block,
  NotionImageBlock,
  NotionParagraphBlock,
  NotionBulletedListItemBlock,
  NotionNumberedListItemBlock,
  NotionToDoBlock,
  NotionToggleBlock,
  NotionQuoteBlock,
  NotionCalloutBlock,
} from "@/types/notion"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Mail, Facebook, Share2, CheckCircle2, AlertCircle } from "lucide-react"
import { getNotionBlogPosts, getNotionBlocksByPageId } from "@/lib/notion"
import { formatDate, slugify, capitalize, generateImageUrl, generateSEODescription } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { NotionBlock, NotionBlogPost } from "@/types/notion"
import Image from "next/image"
import type { Metadata } from "next"
import Script from "next/script"
import { generateStructuredData } from "@/lib/structured-data"

export async function generateStaticParams() {
  const { results: posts } = await getNotionBlogPosts()
  return posts.map((post) => ({
    tag: slugify(post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"),
    slug: slugify(post.properties.Name?.title?.[0]?.plain_text || ""),
  }))
}

export async function generateMetadata({ params }: { params: { tag: string; slug: string } }): Promise<Metadata> {
  const { results: posts } = await getNotionBlogPosts()
  const post = posts.find((p) => {
    const postSlug = slugify(p.properties.Name?.title?.[0]?.plain_text || "")
    const postTag = p.properties.Tags?.multi_select?.[0]?.name.toLowerCase() || ""
    return postSlug === params.slug && slugify(postTag) === slugify(params.tag)
  })

  if (!post) return {}

  const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
  const description = post.properties.Description?.rich_text?.[0]?.plain_text || ""

  return {
    title: `${title}`,
    description: generateSEODescription(description),
    openGraph: {
      title,
      description: generateSEODescription(description),
      type: "article",
      publishedTime: post.properties.Published?.date?.start,
      modifiedTime: post.last_edited_time,
      authors: ["MinikAdlar Editör"],
    },
    alternates: {
      canonical: `/blog/${params.tag}/${params.slug}`,
    },
  }
}

function NotionHeading1({ block, id }: { block: NotionHeading1Block; id: string }) {
  return (
    <h1 id={id} className="text-4xl font-bold mt-8 mb-4">
      {block.heading_1.rich_text[0].plain_text}
    </h1>
  )
}

function NotionHeading2({ block, id }: { block: NotionHeading2Block; id: string }) {
  return (
    <h2 id={id} className="text-3xl font-bold mt-6 mb-3">
      {block.heading_2.rich_text[0].plain_text}
    </h2>
  )
}

function NotionHeading3({ block, id }: { block: NotionHeading3Block; id: string }) {
  return (
    <h3 id={id} className="text-2xl font-bold mt-4 mb-2">
      {block.heading_3.rich_text[0].plain_text}
    </h3>
  )
}

function TableOfContents({ blocks }: { blocks: NotionBlock[] }) {
  const headings = blocks.filter(
    (block) => block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3",
  )

  if (headings.length === 0) return null

  return (
    <div className="w-64 hidden lg:block">
      <div className="sticky top-24 bg-gray-50 rounded-lg p-6">
        <span className="text-lg font-semibold mb-4 block">Bu Makalede</span>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="space-y-1">
            {headings.map((block) => {
              let text = ""
              let className = ""

              switch (block.type) {
                case "heading_1":
                  text = block.heading_1.rich_text[0].plain_text
                  className = "text-sm hover:text-primary"
                  break
                case "heading_2":
                  text = block.heading_2.rich_text[0].plain_text
                  className = "text-sm pl-4 hover:text-primary"
                  break
                case "heading_3":
                  text = block.heading_3.rich_text[0].plain_text
                  className = "text-sm pl-8 hover:text-primary"
                  break
              }

              const id = slugify(text)

              return (
                <a
                  key={block.id}
                  href={`#${id}`}
                  className={`block py-1.5 text-gray-600 transition-colors ${className}`}
                >
                  {text}
                </a>
              )
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}

function NotionImage({ block }: { block: NotionImageBlock }) {
  const src = block.image.type === "external" ? block.image.external.url : block.image.file.url
  const imageKey = src.split("key=")[1].split("&")[0]

  return (
    <figure className="my-8">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={generateImageUrl(imageKey, 1200, 800) || "/placeholder.svg"}
          alt={block.image.caption?.[0]?.plain_text || "Blog görseli"}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 768px, (min-width: 1024px) 672px, (min-width: 768px) 100vw, 100vw"
          priority={true}
        />
      </div>
      {block.image.caption && block.image.caption.length > 0 && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
          {block.image.caption[0].plain_text}
        </figcaption>
      )}
    </figure>
  )
}

function NotionParagraph({ block }: { block: NotionParagraphBlock }) {
  return (
    <p className="mb-4">
      {block.paragraph.rich_text.map((text, index) => (
        <span
          key={index}
          className={`${text.annotations.bold ? "font-bold" : ""} ${
            text.annotations.italic ? "italic" : ""
          } ${text.annotations.strikethrough ? "line-through" : ""} ${
            text.annotations.underline ? "underline" : ""
          } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
        >
          {text.text.content}
        </span>
      ))}
    </p>
  )
}

function NotionBulletedListItem({ block }: { block: NotionBulletedListItemBlock }) {
  return (
    <li className="mb-2">
      {block.bulleted_list_item.rich_text.map((text, index) => (
        <span
          key={index}
          className={`${text.annotations.bold ? "font-bold" : ""} ${
            text.annotations.italic ? "italic" : ""
          } ${text.annotations.strikethrough ? "line-through" : ""} ${
            text.annotations.underline ? "underline" : ""
          } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
        >
          {text.text.content}
        </span>
      ))}
    </li>
  )
}

function NotionNumberedListItem({ block }: { block: NotionNumberedListItemBlock }) {
  return (
    <li className="mb-2">
      {block.numbered_list_item.rich_text.map((text, index) => (
        <span
          key={index}
          className={`${text.annotations.bold ? "font-bold" : ""} ${
            text.annotations.italic ? "italic" : ""
          } ${text.annotations.strikethrough ? "line-through" : ""} ${
            text.annotations.underline ? "underline" : ""
          } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
        >
          {text.text.content}
        </span>
      ))}
    </li>
  )
}

function NotionToDo({ block }: { block: NotionToDoBlock }) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <Checkbox checked={block.to_do.checked} />
      <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {block.to_do.rich_text.map((text, index) => (
          <span
            key={index}
            className={`${text.annotations.bold ? "font-bold" : ""} ${
              text.annotations.italic ? "italic" : ""
            } ${text.annotations.strikethrough ? "line-through" : ""} ${
              text.annotations.underline ? "underline" : ""
            } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
          >
            {text.text.content}
          </span>
        ))}
      </label>
    </div>
  )
}

function NotionToggle({ block }: { block: NotionToggleBlock }) {
  return (
    <details className="mb-4">
      <summary className="font-medium cursor-pointer">
        {block.toggle.rich_text.map((text, index) => (
          <span
            key={index}
            className={`${text.annotations.bold ? "font-bold" : ""} ${
              text.annotations.italic ? "italic" : ""
            } ${text.annotations.strikethrough ? "line-through" : ""} ${
              text.annotations.underline ? "underline" : ""
            } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
          >
            {text.text.content}
          </span>
        ))}
      </summary>
      <div className="pl-4 mt-2">
        {block.toggle.children?.map((child) => (
          <div key={child.id}>{renderBlock(child)}</div>
        ))}
      </div>
    </details>
  )
}

function NotionQuote({ block }: { block: NotionQuoteBlock }) {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
      {block.quote.rich_text.map((text, index) => (
        <span
          key={index}
          className={`${text.annotations.bold ? "font-bold" : ""} ${
            text.annotations.italic ? "italic" : ""
          } ${text.annotations.strikethrough ? "line-through" : ""} ${
            text.annotations.underline ? "underline" : ""
          } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
        >
          {text.text.content}
        </span>
      ))}
    </blockquote>
  )
}

function NotionCallout({ block }: { block: NotionCalloutBlock }) {
  return (
    <div className="bg-gray-100 border-l-4 border-blue-500 p-4 my-4 rounded-r">
      <div className="flex items-center space-x-2">
        {block.callout.icon?.emoji && <span className="text-2xl">{block.callout.icon.emoji}</span>}
        {!block.callout.icon?.emoji && <AlertCircle className="h-5 w-5 text-blue-500" />}
        <div>
          {block.callout.rich_text.map((text, index) => (
            <span
              key={index}
              className={`${text.annotations.bold ? "font-bold" : ""} ${
                text.annotations.italic ? "italic" : ""
              } ${text.annotations.strikethrough ? "line-through" : ""} ${
                text.annotations.underline ? "underline" : ""
              } ${text.annotations.code ? "font-mono bg-gray-100 rounded px-1" : ""}`}
            >
              {text.text.content}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function NotionDivider() {
  return <hr className="my-8 border-t border-gray-300" />
}

// Add this new function to handle embed blocks
function NotionEmbed({ block }: { block: any }) {
  const imageUrl = block.embed.url
  const imageKey = imageUrl.split("key=")[1]

  return (
    <div className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={generateImageUrl(imageKey, 1200, 675) || "/placeholder.svg"}
          alt="Embedded content"
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
        />
      </div>
      {block.embed.caption && block.embed.caption.length > 0 && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
          {block.embed.caption[0].plain_text}
        </figcaption>
      )}
    </div>
  )
}

function renderBlock(block: NotionBlock) {
  const getHeadingId = (text: string) => slugify(text)

  switch (block.type) {
    case "heading_1":
      const h1Text = block.heading_1.rich_text[0].plain_text
      return <NotionHeading1 block={block as NotionHeading1Block} id={getHeadingId(h1Text)} />
    case "heading_2":
      const h2Text = block.heading_2.rich_text[0].plain_text
      return <NotionHeading2 block={block as NotionHeading2Block} id={getHeadingId(h2Text)} />
    case "heading_3":
      const h3Text = block.heading_3.rich_text[0].plain_text
      return <NotionHeading3 block={block as NotionHeading3Block} id={getHeadingId(h3Text)} />
    case "image":
      return <NotionImage block={block as NotionImageBlock} />
    case "paragraph":
      return <NotionParagraph block={block as NotionParagraphBlock} />
    case "bulleted_list_item":
      return <NotionBulletedListItem block={block as NotionBulletedListItemBlock} />
    case "numbered_list_item":
      return <NotionNumberedListItem block={block as NotionNumberedListItemBlock} />
    case "to_do":
      return <NotionToDo block={block as NotionToDoBlock} />
    case "toggle":
      return <NotionToggle block={block as NotionToggleBlock} />
    case "quote":
      return <NotionQuote block={block as NotionQuoteBlock} />
    case "callout":
      return <NotionCallout block={block as NotionCalloutBlock} />
    case "divider":
      return <NotionDivider />
    case "embed":
      return <NotionEmbed block={block} />
    default:
      console.log(`Unsupported block type: ${block.type}`)
      return null
  }
}

function RelatedPosts({ currentPostId, posts }: { currentPostId: string; posts: NotionBlogPost[] }) {
  const relatedPosts = posts.filter((post) => post.id !== currentPostId).slice(0, 3) // Sadece 3 ilgili yazı göster

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">İlgili Yazılar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => {
          const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
          const slug = slugify(title)
          const tag = post.properties.Tags?.multi_select?.[0]?.name || "uncategorized"
          const slugifiedTag = slugify(tag)
          const publishDate = post.properties.Published?.date?.start || new Date().toISOString()
          const description =
            post.properties["AI custom autofill"]?.rich_text?.[0]?.plain_text || "No description available."

          // Safely extract the image key with a fallback
          const imageKey =
            post.cover?.type === "external"
              ? post.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
              : "default-image.webp"

          return (
            <Card key={post.id} className="flex flex-col h-full">
              <Link href={`/blog/${slugifiedTag}/${slug}`} className="flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={generateImageUrl(imageKey, 800, 600) || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, 100vw"
                  />
                </div>
                <CardContent className="flex-grow">
                  <div className="mt-4">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{formatDate(publishDate)}</p>
                    <p className="text-gray-600 line-clamp-3">{description}</p>
                  </div>
                </CardContent>
                <CardFooter>
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
    </section>
  )
}

export default async function BlogPost({ params }) {
  const { tag, slug } = params

  try {
    const { results: posts } = await getNotionBlogPosts()
    const post = posts.find((p) => {
      const postSlug = slugify(p.properties.Name?.title?.[0]?.plain_text || "")
      const postTag = p.properties.Tags?.multi_select?.[0]?.name.toLowerCase() || ""
      return postSlug === slug && slugify(postTag) === slugify(tag)
    })

    if (!post) return notFound()

    const blocks = await getNotionBlocksByPageId(post.id)
    const title = post.properties.Name?.title?.[0]?.plain_text || "Untitled"
    const publishDate = post.properties.Published?.date?.start || new Date().toISOString()
    const author = "MinikAdlar Editör"
    const factChecker = "Uzman Editör"

    // Safely extract the image key with a fallback
    const imageKey =
      post.cover?.type === "external"
        ? post.cover.external.url.split("key=")[1]?.split("&")[0] || "default-image.webp"
        : "default-image.webp"

    const imageUrl = generateImageUrl(imageKey, 1200, 800)
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${tag}/${slug}`

    const structuredData = generateStructuredData({
      title,
      description: post.properties.Description?.rich_text?.[0]?.plain_text || "",
      publishedTime: publishDate,
      modifiedTime: post.last_edited_time,
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
          name: "Blog",
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
        },
        {
          name: capitalize(decodeURIComponent(tag).replace(/-/g, " ")),
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${tag}`,
        },
        {
          name: title,
          item: currentUrl,
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
        <div className="min-h-screen bg-white pt-16">
          {/* Breadcrumb */}
          <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Bebek İsimleri
                </Link>
                <span className="text-gray-400">&gt;</span>
                <Link href={`/blog/${tag}`} className="text-gray-600 hover:text-primary">
                  {capitalize(decodeURIComponent(tag).replace(/-/g, " "))}
                </Link>
              </nav>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Table of Contents */}
              <TableOfContents blocks={blocks} />

              {/* Main Content */}
              <article className="flex-1 max-w-3xl mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">{title}</h1>

                <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-8">
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
                  {blocks.map((block) => (
                    <div key={block.id}>{renderBlock(block)}</div>
                  ))}
                </div>

                {/* Related Posts */}
                <RelatedPosts currentPostId={post.id} posts={posts} />
              </article>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error("Error rendering blog post:", error)

    // Hata detaylarını loglayalım
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }

    // Notion API hatası mı kontrol edelim
    if (error.toString().includes("Notion")) {
      console.error("Possible Notion API error. Check API key and rate limits.")
    }

    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">Hata</h1>
        <p className="text-xl mb-8">Makale yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="bg-red-100 p-4 rounded overflow-auto">{JSON.stringify(error, null, 2)}</pre>
        )}
      </div>
    )
  }
}

