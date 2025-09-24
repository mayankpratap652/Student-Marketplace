// app/api/paypal/execute/route.js
import { NextResponse } from "next/server";
import paypal from "@/lib/paypal";

export async function POST(req) {
  const { paymentId, PayerID } = await req.json();

  const execute_payment_json = {
    payer_id: PayerID,
  };

  return new Promise((resolve) => {
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.error(error);
        resolve(NextResponse.json({ error: error.response }, { status: 500 }));
      } else {
        console.log("✅ Payment success:", payment);
        resolve(NextResponse.json({ success: true, payment }));
      }
    });
  });
}   