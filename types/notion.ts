export interface NotionResponse {
  object: string
  results: NotionBlogPost[]
}

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
  }
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

export interface NotionBlock {
  object: string
  id: string
  type: string
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
  [key: string]: any // Bu, farklı blok tiplerini desteklemek için
}

export interface NotionHeading1Block extends NotionBlock {
  type: "heading_1"
  heading_1: {
    rich_text: Array<{
      type: string
      text: {
        content: string
        link: null | { url: string }
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null | string
    }>
    is_toggleable: boolean
    color: string
  }
}

export interface NotionHeading2Block extends NotionBlock {
  type: "heading_2"
  heading_2: {
    rich_text: Array<{
      type: string
      text: {
        content: string
        link: null | { url: string }
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: false
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null | string
    }>
    is_toggleable: boolean
    color: string
  }
}

export interface NotionHeading3Block extends NotionBlock {
  type: "heading_3"
  heading_3: {
    rich_text: Array<{
      type: string
      text: {
        content: string
        link: null | { url: string }
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: false
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null | string
    }>
    is_toggleable: boolean
    color: string
  }
}

export interface NotionBulletedListItemBlock extends NotionBlock {
  type: "bulleted_list_item"
  bulleted_list_item: {
    rich_text: Array<{
      type: string
      text: {
        content: string
        link: null | { url: string }
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null | string
    }>
    color: string
  }
}

export interface NotionParagraphBlock extends NotionBlock {
  type: "paragraph"
  paragraph: {
    rich_text: Array<{
      type: string
      text: {
        content: string
        link: null | { url: string }
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null | string
    }>
    color: string
  }
}

export interface NotionEmbedBlock extends NotionBlock {
  type: "embed"
  embed: {
    url: string
    caption?: Array<{
      plain_text: string
    }>
  }
}
