import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "placeholder-webhook-secret";

    // Validate Signature
    if (signature && secret && secret !== "placeholder-webhook-secret") {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid Razorpay HMAC signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const payment = payload.payload?.payment?.entity;
    const orderId = payment?.order_id;
    const paymentId = payment?.id;

    const supabase = getServiceSupabase();

    if (event === "payment.captured" || event === "order.paid") {
      // 1. Mark Order as Paid in Supabase
      if (orderId) {
        await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            fulfillment_status: "processing",
            razorpay_payment_id: paymentId,
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_order_id", orderId);
      }
    } else if (event === "payment.failed") {
      if (orderId) {
        await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_order_id", orderId);
      }
    }

    return NextResponse.json({ status: "received", event });
  } catch (error: any) {
    console.error("Razorpay webhook listener error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

