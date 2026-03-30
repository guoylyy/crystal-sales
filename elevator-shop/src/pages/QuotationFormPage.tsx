import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, FileText, Plus, Trash2 } from 'lucide-react'

interface QuoteItem {
  id: number
  productId: string
  productName: string
  quantity: number
}

export default function QuotationFormPage() {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: 1, productId: '', productName: '', quantity: 100 },
  ])

  const addItem = () => {
    setItems([...items, { id: Date.now(), productId: '', productName: '', quantity: 100 }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Quote request submitted! (Demo)')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/user/quotations" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to Quotations
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Request a Quote</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="font-bold text-gray-900 mb-6">Products</h2>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end border border-gray-200 rounded-lg p-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name or description"
                    value={item.productName}
                    onChange={(e) => {
                      const newItems = [...items]
                      newItems[index].productName = e.target.value
                      setItems(newItems)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items]
                      newItems[index].quantity = parseInt(e.target.value) || 1
                      setItems(newItems)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                    min="1"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus size={18} />
            Add Another Product
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="font-bold text-gray-900 mb-6">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  placeholder="Any specific requirements..."
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
