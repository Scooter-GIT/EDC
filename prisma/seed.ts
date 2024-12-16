import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create initial categories
  const categories = [
    { name: 'Knives', description: 'EDC Knives and Multi-tools' },
    { name: 'Wallets', description: 'Minimalist and Traditional Wallets' },
    { name: 'Flashlights', description: 'Portable Illumination Tools' },
    { name: 'Watches', description: 'EDC Timepieces' }
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

  // Get categories
  const knivesCategory = await prisma.category.findFirst({ where: { name: 'Knives' } })
  const walletsCategory = await prisma.category.findFirst({ where: { name: 'Wallets' } })
  const flashlightsCategory = await prisma.category.findFirst({ where: { name: 'Flashlights' } })
  const watchesCategory = await prisma.category.findFirst({ where: { name: 'Watches' } })

  if (!knivesCategory || !walletsCategory || !flashlightsCategory || !watchesCategory) {
    throw new Error('Categories not found')
  }

  const products = [
    {
      name: 'Benchmade 940 Osborne',
      slug: 'benchmade-940-osborne',
      brand: 'Benchmade',
      categoryId: knivesCategory.id,
      description: 'The Benchmade 940 Osborne is a premium EDC folding knife.',
      currentPrice: 189.99,
      listPrice: 205.00,
      specifications: {
        blade_length: "3.4 inches",
        blade_material: "CPM-S30V",
        handle_material: "Aluminum"
      },
      materials: ["CPM-S30V Steel", "Aluminum"],
      dimensions: { length: 7.87, width: 0.94, height: 0.44, unit: "inches" },
      weight: 82.2,
      imageUrl: 'https://api.placeholder.com/800x800?text=Benchmade+940'
    },
    {
      name: 'Ridge Wallet - Carbon Fiber',
      slug: 'ridge-wallet-carbon',
      brand: 'Ridge',
      categoryId: walletsCategory.id,
      description: 'Minimalist RFID-blocking carbon fiber wallet.',
      currentPrice: 125.00,
      listPrice: 125.00,
      specifications: {
        capacity: "12 cards",
        material: "Carbon Fiber",
        rfid_blocking: true
      },
      materials: ["Carbon Fiber", "Elastic"],
      dimensions: { length: 3.39, width: 2.13, height: 0.24, unit: "inches" },
      weight: 28.3,
      imageUrl: 'https://api.placeholder.com/800x800?text=Ridge+Wallet'
    },
    {
      name: 'Olight Baton 3 Pro',
      slug: 'olight-baton-3-pro',
      brand: 'Olight',
      categoryId: flashlightsCategory.id,
      description: 'Compact EDC flashlight with wireless charging.',
      currentPrice: 89.95,
      listPrice: 99.95,
      specifications: {
        max_lumens: "1500",
        battery: "Custom 3500mAh",
        charging: "Wireless"
      },
      materials: ["Aluminum"],
      dimensions: { length: 4.25, width: 0.94, height: 0.94, unit: "inches" },
      weight: 120,
      imageUrl: 'https://api.placeholder.com/800x800?text=Olight+Baton'
    },
    {
      name: 'Casio G-Shock DW5600',
      slug: 'casio-g-shock-dw5600',
      brand: 'Casio',
      categoryId: watchesCategory.id,
      description: 'Classic digital watch with exceptional durability.',
      currentPrice: 69.95,
      listPrice: 79.95,
      specifications: {
        water_resistance: "200m",
        battery_life: "2 years",
        features: ["Stopwatch", "Timer", "Backlight"]
      },
      materials: ["Resin", "Mineral Glass"],
      dimensions: { length: 1.77, width: 1.77, height: 0.5, unit: "inches" },
      weight: 53,
      imageUrl: 'https://api.placeholder.com/800x800?text=G-Shock'
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        images: {
          create: {
            url: product.imageUrl,
            alt: product.name,
            primary: true
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