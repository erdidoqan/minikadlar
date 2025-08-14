import { Mail, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContentSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-6">
          {/* Paylaşım Butonları */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">PAYLAŞ</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email ile paylaş</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook'ta paylaş</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter'da paylaş</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
              BAĞLANTIYI KOPYALA
            </Button>
          </div>

          {/* Ana İçerik */}
          <div className="prose prose-lg max-w-none">
            <p>
              MinikAdlar, bebek isimleri konusunda <em>Türkiye'nin en kapsamlı platformudur</em>. Dünyaca ünlü{" "}
              <Link href="/uzmanlar" className="text-primary hover:text-primary/90">
                isim uzmanları
              </Link>{" "}
              tarafından oluşturulan içeriklerimizde{" "}
              <Link href="/populer-isimler" className="text-primary hover:text-primary/90">
                popüler isimler
              </Link>{" "}
              ve{" "}
              <Link href="/benzersiz-isimler" className="text-primary hover:text-primary/90">
                benzersiz isimler
              </Link>
              , en son{" "}
              <Link href="/isim-trendleri" className="text-primary hover:text-primary/90">
                isim trendleri
              </Link>{" "}
              ve en doğru{" "}
              <Link href="/isim-anlamlari" className="text-primary hover:text-primary/90">
                isim anlamları
              </Link>
              nı bulabilirsiniz. Ayrıca devrim niteliğindeki{" "}
              <Link href="/isim-uretici" className="text-primary hover:text-primary/90">
                isim üretici
              </Link>{" "}
              aracımız ile bebeğinizin kişiliğine uygun ismi analiz edebilirsiniz. MinikAdlar, çocuğunuz için en güzel
              ismi bulmanızda yanınızda.
            </p>
          </div>

          {/* İsim Bulma Bölümü */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Bebeğinize İsim Bulalım</h2>
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">Sizin için özel isimler arıyoruz</h3>
                <p className="text-gray-600 mb-6">
                  Bebeğiniz için en uygun ismi bulmak için yapay zeka destekli algoritmamızı kullanın.
                  Kişiselleştirilmiş öneriler için hemen başlayın.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  İsim DNA Testini Başlat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
