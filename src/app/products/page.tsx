'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { ProductCard } from './card'
import { mockProducts } from '@/lib/mock-data'

export default function ProductsPage() {
  const [products] = useState(mockProducts)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}