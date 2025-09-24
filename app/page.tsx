"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Heart, MapPin, Star, User, Menu, X } from "lucide-react"
import { mockProducts, mockCategories, blogs, topSellers } from "@/lib/mock-data"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Typewriter from "typewriter-effect"


// Motion variants for staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function HomePage() {
  const { user, signOut, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileCategories, setShowMobileCategories] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [visibleProducts] = useState(4)


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) router.push("/auth/signin")
    }, 5000)
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [user, router])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push(searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : "/search")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryClick = (categoryId: string) => router.push(`/search?category=${categoryId}`)

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }



  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <motion.div className="min-h-screen bg-gray-50" initial="hidden" animate="show" variants={container}>
      
      {/* Header */}
    <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-accent-foreground font-bold text-sm">SM</span>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Student<span className="text-accent">Market</span>
          </h1>
        </Link>
               <div className="hidden md:flex items-center gap-4 flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search textbooks, electronics... ${isLoading ? '(Searching...)' : ''}`}
                className="pl-10 rounded-xl focus:ring-2 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </form>
          </div>



        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
            <span className="text-sm hidden sm:block"> 
              <span className="text-gray-500">{getTimeBasedGreeting()}</span>{" "} 
              <span className="font-medium">{user?.name || 'Student'}</span>
            </span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/chat">Messages</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
              <Button size="sm" className="bg-accent text-white rounded-xl" asChild>
                <Link href="/sell">Sell Item</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin" className="flex items-center">
                  <User className="w-4 h-4 mr-2" /> Sign In
                </Link>
              </Button>
              <Button size="sm" className="bg-accent text-white rounded-xl" asChild>
                <Link href="/sell">Sell Item</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden cursor-pointer">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 cursor-pointer " />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/90 backdrop-blur-md shadow-md py-4 px-4 flex flex-col gap-2 cursor-pointer">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-accent/20">Dashboard</Link>
              <Link href="/chat" className="block py-2 px-4 rounded hover:bg-accent/20">Messages</Link>
              <button onClick={signOut} className="block py-2 px-4 rounded hover:bg-accent/20 text-left">Sign Out</button>
              <Link href="/sell" className="block py-2 px-4 rounded hover:bg-accent/20">Sell Item</Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="block py-2 px-4 rounded hover:bg-accent/20">Sign In</Link>
              <Link href="/sell" className="block py-2 px-4 rounded hover:bg-accent/20">Sell Item</Link>
            </>
          )}
        </div>
      )}
    </header>

      {/* Hero Section with Typewriter */}
      <motion.section
        className="relative w-full h-120 py-16 bg-gradient-to-br from-accent/40 to-accent/60 bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('Bnner.jpg')", backgroundPosition: "top", backgroundSize: "cover" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto py-10 text-center">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <Typewriter
              options={{
                strings: ["Buy & Sell with Fellow Students", "Find Your Textbooks Easily", "Connect with Campus Buyers & Sellers"],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30
              }}
            />
          </motion.h2>
          <motion.p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            The trusted marketplace for college students. Find textbooks, electronics, furniture and more from verified students at your university.
          </motion.p>
          <Link href="/search">
            <button className="cursor-pointer px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">
              Get Started
            </button>
          </Link>
        </div>
      </motion.section>
     {/* Categories */}
<motion.section className="py-12" variants={container} initial="hidden" animate="show">
  <div className="container mx-auto px-4">
    <motion.h3 className="text-2xl font-bold text-foreground mb-8 text-center" variants={container}>
      Browse Categories
    </motion.h3>

    {/* Desktop grid */}
    <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
      {mockCategories.map((category) => (
        <motion.div key={category.id} variants={container}>
          <Card
            className="hover:shadow-xl transition-shadow cursor-pointer group bg-white/80 backdrop-blur-md"
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="font-medium text-sm group-hover:text-accent transition-colors">{category.name}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Mobile scrollable */}
    <div className="md:hidden flex gap-3 overflow-x-auto py-2">
      {mockCategories.map((category) => (
        <Button key={category.id} className="flex-shrink-0" variant="outline" onClick={() => handleCategoryClick(category.id)}>
          {category.name}
        </Button>
      ))}
    </div>
  </div>
</motion.section>

{/* Recent Listings */}
<motion.section className="py-12 bg-gray-50" variants={container} initial="hidden" animate="show">
  <div className="container mx-auto px-4">
    <motion.div className="flex items-center justify-between mb-8" variants={container}>
      <h3 className="text-2xl font-bold text-foreground">Recent Listings</h3>
      <Button variant="outline" asChild>
        <Link href="/search">View All</Link>
      </Button>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.slice(0, visibleProducts).map((product) => (
        <motion.div key={product.id} variants={container}>
          <Card className="group hover:shadow-2xl transition-all duration-200 rounded-2xl overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(product.id)
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      favorites.has(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600 hover:text-red-500'
                    }`} 
                  />
                </Button>
                <Badge className="absolute top-2 left-2 bg-accent">{product.condition}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                {product.title}
              </h4>
              <p className="text-2xl font-bold text-accent mb-2">${product.price}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <img
                  src={product.seller.avatar || "/placeholder.svg"}
                  alt={product.seller.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-muted-foreground">{product.seller.name}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.seller.rating}</span>
                </div>
              </div>
            </CardContent>
           <CardFooter className="p-4 flex flex-col gap-2">
  {/* View Details Button */}
  <Button
    asChild
    variant="outline"
    className="w-full rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition"
  >
    <Link href={`/product/${product.id}`}>View Details</Link>
  </Button>

  {/* Chat and Buy Row */}
  
  
    
    <Button
      className="flex-1 w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition"
      onClick={() => {
        const paypalProduct = {
          id: product.id,
          title: product.title,
          price: product.price,
        }
        fetch('/api/paypal/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [
              { ...paypalProduct, name: paypalProduct.title, quantity: 1 },
            ],
          }),
        })
          .then((res) => res.json())
          .then((data) => data.url && (window.location.href = data.url))
      }}
    >
      Buy ${product.price}
    </Button>

</CardFooter>

          </Card>
        </motion.div>
      ))}
    </div>
    
  
  </div>
</motion.section>

{/* left right image  */}

   <motion.section
  className="py-12 bg-muted/10"
  variants={container}
  initial="hidden"
  animate="show"
>
  <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
    {/* Text Content */}
    <motion.div className="w-full md:w-1/2" variants={container}>
      <h3 className="text-accent font-semibold text-sm uppercase mb-2">
        Your Campus Marketplace
      </h3>
      <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
        Buy & Sell Easily Between Students
      </h2>
      <p className="text-muted-foreground mb-6">
        List your used textbooks, electronics, or other items and connect with
        fellow students nearby. Quick, safe, and hassle-free!
      </p>
      <Button asChild className="bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-accent/90 transition w-full sm:w-auto">
        <Link href="/sell">Start Selling</Link>
      </Button>
    </motion.div>

    {/* Image */}
    <motion.div className="w-full md:w-1/2 flex-shrink-0" variants={container}>
      <img
        src="https://images.unsplash.com/photo-1640350411942-412ce8bc62b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGFzcyUyMG1hcmtldHBsYWNlfGVufDB8fDB8fHww"
        alt="Campus Marketplace"
        className="rounded-lg shadow-lg object-cover w-full h-64 sm:h-80 md:h-full"
      />
    </motion.div>
  </div>
</motion.section>


{/* Top Rated Sellers */}
<motion.section className="py-12" variants={container} initial="hidden" animate="show">
  <div className="container mx-auto px-4">
    <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={container}>
      Top Rated Sellers
    </motion.h2>
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={container}>
      {topSellers.slice(0, 4).map((seller) => {
        const slug = seller.slug || seller.name.toLowerCase().replace(/\s/g, "-")
        return (
          <motion.div key={seller.id} variants={container}>
            <Card className="p-6 text-center shadow-lg rounded-2xl hover:shadow-2xl transition">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img src={seller.avatar} alt={seller.name} className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 shadow-md cursor-pointer" />
              </div>
              <h3 className="font-bold text-lg mb-1">{seller.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{seller.department}</p>
              <div className="flex justify-center items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 text-sm text-gray-700">{seller.rating.toFixed(1)}</span>
              </div>
              <div className="mt-3 mb-4">
                <span className="text-sm font-medium text-gray-600">Products Sold:</span>
                <p className="text-lg font-semibold text-green-600">{seller.productsSold}</p>
              </div>
              <Button 
                className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition"
                asChild
              >
                <Link href={`/top-sellers/${seller.id}`}>
                  View Profile
                </Link>
              </Button>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  </div>
</motion.section>


      

      {/* Student Community */}
      <motion.section className="py-12 bg-muted/20" variants={container} initial="hidden" animate="show">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={container}>
            Student Community
          </motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={container}>
            {blogs?.slice(0, 3).map((post) => (
              <motion.div key={post.id} variants={container}>
                <Card className="hover:shadow-md transition h-full flex flex-col">
                  <img src={post.image} alt={post.title} className="rounded-t-lg h-40 w-full object-cover" />
                  <CardContent className="p-4 flex-1">
                    <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="text-sm font-medium text-yellow-600 border-b-2 border-yellow-400 hover:border-yellow-600 hover:text-yellow-700 transition"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>




                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
  <motion.footer
  className="relative bg-gradient-to-r from-accent/90 to-accent/70 text-white border-t border-accent/30 py-12"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">SM</span>
          </div>
          <span className="font-bold text-lg">StudentMarket</span>
        </div>
        <p className="text-sm text-white/80">
          The trusted marketplace for college students to buy and sell items safely.
        </p>
      </div>

      {/* For Students */}
      <div>
        <h4 className="font-semibold mb-4 text-white">For Students</h4>
        <ul className="space-y-2 text-sm text-white/80">
          <li>
            <Link
              href="/how-to-buy"
              className="hover:text-accent-foreground transition-colors"
            >
              How to Buy
            </Link>
          </li>
          <li>
            <Link
              href="/how-to-sell"
              className="hover:text-accent-foreground transition-colors"
            >
              How to Sell
            </Link>
          </li>
          <li>
            <Link
              href="/safety-tips"
              className="hover:text-accent-foreground transition-colors"
            >
              Safety Tips
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Support</h4>
        <ul className="space-y-2 text-sm text-white/80">
          <li>
            <Link
              href="/help-center"
              className="hover:text-accent-foreground transition-colors"
            >
              Help Center
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="hover:text-accent-foreground transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/report-issue"
              className="hover:text-accent-foreground transition-colors"
            >
              Report Issue
            </Link>
          </li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Legal</h4>
        <ul className="space-y-2 text-sm text-white/80">
          <li>
            <Link
              href="/terms-of-service"
              className="hover:text-accent-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="hover:text-accent-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/community-guidelines"
              className="hover:text-accent-foreground transition-colors"
            >
              Community Guidelines
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/70">
      <p>&copy; {currentTime.getFullYear()} StudentMarket. All rights reserved.</p>
      <p className="mt-1 text-xs">Last updated: {currentTime.toLocaleDateString()}</p>
    </div>
  </div>
</motion.footer>



      {/* Other sections (Categories, Listings, Top Sellers, Blogs) remain mostly the same */}
      {/* Add motion and Tailwind styling as in your previous code */}

    </motion.div>
  )
}
