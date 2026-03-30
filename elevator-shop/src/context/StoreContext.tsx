import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { products as allProducts, type Product } from '../data/company'

interface CartItem {
  product: Product
  quantity: number
}

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(items => {
      const existing = items.find(item => item.product.id === product.id)
      if (existing) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...items, { product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart(items => items.filter(item => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(items => items.map(item => 
      item.product.id === productId 
        ? { ...item, quantity }
        : item
    ))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <StoreContext.Provider value={{
      products: allProducts,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
