import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to the database!')
    
    // Test query
    const categoriesCount = await prisma.category.count()
    console.log(`Number of categories: ${categoriesCount}`)
    
    const productsCount = await prisma.product.count()
    console.log(`Number of products: ${productsCount}`)
  } catch (error) {
    console.error('Error connecting to the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

