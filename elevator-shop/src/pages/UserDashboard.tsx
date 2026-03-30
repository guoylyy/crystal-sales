import { Link } from 'react-router-dom'
import { Package, ShoppingCart, FileText, Quote, User, Settings, LogOut } from 'lucide-react'

const menuItems = [
  { icon: Package, label: 'My Orders', path: '/user/orders', desc: 'View and manage orders' },
  { icon: ShoppingCart, label: 'Purchased', path: '/user/purchased', desc: 'Products you have bought' },
  { icon: Quote, label: 'Quotations', path: '/user/quotations', desc: 'Your quotation requests' },
  { icon: User, label: 'Profile', path: '/user/profile', desc: 'Account settings' },
]

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">John Doe</h1>
              <p className="text-gray-300">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition border border-gray-200"
            >
              <item.icon size={32} className="text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="text-center py-8 text-gray-500">
              No orders yet. <Link to="/products" className="text-blue-600">Start shopping</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Orders</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quotations</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
