export interface Product {
  id: string
  name: string
  category: string
  brand: string
  price: number
  amazonUrl?: string
  specifications: Record<string, string>
  rating: number
  imageUrl: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'

