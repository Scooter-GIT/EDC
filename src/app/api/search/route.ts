import { NextResponse } from 'next/server'
import { searchProducts } from '@/lib/search'
import type { SearchFilters } from '@/lib/search'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: SearchFilters = {
      query: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      brand: searchParams.get('brand')?.split(',') || undefined,
      materials: searchParams.get('materials')?.split(',') || undefined,
      sortBy: searchParams.get('sortBy') as SearchFilters['sortBy'] || 'name_asc'
    }

    const products = await searchProducts(filters)
    
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}