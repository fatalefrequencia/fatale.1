import { Button } from "@/components/ui/button"
import { CSSProperties } from 'react'

interface Algorithm {
  id: string
  name: string
  description: string
  color: string
}

interface AlgorithmSelectorProps {
  selectedAlgorithm: string
  onSelect: (id: string) => void
}

export function AlgorithmSelector({ selectedAlgorithm, onSelect }: AlgorithmSelectorProps) {
  const algorithms: Algorithm[] = [
    {
      id: 'dark',
      name: 'Dark Aesthetic',
      description: 'Gothic, dark ambient, and industrial content',
      color: '#ef4444' // red-500
    },
    {
      id: 'ethereal',
      name: 'Ethereal Dreams',
      description: 'Dreamy, ambient, and atmospheric content',
      color: '#8b5cf6' // violet-500
    },
    {
      id: 'cyber',
      name: 'Cyber Pulse',
      description: 'Cyberpunk, synthwave, and electronic content',
      color: '#06b6d4' // cyan-500
    },
    {
      id: 'nature',
      name: 'Natural Harmony',
      description: 'Folk, acoustic, and natural content',
      color: '#22c55e' // green-500
    },
    {
      id: 'chaos',
      name: 'Chaos Theory',
      description: 'Random mix of all content types',
      color: '#f59e0b' // amber-500
    }
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {algorithms.map((algo) => {
        const buttonStyle: CSSProperties = {
          backgroundColor: `${algo.color}20`,
          color: algo.color,
          borderColor: algo.color,
          ...(selectedAlgorithm === algo.id && {
            ring: '2px',
            ringOffset: '2px',
            ringOffsetColor: 'black',
            ringColor: algo.color
          })
        }

        return (
          <Button
            key={algo.id}
            variant="ghost"
            className={`flex-shrink-0 rounded-full transition-all transform hover:scale-105 ${
              selectedAlgorithm === algo.id 
                ? 'ring-2 ring-offset-2 ring-offset-black'
                : 'hover:bg-white/5'
            }`}
            style={buttonStyle}
            onClick={() => onSelect(algo.id)}
          >
            {algo.name}
          </Button>
        )
      })}
    </div>
  )
}