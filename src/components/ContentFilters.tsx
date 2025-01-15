import { Button } from "@/components/ui/button"

interface ContentFiltersProps {
  selectedType: string | null
  onTypeSelect: (type: string | null) => void
  accentColor: string
}

export function ContentFilters({ selectedType, onTypeSelect, accentColor }: ContentFiltersProps) {
  return (
    <div className="sticky top-0 z-10 flex justify-center gap-2 px-4 py-4 backdrop-blur-md bg-black/30">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTypeSelect(null)}
        className={`rounded-full transition-all transform hover:scale-105 ${
          selectedType === null ? 'bg-black/50' : 'bg-black/30'
        }`}
        style={{ color: selectedType === null ? accentColor : undefined }}
      >
        All
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTypeSelect('image')}
        className={`rounded-full transition-all transform hover:scale-105 ${
          selectedType === 'image' ? 'bg-black/50' : 'bg-black/30'
        }`}
        style={{ color: selectedType === 'image' ? accentColor : undefined }}
      >
        Images
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTypeSelect('text')}
        className={`rounded-full transition-all transform hover:scale-105 ${
          selectedType === 'text' ? 'bg-black/50' : 'bg-black/30'
        }`}
        style={{ color: selectedType === 'text' ? accentColor : undefined }}
      >
        Texts
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTypeSelect('music')}
        className={`rounded-full transition-all transform hover:scale-105 ${
          selectedType === 'music' ? 'bg-black/50' : 'bg-black/30'
        }`}
        style={{ color: selectedType === 'music' ? accentColor : undefined }}
      >
        Music
      </Button>
    </div>
  )
}