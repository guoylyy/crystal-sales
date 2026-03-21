import { Link } from 'react-router-dom'
import { MapPin as MapPinIcon, Mail, Phone } from 'lucide-react'
import { certifications } from '../data/company'

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Crystal Elevator Logo" className="w-12 h-12 object-contain" />
              <div>
                <span className="font-bold text-xl text-white">Crystal Elevator</span>
                <div className="text-xs text-gray-400">Shanghai, China</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading manufacturer and exporter of elevator parts since 1992.
              TOP 3 elevator parts exporter in China.
            </p>
            <div className="flex gap-3">
              {['🇨🇳', '🇺🇸', '🇪🇺', '🇸🇦'].map((flag, i) => (
                <span key={i} className="text-2xl">{flag}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition">Products</Link></li>
              <li><Link to="/flagship" className="text-gray-400 hover:text-white transition">Flagship Products</Link></li>
              <li><Link to="/ecommerce" className="text-gray-400 hover:text-white transition">E-Commerce</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=opto" className="text-gray-400 hover:text-white transition">Opto-Electro-Mechanical</Link></li>
              <li><Link to="/products?category=safety" className="text-gray-400 hover:text-white transition">Safety Components</Link></li>
              <li><Link to="/products?category=structural" className="text-gray-400 hover:text-white transition">Structural Parts</Link></li>
              <li><Link to="/products?category=emergency" className="text-gray-400 hover:text-white transition">Emergency Systems</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPinIcon size={18} />
                Shanghai, China
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                info@crystalelevator.com
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                +86 21 8888 8888
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {certifications.slice(0, 3).map((cert) => (
                <span key={cert} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Crystal Elevator Co., Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span className="hover:text-white cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
