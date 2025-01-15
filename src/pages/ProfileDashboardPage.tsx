import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from 'lucide-react'
import { StatsOverview } from '@/components/dashboard/StatsOverview'
import { ProductsManagement } from '@/components/dashboard/ProductsManagement'
import { PaymentMethods } from '@/components/dashboard/PaymentMethods'

export default function ProfileDashboardPage() {
  const navigate = useNavigate()
  const [stats] = useState({
    totalEarnings: 15420.50,
    monthlyEarnings: 2340.75,
    totalSales: 142,
    activeListings: 12,
    followers: 1234
  })

  const [products] = useState([
    {
      id: '1',
      name: 'Gothic Pendant',
      price: 45.00,
      stock: 15,
      sold: 23,
      revenue: 1035.00,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans_logo_watermark-8PS2clkOqJFoBFi7LUnQlmIyE9qIIx.png'
    },
    {
      id: '2',
      name: 'Dark Art Print',
      price: 30.00,
      stock: 8,
      sold: 45,
      revenue: 1350.00,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Apocalypsebeans%20bg%20-0CXd6tHJj9LLQMmPvqU92AqOdJYjM5.png'
    }
  ])

  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'paypal',
      name: 'Business PayPal',
      details: 'darkartist@example.com',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'Credit Card',
      details: '**** **** **** 4242',
      isDefault: false
    }
  ])

  const handleEditProduct = (product: any) => {
    // Handle product edit
  }

  const handleDeleteProduct = (id: string) => {
    // Handle product delete
  }

  const handleAddProduct = () => {
    navigate('/profile/dashboard/add-product')
  }

  const handleEditPaymentMethod = (method: any) => {
    // Handle payment method edit
  }

  const handleDeletePaymentMethod = (id: string) => {
    // Handle payment method delete
  }

  const handleAddPaymentMethod = () => {
    // Handle add payment method
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    // Handle set default payment method
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-red-300">Dashboard</h1>
            <p className="text-red-700">Manage your products and payments</p>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-red-500 hover:bg-red-600" 
              onClick={handleAddProduct}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button variant="ghost" className="hover:bg-red-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsOverview stats={stats} />

          {/* Products Management */}
          <ProductsManagement
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAdd={handleAddProduct}
          />

          {/* Payment Methods */}
          <PaymentMethods
            paymentMethods={paymentMethods}
            onAdd={handleAddPaymentMethod}
            onEdit={handleEditPaymentMethod}
            onDelete={handleDeletePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        </div>
      </div>
    </ScrollArea>
  )
}