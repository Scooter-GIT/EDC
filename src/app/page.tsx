import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-12">Build Guides</h1>
      
      <div className="rounded-2xl border border-gray-100">
        <div className="aspect-video bg-gray-50 rounded-t-2xl"></div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">Minimalist EDC Build</h2>
          <p className="text-gray-600 mb-6">
            Curated selection of everyday carry items for minimalist needs.
          </p>
          
          <Link href="/products">
            <button className="w-full bg-gray-900 text-white rounded-lg py-3 hover:bg-gray-800">
              View Guide
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}