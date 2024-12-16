import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse'

const prisma = new PrismaClient()

// Define the type for our CSV record
interface ProductRecord {
  name: string
  brand: string
  slug: string
  category: string
  description: string
  currentPrice: string
  listPrice: string
  asin?: string
  amazonUrl?: string
  specifications: string
  materials: string
  dimensions: string
  weight: string
  primaryImageUrl: string
  primaryImageAlt: string
}

async function importProducts() {
  const csvFilePath = path.join(__dirname, '../data/imports/products.csv')
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' })

  // Parse CSV with type assertion
  const records: ProductRecord[] = await new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }, (error, result: ProductRecord[]) => {
      if (error) reject(error)
      else resolve(result)
    })
  })

  console.log(`Found ${records.length} products to import`)

  try {
    for (const record of records) {
      // Parse JSON strings
      const specifications = JSON.parse(record.specifications)
      const materials = JSON.parse(record.materials) as string[]
      const dimensions = JSON.parse(record.dimensions)

      // Get or create category
      const category = await prisma.category.upsert({
        where: { name: record.category },
        update: {},
        create: {
          name: record.category,
          description: `${record.category} category`
        }
      })

      // Create product
      const product = await prisma.product.create({
        data: {
          name: record.name,
          brand: record.brand,
          slug: record.slug,
          description: record.description,
          currentPrice: parseFloat(record.currentPrice),
          listPrice: parseFloat(record.listPrice),
          asin: record.asin || null,
          amazonUrl: record.amazonUrl || null,
          specifications,
          materials,
          dimensions,
          weight: parseFloat(record.weight),
          categoryId: category.id,
          images: {
            create: {
              url: record.primaryImageUrl,
              alt: record.primaryImageAlt
            }
          }
        }
      })

      console.log(`Imported: ${product.name}`)
    }

    console.log('Import completed successfully!')
  } catch (error) {
    console.error('Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importProducts()
  .catch(console.error)