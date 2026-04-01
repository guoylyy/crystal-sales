import { Link, useNavigate } from 'react-router-dom'
import { 
  Zap, ArrowRight, Globe, Package, Star, Truck, Shield, 
  Phone, Mail, Search
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { companyInfo, topCategories, productsByCategory, allProducts, brands, type Product } from '../data/company'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Search effect
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }

  // Get products for current tab
  const getProductsForTab = (tabId: number) => {
    if (tabId === 0) {
      return productsByCategory[0] || []
    }
    return productsByCategory[tabId] || []
  }

  const currentProducts = getProductsForTab(activeTab)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm mb-6 w-fit">
                <Zap size={16} />
                <span>TOP 3 Elevator Parts Exporter in China</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Premium Elevator Parts
                <span className="text-blue-400"> Supplier</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Since {companyInfo.founded}, we provide quality elevator components 
                to {companyInfo.experience}+ countries worldwide.
              </p>
              
              {/* Search in hero */}
              <div className="relative max-w-xl mb-8" ref={searchRef}>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setSearchOpen(true)
                      }}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-32 py-4 text-lg border border-white/20 bg-white/10 text-white rounded-xl outline-none focus:border-white placeholder-gray-400"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                      Search
                    </button>
                  </div>
                </form>
                
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => {
                          setSearchQuery('')
                          setSearchOpen(false)
                        }}
                      >
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">${product.price} - {product.categoryName}</div>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={`/products?search=${encodeURIComponent(searchQuery)}`}
                      className="block text-center text-blue-600 py-3 border-t hover:bg-gray-50"
                      onClick={() => {
                        setSearchQuery('')
                        setSearchOpen(false)
                      }}
                    >
                      View all results
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                  View Products
                </Link>
                <Link to="/contact" className="border border-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
                  Get Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:block text-center">
              <Package size={120} className="mx-auto text-blue-400/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs - JD Style */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {topCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === cat.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid by Category */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {topCategories.find(c => c.id === activeTab)?.name || 'Products'}
            </h2>
            <Link 
              to={`/products${activeTab !== 0 ? `?category=${activeTab}` : ''}`} 
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-blue-600 mb-1">{product.categoryName}</div>
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'Global Shipping', desc: '82+ countries served' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'ISO certified' },
              { icon: Truck, title: 'Fast Delivery', desc: '7-15 days global' },
              { icon: Star, title: '24/7 Support', desc: 'Technical assistance' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
