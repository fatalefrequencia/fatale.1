import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  sold: number
  revenue: number
  image: string
}

interface ProductEditDialogProps {
  product: Product
  onSave: (product: Product) => void
  onClose: () => void
}

export function ProductEditDialog({ product, onSave, onClose }: ProductEditDialogProps) {
  const [editedProduct, setEditedProduct] = useState(product)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedProduct)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-red-900/20">
        <DialogHeader>
          <DialogTitle className="text-red-300">Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-red-300 mb-1">Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
            />
          </div>
          <div>
            <label className="block text-sm text-red-300 mb-1">Price</label>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
            />
          </div>
          <div>
            <label className="block text-sm text-red-300 mb-1">Stock</label>
            <input
              type="number"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) })}
              className="w-full bg-red-900/20 border border-red-900/20 rounded-lg px-3 py-2 text-red-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}