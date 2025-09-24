"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface PayPalButtonProps {
  productsell: {
    title: string
    description: string
    price: number
    category: string
    condition: string
    location: string
  }
}

export default function PayPalSell({ productsell }: PayPalButtonProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const searchParams = useSearchParams()

  // ✅ Check PayPal execution result
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
          if (!res.ok) throw new Error(`Payment execution failed: ${res.status}`)
          return res.json()
        })
        .then(async (data) => {
          if (data.success) {
            setMessage("Payment Successful! 🎉")
            setPaymentSuccess(true)

            // ✅ Post product automatically after successful payment
            try {
              const postRes = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productsell),
              })
              if (!postRes.ok) throw new Error("Failed to list product")
              setMessage("Payment Successful! Product listed 🎉")
            } catch (err) {
              console.error(err)
              setMessage("Payment succeeded, but product listing failed ❌")
            }
          } else {
            setMessage("Payment failed or cancelled ❌")
            setPaymentSuccess(false)
          }
        })
        .catch((err) => {
          console.error("Payment execution error:", err)
          setMessage("Payment execution failed. Please try again.")
        })
        .finally(() => setLoading(false))
    }
  }, [searchParams])

  // ✅ Create PayPal payment
  const handlePayNow = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/paypal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productsell }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage("Failed to create PayPal payment. Please try again.")
      }
    } catch (err) {
      console.error("Payment creation error:", err)
      setMessage("Payment creation failed. Check your connection.")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handlePayNow}
        disabled={loading || paymentSuccess}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Redirecting to PayPal..." : paymentSuccess ? "Payment Done ✅" : "Pay 2$"}
      </button>

      {/* Messages */}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {message && (
        <p
          className={`font-medium text-center ${
            message.includes("🎉") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
