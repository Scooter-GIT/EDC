import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layout'

export default function Home() {
  return (
    <Layout>
      <div className="hero-section">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="hero-title">
            Pick Items. Build Your EDC. Compare and Share.
          </h1>
          <p className="hero-subtitle">
            We provide selection, pricing, and compatibility guidance for everyday carry enthusiasts.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100" asChild>
            <a href="/builder">Start Your Build</a>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          <section>
            <h2 className="section-title">Build Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {['Minimalist', 'Professional', 'Tactical'].map((category) => (
                <div key={category} className="guide-card">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-6">
                    <h3 className="guide-title">{category} EDC Build</h3>
                    <p className="guide-description">
                      Curated selection of everyday carry items for {category.toLowerCase()} needs.
                    </p>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90" asChild>
                      <a href={`/guides/${category.toLowerCase()}`}>View Guide</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Featured Builds</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((build) => (
                <div key={build} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Featured Build #{build}</h3>
                    <p className="text-sm text-gray-600">
                      A complete EDC setup featuring premium gear and accessories.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

