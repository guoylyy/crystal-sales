import { Link } from 'react-router-dom'
import { brands } from '../data/company'

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Brand Gallery</h1>
          <p className="text-gray-300">Explore premium elevator brands from around the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/products?brand=${brand.id}`}
              className="bg-white rounded-xl p-8 flex items-center justify-center shadow-sm hover:shadow-xl transition border border-gray-200"
            >
              <img src={brand.logo} alt={brand.name} className="h-12" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
