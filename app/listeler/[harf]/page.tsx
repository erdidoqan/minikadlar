import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { MiniNameCard } from "@/components/names/mini-name-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNotionNamesByLetter } from "@/lib/notion"
import { formatNameData } from "@/lib/utils"

interface Props {
  params: {
    harf: string
  }
}

// Türkçe alfabe kontrolü
const validLetters = new Set([
  "a",
  "b",
  "c",
  "ç",
  "d",
  "e",
  "f",
  "g",
  "h",
  "ı",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "ö",
  "p",
  "r",
  "s",
  "ş",
  "t",
  "u",
  "ü",
  "v",
  "y",
  "z",
])

export function generateMetadata({ params }: Props): Metadata {
  const letter = params.harf.toLowerCase()
  if (!validLetters.has(letter)) return {}

  const capitalLetter = letter.toUpperCase()

  return {
    title: `${capitalLetter} Harfi ile Başlayan İsimler | MinikAdlar`,
    description: `${capitalLetter} harfi ile başlayan kız ve erkek bebek isimleri listesi. İsimlerin anlamları ve özellikleri.`,
    openGraph: {
      title: `${capitalLetter} Harfi ile Başlayan İsimler | MinikAdlar`,
      description: `${capitalLetter} harfi ile başlayan kız ve erkek bebek isimleri listesi. İsimlerin anlamları ve özellikleri.`,
      url: `https://minikadlar.com/listeler/${letter}`,
    },
  }
}

export default async function LetterPage({ params }: Props) {
  const letter = params.harf.toLowerCase()

  try {
    // Geçersiz harf kontrolü
    if (!validLetters.has(letter)) {
      return notFound()
    }

    const capitalLetter = letter.toUpperCase()

    // Notion'dan verileri çekelim
    const [boyNamesResponse, girlNamesResponse] = await Promise.all([
      getNotionNamesByLetter(letter, "boy"),
      getNotionNamesByLetter(letter, "girl"),
    ])

    // Verileri formatlayalım
    const boyNames = boyNamesResponse.results.map(formatNameData)
    const girlNames = girlNamesResponse.results.map(formatNameData)

    // Eğer hem erkek hem kız isimleri boşsa 404 göster
    if (boyNames.length === 0 && girlNames.length === 0) {
      return notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-primary">
                Ana Sayfa
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link href="/listeler" className="text-gray-600 hover:text-primary">
                İsim Listeleri
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900">{capitalLetter} Harfi</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{capitalLetter} Harfi ile Başlayan İsimler</h1>
            <p className="text-gray-600 mb-8">
              {capitalLetter} harfi ile başlayan tüm bebek isimlerini bu sayfada bulabilirsiniz. İsimleri cinsiyete göre
              filtreleyebilir ve detaylı bilgilere ulaşabilirsiniz.
            </p>

            <div className="mb-8">
              <Tabs defaultValue={boyNames.length > 0 ? "boy" : "girl"} className="w-full">
                <TabsList className="w-full md:w-auto justify-start mb-6 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="boy"
                    disabled={boyNames.length === 0}
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    Erkek İsimleri ({boyNames.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="girl"
                    disabled={girlNames.length === 0}
                    className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700"
                  >
                    Kız İsimleri ({girlNames.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="boy" className="mt-4">
                  {boyNames.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {boyNames.map((name, index) => (
                        <MiniNameCard key={name.id} name={name.name} rank={index + 1} link={name.link} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-gray-500">{capitalLetter} harfi ile başlayan erkek ismi bulunamadı.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="girl" className="mt-4">
                  {girlNames.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {girlNames.map((name, index) => (
                        <MiniNameCard key={name.id} name={name.name} rank={index + 1} link={name.link} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-gray-500">{capitalLetter} harfi ile başlayan kız ismi bulunamadı.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in LetterPage:", error)
    return notFound()
  }
}
