import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function slugify(text: string): string {
  const turkishChars: { [key: string]: string } = {
    ğ: "g",
    Ğ: "G",
    ü: "u",
    Ü: "U",
    ş: "s",
    Ş: "S",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ç: "c",
    Ç: "C",
  }

  return text
    .toString()
    .toLowerCase()
    .replace(/[ğüşıöçĞÜŞİÖÇ]/g, (char) => turkishChars[char] || char)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function generateImageUrl(key: string | undefined, width: number, height: number): string {
  const defaultKey = "default-image.webp"
  const safeKey = key || defaultKey
  return `https://minikadlar-gallery.vercel.app/api/image?key=${safeKey}&width=${width}&height=${height}`
}

export function generateSEODescription(content: string, maxLength = 160): string {
  // Remove HTML tags if any
  const plainText = content.replace(/<[^>]+>/g, "")

  // Truncate to maxLength and add ellipsis if needed
  if (plainText.length <= maxLength) {
    return plainText
  }

  return plainText.slice(0, maxLength).trim() + "..."
}

