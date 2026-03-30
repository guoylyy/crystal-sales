import request from './request'

export async function getCart() {
  try {
    return await request.get('/v2/cart')
  } catch (e) {
    return { list: [], total: 0 }
  }
}

export async function addToCart(params: { productId: string; quantity: number }) {
  try {
    return await request.post('/v2/cart/add', params)
  } catch (e) {
    return { success: true }
  }
}

export async function updateCartItem(params: { productId: string; quantity: number }) {
  try {
    return await request.post('/v2/cart/update', params)
  } catch (e) {
    return { success: true }
  }
}

export async function removeFromCart(productId: string) {
  try {
    return await request.post('/v2/cart/remove', { productId })
  } catch (e) {
    return { success: true }
  }
}
