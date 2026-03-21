import { Link } from 'react-router-dom'
import { 
  Zap, ArrowRight, Target, Eye, Monitor, Settings, Shield, Star, ChevronRight,
  Globe, Package, Users, Building2, CheckCircle, ShoppingCart, CreditCard,
  HeadphonesIcon, Clock, Award, Heart
} from 'lucide-react'
import { flagshipProducts, productCategories, whyChooseUs } from '../data/company'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-5 py-2 rounded-full text-sm mb-8">
                <Zap size={16} />
                <span>TOP 3 Elevator Parts Exporter in China</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                China Leading Provider of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> Elevator Parts</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Since 1992, we specialize in Opto-Electro-Mechanical elevator products.
                Exporting to 82 countries with 3-year quality guarantee.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/products"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition flex items-center gap-2 shadow-xl shadow-blue-500/30"
                >
                  Explore Products
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-gray-500 hover:border-white text-white px-8 py-4 rounded-xl font-semibold transition"
                >
                  Get Free Quote
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">33+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-1">82</div>
                  <div className="text-gray-400 text-sm">Countries Served</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-1">3K+</div>
                  <div className="text-gray-400 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">Core Products</div>
                    <div className="text-gray-400">Opto-Electro-Mechanical</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Target, name: 'Light Curtain', color: 'from-blue-500 to-blue-600' },
                    { icon: Eye, name: 'Photoelectric', color: 'from-green-500 to-green-600' },
                    { icon: Monitor, name: 'Display', color: 'from-purple-500 to-purple-600' },
                    { icon: Settings, name: 'Door System', color: 'from-orange-500 to-orange-600' }
                  ].map((item, i) => (
                    <div key={i} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-center`}>
                      <item.icon className="text-white mx-auto mb-2" size={28} />
                      <div className="text-white font-medium text-sm">{item.name}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-lg">3-Year Quality Guarantee</div>
                      <div className="text-blue-100 text-sm">On All Products</div>
                    </div>
                    <Shield className="text-white" size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '7,443', label: 'Containers Exported' },
              { value: '3,000+', label: 'Overseas Customers' },
              { value: '50+', label: 'Product Categories' },
              { value: '24/7', label: 'Customer Support' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star size={16} />
              <span>Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flagship Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Opto-Electro-Mechanical products are our core expertise. Leading manufacturer since 1992.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {flagshipProducts.slice(0, 4).map((product, index) => {
              const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600', 'from-orange-400 to-orange-600']
              return (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-gray-100">
                <div className={`h-40 bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  ) : (
                    <Eye className="text-white/80" size={48} />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <Link to="/flagship" className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            )})}
          </div>

          <div className="text-center">
            <Link
              to="/flagship"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View All Flagship Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart size={16} />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner Since 1992
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                With 33 years of experience, we have become a leading manufacturer and exporter of elevator parts.
                Our commitment to quality and customer satisfaction has earned us the trust of over 3,000 clients worldwide.
              </p>

              <div className="space-y-4">
                {[
                  { title: whyChooseUs[0]?.title || '33 Years Experience', desc: whyChooseUs[0]?.description || '', icon: Clock, bg: 'bg-orange-100', text: 'text-orange-600' },
                  { title: whyChooseUs[1]?.title || 'Global Reach', desc: whyChooseUs[1]?.description || '', icon: Globe, bg: 'bg-blue-100', text: 'text-blue-600' },
                  { title: whyChooseUs[2]?.title || 'Quality Assurance', desc: whyChooseUs[2]?.description || '', icon: Award, bg: 'bg-green-100', text: 'text-green-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={item.text} size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, value: '33+', label: 'Years' },
                { icon: Globe, value: '82', label: 'Countries' },
                { icon: Package, value: '7,443', label: 'Containers' },
                { icon: Users, value: '3,000+', label: 'Customers' }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition">
                  <item.icon className="text-blue-600 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Shop Online with Crystal Elevator
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Visit our e-commerce platform for easy ordering, competitive prices, and worldwide shipping.
                One-stop solution for all your elevator parts needs.
              </p>
              <div className="space-y-4">
                {['Easy Online Ordering', 'Global Shipping', '3-Year Warranty', '24/7 Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle className="text-green-400" size={24} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/ecommerce"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition mt-8"
              >
                Learn More About Our Store
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
              <div className="bg-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: ShoppingCart, label: '10,000+ Products' },
                    { icon: CreditCard, label: 'Secure Payment' },
                    { icon: Package, label: 'Global Delivery' },
                    { icon: HeadphonesIcon, label: '24/7 Support' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 text-center">
                      <item.icon className="text-blue-600 mx-auto mb-2" size={28} />
                      <div className="text-gray-800 font-medium text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete range of elevator parts and components for all your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {productCategories.map((cat, i) => (
              <Link
                key={i}
                to={`/products?category=${cat.id}`}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition group border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition">
                  <Package className="text-blue-600 group-hover:text-white transition" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Contact us today for a free quote or visit our e-commerce store to browse products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/ecommerce"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
