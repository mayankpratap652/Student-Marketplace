"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  Heart,
  MessageCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Shield,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/lib/types";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("listings");
  const [isEditing, setIsEditing] = useState(false);
  const [userListings, setUserListings] = useState<Product[]>([]);

  const [profileData, setProfileData] = useState({
    name: "",
    major: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    setProfileData({
      name: user.name || "",
      major: user.major || "",
      phone: "",
      bio: "",
    });
  }, [user]);

  // Fetch user listings (mock/fallback)
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserListings = async () => {
      try {
        const response = await fetch(`/api/listings?userId=${user.id}`);
        if (response.ok) {
          const listings = await response.json();
          setUserListings(listings);
        } else {
          setUserListings(mockProducts.slice(0, 3));
        }
      } catch {
        setUserListings(mockProducts.slice(0, 3));
      }
    };
    fetchUserListings();
  }, [user]);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to sign in to access your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                asChild
                className="flex-1 bg-transparent"
              >
                <Link href="/">Go Home</Link>
              </Button>
              <Button asChild className="flex-1 bg-accent hover:bg-accent/90">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleProfileSave = () => {
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const savedItems = mockProducts.slice(0, 3);
  const recentMessages = [
    {
      id: "1",
      productTitle: "Calculus Textbook",
      otherUser: "Mike Chen",
      lastMessage: "Is this still available?",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      productTitle: "MacBook Air M1",
      otherUser: "Sarah Johnson",
      lastMessage: "Thanks for the quick response!",
      timestamp: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to StudentMarket
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">SM</span>
            </div>
            <span className="font-bold">Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6 ">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 cursor-pointer">
                <AvatarImage
                  src={
                    user?.avatar ||
                    "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
                  }
                  alt={user?.name}
                />
                <AvatarFallback className="text-2xl md:text-3xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
                  {user?.isVerified && (
                    <Shield className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-2">
                  {user?.year} • {user?.university}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 cursor-pointer" />
                    <span className="font-medium">{user?.rating}</span>
                    <span className="text-muted-foreground">
                      ({user?.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>{userListings.length} active listings</span>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-accent hover:bg-accent/90 mt-4 md:mt-0 w-full sm:w-auto">
                <Link href="/sell">
                  <Plus className="w-4 h-4 mr-2" />
                  List New Item
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userListings.length}</p>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$1203</p>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">123</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{recentMessages.length}</p>
                  <p className="text-sm text-muted-foreground">Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-2 overflow-x-auto cursor-pointer">
            <TabsTrigger value="listings" className="cursor-pointer">My Listings</TabsTrigger>
            <TabsTrigger value="saved" className="cursor-pointer">Saved Items</TabsTrigger>
            <TabsTrigger value="messages" className="cursor-pointer">Messages</TabsTrigger>
            <TabsTrigger value="reviews" className="cursor-pointer">Reviews</TabsTrigger>
            <TabsTrigger value="settings" className="cursor-pointer">Settings</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Button asChild variant="outline" className="bg-transparent w-full sm:w-auto">
                <Link href="/sell">Add New Listing</Link>
              </Button>
            </div>

          {userListings.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {userListings.map((product) => (
      <Card key={product.id} className="group">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative">
            <img
              src={
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : typeof product.images === "string"
                  ? product.images
                  : "/placeholder.svg"
              }
              alt={product.title || "Product Image"}
              className="w-full h-40 sm:h-48 object-cover rounded-lg"
            />
            <Badge className="absolute top-2 left-2 bg-accent">
              {product.status || "Active"}
            </Badge>
          </div>

          {/* Product Details */}
          <div className="mt-3 space-y-1">
            <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
              {product.title || "No Title"}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {product.description || "No description available."}
            </p>
            <p className="text-lg font-bold text-accent">${product.price || 0}</p>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
          
              <span>Condition: {product.condition || "N/A"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start selling by creating your first listing
                  </p>
                  <Button asChild className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                    <Link href="/sell">Create First Listing</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-xl font-semibold">Saved Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h3 className="font-semibold mt-2 line-clamp-2">{product.title}</h3>
                    <p className="text-xl font-bold text-accent mt-1">${product.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Button asChild variant="outline" className="bg-transparent w-full sm:w-auto">
                <Link href="/chat">View All Messages</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <Card key={message.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{message.otherUser}</h3>
                        <p className="text-sm text-muted-foreground">Re: {message.productTitle}</p>
                        <p className="text-sm">{message.lastMessage}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 sm:mt-0">{message.timestamp}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

<TabsContent value="reviews" className="space-y-6">
  <h2 className="text-xl md:text-2xl font-semibold">Reviews & Ratings</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* User Rating */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Your Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{user?.rating}</div>
          <div className="flex items-center justify-center gap-1 mb-2 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  star <= Math.floor(user?.rating || 0) ? "text-yellow-400" : "text-gray-300"
                }`}
                strokeWidth={2}
              />
            ))}
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Based on {user?.reviewCount} reviews
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Recent Reviews */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { name: "Mike Chen", text: "Great seller! Item was exactly as described and pickup was smooth." },
          { name: "Emma Wilson", text: "Fast response and fair pricing. Would buy from again!" },
        ].map((review, index) => (
          <div key={index} className={`${index !== 0 ? "" : "border-b pb-4"}`}>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm md:text-base font-medium">{review.name}</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">{review.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
</TabsContent>

<TabsContent value="settings" className="space-y-6">
  <h2 className="text-xl md:text-2xl font-semibold">Account Settings</h2>

  {/* Profile Information */}
  <Card>
    <CardHeader>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <CardTitle className="text-lg md:text-xl">Profile Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={() => (isEditing ? handleProfileSave() : setIsEditing(true))}
          className="bg-transparent"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user?.email} disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input id="university" value={user?.university} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Academic Year</Label>
          <Input id="year" value={user?.year} disabled />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="major">Major</Label>
          <Input
            id="major"
            value={profileData.major}
            onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
            disabled={!isEditing}
            placeholder="e.g., Computer Science"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            disabled={!isEditing}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={profileData.bio}
          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          disabled={!isEditing}
          placeholder="Tell other students about yourself..."
          rows={3}
        />
      </div>
    </CardContent>
  </Card>

  {/* Notification Preferences */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">Notification Preferences</CardTitle>
      <CardDescription>Manage how you receive notifications</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {[
        { title: "Email Notifications", desc: "Receive updates about your listings and messages" },
        { title: "Push Notifications", desc: "Get instant alerts for new messages" },
      ].map((item, idx) => (
        <div key={idx}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent mt-2 sm:mt-0">
              Configure
            </Button>
          </div>
          {idx === 0 && <Separator />}
        </div>
      ))}
    </CardContent>
  </Card>
</TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
