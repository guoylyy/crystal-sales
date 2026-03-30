import { useState, useEffect, useCallback } from 'react'
import { getOrders, getOrderDetail as getOrderDetailApi } from '../api'

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getOrders()
      setOrders(res.list || [])
      setTotal(res.total || 0)
    } catch (e) {
      console.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, total, refetch: fetchOrders }
}

export function useOrderDetail(id: string) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    async function load() {
      try {
        const res = await getOrderDetailApi(id)
        setOrder(res)
      } catch (e) {
        console.error('Failed to load order')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return { order, loading }
}
