import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Attempting to connect to the database...')
    console.log('Connection URL:', process.env.DATABASE_URL)
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`
    console.log('Successfully connected to the database.')
    console.log('Query result:', result)
  } catch (error) {
    console.error('Error connecting to the database:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
  } finally {
    await prisma.$disconnect()
  }
}

main()

