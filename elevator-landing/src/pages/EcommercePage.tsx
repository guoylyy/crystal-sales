import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, CreditCard, Truck, Shield, HeadphonesIcon, BarChart3, CheckCircle } from 'lucide-react'
import { ecommerceInfo } from '../data/company'

export default function EcommercePage() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sunny Elevator Online Store
              </h1>
              <p className="text-blue-100 text-xl mb-8">
                Your one-stop solution for purchasing quality elevator parts online. Easy ordering,
                competitive prices, and worldwide shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={ecommerceInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Visit Our Store
                </a>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10,000+', label: 'Products Available' },
                  { value: '82', label: 'Countries Shipped' },
                  { value: '3-Year', label: 'Warranty' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our e-commerce platform is designed to make your purchasing experience as smooth as possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceInfo.features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  {feature.icon === 'ShoppingCart' && <ShoppingCart className="text-blue-600" size={28} />}
                  {feature.icon === 'CreditCard' && <CreditCard className="text-blue-600" size={28} />}
                  {feature.icon === 'Truck' && <Truck className="text-blue-600" size={28} />}
                  {feature.icon === 'Headphones' && <HeadphonesIcon className="text-blue-600" size={28} />}
                  {feature.icon === 'Shield' && <Shield className="text-blue-600" size={28} />}
                  {feature.icon === 'BarChart' && <BarChart3 className="text-blue-600" size={28} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Benefits</h2>
              <div className="space-y-4">
                {ecommerceInfo.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={18} />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Order?</h3>
              <p className="text-gray-600 mb-6">
                Visit our online store to browse thousands of products and place your order today.
              </p>
              <a
                href={ecommerceInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Go to Store
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
