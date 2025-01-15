import { ReactNode } from 'react'
import { Card } from './ui/card'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-black/30 border-red-900/20 p-6 backdrop-blur-sm hover:bg-red-950/30 transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-red-950/30 rounded-xl">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-red-300">{title}</h3>
        <p className="text-red-400/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  )
}