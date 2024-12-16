import { prisma } from '@/lib/db'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">EDC Essentials</h1>
        <p className="text-gray-400 mb-8">Discover and compare the best everyday carry items.</p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="space-y-4">
              <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">
                  ${product.currentPrice?.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">
                  {product.category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}