'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  brand: string
  description: string
  currentPrice: number | null
  listPrice: number | null
  category: { name: string }
  images: { url: string; alt: string }[]
  specifications: Record<string, string>
  materials: string[]
  dimensions: { length: number; width: number; height: number; unit: string } | null
  weight: number | null
  asin: string | null
  amazonUrl: string | null
}

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${params.slug}`)
      const data = await response.json()
      setProduct(data)
    }

    fetchProduct()
  }, [params.slug])

  if (!product) {
    return <Layout><div className="container mx-auto px-4 py-8">Loading...</div></Layout>
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{product.name}</CardTitle>
            <CardDescription>{product.brand} | {product.category.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square bg-muted relative mb-4">
                <img
                  src={product.images[0]?.url || '/placeholder.svg'}
                  alt={product.images[0]?.alt || product.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">${product.currentPrice?.toFixed(2) || 'N/A'}</div>
                  {product.listPrice && product.listPrice > product.currentPrice! && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${product.listPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                {product.amazonUrl && (
                  <Button asChild>
                    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">View on Amazon</a>
                  </Button>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <p className="mb-4">{product.description}</p>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside mb-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}><span className="font-medium">{key}:</span> {value}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-2">Materials</h3>
              <p className="mb-4">{product.materials.join(', ')}</p>
              {product.dimensions && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Dimensions</h3>
                  <p className="mb-4">
                    {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                  </p>
                </>
              )}
              {product.weight && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Weight</h3>
                  <p>{product.weight} g</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

