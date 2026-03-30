import { useState, useEffect, useCallback } from 'react'
import { getProductPaged, getProductDetail, getCategories, getProductRelated } from '../api'

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState(initialParams)

  const fetchProducts = useCallback(async (newParams = params) => {
    setLoading(true)
    setError(null)
    try {
      const res = await getProductPaged(newParams)
      setProducts(res.list || [])
      setTotal(res.total || 0)
    } catch (e: any) {
      setError(e.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchProducts()
  }, [params])

  return { products, loading, error, total, params, setParams, refetch: fetchProducts }
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [related, setRelated] = useState<any[]>([])

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    async function load() {
      try {
        const [detail, relatedRes] = await Promise.all([
          getProductDetail(id),
          getProductRelated({ id, categoryId: 0 })
        ])
        setProduct(detail)
        setRelated(relatedRes.list || [])
      } catch (e: any) {
        setError(e.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return { product, loading, error, related }
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await getCategories()
        setCategories(res || [])
      } catch (e) {
        console.error('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { categories, loading }
}
