import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getNotionSlug } from "@/lib/utils"
import type { NotionNameEntry } from "@/types/notion"

interface RelatedNamesProps {
  currentNameId: string
  names: NotionNameEntry[]
}

export function RelatedNames({ currentNameId, names }: RelatedNamesProps) {
  // Rastgele 3 ilgili isim seç (mevcut isim hariç)
  const relatedNames = names
    .filter((name) => name.id !== currentNameId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  if (relatedNames.length === 0) {
    return null
  }

  return (
    <div className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">İlgili İsimler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedNames.map((name) => {
          const title = name.properties.Name?.title?.[0]?.plain_text || "Untitled"
          const slug = getNotionSlug(name)
          const gender = name.properties.Gender?.select?.name || "Unisex"
          const origin = name.properties.Origin?.select?.name || "Bilinmiyor"

          return (
            <Link key={name.id} href={`/isim/${slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 rounded-full ${gender === "Erkek" ? "bg-blue-100 text-blue-800" : gender === "Kız" ? "bg-pink-100 text-pink-800" : "bg-purple-100 text-purple-800"}`}
                    >
                      {gender}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">{origin}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
