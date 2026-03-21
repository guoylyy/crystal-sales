import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import FlagshipPage from './pages/FlagshipPage'
import EcommercePage from './pages/EcommercePage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
