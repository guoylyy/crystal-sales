import request from './request'

// Get products with pagination
export async function getProductPaged(params: {
  page?: number
  pageSize?: number
  categoryId?: string | string[]
  keyword?: string
  status?: string
}) {
  try {
    // Add default params
    const queryParams = {
      page: params.page || 1,
      pageSize: params.pageSize || 20,
      ...params,
    }
    const res = await request.get('/v2/product/paged', { params: queryParams })
    
    // Transform API response to frontend format
    if (res.code === 200 && res.data) {
      return {
        list: res.data.records.map(transformProduct),
        total: res.data.total,
        page: res.data.current,
        pageSize: res.data.size,
      }
    }
    return { list: [], total: 0 }
  } catch (e) {
    console.error('API Error:', e)
    return { list: [], total: 0 }
  }
}

// Get product detail
export async function getProductDetail(id: string) {
  try {
    const res = await request.get('/v2/product/detail', { params: { id } })
    if (res.code === 200 && res.data) {
      return transformProduct(res.data)
    }
    throw new Error('Product not found')
  } catch (e) {
    console.error('API Error:', e)
    throw e
  }
}

// Get related products
export async function getProductRelated(params: { id: string; categoryId: string }) {
  try {
    const res = await request.get('/v2/product/related', { params })
    if (res.code === 200 && res.data) {
      return {
        list: res.data.records.map(transformProduct),
        total: res.data.total,
      }
    }
    return { list: [], total: 0 }
  } catch (e) {
    return { list: [], total: 0 }
  }
}

// Get product categories
export async function getCategories() {
  try {
    const res = await request.get('/v2/category/all')
    if (res.code === 200 && res.data) {
      return res.data.records.map(transformCategory)
    }
    return []
  } catch (e) {
    console.error('Category API Error:', e)
    return getMockCategories()
  }
}

// Transform API product to frontend format
function transformProduct(p: any) {
  return {
    id: p.id,
    name: p.nameCn || p.nameEn || '',
    nameEn: p.nameEn || '',
    description: p.specificationCn || p.specificationEn || '',
    descriptionEn: p.specificationEn || '',
    image: p.image || '',
    images: p.images || [p.image],
    categoryId: p.categoryId,
    categoryName: p.categoryNameCn || p.categoryNameEn || '',
    price: p.minPriceUsd || p.minPriceRmb || 0,
    originalPrice: p.maxPriceUsd || p.maxPriceRmb || null,
    stock: 1000,
    moq: 1,
    unit: p.unitCn || p.unitEn || 'unit',
    status: p.status === 1 ? 'active' : 'inactive',
    salesCount: 100,
    rating: 4.5,
    features: [],
    model: p.model,
  }
}

// Transform API category to frontend format
function transformCategory(c: any) {
  return {
    id: c.id,
    name: c.nameCn || c.nameEn || '',
    nameEn: c.nameEn || '',
    icon: c.icon || '📦',
  }
}

// Mock fallbacks
import { topCategories } from '../data/company'

function getMockCategories() {
  return topCategories.map(c => ({
    id: c.id,
    name: c.name,
    nameEn: c.nameEn,
  }))
}
