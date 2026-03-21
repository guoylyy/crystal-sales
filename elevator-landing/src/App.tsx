import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  Globe,
  Shield,
  Truck,
  Award,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle,
  Users,
  Package,
  Clock,
  Star,
  ArrowRight,
  Target,
  Zap,
  Heart,
  Building2,
  Package as PackageIcon,
  Eye,
  Layers,
  Monitor,
  Settings,
  DoorOpen,
  ChevronRight,
  Search,
  ShoppingCart,
  CreditCard,
  BarChart3,
  HeadphonesIcon,
  TrendingUp,
  Briefcase,
  Users as UsersIcon,
  GraduationCap,
  Heart as HeartIcon,
  Clock3,
  MapPin as MapPinIcon,
  Check,
  Menu as MenuIcon
} from 'lucide-react'
import { companyInfo, flagshipProducts, allProducts, productCategories, whyChooseUs, certifications, jobOpenings, ecommerceInfo, companyTimeline } from './data/company'

// Navigation Component
function Navigation() {
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

// Footer Component
function Footer() {
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

// Home Page
function HomePage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

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
                    { icon: Truck, label: 'Global Delivery' },
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
                  <PackageIcon className="text-blue-600 group-hover:text-white transition" size={28} />
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

// Products Page
function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = allProducts.filter((product) => {
    const productCategory = product.category || '';
    const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory || (selectedCategory === 'opto' && flagshipProducts.some(p => p.id === product.id))
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">
              Complete range of elevator parts and components. Quality guaranteed with 3-year warranty.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {productCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <PackageIcon className="text-gray-400 group-hover:scale-110 transition" size={64} />
              </div>
              <div className="p-6">
                {product.category ? (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                ) : null}
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features?.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/contact?product=${product.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <PackageIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-medium text-gray-500">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Flagship Products Page
function FlagshipPage() {
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

// E-commerce Page
function EcommercePage() {
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

// About Page
function AboutPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Crystal Elevator</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              Leading manufacturer and exporter of elevator parts since 1992. 33 years of excellence in opto-electro-mechanical products.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Profile</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-900">Crystal Elevator Co., Ltd</strong>, founded in 1992,
                  is a 33-year professional manufacturer specializing in designing and producing Opto-Electro-Mechanical products.
                </p>
                <p>
                  Our company has evolved from a local manufacturer to a global leader, exporting to 82 countries
                  and serving more than 3,000 overseas customers.
                </p>
                <p>
                  Since starting international trade in 2012, we have exported 7,443 containers of elevator parts,
                  making us one of the TOP 3 elevator parts exporters in China.
                </p>
                <p>
                  We offer a comprehensive range of elevator components including Buttons, Light Curtains, Photoelectric
                  Switches, Displays, COP & LOP, Traction Machines, and Door Mechanisms, along with many other parts.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
              <div className="text-center mb-8">
                <img src="/logo.png" alt="Crystal Elevator Logo" className="w-32 h-32 object-contain mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Crystal Elevator</h3>
                <p className="text-gray-500">Since 1992</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1992', label: 'Founded' },
                  { value: '33+', label: 'Years' },
                  { value: 'TOP 3', label: 'Exporter' },
                  { value: 'ISO', label: 'Certified' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">33 years of growth and excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {companyTimeline.map((item, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: whyChooseUs[0]?.title || '33 Years Experience', desc: whyChooseUs[0]?.description || '', icon: Clock, bg: 'bg-orange-100', text: 'text-orange-600' },
              { title: whyChooseUs[1]?.title || 'Global Reach', desc: whyChooseUs[1]?.description || '', icon: Globe, bg: 'bg-blue-100', text: 'text-blue-600' },
              { title: whyChooseUs[2]?.title || 'Quality Assurance', desc: whyChooseUs[2]?.description || '', icon: Award, bg: 'bg-green-100', text: 'text-green-600' },
              { title: whyChooseUs[3]?.title || 'Fast Delivery', desc: whyChooseUs[3]?.description || '', icon: Truck, bg: 'bg-purple-100', text: 'text-purple-600' },
              { title: whyChooseUs[4]?.title || 'Custom Solutions', desc: whyChooseUs[4]?.description || '', icon: Settings, bg: 'bg-red-100', text: 'text-red-600' },
              { title: whyChooseUs[5]?.title || '24/7 Support', desc: whyChooseUs[5]?.description || '', icon: HeadphonesIcon, bg: 'bg-cyan-100', text: 'text-cyan-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <item.icon className={item.text} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Certifications</h2>
            <p className="text-gray-400">All products meet international quality standards</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-gray-800 rounded-xl px-6 py-4 flex items-center gap-3">
                <Shield className="text-blue-400" size={24} />
                <span className="text-white font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Careers Page
function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              Be part of a leading elevator parts company with 33 years of history. We're always looking for talented individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Global Company', description: 'Work with a TOP 3 exporter serving 82 countries' },
              { icon: GraduationCap, title: 'Growth Opportunities', description: 'Clear career paths and training programs' },
              { icon: HeartIcon, title: 'Great Benefits', description: 'Competitive salary, health insurance, and more' },
              { icon: Clock3, title: 'Work-Life Balance', description: 'Flexible hours and paid time off' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-gray-600">Find your perfect role at Crystal Elevator</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className={`bg-gray-50 rounded-2xl p-6 cursor-pointer transition ${
                  selectedJob === job.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPinIcon size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                {selectedJob === job.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="text-green-500" size={16} />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/contact?job=${job.id}`}
                      className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Position?</h2>
          <p className="text-blue-100 mb-8">
            Send us your resume anyway! We're always interested in meeting talented people.
          </p>
          <Link
            to="/contact?subject=Career%20Inquiry"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            <UsersIcon size={20} />
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

// Contact Page
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', company: '', country: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-blue-100 text-xl">
              Get in touch with our team. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Office Address</h4>
                  <p className="text-gray-600">Shanghai, China</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@crystalelevator.com</p>
                  <p className="text-gray-600">sales@crystalelevator.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+86 21 8888 8888</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock3 className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Business Hours</h4>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM (GMT+8)</p>
                  <p className="text-gray-500 text-sm">We respond to inquiries within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
              <p className="text-gray-600 text-sm mb-4">
                For urgent inquiries, please include "URGENT" in your subject line.
              </p>
              <div className="flex gap-2">
                {['Quote Request', 'Product Inquiry', 'Sample Order', 'Technical Support'].map((tag) => (
                  <span key={tag} className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Quote Request">Quote Request</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Sample Order">Sample Order</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Career Inquiry">Career Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please describe your requirements, including product names, quantities, and any specific needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to our privacy policy
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/flagship" element={<FlagshipPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
