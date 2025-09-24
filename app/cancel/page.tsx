"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-4">Your payment was cancelled. No charges were made.</p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/search">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}