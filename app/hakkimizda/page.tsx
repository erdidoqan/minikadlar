import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Lightbulb, Heart, Mail } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Hakkımızda | MinikAdlar - Bebek İsimleri ve Anlamları",
  description:
    "MinikAdlar'ın hikayesi, misyonu ve vizyonu. Türkiye'nin en kapsamlı bebek isimleri platformu hakkında bilgi edinin.",
  openGraph: {
    title: "Hakkımızda | MinikAdlar - Bebek İsimleri ve Anlamları",
    description:
      "MinikAdlar'ın hikayesi, misyonu ve vizyonu. Türkiye'nin en kapsamlı bebek isimleri platformu hakkında bilgi edinin.",
    url: "https://minikadlar.com/hakkimizda",
    siteName: "MinikAdlar",
    images: [
      {
        url: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-hakkimizda.webp",
        width: 1200,
        height: 630,
        alt: "MinikAdlar Ekibi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | MinikAdlar - Bebek İsimleri ve Anlamları",
    description:
      "MinikAdlar'ın hikayesi, misyonu ve vizyonu. Türkiye'nin en kapsamlı bebek isimleri platformu hakkında bilgi edinin.",
    images: ["https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-hakkimizda.webp"],
  },
  alternates: {
    canonical: "https://minikadlar.com/hakkimizda",
  },
}

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Hakkımızda | MinikAdlar",
            description:
              "MinikAdlar'ın hikayesi, misyonu ve vizyonu. Türkiye'nin en kapsamlı bebek isimleri platformu hakkında bilgi edinin.",
            url: "https://minikadlar.com/hakkimizda",
            mainEntity: {
              "@type": "Organization",
              name: "MinikAdlar",
              url: "https://minikadlar.com",
              logo: "https://minikadlar.com/logo.png",
              sameAs: [
                "https://www.facebook.com/minikadlar",
                "https://twitter.com/minikadlar",
                "https://www.instagram.com/minikadlar",
              ],
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-xl mb-8">MinikAdlar'ın hikayesi ve misyonu</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Biz Kimiz?</h2>
                <p>MinikAdlar, 2020 yılında kurulmuş, bebek isimleri konusunda Türkiye'nin en kapsamlı platformudur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Lightbulb className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Misyonumuz</h2>
                <p>Ebeveynlere çocukları için en uygun ve anlamlı isimleri bulma konusunda rehberlik etmek.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Değerlerimiz</h2>
                <p>Güvenilirlik, yenilikçilik ve kullanıcı odaklılık temel değerlerimizdir.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  MinikAdlar, 2020 yılında bir grup genç girişimci tarafından kuruldu. Amacımız, Türkiye'deki
                  ebeveynlere çocukları için en uygun isimleri bulma konusunda yardımcı olmaktı.
                </p>
                <p className="mb-4">
                  Başlangıçta küçük bir veritabanı ve basit bir arayüzle yola çıktık. Ancak zamanla, kullanıcılarımızın
                  geri bildirimleri ve teknolojik gelişmeler sayesinde platformumuzu sürekli geliştirdik.
                </p>
                <p>
                  Bugün, MinikAdlar olarak 50.000'den fazla isim, detaylı anlamlar, popülerlik istatistikleri ve yapay
                  zeka destekli öneriler sunuyoruz. Amacımız, Türkiye'deki her ebeveyne ulaşmak ve onlara en iyi hizmeti
                  sunmaktır.
                </p>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-hakkimizda.webp"
                  alt="MinikAdlar Ekibi"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover rounded-lg"
                  quality={90}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Ekibimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Ayşe Yılmaz",
                  role: "Kurucu & CEO",
                  image: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-ayse-yilmaz-kurucu.webp",
                },
                {
                  name: "Mehmet Kaya",
                  role: "Senior Developer",
                  image: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-mehmet-kaya-CTO.webp",
                },
                {
                  name: "Zeynep Demir",
                  role: "İçerik Yöneticisi",
                  image: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-zeynep-demir.webp",
                },
                {
                  name: "Can Öztürk",
                  role: "Veri Analisti",
                  image: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-can-ozturk.webp",
                },
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="relative h-40 mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Bize Ulaşın</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçmekten çekinmeyin.
                </p>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <a href="mailto:info@minikadlar.com" className="text-primary hover:underline">
                    info@minikadlar.com
                  </a>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/iletisim">İletişim Formu</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
