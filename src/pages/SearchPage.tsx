import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const categories = [
    'Dark Ambient', 'Gothic Metal', 'Industrial', 'Darkwave',
    'EBM', 'Witch House', 'Dark Folk', 'Doom Metal'
  ]

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search the darkness..."
            className="w-full bg-red-950/20 border border-red-900/20 rounded-lg px-4 py-3 pl-12 text-red-300 placeholder:text-red-700 focus:outline-none focus:border-red-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-700" />
        </div>

        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, i) => (
            <Card key={i} className="bg-red-950/20 border-red-900/20 hover:bg-red-900/30 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <span className="text-sm text-red-300">{category}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}