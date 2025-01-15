import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Edit, Trash2, ExternalLink, CreditCard, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { PaymentMethodDialog } from './PaymentMethodDialog'

interface PaymentMethod {
  id: string
  type: string
  name: string
  details: string
  isDefault: boolean
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  onAdd: () => void
  onEdit: (method: PaymentMethod) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export function PaymentMethods({ 
  paymentMethods, 
  onAdd, 
  onEdit, 
  onDelete, 
  onSetDefault 
}: PaymentMethodsProps) {
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-red-300 mb-4">Payment Methods</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-300">{method.name}</p>
                    <p className="text-sm text-red-700">{method.details}</p>
                  </div>
                  <div className="flex gap-2">
                    {method.isDefault ? (
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                        Default
                      </span>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-red-500/20"
                        onClick={() => onSetDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-red-500/20"
                      onClick={() => setEditingMethod(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-red-500/20"
                      onClick={() => onDelete(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="my-4 bg-red-900/20" />
              </div>
            ))}
            <Button className="w-full bg-red-500 hover:bg-red-600" onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-red-300 mb-4">Connected Accounts</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-300">Stripe</p>
                  <p className="text-sm text-red-700">Connected</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-red-500/20">
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
            <Separator className="bg-red-900/20" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-300">PayPal</p>
                  <p className="text-sm text-red-700">Connected</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-red-500/20">
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {editingMethod && (
        <PaymentMethodDialog
          method={editingMethod}
          onSave={(updatedMethod) => {
            onEdit(updatedMethod)
            setEditingMethod(null)
          }}
          onClose={() => setEditingMethod(null)}
        />
      )}
    </div>
  )
}