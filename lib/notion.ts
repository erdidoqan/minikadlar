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
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data: NotionResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error in getNotionBlogPosts:", error)
    throw error
  }
}

export async function getNotionBlogPostById(id: string): Promise<NotionBlogPost> {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("Notion API key is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-02-22",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: NotionBlogPost = await response.json()
    console.log("Notion API response for single post:", JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error("Error fetching Notion blog post:", error)
    throw error
  }
}

export async function getNotionBlocksByPageId(pageId: string): Promise<NotionBlock[]> {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("Notion API key is missing")
    }

    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-02-22",
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error in getNotionBlocksByPageId:", error)
    throw error
  }
}

