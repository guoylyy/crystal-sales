import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Grid, List, CheckCircle } from 'lucide-react'
import { brands, productsByCategory, allProducts, type Product } from '../data/company'

export default function BrandPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null)

  // Get products for selected brand
  const getProductsForBrand = (brandId: number | null) => {
    if (brandId === null) {
      return Object.values(productsByCategory).flat()
    }
    // For demo, show all products when a brand is selected
    return Object.values(productsByCategory).flat()
  }

  const products = getProductsForBrand(selectedBrand)

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Brand Gallery</h1>
          <p className="text-gray-300">Browse products by brand</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Brand Filter */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Filter size={18} />
                    Brands
                  </h3>
                  {selectedBrand !== null && (
                    <button 
                      onClick={() => setSelectedBrand(null)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                  Confirm Filter
                </button>
              </div>

              {/* Brand List */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                        selectedBrand === brand.id
                          ? 'bg-blue-50 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="w-16 h-8 object-contain" 
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-sm">{brand.name}</div>
                        <div className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 10) + 1} items
                        </div>
                      </div>
                      {selectedBrand === brand.id && (
                        <CheckCircle size={18} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Brands
                </button>
              </div>
            </div>
          </aside>

          {/* Right Side - Products */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {products.length} products
                {selectedBrand !== null && (
                  <span className="ml-2 text-blue-600">
                    - {brands.find(b => b.id === selectedBrand)?.name}
                  </span>
                )}
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

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <p className="text-gray-500">No products found for this brand</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square bg-gray-100">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-sm text-blue-600 mb-1">{product.categoryName}</div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/product/${product.id}`}
                        className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                      >
                        Check Detail
                      </Link>
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
                        <Link 
                          to={`/product/${product.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Check Detail
                        </Link>
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
