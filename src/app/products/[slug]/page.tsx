'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Layout } from '@/components/layout'
import { mockProducts } from '@/lib/mock-data'

export default function ProductDetail() {
  const params = useParams()
  const [product] = useState(() => 
    mockProducts.find(p => p.slug === params.slug) || mockProducts[0]
  )

  if (!product) {
    return <Layout><div>Product not found</div></Layout>
  }

  return (
    <Layout>
      {/* Existing JSX */}
    </Layout>
  )
}

