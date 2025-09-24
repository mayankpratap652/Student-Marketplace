"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  ImageIcon,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { mockProducts } from "@/lib/mock-data"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isRead: boolean
  type: "text" | "image" | "offer"
}

interface Conversation {
  id: string
  productId: string
  product: any
  otherUser: {
    id: string
    name: string
    avatar?: string
    isOnline: boolean
    lastSeen?: Date
  }
  messages: Message[]
  unreadCount: number
}

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      productId: "1",
      product: mockProducts[0],
      otherUser: {
        id: "2",
        name: "Mike Chen",
        avatar: "/male-student-profile.png",
        isOnline: true,
      },
      messages: [
        {
          id: "1",
          senderId: user?.id||"2",
          content: "Hi! Is this textbook still available?",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: true,
          type: "text",
        },
        {
          id: "2",
          senderId: user?.id || "1",
          content: "Yes, it's still available! Are you interested?",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          isRead: true,
          type: "text",
        },
        {
          id: "3",
          senderId:  user?.id||"2",
          content: "Great! Can we meet at the library tomorrow around 2 PM?",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          isRead: true,
          type: "text",
        },
        {
          id: "4",
          senderId: user?.id || "1",
          content: "That works for me! I'll be at the main entrance.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isRead: false,
          type: "text",
        },
      ],
      unreadCount: 0,
    },
    {
      id: "2",
      productId: "2",
      product: mockProducts[1],
      otherUser: {
        id: "3",
        name: "Sarah Johnson",
        avatar: "/student-profile.png",
        isOnline: false,
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      },
      messages: [
        {
          id: "5",
          senderId: "3",
          content: "Is the MacBook still in good condition? Any scratches?",
          timestamp: new Date(Date.now() - 45 * 60 * 60 * 1000),
          isRead: true,
          type: "text",
        },
        {
          id: "6",
          senderId: user?.id || "1",
          content: "It's in excellent condition! Just minor wear on the corners. I can send more photos if you'd like.",
          timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000),
          isRead: true,
          type: "text",
        },
        {
          id: "7",
          senderId: "3",
          content: "That would be great, thanks!",
          timestamp: new Date(Date.now() - 35 * 60 * 60 * 1000),
          isRead: false,
          type: "text",
        },
      ],
      unreadCount: 1,
    },
  ])

  const currentConversation = conversations.find((c) => c.id === selectedConversation)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  useEffect(() => {
    // Auto-select first conversation if none selected
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id)
    }
  }, [conversations, selectedConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation || !user) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
      type: "text",
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              messages: [...conv.messages, message],
            }
          : conv,
      ),
    )

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">You need to sign in to access your messages.</p>
            <div className="flex gap-3">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/">Go Home</Link>
              </Button>
              <Button asChild className="flex-1 bg-accent hover:bg-accent/90">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">SM</span>
              </div>
              <span className="font-bold">Messages</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-0 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-80px)]">
          {/* Conversations List */}
          <div className="border-r bg-card/50">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation === conversation.id ? "bg-accent/10 border-l-4 border-l-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.otherUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.otherUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.otherUser.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{conversation.otherUser.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.messages[conversation.messages.length - 1]?.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 truncate">Re: {conversation.product.title}</p>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conversation.messages[conversation.messages.length - 1]?.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={currentConversation.otherUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{currentConversation.otherUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {currentConversation.otherUser.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentConversation.otherUser.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {currentConversation.otherUser.isOnline
                            ? "Online"
                            : `Last seen ${formatLastSeen(currentConversation.otherUser.lastSeen!)}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentConversation.product.images[0] || "/placeholder.svg"}
                        alt={currentConversation.product.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{currentConversation.product.title}</h4>
                        <p className="text-accent font-bold">${currentConversation.product.price}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="bg-transparent">
                        <Link href={`/product/${currentConversation.productId}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.messages.map((message) => {
                    const isOwn = message.senderId === user?.id
                    return (
                      <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md ${isOwn ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwn ? "bg-accent text-accent-foreground ml-auto" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}>
                            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                            {isOwn && (
                              <div className="text-muted-foreground">
                                {message.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-card/50">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}     