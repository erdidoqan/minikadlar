import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "İsim Listeleri | MinikAdlar",
  description:
    "Harflere göre kategorize edilmiş bebek isimleri listeleri. Kız ve erkek bebek isimleri için kapsamlı rehber.",
  openGraph: {
    title: "İsim Listeleri | MinikAdlar",
    description:
      "Harflere göre kategorize edilmiş bebek isimleri listeleri. Kız ve erkek bebek isimleri için kapsamlı rehber.",
    url: "https://minikadlar.com/listeler",
  },
}

const alphabet = [
  { letter: "A", count: { total: 245, boy: 125, girl: 120 } },
  { letter: "B", count: { total: 180, boy: 90, girl: 90 } },
  { letter: "C", count: { total: 120, boy: 60, girl: 60 } },
  { letter: "Ç", count: { total: 85, boy: 45, girl: 40 } },
  { letter: "D", count: { total: 150, boy: 75, girl: 75 } },
  { letter: "E", count: { total: 200, boy: 100, girl: 100 } },
  { letter: "F", count: { total: 90, boy: 45, girl: 45 } },
  { letter: "G", count: { total: 130, boy: 65, girl: 65 } },
  { letter: "H", count: { total: 110, boy: 55, girl: 55 } },
  { letter: "I", count: { total: 45, boy: 25, girl: 20 } },
  { letter: "İ", count: { total: 160, boy: 80, girl: 80 } },
  { letter: "J", count: { total: 20, boy: 10, girl: 10 } },
  { letter: "K", count: { total: 220, boy: 110, girl: 110 } },
  { letter: "L", count: { total: 75, boy: 35, girl: 40 } },
  { letter: "M", count: { total: 190, boy: 95, girl: 95 } },
  { letter: "N", count: { total: 130, boy: 65, girl: 65 } },
  { letter: "O", count: { total: 60, boy: 30, girl: 30 } },
  { letter: "Ö", count: { total: 50, boy: 25, girl: 25 } },
  { letter: "P", count: { total: 70, boy: 35, girl: 35 } },
  { letter: "R", count: { total: 85, boy: 45, girl: 40 } },
  { letter: "S", count: { total: 170, boy: 85, girl: 85 } },
  { letter: "Ş", count: { total: 45, boy: 25, girl: 20 } },
  { letter: "T", count: { total: 140, boy: 70, girl: 70 } },
  { letter: "U", count: { total: 65, boy: 35, girl: 30 } },
  { letter: "Ü", count: { total: 40, boy: 20, girl: 20 } },
  { letter: "V", count: { total: 35, boy: 20, girl: 15 } },
  { letter: "Y", count: { total: 120, boy: 60, girl: 60 } },
  { letter: "Z", count: { total: 80, boy: 40, girl: 40 } },
]

export default function ListsPage() {
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
            <span className="text-gray-900">İsim Listeleri</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">İsim Listeleri</h1>
          <p className="text-gray-600 mb-8">
            Türk alfabesindeki her harf için özenle hazırlanmış bebek isimleri listelerimizi inceleyebilirsiniz. Her
            kategoride kız ve erkek bebek isimleri ayrı ayrı listelenmiştir.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {alphabet.map((item) => (
              <Link key={item.letter} href={`/listeler/${item.letter.toLowerCase()}`}>
                <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl font-bold text-primary mb-2">{item.letter}</div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium text-gray-900">{item.count.total} isim</div>
                    <div className="text-xs">
                      {item.count.boy} erkek • {item.count.girl} kız
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Nasıl Kullanılır?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                İsim listelerimizi kullanmak çok kolay! Yukarıdaki harflerden birine tıklayarak o harfle başlayan tüm
                isimleri görebilirsiniz. Her harf kategorisinde:
              </p>
              <ul>
                <li>İsimlerin anlamları</li>
                <li>Köken bilgileri</li>
                <li>Popülerlik dereceleri</li>
                <li>Cinsiyet bazlı filtreleme</li>
              </ul>
              <p>
                gibi detaylı bilgilere ulaşabilirsiniz. Ayrıca beğendiğiniz isimleri favorilerinize ekleyebilir ve daha
                sonra tekrar inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
