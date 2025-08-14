import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NameCardProps {
  name: string
  meaning: string
  gender: "Erkek" | "Kız" | "Unisex"
  origin: string
  popularity: number
  link: string
}

export function NameCard({ name, meaning, gender, origin, popularity, link }: NameCardProps) {
  return (
    <Link href={link}>
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{meaning}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default" className={gender === "Erkek" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}>
              {gender}
            </Badge>
            <Badge variant="outline">{origin}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Popülerlik</span>
            <div className="w-24 bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${popularity}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
