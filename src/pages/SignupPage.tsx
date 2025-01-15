import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

export default function SignupPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png')",
          filter: "brightness(0.3)"
        }}
      />

      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 hover:bg-red-500/20 z-10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Signup Form */}
      <Card className="relative z-10 w-full max-w-md bg-black/50 border-red-900/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Join the Darkness</h1>
            <p className="text-red-300">Create your account to enter the void</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-red-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-red-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-red-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-red-300">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-red-500 hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}