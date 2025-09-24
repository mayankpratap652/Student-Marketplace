const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/studentmarket';

const sampleListings = [
  {
    title: "Calculus Textbook - 8th Edition",
    description: "Excellent condition calculus textbook. Used for one semester only. All pages intact, minimal highlighting.",
    price: 85.00,
    category: "textbooks",
    condition: "like-new",
    location: "Library Pickup",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"],
    tags: ["math", "calculus", "textbook"],
    sellerId: "user1",
    seller: {
      id: "user1",
      name: "John Smith",
      university: "State University",
      rating: 4.8
    },
    status: "active",
    views: 45,
    likes: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "MacBook Air M1 - 256GB",
    description: "Barely used MacBook Air with M1 chip. Perfect for students. Includes original charger and box.",
    price: 850.00,
    category: "electronics",
    condition: "like-new",
    location: "Student Center",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"],
    tags: ["laptop", "apple", "macbook"],
    sellerId: "user2",
    seller: {
      id: "user2",
      name: "Sarah Johnson",
      university: "State University",
      rating: 4.9
    },
    status: "active",
    views: 123,
    likes: 28,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Dorm Mini Fridge",
    description: "Compact refrigerator perfect for dorm rooms. Clean and works perfectly. Moving out sale!",
    price: 75.00,
    category: "furniture",
    condition: "good",
    location: "East Dorm",
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400"],
    tags: ["fridge", "dorm", "appliance"],
    sellerId: "user3",
    seller: {
      id: "user3",
      name: "Mike Chen",
      university: "State University",
      rating: 4.7
    },
    status: "active",
    views: 67,
    likes: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('studentmarket');
    const listings = db.collection('listings');
    
    // Clear existing data (optional)
    await listings.deleteMany({});
    console.log('Cleared existing listings');
    
    // Insert sample data
    const result = await listings.insertMany(sampleListings);
    console.log(`Inserted ${result.insertedCount} listings`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedData();