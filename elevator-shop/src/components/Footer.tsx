import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { companyInfo, topCategories } from '../data/company'

const footerLinks = {
  products: topCategories.map(c => ({ name: c.name, path: `/products?category=${c.id}` })),
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-semibold text-xl">{companyInfo.shortName}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {companyInfo.tagline}. Since {companyInfo.founded}, we've been serving customers 
              in {companyInfo.countriesServed} countries with premium elevator parts.
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-gray-400 hover:text-blue-400 text-sm transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition">Contact</Link></li>
              <li><Link to="/quotation" className="text-gray-400 hover:text-blue-400 text-sm transition">Request Quote</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Globe size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
