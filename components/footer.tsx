import Link from "next/link"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = [
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
  { name: "Basın", href: "/basin" },
  { name: "Destek", href: "/destek" },
  { name: "Gizlilik", href: "/gizlilik" },
]

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/minikadlar" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/minikadlar" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/minikadlar" },
  { name: "Youtube", icon: Youtube, href: "https://youtube.com/minikadlar" },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Üst Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 block">
              MinikAdlar
            </Link>
            <p className="text-gray-600 max-w-md">
              Türkiye'nin en kapsamlı bebek isimleri platformu. Uzman ekibimiz tarafından hazırlanan içerikler ve modern
              araçlarla size en iyi hizmeti sunuyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/populer-isimler" className="text-gray-600 hover:text-primary">
                  Popüler İsimler
                </Link>
              </li>
              <li>
                <Link href="/isim-analizi" className="text-gray-600 hover:text-primary">
                  İsim Analizi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-600 hover:text-primary">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">Email: info@minikadlar.com</li>
              <li className="text-gray-600">Tel: +90 (212) 123 45 67</li>
              <li>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/iletisim">Bize Ulaşın</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt Footer */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Sol Navigasyon */}
            <nav className="flex flex-wrap gap-4 md:gap-8">
              {footerLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-gray-600 hover:text-primary">
                  {link.name}
                </Link>
              ))}
              <Button variant="secondary" size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary">
                Gizlilik Ayarlarını Değiştir
              </Button>
            </nav>

            {/* Sosyal Medya */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Telif Hakkı */}
          <div className="mt-8 pt-8 border-t text-center md:text-left">
            <p className="text-sm text-gray-600">
              © 2025 MinikAdlar. Tüm hakları saklıdır. MinikAdlar, MinikAdlar LLC.'nin tescilli markasıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
