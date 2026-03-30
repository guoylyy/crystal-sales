import { Link } from 'react-router-dom'
import { Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react'

const orders = [
  {
    id: 'ORD-20260329-001',
    date: '2026-03-29',
    items: 3,
    total: 1250.00,
    status: 'shipped',
  },
  {
    id: 'ORD-20260328-002',
    date: '2026-03-28',
    items: 1,
    total: 350.00,
    status: 'processing',
  },
]

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600' },
  processing: { label: 'Processing', icon: Package, color: 'text-blue-600' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-600' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
}

export default function OrderListPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link to="/products" className="text-blue-600 hover:text-blue-700">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <span className="text-gray-500 ml-4">{order.date}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${status.color}`}>
                      <StatusIcon size={18} />
                      <span className="font-medium">{status.label}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-gray-600">
                      {order.items} items - <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/user/order/${order.id}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
