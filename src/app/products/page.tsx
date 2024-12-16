import { Suspense } from 'react'
import SearchBar from '@/components/search-bar'
import ProductGrid from '@/components/product-grid'
import { searchProducts } from '@/lib/search'

interface ProductsPageProps {
  searchParams: {
    q?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await searchProducts({
    query: searchParams.q,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy as any,
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">EDC Products</h1>
      <SearchBar />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  )
}