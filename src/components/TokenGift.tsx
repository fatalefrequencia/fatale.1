import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Send } from 'lucide-react'

interface TokenGiftProps {
  onSendTokens: (amount: number, message: string) => void
}

export function TokenGift({ onSendTokens }: TokenGiftProps) {
  const [amount, setAmount] = useState(1)
  const [message, setMessage] = useState('')
  const [showGiftForm, setShowGiftForm] = useState(false)

  const tokenAmounts = [1, 5, 10, 50, 100]

  const handleSend = () => {
    onSendTokens(amount, message)
    setAmount(1)
    setMessage('')
    setShowGiftForm(false)
  }

  return (
    <Card className="bg-red-950/20 border-red-900/20">
      <CardContent className="p-4">
        {!showGiftForm ? (
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={() => setShowGiftForm(true)}
          >
            <Gift className="h-5 w-5 mr-2" />
            Send Tokens
          </Button>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-300">Send Tokens</h3>
            
            <div className="grid grid-cols-5 gap-2">
              {tokenAmounts.map((value) => (
                <Button
                  key={value}
                  variant={amount === value ? 'default' : 'ghost'}
                  className={amount === value ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-purple-500/20'}
                  onClick={() => setAmount(value)}
                >
                  {value}
                </Button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-4 py-2 text-red-300 focus:outline-none focus:border-red-500"
            />

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowGiftForm(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-500 hover:bg-purple-600"
                onClick={handleSend}
              >
                <Send className="h-4 w-4 mr-2" />
                Send {amount} Tokens
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}