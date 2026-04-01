import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  ArrowLeft, Star, CheckCircle, Truck, Shield, Clock, MessageCircle, 
  Share2, Heart, ShoppingCart, Minus, Plus
} from 'lucide-react'
import { productsByCategory, type Product } from '../data/company'
import { useStore } from '../context/StoreContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, cart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [showCartMsg, setShowCartMsg] = useState(false)
  
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const category = topCategories.find(c => c.id === product.categoryId)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowCartMsg(true)
    setTimeout(() => setShowCartMsg(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products?category=${product.categoryId}`} className="text-gray-500 hover:text-gray-700">{category?.name}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showCartMsg && (
        <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Added to cart successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Chat
                </button>
                <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
                <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Save
                </button>
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="text-sm text-blue-600 mb-2">{category?.name}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={18} className={s <= (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{product.salesCount || 0}+ sold</span>
              </div>

              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & MOQ */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                  <span className="text-gray-500">/ {product.unit || 'unit'}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Min. Order: <span className="font-semibold">{product.moq} units</span>
                </div>
                
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(product.moq || 1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || product.moq || 1)}
                      className="w-20 text-center outline-none"
                      min={product.moq}
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Truck, title: 'Global Shipping', desc: '7-15 days delivery' },
            { icon: Shield, title: '3-Year Warranty', desc: 'Quality guaranteed' },
            { icon: Clock, title: 'Quick Response', desc: '24h online support' },
            { icon: CheckCircle, title: 'ISO Certified', desc: 'International standard' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <item.icon size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="aspect-square bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${p.price}</span>
                      <span className="text-sm text-gray-500">MOQ: {p.moq}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
