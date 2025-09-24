"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2, MapPin, Star, MessageCircle, Shield, Eye } from "lucide-react"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useSearchParams } from "next/navigation"
import PayPalButton from "@/components/PayPalButton"


// PayPal Button component
interface PayPalButtonProps {
  product: {
    id: string
    title: string
    price: number
    quantity?: number
  }
}


// Mock function to get product by ID
function getProductById(id: string) {
  return mockProducts.find((p) => p.id === id) || mockProducts[0]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { user, isAuthenticated } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const product = getProductById(params.id)
  const isOwner = user?.id === product.sellerId

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      alert("Please sign in to contact the seller")
      return
    }
    window.location.href = `/chat?product=${product?.id}&seller=${product?.sellerId}`
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      alert("Please sign in to like items")
      return
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
              <ArrowLeft className="w-4 h-4" />
              Back to listings
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleLike}>
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground text-balance">{product.title}</h1>
                <Badge variant="secondary">{product.condition}</Badge>
              </div>
              <p className="text-4xl font-bold text-accent mb-4">${product.price}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{product.views} views</span>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.seller.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.seller.year} • {product.seller.university}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.seller.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.seller.reviewCount} reviews)</span>
                      {product.seller.isVerified && <Shield className="w-4 h-4 text-green-600 ml-2" />}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isOwner ? (
                <>
                  <Button onClick={handleContactSeller} className="w-full bg-accent hover:bg-accent/90" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Seller
                  </Button>

                  {/* PayPal Button */}
                  <PayPalButton product={product} />
                </>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Listing
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Listing
                  </Button>
                </div>
              )}
            </div>

            {/* Safety Tips */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Safety Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Meet in public places on campus</li>
                      <li>• Inspect items before purchasing</li>
                      <li>• Use secure payment methods</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Separator className="mb-8" />
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-bold mb-6">More from this seller</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-accent">{relatedProduct.condition}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {relatedProduct.title}
                  </h4>
                  <p className="text-lg font-bold text-accent">${relatedProduct.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
