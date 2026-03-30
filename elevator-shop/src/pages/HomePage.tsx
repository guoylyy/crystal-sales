import { Link, useNavigate } from 'react-router-dom'
import { 
  Zap, ArrowRight, Globe, Package, Star, Truck, Shield, 
  Phone, Mail, Search
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { companyInfo, products, productCategories, brands } from '../data/company'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate?.() || (() => {})

  const hotProducts = products.slice(0, 4)

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(p => 
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
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-slate-900 py-20">
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

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Product Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition border border-gray-200"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-medium text-gray-900 text-sm">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Hot Products</h2>
            <Link to="/top-deals" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
                  <h3 className="font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.id}`}
                className="bg-white rounded-xl p-4 flex items-center justify-center shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <img src={brand.logo} alt={brand.name} className="h-8" />
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

      {/* Contact Banner */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6">Contact us today for a free quote on elevator parts</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Contact Us
            </Link>
            <a href={`mailto:${companyInfo.email}`} className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
              {companyInfo.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
