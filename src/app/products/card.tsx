interface Product {
  id: string
  slug: string
  name: string
  brand: string
  description: string
  currentPrice: number
  listPrice: number
  category: {
    name: string
  }
  images: {
    url: string
    alt: string
  }[]
  specifications: Record<string, string>
  reviewCount: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.currentPrice}</p>
    </div>
  )
} 