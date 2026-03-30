import { Link } from 'react-router-dom'
import { FileText, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'

const quotations = [
  {
    id: 'QT-20260329-001',
    date: '2026-03-29',
    product: 'Elevator Button Panel x 100',
    status: 'pending',
    price: 22.00,
  },
  {
    id: 'QT-20260328-002',
    date: '2026-03-28',
    product: 'Safety Light Curtain x 50',
    status: 'quoted',
    price: 165.00,
  },
]

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600' },
  quoted: { label: 'Quoted', icon: CheckCircle, color: 'text-green-600' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600' },
}

export default function QuotationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>
          <Link to="/quotation/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            New Request
          </Link>
        </div>

        {quotations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No quotations yet</p>
            <Link to="/products" className="text-blue-600 hover:text-blue-700">Request a quote</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotations.map((qt) => {
              const status = statusConfig[qt.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <div key={qt.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-medium text-gray-900">{qt.id}</span>
                      <span className="text-gray-500 ml-4">{qt.date}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${status.color}`}>
                      <StatusIcon size={18} />
                      <span className="font-medium">{status.label}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-gray-600">{qt.product}</div>
                    {qt.status === 'quoted' && (
                      <div className="font-bold text-green-600">${qt.price}/unit</div>
                    )}
                    <Link
                      to={`/user/quotation/${qt.id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
