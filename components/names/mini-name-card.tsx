"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"

interface MiniNameCardProps {
  name: string
  rank?: number
  link: string
}

export function MiniNameCard({ name, rank, link }: MiniNameCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={link} className="block no-underline">
      <div className="bg-[#F7F7F8] rounded-2xl h-[88px] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
          {rank && (
            <span className="text-xs md:text-base font-bold text-[#0A1172] min-w-[32px] flex-shrink-0 text-center">
              {rank}
            </span>
          )}
          <span className="text-xs md:text-base font-bold text-[#0A1172] truncate leading-tight">{name}</span>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center justify-center w-8 h-8 transition-colors flex-shrink-0"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 md:w-6 md:h-6 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-red-400 hover:stroke-red-500"}`}
          />
        </button>
      </div>
    </Link>
  )
}
