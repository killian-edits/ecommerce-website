import Razorpay from "razorpay";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

// Server-side Razorpay Client Instance
export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export const formatAmountForRazorpay = (amount: number, currency: string = "INR"): number => {
  // Razorpay requires currency subunits (e.g. paise or cents)
  return Math.round(amount * 100);
};

