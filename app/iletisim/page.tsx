import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "İletişim | MinikAdlar - Bebek İsimleri ve Anlamları",
  description:
    "MinikAdlar ile iletişime geçin. Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın.",
  openGraph: {
    title: "İletişim | MinikAdlar - Bebek İsimleri ve Anlamları",
    description:
      "MinikAdlar ile iletişime geçin. Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın.",
    url: "https://minikadlar.com/iletisim",
    siteName: "MinikAdlar",
    images: [
      {
        url: "https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-iletisim.webp",
        width: 1200,
        height: 630,
        alt: "MinikAdlar İletişim",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | MinikAdlar - Bebek İsimleri ve Anlamları",
    description:
      "MinikAdlar ile iletişime geçin. Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın.",
    images: ["https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-iletisim.webp"],
  },
  alternates: {
    canonical: "https://minikadlar.com/iletisim",
  },
}

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "İletişim | MinikAdlar",
            description:
              "MinikAdlar ile iletişime geçin. Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın.",
            url: "https://minikadlar.com/iletisim",
            mainEntity: {
              "@type": "Organization",
              name: "MinikAdlar",
              url: "https://minikadlar.com",
              logo: "https://minikadlar.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-212-123-4567",
                contactType: "customer service",
                email: "info@minikadlar.com",
                areaServed: "TR",
                availableLanguage: "Turkish",
              },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-xl mb-8">Bizimle iletişime geçin, sorularınızı yanıtlayalım</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Bize Ulaşın</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız
                    </label>
                    <Input type="text" id="name" placeholder="Adınız" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <Input type="email" id="email" placeholder="E-posta adresiniz" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Konu
                  </label>
                  <Input type="text" id="subject" placeholder="Mesajınızın konusu" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız
                  </label>
                  <Textarea id="message" placeholder="Mesajınızı buraya yazın" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Gönder
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">İletişim Bilgileri</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">E-posta</h3>
                      <a href="mailto:info@minikadlar.com" className="text-primary hover:underline">
                        info@minikadlar.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Telefon</h3>
                      <a href="tel:+902121234567" className="text-primary hover:underline">
                        +90 (212) 123 45 67
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Adres</h3>
                      <p>Örnek Mahallesi, Bebek Sokak No:1, 34000 Şişli/İstanbul</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Harita</h3>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://minikadlar-gallery.vercel.app/api/image?key=minikadlar-map.webp"
                    alt="MinikAdlar Ofis Konumu"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Sıkça Sorulan Sorular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "MinikAdlar'da isim önerisi nasıl alabilirim?",
                  answer:
                    "MinikAdlar'da isim önerisi almak için ana sayfamızdaki 'İsim DNA Testi' bölümünü kullanabilirsiniz. Tercihlerinizi belirttikten sonra size özel isim önerileri sunulacaktır.",
                },
                {
                  question: "İsim anlamları güvenilir mi?",
                  answer:
                    "Evet, isim anlamları güvenilirdir. Uzman ekibimiz tarafından kapsamlı araştırmalar sonucu elde edilen bilgiler sunulmaktadır. Ayrıca, kaynakları da belirtiyoruz.",
                },
                {
                  question: "Yeni bir isim önerisinde bulunabilir miyim?",
                  answer:
                    "Kesinlikle! Yeni isim önerilerinizi bize iletebilirsiniz. Önerileriniz uzman ekibimiz tarafından değerlendirilecek ve uygun bulunursa sitemize eklenecektir.",
                },
                {
                  question: "MinikAdlar mobil uygulaması var mı?",
                  answer:
                    "Şu an için mobil uygulamamız bulunmamaktadır, ancak web sitemiz mobil cihazlara uyumludur. Gelecekte bir mobil uygulama geliştirmeyi planlıyoruz.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
