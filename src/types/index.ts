export interface Product {
  id: string
  name: string
  category: 'fantasia' | 'vestido' | 'terno' | 'acessorio'
  description: string
  price: number
  images: string[]
  sizes: string[]
  colors: string[]
  measurements?: {
    bust?: string
    waist?: string
    hip?: string
    length?: string
  }
  stock: number
  availableDates: string[]
}

export interface Rental {
  id: string
  productId: string
  productName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  startDate: string
  endDate: string
  totalPrice: number
  paymentMethod: 'card' | 'pix' | 'boleto'
  deliveryMethod: 'pickup' | 'delivery'
  deliveryAddress?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface CartItem {
  product: Product
  startDate: string
  endDate: string
  quantity: number
}

