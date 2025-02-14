"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            MinikAdlar
          </Link>

          <div className="hidden md:flex items-center space-x-1 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="İsim veya kelime ara..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/isimler" className="text-gray-700 hover:text-primary">
              İsimler
            </Link>
            <Link href="/listeler" className="text-gray-700 hover:text-primary">
              Listeler
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary">
              Blog
            </Link>
            <Link href="/forum" className="text-gray-700 hover:text-primary">
              Forum
            </Link>
            <Link
              href="/bebek-isim-dna"
              className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              İsim DNA
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

