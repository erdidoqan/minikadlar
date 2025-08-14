export interface NotionBlogPost {
  id: string
  cover?: {
    type: string
    external?: {
      url: string
    }
  }
  icon?: {
    type: string
    emoji?: string
  }
  properties: {
    Name?: {
      title?: Array<{
        plain_text?: string
      }>
    }
    Published?: {
      date?: {
        start?: string
      }
    }
    Slug?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    Tags?: {
      multi_select?: Array<{
        name: string
        color: string
      }>
    }
    "AI custom autofill"?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    Description?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    URL?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
  }
  last_edited_time?: string
}

export interface NotionNameEntry {
  id: string
  cover?: {
    type: string
    external?: {
      url: string
    }
  }
  icon?: {
    type: string
    emoji?: string
  }
  properties: {
    Name?: {
      title?: Array<{
        plain_text?: string
      }>
    }
    Published?: {
      date?: {
        start?: string
      }
    }
    Slug?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    Tags?: {
      multi_select?: Array<{
        name: string
        color: string
      }>
    }
    Description?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    Meaning?: {
      rich_text?: Array<{
        plain_text?: string
      }>
    }
    Origin?: {
      select?: {
        name: string
      }
    }
    Gender?: {
      select?: {
        name: string
      }
    }
  }
  last_edited_time?: string
}
