"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("paymentId")
  const [isListingFee, setIsListingFee] = useState(false)

  useEffect(() => {
    // Check if this was a listing fee payment
    const pendingListing = localStorage.getItem('pendingListing')
    if (pendingListing) {
      setIsListingFee(true)
    }
  }, [])

  if (isListingFee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Listing Fee Paid!</h1>
          <p className="text-gray-600 mb-4">You can now complete your item listing.</p>
          {paymentId && (
            <p className="text-sm text-gray-500 mb-4">Payment ID: {paymentId}</p>
          )}
          <Button asChild>
            <Link href="/sell">Continue Listing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
        {paymentId && (
          <p className="text-sm text-gray-500 mb-4">Payment ID: {paymentId}</p>
        )}
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}