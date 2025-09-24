export interface User {
  _id?: string
  id?: string
  email: string
  name: string
  password?: string
  university?: string
  year?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate'
  major?: string
  rating: number
  reviewCount: number
  isVerified: boolean
  avatar?: string
  createdAt: Date
}