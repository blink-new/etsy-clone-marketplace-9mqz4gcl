import { blink } from '../lib/blink'

// Product types
export interface Product {
  id: string
  title: string
  description?: string
  price: number
  image?: string
  category?: string
  sellerId?: string
  sellerName?: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  createdAt?: string
  updatedAt?: string
}

// Order types
export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: string
  totalAmount: number
  shippingCost: number
  taxAmount: number
  paymentMethod?: string
  paymentStatus: string
  shippingAddress?: string
  billingAddress?: string
  createdAt?: string
  updatedAt?: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  total: number
  createdAt?: string
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  createdAt?: string
  updatedAt?: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment?: string
  createdAt?: string
}

// Product services
export const productService = {
  async getAll(): Promise<Product[]> {
    const products = await blink.db.products.list({
      orderBy: { createdAt: 'desc' }
    })
    return products
  },

  async getById(id: string): Promise<Product | null> {
    const products = await blink.db.products.list({
      where: { id },
      limit: 1
    })
    return products[0] || null
  },

  async getByCategory(category: string): Promise<Product[]> {
    const products = await blink.db.products.list({
      where: { category },
      orderBy: { createdAt: 'desc' }
    })
    return products
  },

  async search(query: string): Promise<Product[]> {
    // Simple search implementation - in production you'd use full-text search
    const products = await blink.db.products.list()
    return products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    )
  }
}

// Cart services
export const cartService = {
  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const cartItems = await blink.db.cartItems.list({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    // Get product details for each cart item
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productService.getById(item.productId)
        return {
          ...item,
          product: product!
        }
      })
    )

    return itemsWithProducts.filter(item => item.product) // Filter out items with deleted products
  },

  async addToCart(userId: string, productId: string, quantity: number = 1): Promise<void> {
    // Check if item already exists in cart
    const existingItems = await blink.db.cartItems.list({
      where: { 
        AND: [
          { userId },
          { productId }
        ]
      }
    })

    if (existingItems.length > 0) {
      // Update quantity
      const existingItem = existingItems[0]
      await blink.db.cartItems.update(existingItem.id, {
        quantity: existingItem.quantity + quantity,
        updatedAt: new Date().toISOString()
      })
    } else {
      // Add new item
      await blink.db.cartItems.create({
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        productId,
        quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
  },

  async updateQuantity(cartItemId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await blink.db.cartItems.delete(cartItemId)
    } else {
      await blink.db.cartItems.update(cartItemId, {
        quantity,
        updatedAt: new Date().toISOString()
      })
    }
  },

  async removeFromCart(cartItemId: string): Promise<void> {
    await blink.db.cartItems.delete(cartItemId)
  },

  async clearCart(userId: string): Promise<void> {
    const cartItems = await blink.db.cartItems.list({
      where: { userId }
    })
    
    for (const item of cartItems) {
      await blink.db.cartItems.delete(item.id)
    }
  }
}

// Order services
export const orderService = {
  async createOrder(orderData: {
    userId: string
    items: { productId: string; quantity: number; price: number }[]
    shippingAddress: string
    billingAddress: string
    paymentMethod: string
    totalAmount: number
    shippingCost: number
    taxAmount: number
  }): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create order
    const order = await blink.db.orders.create({
      id: orderId,
      userId: orderData.userId,
      orderNumber,
      status: 'pending',
      totalAmount: orderData.totalAmount,
      shippingCost: orderData.shippingCost,
      taxAmount: orderData.taxAmount,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'pending',
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    // Create order items
    for (const item of orderData.items) {
      await blink.db.orderItems.create({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        createdAt: new Date().toISOString()
      })
    }

    // Clear cart after successful order
    await cartService.clearCart(orderData.userId)

    return order
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const orders = await blink.db.orders.list({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return orders
  },

  async getOrderById(orderId: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | null> {
    const orders = await blink.db.orders.list({
      where: { id: orderId },
      limit: 1
    })

    if (orders.length === 0) return null

    const order = orders[0]
    
    // Get order items
    const orderItems = await blink.db.orderItems.list({
      where: { orderId }
    })

    // Get product details for each item
    const itemsWithProducts = await Promise.all(
      orderItems.map(async (item) => {
        const product = await productService.getById(item.productId)
        return {
          ...item,
          product: product!
        }
      })
    )

    return {
      ...order,
      items: itemsWithProducts.filter(item => item.product)
    }
  },

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await blink.db.orders.update(orderId, {
      status,
      updatedAt: new Date().toISOString()
    })
  }
}

// Review services
export const reviewService = {
  async getProductReviews(productId: string): Promise<Review[]> {
    const reviews = await blink.db.reviews.list({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    })
    return reviews
  },

  async addReview(productId: string, userId: string, rating: number, comment?: string): Promise<void> {
    await blink.db.reviews.create({
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId,
      userId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    })

    // Update product rating (simple average calculation)
    const reviews = await this.getProductReviews(productId)
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    
    await blink.db.products.update(productId, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviewCount: reviews.length,
      updatedAt: new Date().toISOString()
    })
  }
}