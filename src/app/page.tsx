import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Build Guides</h1>
      
      <div className="rounded-lg bg-white shadow-sm border p-6">
        <div className="aspect-[2/1] bg-gray-100 mb-6 rounded-lg"></div>
        
        <h2 className="text-2xl font-semibold">Minimalist EDC Build</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Curated selection of everyday carry items for minimalist needs.
        </p>
        
        <Link 
          href="/products" 
          className="w-full bg-gray-900 text-white rounded-lg py-3 px-4 text-center block hover:bg-gray-800 transition-colors"
        >
          View Guide
        </Link>
      </div>
    </main>
  )
}