"use client"

import { useParams } from "next/navigation"
import { blogs } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const blog = blogs.find(b => b.slug === slug)
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-accent/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">SM</span>
              </div>
              <span className="font-bold text-lg">Blog</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          {/* Hero Section */}
          <div className="relative mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-4 bg-accent/90 text-accent-foreground">
                  Student Guide
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Author & Meta Info Card */}
          <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{blog.author}</p>
                    <p className="text-sm text-muted-foreground">Student Contributor</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>3 min read</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Card */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-lg leading-relaxed text-gray-700 space-y-4">
                  {blog.content.split('\n').map((line, index) => {
                    if (line.trim() === '') return <br key={index} />
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      )
                    }
                    if (line.startsWith('*') && line.endsWith('*')) {
                      return (
                        <p key={index} className="italic text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {line.replace(/\*/g, '')}
                        </p>
                      )
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4 text-gray-700">
                          {line.substring(2)}
                        </li>
                      )
                    }
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="outline" className="bg-white/70 backdrop-blur-sm border-accent/20 hover:bg-accent hover:text-white transition-all">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 shadow-lg">
              <Link href="/">
                <BookOpen className="w-4 h-4 mr-2" />
                Read More Articles
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}