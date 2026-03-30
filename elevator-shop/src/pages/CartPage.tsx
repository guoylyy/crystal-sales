import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/products" className="text-blue-600 hover:text-blue-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl p-6 flex gap-6 border border-gray-200">
                  <Link to={`/product/${item.product.id}`} className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {item.product.name}
                    </Link>
                    <div className="text-gray-500 text-sm mt-1">{item.product.categoryName}</div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 self-start"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-blue-600">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
