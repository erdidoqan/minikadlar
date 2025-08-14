import React from "react"
import Image from "next/image"
import Link from "next/link"
import { generateImageUrl } from "@/lib/utils"
import type { NotionBlock } from "@/types/notion"

export function renderBlock(block: NotionBlock): React.ReactNode {
  // Blok tipi kontrolü
  if (!block || !block.type) {
    console.error("Invalid block:", block)
    return null
  }

  const { type, id } = block

  try {
    switch (type) {
      case "paragraph":
        if (!block.paragraph?.rich_text) {
          return <p className="my-4"></p>
        }
        return (
          <p className="my-4">
            {block.paragraph.rich_text.map((text, i) => {
              if (!text) return null

              const {
                annotations = {
                  bold: false,
                  code: false,
                  color: "default",
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
                text: textContent = { content: "", link: null },
              } = text

              // Stil sınıflarını oluştur
              const textClasses = [
                annotations.bold ? "font-bold" : "",
                annotations.code ? "font-mono bg-gray-100 rounded px-1" : "",
                annotations.italic ? "italic" : "",
                annotations.strikethrough ? "line-through" : "",
                annotations.underline ? "underline" : "",
                annotations.color !== "default" ? `text-${annotations.color}` : "",
              ]
                .filter(Boolean)
                .join(" ")

              return (
                <React.Fragment key={i}>
                  {textContent.link ? (
                    <Link href={textContent.link.url} className={`text-primary hover:underline ${textClasses}`}>
                      {textContent.content}
                    </Link>
                  ) : (
                    <span className={textClasses}>{textContent.content}</span>
                  )}
                </React.Fragment>
              )
            })}
          </p>
        )

      case "heading_1":
        if (!block.heading_1?.rich_text) {
          return <h1 className="text-3xl font-bold mt-8 mb-4"></h1>
        }
        return (
          <h1 className="text-3xl font-bold mt-8 mb-4">
            {block.heading_1.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </h1>
        )

      case "heading_2":
        if (!block.heading_2?.rich_text) {
          return <h2 className="text-2xl font-bold mt-8 mb-4 font-mulish"></h2>
        }
        return (
          <h2 className="text-2xl font-bold mt-8 mb-4 font-mulish">
            {block.heading_2.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </h2>
        )

      case "heading_3":
        if (!block.heading_3?.rich_text) {
          return <h3 className="text-xl font-bold mt-6 mb-3 font-mulish"></h3>
        }
        return (
          <h3 className="text-xl font-bold mt-6 mb-3 font-mulish">
            {block.heading_3.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </h3>
        )

      case "bulleted_list_item":
        if (!block.bulleted_list_item?.rich_text) {
          return <li></li>
        }
        return (
          <li>
            {block.bulleted_list_item.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </li>
        )

      case "numbered_list_item":
        if (!block.numbered_list_item?.rich_text) {
          return <li></li>
        }
        return (
          <li>
            {block.numbered_list_item.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </li>
        )

      case "image":
        if (!block.image) {
          return null
        }

        const imageSource = block.image.type === "external" ? block.image.external?.url : block.image.file?.url

        if (!imageSource) {
          return null
        }

        const imageKey = imageSource.includes("key=") ? imageSource.split("key=")[1]?.split("&")[0] : null
        const caption = block.image.caption?.length ? block.image.caption[0]?.plain_text : "Görsel"

        return (
          <figure className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={imageKey ? generateImageUrl(imageKey, 1200, 800) : imageSource}
                alt={caption}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1024px, 100vw"
              />
            </div>
            {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
          </figure>
        )

      case "embed":
        if (!block.embed?.url) {
          return null
        }

        if (block.embed.url.includes("youtube.com") || block.embed.url.includes("youtu.be")) {
          return (
            <div className="my-8 aspect-video">
              <iframe
                src={block.embed.url.replace("youtube.com/watch?v=", "youtube.com/embed/")}
                className="w-full h-full rounded-lg"
                title="YouTube video"
                allowFullScreen
              />
            </div>
          )
        }
        return (
          <div className="my-8">
            <a
              href={block.embed.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {block.embed.url}
            </a>
          </div>
        )

      case "divider":
        return <hr className="my-8" />

      case "quote":
        if (!block.quote?.rich_text) {
          return <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-6 italic"></blockquote>
        }
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-6 italic">
            {block.quote.rich_text.map((text, i) => (
              <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
            ))}
          </blockquote>
        )

      case "code":
        if (!block.code?.rich_text) {
          return (
            <pre className="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
              <code></code>
            </pre>
          )
        }
        return (
          <pre className="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
            <code>
              {block.code.rich_text.map((text, i) => (
                <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
              ))}
            </code>
          </pre>
        )

      case "callout":
        if (!block.callout?.rich_text) {
          return <div className="bg-gray-100 p-4 rounded-lg my-6 flex items-start"></div>
        }
        return (
          <div className="bg-gray-100 p-4 rounded-lg my-6 flex items-start">
            {block.callout.icon?.emoji && <div className="mr-4 text-2xl">{block.callout.icon.emoji}</div>}
            <div>
              {block.callout.rich_text.map((text, i) => (
                <React.Fragment key={i}>{text?.plain_text || ""}</React.Fragment>
              ))}
            </div>
          </div>
        )

      default:
        return <div className="text-gray-500 my-4">Desteklenmeyen blok tipi: {type}</div>
    }
  } catch (error) {
    console.error(`Error rendering block of type ${type}:`, error)
    return <div className="text-gray-500 my-4">Bu içerik gösterilemiyor</div>
  }
}
