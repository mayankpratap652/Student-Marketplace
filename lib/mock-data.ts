import type { User, Product, Category } from "./types"

export const mockCategories: Category[] = [
  { id: "1", name: "Textbooks", icon: "📚", slug: "textbooks" },
  { id: "2", name: "Electronics", icon: "💻", slug: "electronics" },
  { id: "3", name: "Furniture", icon: "🪑", slug: "furniture" },
  { id: "4", name: "Clothing", icon: "👕", slug: "clothing" },
  { id: "5", name: "Sports", icon: "⚽", slug: "sports" },
  { id: "6", name: "Other", icon: "📦", slug: "other" },
]

export const mockUsers: User[] = [
  {
    id: "1",
    email: "sarah@university.edu",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    university: "State University",
    year: "junior",
    major: "Computer Science",
    rating: 4.8,
    reviewCount: 23,
    createdAt: new Date("2024-01-15"),
    isVerified: true,
  },
  {
    id: "2",
    email: "mike@university.edu",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    university: "State University",
    year: "senior",
    major: "Business",
    rating: 4.6,
    reviewCount: 15,
    createdAt: new Date("2023-09-10"),
    isVerified: true,
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Calculus Textbook - 8th Edition",
    description:
      "Excellent condition calculus textbook. Used for one semester only. All pages intact, minimal highlighting.",
    price: 85,
    images: ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"],
    category: mockCategories[0],
    condition: "like-new",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Campus Library Area",
    tags: ["math", "calculus", "textbook"],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
    views: 45,
    likes: 8,
  },
  {
    id: "2",
    title: "MacBook Air M1 - 13 inch",
    description:
      "Selling my MacBook Air M1 as I upgraded to a newer model. Great for students, excellent battery life.",
    price: 750,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    category: mockCategories[1],
    condition: "good",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Engineering Building",
    tags: ["laptop", "apple", "macbook"],
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-11-28"),
    views: 123,
    likes: 24,
  },
  {
    id: "3",
    title: "Wooden Study Chair",
    description:
      "Strong wooden chair, perfect for dorms or study rooms. Lightly used, no damage.",
    price: 45,
    images: ["https://images.unsplash.com/photo-1503602642458-232111445657"],
    category: mockCategories[2],
    condition: "good",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Dorm Room 4B",
    tags: ["furniture", "chair", "study"],
    createdAt: new Date("2024-10-12"),
    updatedAt: new Date("2024-10-12"),
    views: 78,
    likes: 10,
  },
  {
    id: "4",
    title: "Casual T-shirt - Medium",
    description:
      "Blue casual T-shirt, barely worn. Comfortable cotton fabric.",
    price: 15,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    category: mockCategories[3],
    condition: "like-new",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Student Housing Block A",
    tags: ["clothing", "tshirt", "casual"],
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-09-20"),
    views: 34,
    likes: 6,
  },
  {
    id: "5",
    title: "Football - Size 5",
    description:
      "Almost new football, used only in practice. Perfect grip and bounce.",
    price: 25,
    images: ["https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"],
    category: mockCategories[4],
    condition: "like-new",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Sports Ground",
    tags: ["sports", "football", "ball"],
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-11-05"),
    views: 65,
    likes: 14,
  },
  {
    id: "6",
    title: "Storage Box - Large",
    description:
      "Durable plastic storage box. Great for keeping clothes or books organized.",
    price: 12,
    images: ["https://images.unsplash.com/photo-1720572742865-b57ccc2df130?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmFnZSUyMGJveHxlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[5],
    condition: "good",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Dorm Storage Room",
    tags: ["storage", "organizer", "box"],
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
    views: 50,
    likes: 9,
  },
  {
    id: "7",
    title: "Compact Study Desk",
    description: "Wooden study desk with drawers. Perfect for dorm or small rooms.",
    price: 60,
    images: ["https://plus.unsplash.com/premium_photo-1720884611740-f5e807d7c77e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V29vZGVuJTIwc3R1ZHklMjBkZXNrJTIwd2l0aCUyMGRyYXdlcnN8ZW58MHx8MHx8fDA%3D"],
    category: mockCategories[2],
    condition: "good",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Dorm Room 5A",
    tags: ["furniture", "desk", "study"],
    createdAt: new Date("2024-09-25"),
    updatedAt: new Date("2024-09-25"),
    views: 40,
    likes: 7,
  },
  {
    id: "8",
    title: "Bookshelf - 4 Tier",
    description: "Tall wooden bookshelf, gently used, holds up to 200 books.",
    price: 70,
    images: ["https://plus.unsplash.com/premium_photo-1698084059448-5bdc536e083a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGFsbCUyMHdvb2RlbiUyMGJvb2tzaGVsZnxlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[2],
    condition: "good",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Library Room B",
    tags: ["furniture", "bookshelf", "storage"],
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-10-20"),
    views: 55,
    likes: 12,
  },

  // Sports
  {
    id: "9",
    title: "Basketball - Official Size",
    description: "Professional size basketball, lightly used for practice games.",
    price: 30,
    images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[4],
    condition: "good",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Sports Arena",
    tags: ["sports", "basketball", "ball"],
    createdAt: new Date("2024-10-18"),
    updatedAt: new Date("2024-10-18"),
    views: 38,
    likes: 5,
  },
  {
    id: "10",
    title: "Yoga Mat",
    description: "Eco-friendly yoga mat, lightly used, perfect for home workouts.",
    price: 20,
    images: ["https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[4],
    condition: "like-new",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Campus Gym",
    tags: ["sports", "yoga", "fitness"],
    createdAt: new Date("2024-11-12"),
    updatedAt: new Date("2024-11-12"),
    views: 22,
    likes: 4,
  },

  // Clothing
  {
    id: "11",
    title: "Hoodie - Large, Grey",
    description: "Cozy grey hoodie, lightly used, perfect for fall.",
    price: 25,
    images: ["https://images.unsplash.com/photo-1638993029979-2fd6e7867660?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9kZGllJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[3],
    condition: "good",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Student Housing Block B",
    tags: ["clothing", "hoodie", "casual"],
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-09-30"),
    views: 28,
    likes: 6,
  },

  // Electronics
  {
    id: "12",
    title: "iPad Mini - 6th Gen",
    description: "Excellent condition iPad Mini, ideal for reading and notes.",
    price: 320,
    images: ["https://images.unsplash.com/photo-1679759799183-8899c0d67b43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aSUyMHBhZCUyMG1pbml8ZW58MHx8MHx8fDA%3D"],
    category: mockCategories[1],
    condition: "like-new",
    sellerId: "2",
    seller: mockUsers[1],
    status: "available",
    location: "Engineering Lab",
    tags: ["tablet", "apple", "ipad"],
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
    views: 45,
    likes: 9,
  },

  // Storage
  {
    id: "13",
    title: "Drawer Organizer",
    description: "Plastic drawer organizer, great for stationery or clothes.",
    price: 10,
    images: ["https://images.unsplash.com/photo-1621262402468-a1c27d6ba468?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGxhc3RpYyUyMGRyYXdlciUyMG9yZ2FuaXplcnxlbnwwfHwwfHx8MA%3D%3D"],
    category: mockCategories[5],
    condition: "good",
    sellerId: "1",
    seller: mockUsers[0],
    status: "available",
    location: "Dorm Room 2C",
    tags: ["storage", "organizer", "drawer"],
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-08-20"),
    views: 20,
    likes: 3,
  }
]
// lib/blogs.ts

export const blogs = [
  {
    id: 1,
    title: "Top 5 Ways to Save Money as a Student",
    slug: "save-money-students",
    excerpt:
      "Discover smart budgeting tips, second-hand shopping, and affordable student deals that will help you manage.",
    content: `Being a student often means living on a tight budget, but with smart strategies, you can stretch every dollar further.

**1. Buy Used Textbooks & Sell Them Back**
Textbooks can cost hundreds of dollars each semester. Instead of buying new, check StudentMarket, Amazon, or your campus bookstore for used copies. After the semester, sell them back to recover 50-70% of your investment.

**2. Cook Meals Instead of Eating Out**
Eating out regularly can cost $15-20 per meal. Cooking at home costs just $3-5 per meal. Invest in basic cooking skills and meal prep on weekends to save $200-300 monthly.

**3. Use Student Discounts Everywhere**
Your student ID is a money-saving tool! Get discounts on software (Adobe, Microsoft), streaming services (Spotify, Netflix), transportation, and even clothing stores. Always ask "Do you offer student discounts?"

**4. Share Expenses with Roommates**
Split costs for groceries, streaming subscriptions, and household items. Buying in bulk and sharing reduces individual costs by 30-50%.

**5. Use Public Transportation or Bike**
Skip expensive parking fees and gas costs. Most universities offer free or discounted public transit passes. Biking is free, healthy, and environmentally friendly.`,
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2F2ZSUyMG1vbmV5fGVufDB8fDB8fHww",
    author: "Priya Sharma",
    date: "2025-09-15",
  },
  {
    id: 2,
    title: "How to Sell Your Old Textbooks and Earn Cash",
    slug: "sell-old-textbooks",
    excerpt:
      "Got textbooks lying around? Learn how to list and sell your used books quickly on StudentMarket and earn extra cash.",
    content: `Selling textbooks is one of the easiest ways to make money as a student. Here's your complete guide to maximizing profits:

**Step 1: Assess Your Books**
Check the condition honestly - excellent, good, fair, or poor. Look for highlighting, writing, torn pages, or missing access codes. Be transparent about condition to build trust with buyers.

**Step 2: Research Market Prices**
Check prices on StudentMarket, Amazon, Chegg, and campus bookstores. Price your books 10-15% below the lowest competitor to sell quickly while maximizing profit.

**Step 3: Take Quality Photos**
Use good lighting and take photos of:
- Front and back covers
- Table of contents
- Any damage or highlighting
- ISBN number clearly visible

**Step 4: Write Compelling Descriptions**
Include:
- Exact title and edition
- Author name
- ISBN number
- Condition details
- Any included materials (access codes, CDs)
- Course it was used for

**Step 5: Choose the Right Platform**
StudentMarket offers the best rates for student-to-student sales, with no shipping hassles and local pickup options.

**Pro Tip:** List your books 2-3 weeks before the semester ends when demand is highest!`,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGV4dGJvb2tzfGVufDB8fDB8fHww",
    author: "Rahul Mehta",
    date: "2025-09-12",
  },
  {
    id: 3,
    title: "Must-Have Gadgets for College Students",
    slug: "gadgets-for-college",
    excerpt:
      "From budget laptops to noise-canceling headphones, check out the essential gadgets every student should own in 2025.",
    content: `Technology can make your college life much easier and more productive. Here are the must-have gadgets every student should consider in 2025:

**1. Reliable Laptop ($400-800)**
Your most important investment. Look for:
- 8GB+ RAM for multitasking
- SSD storage for speed
- 8+ hour battery life
- Lightweight design (under 4 lbs)
*Recommended: MacBook Air M1, Dell XPS 13, or Lenovo ThinkPad*

**2. Noise-Canceling Headphones ($100-300)**
Essential for studying in noisy dorms or libraries:
- Active noise cancellation
- 20+ hour battery life
- Comfortable for long study sessions
*Recommended: Sony WH-1000XM4, Bose QuietComfort, or budget-friendly Anker Soundcore*

**3. Portable Charger/Power Bank ($25-50)**
Never run out of battery during long campus days:
- 10,000+ mAh capacity
- Multiple USB ports
- Fast charging support
- Compact and lightweight

**4. Tablet for Reading & Notes ($200-500)**
Perfect for digital textbooks and note-taking:
- iPad (great for Apple Pencil)
- Samsung Galaxy Tab (Android ecosystem)
- Microsoft Surface (Windows compatibility)

**5. Quality Webcam ($50-150)**
Essential for online classes and virtual meetings:
- 1080p minimum resolution
- Built-in microphone
- Auto-focus capability
- Good low-light performance

**Budget-Friendly Tips:**
- Buy refurbished or previous-generation models
- Check StudentMarket for student-to-student deals
- Look for student discounts from manufacturers
- Consider renting expensive items you'll only use short-term`,
    image: "https://images.unsplash.com/photo-1701760171680-4e78267aba97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FkZ2V0JTIwZm9yJTIwY29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D",
    author: "Sneha Patel",
    date: "2025-09-10",
  },
  {
    id: 4,
    title: "How to Find the Best Campus Deals",
    slug: "best-campus-deals",
    excerpt:
      "Explore the best places to find exclusive student discounts on food, electronics, and fashion near your campus.",
    content: `Finding great deals as a student is an art form. Here's your comprehensive guide to scoring the best discounts:

**On-Campus Resources**
- Student Union bulletin boards for local coupons
- Campus events with free food and giveaways
- Library access to expensive software
- Recreation center free membership

**Food & Dining Deals**
- Happy hour student discounts (3-6 PM)
- Campus dining apps for exclusive deals
- Group delivery orders to split fees
- Calculate meal plan value vs cooking

**Technology Discounts**
- Free student software (Office, Adobe)
- Education pricing on laptops
- Student streaming rates
- Phone plan student discounts

**Shopping Tips**
- Always ask for student discounts
- Use UNiDAYS and Student Beans
- Follow local businesses on social media
- Shop end-of-season sales`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60",
    author: "Arjun Verma",
    date: "2025-09-08",
  },
  {
    id: 5,
    title: "Balancing Studies and Side Hustles",
    slug: "studies-side-hustles",
    excerpt:
      "Thinking about starting a side hustle? Here’s how you can manage your time between academics and earning extra money.",
    content: `Balancing academics with earning money requires smart time management:

**Time Management**
- Create priority matrix (high/medium/low)
- Use time blocking for different activities
- Limit side hustle to 10-15 hours/week
- Never sacrifice sleep (7-8 hours minimum)

**Best Student Side Hustles**
- Tutoring: $15-30/hour, flexible schedule
- Food delivery during peak hours
- Freelance writing and design
- Campus jobs (tour guide, RA, library)

**Success Strategies**
- Set clear boundaries
- Communicate with professors
- Use productivity apps
- Track earnings vs time invested

**Remember:** Education is your long-term investment. Don't let short-term earnings compromise your academic success!`,
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&auto=format&fit=crop&q=60",
    author: "Aditi Singh",
    date: "2025-09-05",
  },
];
// lib/topSellers.ts

export const topSellers = [
  {
    id: 1,
    name: "Ananya Gupta",
    slug: "price",
    avatar: "https://cdn-icons-png.flaticon.com/128/6997/6997662.png",
    rating: 4.9,
    productsSold: 120,
    department: "Computer Science",
    description: "Ananya is a top CS student with a passion for programming and AI. Known for delivering high-quality projects and tutorials."
  },
  {
    id: 2,
    name: "Rohit Sharma",
    avatar: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
    rating: 4.8,
    productsSold: 95,
    department: "Mechanical Engineering",
    slug: "rohit",
    description: "Rohit excels in mechanical design and robotics. He consistently delivers innovative solutions and shares his expertise with peers."
  },
  {
    id: 3,
    name: "Sneha Verma",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHN8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    productsSold: 87,
    department: "Economics",
    description: "Sneha is an economics enthusiast with expertise in market analysis and business strategies. She shares insightful reports and advice."
  },
  {
    id: 4,
    name: "Arjun Mehta",
    avatar: "https://cdn-icons-png.flaticon.com/128/145/145867.png",
    rating: 4.9,
    productsSold: 140,
    department: "Electrical Engineering",
    description: "Arjun specializes in circuits and power systems. He is known for mentoring juniors and delivering hands-on workshops."
  },
  {
    id: 5,
    name: "Priya Singh",
    avatar: "/images/sellers/priya.jpg",
    rating: 4.8,
    productsSold: 110,
    department: "Business Administration",
    description: "Priya is skilled in management and entrepreneurship. She has helped multiple student startups grow successfully."
  },
];


