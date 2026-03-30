import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react'

export default function OrderDetailPage() {
  const { id } = useParams()
  
  const order = {
    id: id || 'ORD-20260329-001',
    date: '2026-03-29',
    status: 'shipped',
    items: [
      { name: 'Elevator Button Panel', price: 25, quantity: 10, total: 250 },
      { name: 'Safety Light Curtain', price: 180, quantity: 5, total: 900 },
    ],
    shipping: 100,
    total: 1250,
    customer: {
      name: 'John Doe',
      company: 'ABC Elevator Co.',
      phone: '+1 234 567 8900',
      address: '123 Main St, New York, NY 10001, USA',
    },
    timeline: [
      { date: '2026-03-29 14:30', event: 'Order shipped', icon: Truck },
      { date: '2026-03-29 10:15', event: 'Payment confirmed', icon: CheckCircle },
      { date: '2026-03-29 09:00', event: 'Order placed', icon: Clock },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/user/orders" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order {order.id}</h1>
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium">Shipped</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500 text-sm">${item.price} x {item.quantity}</div>
                    </div>
                    <div className="font-medium">${item.total}</div>
                  </div>
                ))}
                <div className="flex justify-between pt-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-xl">${order.total}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2 text-gray-600">
                <div className="font-medium text-gray-900">{order.customer.name}</div>
                <div>{order.customer.company}</div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {order.customer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {order.customer.address}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="font-bold text-gray-900 mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {order.timeline.map((event, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <event.icon size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm">{event.event}</div>
                      <div className="text-gray-500 text-xs">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
