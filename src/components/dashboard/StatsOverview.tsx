import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, Package, Users } from 'lucide-react'

interface StatsProps {
  stats: {
    totalEarnings: number
    monthlyEarnings: number
    totalSales: number
    activeListings: number
    followers: number
  }
}

export function StatsOverview({ stats }: StatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-300">Total Earnings</span>
          </div>
          <p className="text-xl font-bold text-red-300">{formatCurrency(stats.totalEarnings)}</p>
        </CardContent>
      </Card>
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-300">Monthly Earnings</span>
          </div>
          <p className="text-xl font-bold text-red-300">{formatCurrency(stats.monthlyEarnings)}</p>
        </CardContent>
      </Card>
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-300">Total Sales</span>
          </div>
          <p className="text-xl font-bold text-red-300">{stats.totalSales}</p>
        </CardContent>
      </Card>
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-300">Active Listings</span>
          </div>
          <p className="text-xl font-bold text-red-300">{stats.activeListings}</p>
        </CardContent>
      </Card>
      <Card className="bg-red-950/20 border-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-300">Followers</span>
          </div>
          <p className="text-xl font-bold text-red-300">{stats.followers}</p>
        </CardContent>
      </Card>
    </div>
  )
}