"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { generateImageUrl } from "@/lib/utils"
import type { SliderProps } from "@/types/slider"

export function HeroSlider({ slides, autoPlayInterval = 5000 }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % slides.length)
  }, [slides.length])

  const previousSlide = useCallback(() => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={generateImageUrl(slide.image, 1920, 1080) || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                    <a href={slide.link}>Daha Fazla Bilgi</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

