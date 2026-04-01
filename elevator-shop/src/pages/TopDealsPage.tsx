import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Tag } from 'lucide-react'
import { productsByCategory } from '../data/company'

export default function TopDealsPage() {
  const hotProducts = Object.values(productsByCategory).flat().slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-red-200 mb-4">
            <Tag size={24} />
            <span className="text-xl font-medium">Hot Deals</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Best Selling Products</h1>
          <p className="text-red-100">Limited time offers on premium elevator parts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-200"
            >
              <div className="relative">
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  HOT
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.salesCount} sold)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-red-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
