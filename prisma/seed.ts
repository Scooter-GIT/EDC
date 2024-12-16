import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create initial categories
  const categories = [
    { name: 'Knives', description: 'EDC Knives and Multi-tools' },
    { name: 'Wallets', description: 'Minimalist and Traditional Wallets' },
    { name: 'Flashlights', description: 'Portable Illumination Tools' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        description: category.description
      },
    })
  }

  // Get the created category
  const knivesCategory = await prisma.category.findFirst({
    where: { name: 'Knives' }
  })

  if (knivesCategory) {
    // Add a sample product
    await prisma.product.upsert({
      where: { slug: 'benchmade-940-osborne' },
      update: {},
      create: {
        name: 'Benchmade 940 Osborne',
        slug: 'benchmade-940-osborne',
        brand: 'Benchmade',
        categoryId: knivesCategory.id,
        description: 'The Benchmade 940 Osborne is a premium EDC folding knife.',
        currentPrice: 189.99,
        listPrice: 205.00,
        asin: 'B000QA9G2W',
        amazonUrl: 'https://www.amazon.com/dp/B000QA9G2W',
        specifications: {
          blade_length: "3.4 inches",
          blade_material: "CPM-S30V",
          handle_material: "Aluminum",
          weight: "2.9 oz"
        },
        materials: ["CPM-S30V Steel", "Aluminum"],
        dimensions: {
          length: 7.87,
          width: 0.94,
          height: 0.44,
          unit: "inches"
        },
        weight: 82.2,
        images: {
          create: {
            url: '/placeholder.svg',
            alt: 'Benchmade 940 Osborne Knife'
          }
        }
      }
    })
  }

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })