"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Heart,
  MapPin,
  Star,
  ArrowLeft,
  Grid3X3,
  List,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { mockProducts, mockCategories } from "@/lib/mock-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const conditions = ["new", "like-new", "good", "fair", "poor"]
  const locations = ["Campus Library Area", "Engineering Building", "Student Center", "Dorm Area"]
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated Seller" },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = product.title.toLowerCase().includes(query)
        const matchesDescription = product.description.toLowerCase().includes(query)
        const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDescription && !matchesTags) return false
      }

      // Category filter
      if (selectedCategory && product.category.id !== selectedCategory) return false

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false

      // Condition filter
      if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) return false

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(product.location)) return false

      // Rating filter
      if (product.seller.rating < minRating) return false

      return true
    })

    // Sort products
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "rating":
        filtered.sort((a, b) => b.seller.rating - a.seller.rating)
        break
      default: // newest
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, selectedConditions, selectedLocations, minRating, sortBy])

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition])
    } else {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition))
    }
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setPriceRange([0, 1000])
    setSelectedConditions([])
    setSelectedLocations([])
    setMinRating(0)
    setSortBy("newest")
  }

  const activeFiltersCount = [
    selectedCategory,
    ...selectedConditions,
    ...selectedLocations,
    minRating > 0 ? "rating" : "",
    priceRange[0] > 0 || priceRange[1] < 1000 ? "price" : "",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
              <ArrowLeft className="w-4 h-4" />
              Back to StudentMarket
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">SM</span>
              </div>
              <span className="font-bold">Search & Browse</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for textbooks, electronics, furniture..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>

                <Separator />

                {/* Condition Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Condition</Label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                        />
                        <Label htmlFor={condition} className="text-sm capitalize">
                          {condition.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Location Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Location</Label>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                        />
                        <Label htmlFor={location} className="text-sm">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Seller Rating */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Minimum Seller Rating: {minRating > 0 ? `${minRating}+ stars` : "Any"}
                  </Label>
                  <Slider value={[minRating]} onValueChange={(value) => setMinRating(value[0])} max={5} step={0.5} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Any</span>
                    <span>5 stars</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found
                </h2>
                {searchQuery && <p className="text-sm text-muted-foreground">for "{searchQuery}"</p>}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("")}>
                      Category: {mockCategories.find((c) => c.id === selectedCategory)?.name}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {selectedConditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleConditionChange(condition, false)}
                    >
                      {condition.replace("-", " ")}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedLocations.map((location) => (
                    <Badge
                      key={location}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleLocationChange(location, false)}
                    >
                      {location}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {minRating > 0 && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setMinRating(0)}>
                      {minRating}+ stars
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange([0, 1000])}>
                      ${priceRange[0]} - ${priceRange[1]}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group hover:shadow-lg transition-all duration-200 ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                  >
                    <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <div className="relative">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          className={`object-cover ${
                            viewMode === "list" ? "w-full h-32" : "w-full h-48"
                          } rounded-t-lg ${viewMode === "list" ? "rounded-r-none" : ""}`}
                        />
                        <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Badge className="absolute top-2 left-2 bg-accent">{product.condition}</Badge>
                      </div>
                    </CardHeader>

                    <div className={viewMode === "list" ? "flex-1 flex flex-col" : ""}>
                      <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
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

                        {viewMode === "list" && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                        )}
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full bg-transparent" variant="outline" asChild>
                          <Link href={`/product/${product.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="bg-transparent">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
