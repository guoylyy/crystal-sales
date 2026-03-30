import { products as mockProducts, productCategories, type Product } from '../data/company'

// Simulating Pinia store with React Context would require more setup
// For simplicity, we'll use a simple store pattern

interface CartItem {
  product: Product
  quantity: number
}

class ProductStore {
  products: Product[] = []
  categories = productCategories
  cart: CartItem[] = []
  loading = false

  constructor() {
    this.products = mockProducts
  }

  getProducts() {
    return this.products
  }

  getProductById(id: string) {
    return this.products.find(p => p.id === id)
  }

  getProductsByCategory(categoryId: number) {
    return this.products.filter(p => p.categoryId === categoryId)
  }

  // Cart operations
  addToCart(product: Product, quantity: number) {
    const existing = this.cart.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      this.cart.push({ product, quantity })
    }
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.product.id !== productId)
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0)
  }
}

export const productStore = new ProductStore()
