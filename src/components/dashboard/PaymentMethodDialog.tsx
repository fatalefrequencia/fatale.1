import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface PaymentMethod {
  id: string
  type: string
  name: string
  details: string
  isDefault: boolean
}

interface PaymentMethodDialogProps {
  method?: PaymentMethod
  onSave: (method: PaymentMethod) => void
  onClose: () => void
}

export function PaymentMethodDialog({ method, onSave, onClose }: PaymentMethodDialogProps) {
  const [editedMethod, setEditedMethod] = useState(
    method || {
      id: Date.now().toString(),
      type: '',
      name: '',
      details: '',
      isDefault: false
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedMethod)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-red-900/20">
        <DialogHeader>
          <DialogTitle className="text-red-300">
            {method ? 'Edit Payment Method' : 'Add Payment Method'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-red-300 mb-1">Type</label>
            <select
              value={editedMethod.type}
              onChange={(e) => setEditedMethod({ ...editedMethod, type: e.target.value })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
            >
              <option value="">Select type...</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-red-300 mb-1">Name</label>
            <input
              type="text"
              value={editedMethod.name}
              onChange={(e) => setEditedMethod({ ...editedMethod, name: e.target.value })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
              placeholder="e.g., Business PayPal"
            />
          </div>
          <div>
            <label className="block text-sm text-red-300 mb-1">Details</label>
            <input
              type="text"
              value={editedMethod.details}
              onChange={(e) => setEditedMethod({ ...editedMethod, details: e.target.value })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
              placeholder="e.g., email@example.com"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editedMethod.isDefault}
              onChange={(e) => setEditedMethod({ ...editedMethod, isDefault: e.target.checked })}
              className="rounded border-red-900/20 bg-red-900/20 text-red-500"
            />
            <label className="text-sm text-red-300">Set as default payment method</label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              {method ? 'Save Changes' : 'Add Method'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}