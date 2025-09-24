import PayPalTest from "@/components/PayPalTest"

export default function TestPayPalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">PayPal Integration Test</h1>
        <PayPalTest />
      </div>
    </div>
  )
}