"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface PayPalButtonProps {
  product: {
    id: string
    title: string
    price: number
    quantity?: number
  }
}

export default function PayPalButton({ product }: PayPalButtonProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()

  // Validate product prop
  if (!product?.id || !product?.title || typeof product?.price !== 'number' || product.price <= 0) {
    return <div className="text-red-600">Invalid product information</div>
  }

  useEffect(() => {
    const paymentId = searchParams.get("paymentId")
    const PayerID = searchParams.get("PayerID")

    if (paymentId && PayerID) {
      setLoading(true)
      fetch("/api/paypal/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, PayerID }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Payment execution failed: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          if (data.success) setMessage("Payment Successful! 🎉")
          else setMessage("Payment failed or cancelled.")
        })
        .catch((error) => {
          console.error('Payment execution error:', error)
          setMessage("Payment execution failed. Please try again.")
        })
        .finally(() => setLoading(false))
    }
  }, [searchParams])

  const handleBuyNow = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch("/api/paypal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              name: product.title,
              price: product.price,
              quantity: product.quantity || 1,
            },
          ],
        }),
      })
      
      if (!res.ok) {
        throw new Error(`Payment creation failed: ${res.status}`)
      }
      
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage("Failed to create PayPal payment. Please try again.")
      }
    } catch (err) {
      console.error('Payment creation error:', err)
      setMessage("Payment creation failed. Please check your connection and try again.")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuyNow}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Redirecting to PayPal..." : "Buy Now"}
      </button>
      {message && (
        <p className={`font-medium text-center ${
          message.includes('Successful') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}
