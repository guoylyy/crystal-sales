import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowRight, Menu as MenuIcon, X, Package as PackageIcon } from 'lucide-react'
import { productCategories } from '../data/company'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'Flagship', path: '/flagship' },
    { name: 'E-Commerce', path: '/ecommerce' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Crystal Elevator Logo" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-bold text-xl text-gray-900">Crystal Elevator</span>
              <div className="text-xs text-gray-500">Since 1992</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                      isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}>
                      {item.name}
                      <ChevronDown size={16} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border p-2">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.id}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                          >
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <PackageIcon className="text-blue-600" size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{cat.name}</div>
                              <div className="text-xs text-gray-500">{cat.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              Get Quote
              <ArrowRight size={18} />
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium ${
                  isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-center mt-4"
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
