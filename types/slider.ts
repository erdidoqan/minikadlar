export interface Slide {
  id: number
  title: string
  description: string
  image: string
  link: string
}

export interface SliderProps {
  slides: Slide[]
  autoPlayInterval?: number
}
