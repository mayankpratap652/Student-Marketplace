// app/top-sellers/[id]/page.tsx
import { topSellers } from "@/lib/mock-data";
import { Star } from "lucide-react";
import Link from "next/link";

interface Params {
  params: { id: string };
}

export default function SellerProfilePage({ params }: Params) {
  // Convert string id from params to number
  const sellerId = Number(params.id);
  const seller = topSellers.find((s) => s.id === sellerId);

  if (!seller) return <p className="text-center mt-12">Seller not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="text-blue-500 mb-4 inline-block hover:underline"
        >
          ← Back to Top Sellers
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-yellow-400"
          />
          <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
          {seller.department && (
            <p className="text-gray-500 text-sm mt-1">{seller.department}</p>
          )}
          <div className="flex items-center mt-2">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-gray-700 font-medium">{seller.rating}</span>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            {seller.productsSold} products sold
          </p>
          <p className="mt-4 text-gray-700">{seller.description}</p>
        </div>
      </div>
    </div>
  );
}
