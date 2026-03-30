import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Filter, Grid, List, ArrowRight, Loader } from 'lucide-react'
import { products as mockProducts, productCategories, type Product } from '../data/company'
import { getProductPaged, getCategories } from '../api'
import { useStore } from '../context/StoreContext'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [categoryFilter, setCategoryFilter] = useState<number | null>(
    searchParams.get('category') ? parseInt(searchParams.get('category')!) : null
  )
  const [showCartMsg, setShowCartMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart, cart } = useStore()

  // Fetch products from API
  useEffect(() => {
    setLoading(true)
    async function fetchProducts() {
      try {
        const params: any = { page: 1, pageSize: 50 }
        if (categoryFilter) params.categoryId = categoryFilter
        if (searchQuery) params.keyword = searchQuery
        
        const res = await getProductPaged(params)
        setProducts(res.list || [])
      } catch (e) {
        // Fallback to mock
        let filtered = [...mockProducts]
        if (categoryFilter) filtered = filtered.filter(p => p.categoryId === categoryFilter)
        if (searchQuery) {
          const k = searchQuery.toLowerCase()
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(k) || 
            p.nameEn.toLowerCase().includes(k)
          )
        }
        setProducts(filtered)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [searchParams.toString()])

  const handleCategoryChange = (catId: number | null) => {
    setCategoryFilter(catId)
    if (catId) {
      setSearchParams({ category: catId.toString() })
    } else {
      setSearchParams({})
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      setSearchParams({ search: searchQuery })
    } else {
      setSearchParams({})
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, product.moq)
    setShowCartMsg(true)
    setTimeout(() => setShowCartMsg(false), 2000)
  }

  const category = categoryFilter ? productCategories.find(c => c.id === categoryFilter) : null

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {category ? category.name : 'All Products'}
          </h1>
          <p className="text-gray-300">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 sticky top-24">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </form>

              {/* Categories */}
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Filter size={18} />
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    !categoryFilter 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Products
                </button>
                {productCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      categoryFilter === cat.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${products.length} products`}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {showCartMsg && (
              <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                Added to cart!
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <p className="text-gray-500 mb-4">No products found</p>
                <button onClick={() => { setSearchQuery(''); setCategoryFilter(null); }} className="text-blue-600">
                  Clear filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square bg-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-sm text-blue-600 mb-1">{product.categoryName}</div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">{product.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">MOQ: {product.moq}</span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-gray-200 flex gap-6">
                    <Link to={`/product/${product.id}`} className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 mb-1">{product.categoryName}</div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">{product.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          <span className="text-sm text-gray-500">MOQ: {product.moq}</span>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
