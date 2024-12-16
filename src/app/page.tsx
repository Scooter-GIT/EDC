import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Pick Items. Build Your EDC. Compare and Share.</h1>
        <p className="text-gray-400 mb-8">We provide selection, pricing, and compatibility guidance for everyday carry enthusiasts.</p>
        <Link href="/products">
          <button className="bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100">
            Start Your Build
          </button>
        </Link>
      </section>

      {/* Build Guides Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Build Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Minimalist Build */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Minimalist EDC Build</h3>
            <p className="text-gray-600 text-sm">Curated selection of everyday carry items for minimalist needs.</p>
            <Link href="/products">
              <button className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800">
                View Guide
              </button>
            </Link>
          </div>

          {/* Professional Build */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Professional EDC Build</h3>
            <p className="text-gray-600 text-sm">Curated selection of everyday carry items for professional needs.</p>
            <Link href="/products">
              <button className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800">
                View Guide
              </button>
            </Link>
          </div>

          {/* Tactical Build */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Tactical EDC Build</h3>
            <p className="text-gray-600 text-sm">Curated selection of everyday carry items for tactical needs.</p>
            <Link href="/products">
              <button className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800">
                View Guide
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Builds Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Builds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Build #1 */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Featured Build #1</h3>
            <p className="text-gray-600 text-sm">A complete EDC setup featuring premium gear and accessories.</p>
          </div>

          {/* Featured Build #2 */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Featured Build #2</h3>
            <p className="text-gray-600 text-sm">A complete EDC setup featuring premium gear and accessories.</p>
          </div>

          {/* Featured Build #3 */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-gray-50 rounded-lg"></div>
            <h3 className="font-semibold">Featured Build #3</h3>
            <p className="text-gray-600 text-sm">A complete EDC setup featuring premium gear and accessories.</p>
          </div>
        </div>
      </section>
    </div>
  )
}