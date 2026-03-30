import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Phone } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-semibold text-xl hidden sm:block">Crystal Elevator</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 text-gray-300 hover:text-white transition"
            >
              <ShoppingCart size={20} />
            </Link>
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <Phone size={16} />
              <span>Get Quote</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700/50">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'block py-2 px-4 rounded-lg text-sm font-medium',
                  location.pathname === link.path
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-gray-300 hover:bg-slate-700/50'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
