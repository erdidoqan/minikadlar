"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import type { AlphabetItem } from "@/types/alphabet"

const alphabet: AlphabetItem[] = [
  { letter: "A", girlLink: "/kiz-isimleri/a", boyLink: "/erkek-isimleri/a" },
  { letter: "B", girlLink: "/kiz-isimleri/b", boyLink: "/erkek-isimleri/b" },
  { letter: "C", girlLink: "/kiz-isimleri/c", boyLink: "/erkek-isimleri/c" },
  { letter: "Ç", girlLink: "/kiz-isimleri/c", boyLink: "/erkek-isimleri/c" },
  { letter: "D", girlLink: "/kiz-isimleri/d", boyLink: "/erkek-isimleri/d" },
  { letter: "E", girlLink: "/kiz-isimleri/e", boyLink: "/erkek-isimleri/e" },
  { letter: "F", girlLink: "/kiz-isimleri/f", boyLink: "/erkek-isimleri/f" },
  { letter: "G", girlLink: "/kiz-isimleri/g", boyLink: "/erkek-isimleri/g" },
  { letter: "H", girlLink: "/kiz-isimleri/h", boyLink: "/erkek-isimleri/h" },
  { letter: "I", girlLink: "/kiz-isimleri/i", boyLink: "/erkek-isimleri/i" },
  { letter: "İ", girlLink: "/kiz-isimleri/i", boyLink: "/erkek-isimleri/i" },
  { letter: "J", girlLink: "/kiz-isimleri/j", boyLink: "/erkek-isimleri/j" },
  { letter: "K", girlLink: "/kiz-isimleri/k", boyLink: "/erkek-isimleri/k" },
  { letter: "L", girlLink: "/kiz-isimleri/l", boyLink: "/erkek-isimleri/l" },
  { letter: "M", girlLink: "/kiz-isimleri/m", boyLink: "/erkek-isimleri/m" },
  { letter: "N", girlLink: "/kiz-isimleri/n", boyLink: "/erkek-isimleri/n" },
  { letter: "O", girlLink: "/kiz-isimleri/o", boyLink: "/erkek-isimleri/o" },
  { letter: "Ö", girlLink: "/kiz-isimleri/o", boyLink: "/erkek-isimleri/o" },
  { letter: "P", girlLink: "/kiz-isimleri/p", boyLink: "/erkek-isimleri/p" },
  { letter: "R", girlLink: "/kiz-isimleri/r", boyLink: "/erkek-isimleri/r" },
  { letter: "S", girlLink: "/kiz-isimleri/s", boyLink: "/erkek-isimleri/s" },
  { letter: "Ş", girlLink: "/kiz-isimleri/s", boyLink: "/erkek-isimleri/s" },
  { letter: "T", girlLink: "/kiz-isimleri/t", boyLink: "/erkek-isimleri/t" },
  { letter: "U", girlLink: "/kiz-isimleri/u", boyLink: "/erkek-isimleri/u" },
  { letter: "Ü", girlLink: "/kiz-isimleri/u", boyLink: "/erkek-isimleri/u" },
  { letter: "V", girlLink: "/kiz-isimleri/v", boyLink: "/erkek-isimleri/v" },
  { letter: "Y", girlLink: "/kiz-isimleri/y", boyLink: "/erkek-isimleri/y" },
  { letter: "Z", girlLink: "/kiz-isimleri/z", boyLink: "/erkek-isimleri/z" },
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
                  {item.letter} ile başlayan kız isimleri
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
                  {item.letter} ile başlayan erkek isimleri
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

