import { HeroSlider } from "./hero-slider"
import type { Slide } from "@/types/slider"

const slides: Slide[] = [
  {
    id: 1,
    title: "2025'in En Popüler Bebek İsimleri",
    description:
      "Bu yılın trend isimleri ve anlamlarını keşfedin. Uzman ekibimizin hazırladığı kapsamlı rehber ile doğru ismi bulun.",
    image: "minikadlar-slider-1.png",
    link: "/populer-isimler",
  },
  {
    id: 2,
    title: "Benzersiz Türk İsimleri",
    description:
      "Kültürümüzden gelen, anlamlı ve özgün isimler. Türk tarihinden ve mitolojisinden esinlenilen özel isim önerileri.",
    image: "minikadlar-slider-2.png",
    link: "/turk-isimleri",
  },
  {
    id: 3,
    title: "İsim DNA Analizi",
    description:
      "Yapay zeka destekli özel algoritmamız ile bebeğinize en uygun ismi bulun. Kişiselleştirilmiş isim önerileri için hemen başlayın.",
    image: "minikadlar-slider-1.png",
    link: "/isim-dna",
  },
  {
    id: 4,
    title: "İsim Anlamları Sözlüğü",
    description:
      "Binlerce ismin detaylı anlamları, kökenleri ve tarihi bilgileri. Türkiye'nin en kapsamlı isim veritabanı.",
    image: "minikadlar-slider-2.png",
    link: "/isim-sozlugu",
  },
]

export function Hero() {
  return (
    <section className="pt-16">
      <HeroSlider slides={slides} autoPlayInterval={6000} />

      {/* İstatistikler */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50.000+</div>
              <div className="text-gray-600">Benzersiz İsim</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100.000+</div>
              <div className="text-gray-600">Mutlu Ebeveyn</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5.000+</div>
              <div className="text-gray-600">Günlük Öneri</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

