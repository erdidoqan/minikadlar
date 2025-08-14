"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Menü</h2>
        <button onClick={onClose} className="p-2">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="block py-2 text-lg" onClick={onClose}>
              Ana Sayfa
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full py-2 text-lg"
              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            >
              İsimler
              <ChevronDown className={cn("h-5 w-5 transition-transform", isSubMenuOpen && "rotate-180")} />
            </button>
            {isSubMenuOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link href="/isim" className="block py-2" onClick={onClose}>
                    Tüm İsimler
                  </Link>
                </li>
                <li>
                  <Link href="/kiz-isimleri" className="block py-2" onClick={onClose}>
                    Kız İsimleri
                  </Link>
                </li>
                <li>
                  <Link href="/erkek-isimleri" className="block py-2" onClick={onClose}>
                    Erkek İsimleri
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/listeler" className="block py-2 text-lg" onClick={onClose}>
              Listeler
            </Link>
          </li>
          <li>
            <Link href="/blog" className="block py-2 text-lg" onClick={onClose}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/forum" className="block py-2 text-lg" onClick={onClose}>
              Forum
            </Link>
          </li>
          <li>
            <Link href="/hakkimizda" className="block py-2 text-lg" onClick={onClose}>
              Hakkımızda
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Link
          href="/bebek-isim-dna"
          className="block w-full text-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90"
          onClick={onClose}
        >
          İsim DNA
        </Link>
      </div>
    </div>
  )
}
