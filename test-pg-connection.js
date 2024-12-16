import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

async function testConnection(url, urlType) {
  console.log(`\nTesting ${urlType}...`)
  const pool = new Pool({
    connectionString: url,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('Attempting to connect...')
    const client = await pool.connect()
    console.log('Successfully connected to the database')
    
    const result = await client.query('SELECT version()')
    console.log('Database version:', result.rows[0].version)
    
    client.release()
  } catch (error) {
    console.error('Connection error:', error.message)
    if (error.message.includes('SSL')) {
      console.error('SSL Error: Make sure sslmode=require is in your connection string')
    }
  } finally {
    await pool.end()
  }
}

async function runTests() {
  // Test pooled connection (DATABASE_URL)
  await testConnection(process.env.DATABASE_URL, 'Pooled Connection (DATABASE_URL)')
  
  // Test direct connection (DIRECT_URL)
  await testConnection(process.env.DIRECT_URL, 'Direct Connection (DIRECT_URL)')
}

runTests().catch(console.error)

