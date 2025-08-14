"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import type { AlphabetItem } from "@/types/alphabet"

const alphabet: AlphabetItem[] = [
  { letter: "A", girlLink: "/listeler/a", boyLink: "/listeler/a" },
  { letter: "B", girlLink: "/listeler/b", boyLink: "/listeler/b" },
  { letter: "C", girlLink: "/listeler/c", boyLink: "/listeler/c" },
  { letter: "Ç", girlLink: "/listeler/ç", boyLink: "/listeler/ç" },
  { letter: "D", girlLink: "/listeler/d", boyLink: "/listeler/d" },
  { letter: "E", girlLink: "/listeler/e", boyLink: "/listeler/e" },
  { letter: "F", girlLink: "/listeler/f", boyLink: "/listeler/f" },
  { letter: "G", girlLink: "/listeler/g", boyLink: "/listeler/g" },
  { letter: "H", girlLink: "/listeler/h", boyLink: "/listeler/h" },
  { letter: "I", girlLink: "/listeler/ı", boyLink: "/listeler/ı" },
  { letter: "İ", girlLink: "/listeler/i", boyLink: "/listeler/i" },
  { letter: "J", girlLink: "/listeler/j", boyLink: "/listeler/j" },
  { letter: "K", girlLink: "/listeler/k", boyLink: "/listeler/k" },
  { letter: "L", girlLink: "/listeler/l", boyLink: "/listeler/l" },
  { letter: "M", girlLink: "/listeler/m", boyLink: "/listeler/m" },
  { letter: "N", girlLink: "/listeler/n", boyLink: "/listeler/n" },
  { letter: "O", girlLink: "/listeler/o", boyLink: "/listeler/o" },
  { letter: "Ö", girlLink: "/listeler/ö", boyLink: "/listeler/ö" },
  { letter: "P", girlLink: "/listeler/p", boyLink: "/listeler/p" },
  { letter: "R", girlLink: "/listeler/r", boyLink: "/listeler/r" },
  { letter: "S", girlLink: "/listeler/s", boyLink: "/listeler/s" },
  { letter: "Ş", girlLink: "/listeler/ş", boyLink: "/listeler/ş" },
  { letter: "T", girlLink: "/listeler/t", boyLink: "/listeler/t" },
  { letter: "U", girlLink: "/listeler/u", boyLink: "/listeler/u" },
  { letter: "Ü", girlLink: "/listeler/ü", boyLink: "/listeler/ü" },
  { letter: "V", girlLink: "/listeler/v", boyLink: "/listeler/v" },
  { letter: "Y", girlLink: "/listeler/y", boyLink: "/listeler/y" },
  { letter: "Z", girlLink: "/listeler/z", boyLink: "/listeler/z" },
]

export function AlphabetList() {
  const [showAll, setShowAll] = useState(false)
  const displayedAlphabet = showAll ? alphabet : alphabet.slice(0, 5)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">A'dan Z'ye Bebek İsimleri</h2>

        <div className="max-w-4xl mx-auto">
          {displayedAlphabet.map((item) => (
            <div key={item.letter} className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Kız İsimleri */}
              <Link
                href={item.girlLink}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl font-bold text-pink-500">
                  {item.letter}
                </div>
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {item.letter} ile başlayan isimler
                </span>
              </Link>

              {/* Erkek İsimleri */}
              <Link
                href={item.boyLink}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-500">
                  {item.letter}
                </div>
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {item.letter} ile başlayan isimler
                </span>
              </Link>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => setShowAll(true)} className="gap-2">
              Daha Fazla Göster
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
