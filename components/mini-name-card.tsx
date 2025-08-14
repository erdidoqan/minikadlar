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
      <div className="bg-[#F7F7F8] rounded-2xl h-[88px] flex items-center justify-between px-8">
        <div className="flex items-center gap-8">
          {rank && <span className="text-[28px] font-bold text-[#0A1172] w-[32px] no-underline">{rank}</span>}
          <span className="text-[28px] font-bold text-[#0A1172] no-underline">{name}</span>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center justify-center w-8 h-8 transition-colors"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-6 h-6 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-red-400 hover:stroke-red-500"}`}
          />
        </button>
      </div>
    </Link>
  )
}
