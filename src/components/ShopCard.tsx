import React from 'react'
import { Heart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

interface ShopCardProps {
  id: number
  name: string
  description: string
}

export function ShopCard({ id, name, description }: ShopCardProps) {
  return (
    <a href={`/shop/${id}`} className="block group">
      <Card className="bg-black/50 text-white border-white/10 transition-colors duration-200 hover:bg-white/10">
        <CardHeader className="p-5">
          <CardTitle className="text-base font-normal group-hover:text-red-500 transition-colors duration-200">
            {name}
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="aspect-square rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-200" />
        </CardContent>
        <CardFooter className="flex justify-between p-5">
          <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-200">
            View Shop
          </span>
          <Button size="sm" variant="ghost" className="hover:bg-white/5">
            <Heart className="h-3 w-3" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </CardFooter>
      </Card>
    </a>
  )
}