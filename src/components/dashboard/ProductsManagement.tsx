import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'
import { ProductEditDialog } from './ProductEditDialog'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  sold: number
  revenue: number
  image: string
}

interface ProductsManagementProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onAdd: () => void
}

export function ProductsManagement({ products, onEdit, onDelete, onAdd }: ProductsManagementProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-red-300">Products</h2>
        <Button className="bg-red-500 hover:bg-red-600" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-red-950/20 border-red-900/20">
            <CardContent className="p-4">
              <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-red-300">{product.name}</h3>
                    <p className="text-sm text-red-700">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-red-500/20"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-red-500/20"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-red-900/20 p-2 rounded-lg">
                    <p className="text-red-300">Stock</p>
                    <p className="font-medium text-red-500">{product.stock}</p>
                  </div>
                  <div className="bg-red-900/20 p-2 rounded-lg">
                    <p className="text-red-300">Sold</p>
                    <p className="font-medium text-red-500">{product.sold}</p>
                  </div>
                </div>
                <div className="bg-red-900/20 p-2 rounded-lg">
                  <p className="text-red-300">Revenue</p>
                  <p className="font-medium text-red-500">{formatCurrency(product.revenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingProduct && (
        <ProductEditDialog
          product={editingProduct}
          onSave={(updatedProduct) => {
            onEdit(updatedProduct)
            setEditingProduct(null)
          }}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}