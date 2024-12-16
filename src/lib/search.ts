import { prisma } from './db'
import type { Product } from '@prisma/client'

export type SearchFilters = {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string[]
  materials?: string[]
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'
}

export async function searchProducts(filters: SearchFilters) {
  const {
    query,
    category,
    minPrice,
    maxPrice,
    brand,
    materials,
    sortBy = 'name_asc'
  } = filters

  // Build where clause
  const where: any = {
    AND: []
  }

  // Full text search on name, brand, and description
  if (query) {
    where.AND.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    })
  }

  // Category filter
  if (category) {
    where.AND.push({
      category: {
        name: category
      }
    })
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.AND.push({
      currentPrice: {
        gte: minPrice,
        lte: maxPrice
      }
    })
  }

  // Brand filter
  if (brand && brand.length > 0) {
    where.AND.push({
      brand: {
        in: brand
      }
    })
  }

  // Materials filter
  if (materials && materials.length > 0) {
    where.AND.push({
      materials: {
        hasSome: materials
      }
    })
  }

  // Handle empty AND array
  if (where.AND.length === 0) {
    delete where.AND
  }

  // Build sort object
  const orderBy: any = {}
  switch (sortBy) {
    case 'price_asc':
      orderBy.currentPrice = 'asc'
      break
    case 'price_desc':
      orderBy.currentPrice = 'desc'
      break
    case 'name_desc':
      orderBy.name = 'desc'
      break
    case 'name_asc':
    default:
      orderBy.name = 'asc'
  }

  // Execute search query
  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      category: true,
      images: {
        where: { primary: true },
        take: 1
      }
    }
  })

  return products
}