export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  university: string
  year: "freshman" | "sophomore" | "junior" | "senior" | "graduate"
  major?: string
  phone?: string
  rating: number
  reviewCount: number
  createdAt: Date
  isVerified: boolean
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: Category
  condition: "new" | "like-new" | "good" | "fair" | "poor"
  sellerId: string
  seller: User
  status: "available" | "sold" | "reserved"
  location: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  views: number
  likes: number

}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: "text" | "image" | "offer"
  createdAt: Date
  isRead: boolean
}

export interface Conversation {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  lastMessage?: Message
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  reviewerId: string
  revieweeId: string
  productId: string
  rating: number
  comment: string
  createdAt: Date
}
