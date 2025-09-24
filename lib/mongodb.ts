import { MongoClient } from 'mongodb'

// In-memory storage as fallback
let memoryDB: any = {
  listings: []
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export async function connectDB() {
  // Check if MongoDB URI is properly configured
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('username:password')) {
    console.log('Using in-memory database (MongoDB not configured)')
    return {
      collection: (name: string) => ({
        find: (query: any) => ({
          toArray: () => Promise.resolve(memoryDB[name] || [])
        }),
        insertOne: (doc: any) => {
          if (!memoryDB[name]) memoryDB[name] = []
          const id = Date.now().toString()
          const newDoc = { ...doc, _id: id }
          memoryDB[name].push(newDoc)
          return Promise.resolve({ insertedId: id })
        },
        insertMany: (docs: any[]) => {
          if (!memoryDB[name]) memoryDB[name] = []
          const insertedIds: any = {}
          docs.forEach((doc, index) => {
            const id = (Date.now() + index).toString()
            insertedIds[index] = id
            memoryDB[name].push({ ...doc, _id: id })
          })
          return Promise.resolve({ insertedCount: docs.length, insertedIds })
        }
      })
    }
  }

  try {
    await client.connect()
    return client.db('studentmarket')
  } catch (error) {
    console.error('MongoDB connection error, falling back to in-memory storage')
    return {
      collection: (name: string) => ({
        find: (query: any) => ({
          toArray: () => Promise.resolve(memoryDB[name] || [])
        }),
        insertOne: (doc: any) => {
          if (!memoryDB[name]) memoryDB[name] = []
          const id = Date.now().toString()
          const newDoc = { ...doc, _id: id }
          memoryDB[name].push(newDoc)
          return Promise.resolve({ insertedId: id })
        },
        insertMany: (docs: any[]) => {
          if (!memoryDB[name]) memoryDB[name] = []
          const insertedIds: any = {}
          docs.forEach((doc, index) => {
            const id = (Date.now() + index).toString()
            insertedIds[index] = id
            memoryDB[name].push({ ...doc, _id: id })
          })
          return Promise.resolve({ insertedCount: docs.length, insertedIds })
        }
      })
    }
  }
}