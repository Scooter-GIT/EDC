'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@prisma/client'

interface ProductGridProps {
  products: (Product & {
    images: { url: string; alt: string }[];
    category: { name: string };
  })[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
        <Link href={`/products/${product.slug}`} key={product.id}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </CardContent>
            <CardFooter className="p-4">
              {product.currentPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  {product.listPrice && product.listPrice > product.currentPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.listPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">Price unavailable</span>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}