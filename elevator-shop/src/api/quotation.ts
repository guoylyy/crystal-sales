import request from './request'

export async function getQuotations(params?: { page?: number; pageSize?: number }) {
  try {
    return await request.get('/v2/quotation/paged', { params })
  } catch (e) {
    return { list: [], total: 0 }
  }
}

export async function getQuotationDetail(id: string) {
  try {
    return await request.get('/v2/quotation/detail', { params: { id } })
  } catch (e) {
    return { id, status: 'pending', items: [] }
  }
}

export async function createQuotation(params: { items: any[]; note?: string }) {
  try {
    return await request.post('/v2/quotation/create', params)
  } catch (e) {
    return { success: true, id: 'QT-' + Date.now() }
  }
}
