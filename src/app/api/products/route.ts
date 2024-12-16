import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'name-asc'

  let whereClause: any = {}
  let orderBy: any = {}

  if (category && category !== 'all') {
    whereClause.category = { slug: category }
  }

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }

  switch (sort) {
    case 'name-asc':
      orderBy.name = 'asc'
      break
    case 'name-desc':
      orderBy.name = 'desc'
      break
    case 'price-asc':
      orderBy.currentPrice = 'asc'
      break
    case 'price-desc':
      orderBy.currentPrice = 'desc'
      break
    default:
      orderBy.name = 'asc'
  }

  try {
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: orderBy,
      include: {
        category: true,
        images: {
          where: { primary: true },
          take: 1
        }
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}

