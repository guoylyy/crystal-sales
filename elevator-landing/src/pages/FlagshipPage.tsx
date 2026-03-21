import { Link } from 'react-router-dom'
import { Star, Eye, CheckCircle, ArrowRight } from 'lucide-react'
import { flagshipProducts } from '../data/company'

export default function FlagshipPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-5 py-2 rounded-full text-sm mb-6">
              <Star size={16} />
              <span>Our Core Expertise</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Flagship Products</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              Opto-Electro-Mechanical products are the heart of our business. Since 1992, we have been
              designing and manufacturing high-quality elevator components that set industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {flagshipProducts.map((product, index) => (
            <div key={product.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                  <Eye className="text-gray-400" size={120} />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Product {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">{product.name}</h2>
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/contact?product=${product.id}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Request Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Custom Solutions?</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We offer custom product development and OEM services. Contact us to discuss your specific requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Contact Our Team
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
