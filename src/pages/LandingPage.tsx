import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Skull, Music, Radio, ShoppingBag, Users } from 'lucide-react'
import { FeatureCard } from '@/components/FeatureCard'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Music className="w-8 h-8 text-red-500" />,
      title: "Dark Music",
      description: "Discover and share gothic, dark ambient, and industrial music"
    },
    {
      icon: <Radio className="w-8 h-8 text-red-500" />,
      title: "Live Radio",
      description: "24/7 dark music radio stations curated by the community"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-red-500" />,
      title: "Gothic Marketplace",
      description: "Buy and sell unique gothic and dark aesthetic items"
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: "Dark Community",
      description: "Connect with like-minded individuals in the darkness"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,0,0,0.1),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(139,0,0,0.2) 0%, transparent 70%)',
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Skull className="w-24 h-24 mx-auto text-red-500 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-200 tracking-wider animate-fade-in-up"
              style={{ textShadow: '0 0 20px rgba(255,0,0,0.5)' }}>
            Express Your Dark Side
          </h1>
          <p className="text-xl md:text-2xl text-red-400 animate-fade-in-up delay-200">
            Share your creations with the gothic community
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 animate-fade-in-up delay-300">
          <Button 
            className="bg-red-500/80 hover:bg-red-600 text-lg py-6 px-12 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/signup')}
          >
            Join the Darkness →
          </Button>
          <Button 
            variant="ghost" 
            className="border border-red-500/50 hover:bg-red-500/20 text-lg py-6 px-12 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Enter the Void
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-red-500/20 text-lg py-6 px-12 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/home')}
          >
            Preview
          </Button>
        </div>

        {/* Features Section */}
        <div className="pt-20">
          <h2 className="text-4xl font-bold text-pink-200 mb-12 animate-fade-in-up delay-400"
              style={{ textShadow: '0 0 20px rgba(255,0,0,0.5)' }}>
            Embrace the Darkness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-500">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="pt-20 pb-12 animate-fade-in-up delay-600">
          <h2 className="text-4xl font-bold text-pink-200 mb-6"
              style={{ textShadow: '0 0 20px rgba(255,0,0,0.5)' }}>
            Join Our Dark Community
          </h2>
          <p className="text-xl text-red-400 mb-8">
            Connect with fellow dark souls, share your creations, and explore the depths of darkness.
          </p>
          <Button 
            className="bg-red-500/80 hover:bg-red-600 text-lg py-6 px-12 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/signup')}
          >
            Begin Your Journey →
          </Button>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 pt-12 animate-fade-in delay-700">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping delay-100" />
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping delay-200" />
        </div>
      </div>
    </div>
  )
}