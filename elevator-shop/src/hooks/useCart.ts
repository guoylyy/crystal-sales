import { useState, useEffect, useCallback } from 'react'
import { getCart, addToCart as addToCartApi, removeFromCart } from '../api'

export function useCart() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchCart = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getCart()
      setItems(res.list || [])
      setTotal(res.total || 0)
    } catch (e) {
      console.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    try {
      await addToCartApi({ productId, quantity })
      await fetchCart()
      return true
    } catch (e) {
      console.error('Failed to add to cart')
      return false
    }
  }, [fetchCart])

  const removeItem = useCallback(async (productId: string) => {
    try {
      await removeFromCart(productId)
      await fetchCart()
    } catch (e) {
      console.error('Failed to remove from cart')
    }
  }, [fetchCart])

  return { items, loading, total, addToCart, removeItem, refetch: fetchCart }
}
