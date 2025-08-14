import type { NotionResponse, NotionBlogPost, NotionBlock } from "@/types/notion"

export async function getNotionBlogPosts(): Promise<NotionResponse> {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Notion API key or Database ID is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-02-22",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          date: {
            is_not_empty: true,
          },
        },
        sorts: [
          {
            property: "Published",
            direction: "descending",
          },
        ],
        page_size: 12,
      }),
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data: NotionResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error in getNotionBlogPosts:", error)
    // Boş bir yanıt döndür, hata fırlatma
    return { object: "list", results: [] }
  }
}

export async function getNotionSitemap(): Promise<NotionResponse> {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      throw new Error("Notion API key or Database ID is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-02-22",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          date: {
            is_not_empty: true,
          },
        },
        sorts: [
          {
            property: "Published",
            direction: "descending",
          },
        ],
      }),
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data: NotionResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error in getNotionSitemap:", error)
    // Boş bir yanıt döndür, hata fırlatma
    return { object: "list", results: [] }
  }
}

export async function getNotionNameEntries(): Promise<NotionResponse> {
  try {
    console.log("getNotionNameEntries: Starting to fetch names")

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_NAMES_DATABASE_ID) {
      console.error("Notion API key or Names Database ID is missing:", {
        apiKey: !!process.env.NOTION_API_KEY,
        dbId: !!process.env.NOTION_NAMES_DATABASE_ID,
      })
      throw new Error("Notion API key veya Names Database ID eksik")
    }

    console.log("Fetching from Notion Names Database:", process.env.NOTION_NAMES_DATABASE_ID)

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_NAMES_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28", // Güncel Notion API versiyonu
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Name",
              title: {
                is_not_empty: true,
              },
            },
          ],
        },
        sorts: [
          {
            property: "Name",
            direction: "ascending",
          },
        ],
        page_size: 100,
      }),
      next: { revalidate: 3600 }, // 1 saat cache
    })

    console.log("Notion API response status:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Notion API Error:", errorBody)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Notion API response data:", {
      object: data.object,
      resultsCount: data.results?.length || 0,
      firstResult: data.results?.[0]?.id || "none",
    })

    // Veri doğrulama
    if (!data || !Array.isArray(data.results)) {
      console.error("Invalid Notion response:", data)
      throw new Error("Invalid Notion response format")
    }

    // Debug için log
    console.log(
      "Fetched names from Notion:",
      data.results.slice(0, 3).map((n) => ({
        id: n.id,
        name: n.properties.Name?.title?.[0]?.plain_text || "unnamed",
        url: n.properties.URL?.rich_text?.[0]?.plain_text || "no-url",
      })),
    )

    return data
  } catch (error) {
    console.error("Error fetching names:", error)
    // Boş bir yanıt döndür, hata fırlatma
    return { object: "list", results: [] }
  }
}

export async function getNotionNamesByLetter(letter: string, gender?: "boy" | "girl"): Promise<NotionResponse> {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_NAMES_DATABASE_ID) {
      throw new Error("Notion API key veya Names Database ID eksik")
    }

    const genderText = gender === "boy" ? "erkek" : gender === "girl" ? "kız" : null
    const tag = genderText ? `${letter} ${genderText}` : null

    const filter = {
      and: [
        {
          property: "Published",
          date: {
            is_not_empty: true,
          },
        },
        ...(tag
          ? [
              {
                property: "Tags",
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
      ],
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_NAMES_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-02-22",
      },
      body: JSON.stringify({
        filter,
        sorts: [
          {
            property: "Name", // İsimleri alfabetik sırala
            direction: "ascending",
          },
        ],
        page_size: 100, // Daha fazla sonuç göster
      }),
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data: NotionResponse = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching names for letter ${letter} and gender ${gender}:`, error)
    // Boş bir yanıt döndür, hata fırlatma
    return { object: "list", results: [] }
  }
}

export async function getNotionBlogPostById(id: string): Promise<NotionBlogPost | null> {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("Notion API key is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-02-22",
      },
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: NotionBlogPost = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching blog post by ID ${id}:`, error)
    return null
  }
}

export async function getNotionBlocksByPageId(pageId: string): Promise<NotionBlock[]> {
  try {
    console.log("Fetching blocks for page ID:", pageId)

    if (!process.env.NOTION_API_KEY) {
      throw new Error("Notion API key is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-02-22",
      },
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data = await response.json()
    console.log(`Fetched ${data.results?.length || 0} blocks for page ID ${pageId}`)
    return data.results || []
  } catch (error) {
    console.error(`Error fetching blocks for page ID ${pageId}:`, error)
    return []
  }
}

// Doğrudan slug ile isim getiren fonksiyon
export async function getNotionNameBySlug(slug: string): Promise<NotionBlogPost | null> {
  try {
    console.log("getNotionNameBySlug: Starting to fetch name with slug:", slug)

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_NAMES_DATABASE_ID) {
      console.error("Notion API key or Names Database ID is missing")
      return null
    }

    // Önce URL property'sine göre ara
    const urlResponse = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_NAMES_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          filter: {
            property: "URL",
            rich_text: {
              contains: slug,
            },
          },
          page_size: 1,
        }),
        next: { revalidate: 3600 }, // 1 saat cache
      },
    )

    if (urlResponse.ok) {
      const urlData = await urlResponse.json()
      if (urlData.results && urlData.results.length > 0) {
        console.log("Found name by URL property:", urlData.results[0].id)
        return urlData.results[0]
      }
    }

    // URL property'sinde bulunamazsa, tüm isimleri al ve slug'a göre filtrele
    console.log("Name not found by URL, fetching all names...")
    const { results: names } = await getNotionNameEntries()

    if (!names || names.length === 0) {
      console.log("No names found in database")
      return null
    }

    console.log(`Checking ${names.length} names for slug match: ${slug}`)

    // İsimleri dolaş ve slug'a göre eşleştir
    for (const name of names) {
      try {
        // İsim kontrolü
        const title = name.properties.Name?.title?.[0]?.plain_text
        if (!title) continue

        // URL property kontrolü
        const urlProperty = name.properties.URL?.rich_text?.[0]?.plain_text
        if (urlProperty && urlProperty.includes(slug)) {
          console.log(`Found match by URL property: ${title}`)
          return name
        }

        // İsimden slug oluştur ve kontrol et
        const nameSlug = title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
        if (nameSlug === slug) {
          console.log(`Found match by name slug: ${title}`)
          return name
        }
      } catch (error) {
        console.error("Error processing name for slug match:", error)
        continue
      }
    }

    console.log("No matching name found for slug:", slug)
    return null
  } catch (error) {
    console.error("Error in getNotionNameBySlug:", error)
    return null
  }
}
