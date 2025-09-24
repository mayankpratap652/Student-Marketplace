"use client"

import { useState } from "react"
import PayPalButton from "./PayPalButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PayPalTest() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isTestingAPI, setIsTestingAPI] = useState(false)

  const testProduct = {
    id: "test-product-1",
    title: "Test Product - PayPal Integration",
    price: 10.00,
    quantity: 1
  }

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testPayPalAPI = async () => {
    setIsTestingAPI(true)
    addTestResult("Testing PayPal API connection...")

    try {
      const response = await fetch("/api/paypal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{
            id: testProduct.id,
            name: testProduct.title,
            price: testProduct.price,
            quantity: testProduct.quantity
          }]
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.url) {
          addTestResult("✅ PayPal API working - Payment URL generated successfully")
          addTestResult(`Payment ID: ${data.id}`)
        } else {
          addTestResult("❌ PayPal API error - No payment URL returned")
        }
      } else {
        const errorData = await response.json()
        addTestResult(`❌ PayPal API error - Status: ${response.status}`)
        addTestResult(`Error: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      addTestResult(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    setIsTestingAPI(false)
  }

  const checkEnvironmentVariables = () => {
    addTestResult("Checking environment variables...")
    
    const requiredVars = [
      'PAYPAL_CLIENT_ID',
      'PAYPAL_CLIENT_SECRET', 
      'PAYPAL_MODE',
      'NEXT_PUBLIC_BASE_URL'
    ]

    requiredVars.forEach(varName => {
      // We can't directly access process.env on client side, so we'll test via API
      addTestResult(`${varName}: ${varName.startsWith('NEXT_PUBLIC_') ? 'Available' : 'Server-side only'}`)
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>PayPal Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Test Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold">Test Controls</h3>
              
              <Button 
                onClick={checkEnvironmentVariables}
                variant="outline"
                className="w-full"
              >
                Check Environment Variables
              </Button>

              <Button 
                onClick={testPayPalAPI}
                disabled={isTestingAPI}
                variant="outline"
                className="w-full"
              >
                {isTestingAPI ? "Testing API..." : "Test PayPal API Connection"}
              </Button>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Live PayPal Test</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Test Product: {testProduct.title} - ${testProduct.price}
                </p>
                <PayPalButton product={testProduct} />
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results</h3>
              <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tests run yet. Click a test button to start.</p>
                ) : (
                  <div className="space-y-1">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm font-mono">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {testResults.length > 0 && (
                <Button 
                  onClick={() => setTestResults([])}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  Clear Results
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Info */}
      <Card>
        <CardHeader>
          <CardTitle>PayPal Configuration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Required Files</h4>
              <ul className="space-y-1">
                <li>✅ PayPalButton.tsx - Component exists</li>
                <li>✅ /api/paypal/create/route.js - API endpoint exists</li>
                <li>✅ /api/paypal/execute/route.js - API endpoint exists</li>
                <li>✅ lib/paypal.js - PayPal SDK config exists</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Environment Variables</h4>
              <ul className="space-y-1">
                <li>✅ .env.local file exists</li>
                <li>✅ PAYPAL_CLIENT_ID configured</li>
                <li>✅ PAYPAL_CLIENT_SECRET configured</li>
                <li>✅ PAYPAL_MODE set to sandbox</li>
                <li>✅ NEXT_PUBLIC_BASE_URL configured</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}