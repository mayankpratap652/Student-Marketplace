import { NextResponse } from "next/server";
import paypal from "@/lib/paypal";


export async function POST(req) {
  try {
    const { items } = await req.json();
    
    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items data' }, { status: 400 });
    }
    
    // Validate environment variables
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error('PayPal credentials missing');
      return NextResponse.json({ error: 'PayPal configuration error' }, { status: 500 });
    }

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      },
      transactions: [
        {
          item_list: {
            items: items.map((item) => ({
              name: item.name,
              sku: item.id,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: total.toFixed(2),
          },
          description: "Student Marketplace Payment",
        },
      ],
    };

    return new Promise((resolve) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.error('PayPal payment creation error:', error);
          resolve(NextResponse.json({ 
            error: 'Payment creation failed', 
            details: error.response?.message || error.message 
          }, { status: 500 }));
        } else {
          // Send approval URL to frontend
          const approvalUrl = payment.links.find((l) => l.rel === "approval_url");
          if (!approvalUrl) {
            console.error('No approval URL found in payment response');
            resolve(NextResponse.json({ error: 'Invalid payment response' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ id: payment.id, url: approvalUrl.href }));
          }
        }
      });
    });
  } catch (error) {
    console.error('PayPal API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}    