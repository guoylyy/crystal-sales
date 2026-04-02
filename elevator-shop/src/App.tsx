import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Page titles
const pageTitles: Record<string, string> = {
  '/': 'Home - Crystal Elevator',
  '/products': 'Products - Crystal Elevator',
  '/product/:id': 'Product Details - Crystal Elevator',
  '/brands': 'Brands - Crystal Elevator',
  '/top-deals': 'Hot Deals - Crystal Elevator',
  '/full-elevator': 'Full Elevator - Crystal Elevator',
  '/app': 'Mobile App - Crystal Elevator',
  '/help': 'Help Center - Crystal Elevator',
  '/about': 'About Us - Crystal Elevator',
  '/contact': 'Contact Us - Crystal Elevator',
  '/cart': 'Shopping Cart - Crystal Elevator',
  '/checkout': 'Checkout - Crystal Elevator',
  '/login': 'Sign In - Crystal Elevator',
  '/register': 'Register - Crystal Elevator',
  '/user': 'My Account - Crystal Elevator',
  '/user/orders': 'My Orders - Crystal Elevator',
  '/user/order/:id': 'Order Details - Crystal Elevator',
  '/user/purchased': 'Purchased Products - Crystal Elevator',
  '/user/quotations': 'My Quotations - Crystal Elevator',
  '/user/quotation/new': 'Request Quote - Crystal Elevator',
  '/user/profile': 'Profile - Crystal Elevator',
  '/quotation': 'Elevator Quote - Crystal Elevator',
}

// Pages
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import BrandPage from './pages/BrandPage'
import TopDealsPage from './pages/TopDealsPage'
import HelpCenterPage from './pages/HelpCenterPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserDashboard from './pages/UserDashboard'
import OrderListPage from './pages/OrderListPage'
import OrderDetailPage from './pages/OrderDetailPage'
import QuotationsPage from './pages/QuotationsPage'
import QuotationPage from './pages/QuotationPage'
import ProfilePage from './pages/ProfilePage'

function FullElevatorPage() {
  return (
    <div classNameName="bg-gray-50">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Full Elevator Selection</h1>
          <p className="text-gray-300 mt-2">Choose from our premium elevator models</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {['Classic Series', 'Premium Series', 'Home Series'].map((name, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-xl mb-4">{name}</h3>
              <p className="text-gray-600 mb-4">Premium quality elevator for commercial and residential buildings.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PurchasedPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Purchased Products</h1>
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <p className="text-gray-500">No purchased products yet.</p>
        </div>
      </div>
    </div>
  )
}

function AppPage() {
  return (
    <div className="bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Mobile App</h1>
          <p className="text-gray-300 mt-2">Download our app for easier ordering</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">App coming soon...</p>
      </div>
    </div>
  )
}

// TitleUpdater component
function TitleUpdater() {
  const location = useLocation()
  
  useEffect(() => {
    let title = 'Crystal Elevator - Professional Elevator Parts Supplier'
    
    for (const [path, t] of Object.entries(pageTitles)) {
      const pathPattern = path.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${pathPattern}$`)
      if (regex.test(location.pathname)) {
        title = t
        break
      }
    }
    
    document.title = title
  }, [location])
  
  return null
}

// Wrapper component that adds Layout
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default function App() {
  return (
    <>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
        <Route path="/brands" element={<PageWrapper><BrandPage /></PageWrapper>} />
        <Route path="/top-deals" element={<PageWrapper><TopDealsPage /></PageWrapper>} />
        <Route path="/full-elevator" element={<PageWrapper><FullElevatorPage /></PageWrapper>} />
        <Route path="/app" element={<PageWrapper><AppPage /></PageWrapper>} />
        <Route path="/help" element={<PageWrapper><HelpCenterPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
        <Route path="/user" element={<PageWrapper><UserDashboard /></PageWrapper>} />
        <Route path="/user/orders" element={<PageWrapper><OrderListPage /></PageWrapper>} />
        <Route path="/user/order/:id" element={<PageWrapper><OrderDetailPage /></PageWrapper>} />
        <Route path="/user/purchased" element={<PageWrapper><PurchasedPage /></PageWrapper>} />
        <Route path="/user/quotations" element={<PageWrapper><QuotationsPage /></PageWrapper>} />
        <Route path="/user/quotation/new" element={<PageWrapper><QuotationPage /></PageWrapper>} />
        <Route path="/user/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
        <Route path="/quotation" element={<PageWrapper><QuotationPage /></PageWrapper>} />
      </Routes>
    </>
  )
}
