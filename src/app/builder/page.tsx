import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { name: 'Knife', description: 'Primary cutting tool' },
  { name: 'Wallet', description: 'Card and cash carrier' },
  { name: 'Flashlight', description: 'Portable illumination' },
  { name: 'Multi-tool', description: 'Versatile functionality' },
  { name: 'Watch', description: 'Time and style' },
  { name: 'Keys', description: 'Key organization' },
]

export default function Builder() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">EDC Builder</h1>
          <div className="grid gap-4">
            {CATEGORIES.map((category) => (
              <div key={category.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <Button variant="outline">Choose {category.name}</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button size="lg">Save Build</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

