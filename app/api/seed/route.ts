import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

const sampleListings = [
  {
    title: "Calculus Textbook - 8th Edition",
    description: "Excellent condition calculus textbook. Used for one semester only.",
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
    likes: 12
  },
  {
    title: "MacBook Air M1 - 256GB",
    description: "Barely used MacBook Air with M1 chip. Perfect for students.",
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
    likes: 28
  }
];

export async function POST() {
  try {
    const db = await connectDB();
    const listings = db.collection('listings');
    
    // Insert sample data
    const result = await listings.insertMany(
      sampleListings.map(listing => ({
        ...listing,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
    
    return NextResponse.json({ 
      message: `Inserted ${result.insertedCount} sample listings`,
      insertedIds: result.insertedIds 
    });
  } catch (error) {
    console.error('Seed data error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}