interface StructuredDataProps {
  title: string
  description: string
  publishedTime: string
  modifiedTime: string
  authorName: string
  authorUrl: string
  organizationName: string
  organizationLogo: string
  organizationUrl: string
  imageUrl: string
  url: string
  breadcrumbs: Array<{
    name: string
    item: string
  }>
}

export function generateStructuredData({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  authorUrl,
  organizationName,
  organizationLogo,
  organizationUrl,
  imageUrl,
  url,
  breadcrumbs,
}: StructuredDataProps) {
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    name: organizationName,
    publisher: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo,
      },
    },
  }

  const imageSchema = {
    "@type": "ImageObject",
    url: imageUrl,
    width: 1200,
    height: 800,
  }

  const personSchema = {
    "@type": "Person",
    name: authorName,
    url: authorUrl,
  }

  const organizationSchema = {
    "@type": "Organization",
    name: organizationName,
    logo: {
      "@type": "ImageObject",
      url: organizationLogo,
    },
    url: organizationUrl,
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": breadcrumb.item,
        name: breadcrumb.name,
      },
    })),
  }

  const articleSchema = {
    "@type": "Article",
    headline: title,
    description: description,
    image: imageSchema,
    author: personSchema,
    publisher: organizationSchema,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  const webPageSchema = {
    "@type": "WebPage",
    "@id": url,
    url: url,
    name: title,
    description: description,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: personSchema,
    publisher: organizationSchema,
    image: imageSchema,
    breadcrumb: breadcrumbSchema,
    isPartOf: websiteSchema,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema,
      imageSchema,
      personSchema,
      organizationSchema,
      breadcrumbSchema,
      articleSchema,
      webPageSchema,
    ],
  }
}

interface BlogListingStructuredDataProps {
  title: string
  description: string
  url: string
  posts: Array<{
    title: string
    description: string
    url: string
    imageUrl: string
    publishDate: string
  }>
  breadcrumbs: Array<{
    name: string
    item: string
  }>
}

export function generateBlogListingStructuredData({
  title,
  description,
  url,
  posts,
  breadcrumbs,
}: BlogListingStructuredDataProps) {
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    name: "MinikAdlar",
    publisher: {
      "@type": "Organization",
      name: "MinikAdlar",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  }

  const organizationSchema = {
    "@type": "Organization",
    name: "MinikAdlar",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    },
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": breadcrumb.item,
        name: breadcrumb.name,
      },
    })),
  }

  const itemListSchema = {
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: post.url,
        image: post.imageUrl,
        datePublished: post.publishDate,
        publisher: organizationSchema,
      },
    })),
  }

  const webPageSchema = {
    "@type": "WebPage",
    "@id": url,
    url: url,
    name: title,
    description: description,
    breadcrumb: breadcrumbSchema,
    publisher: organizationSchema,
    isPartOf: websiteSchema,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, organizationSchema, breadcrumbSchema, itemListSchema, webPageSchema],
  }
}

