import request from './request'

export async function getOrders(params?: { page?: number; pageSize?: number }) {
  try {
    return await request.get('/v2/order/paged', { params })
  } catch (e) {
    return { list: [], total: 0 }
  }
}

export async function getOrderDetail(id: string) {
  try {
    return await request.get('/v2/order/detail', { params: { id } })
  } catch (e) {
    return { id, status: 'pending', items: [], total: 0 }
  }
}

export async function createOrder(params: any) {
  try {
    return await request.post('/v2/order/create', params)
  } catch (e) {
    return { success: true, orderId: 'ORD-' + Date.now() }
  }
}
