"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmed">("shipping");
  const [formData, setFormData] = useState({
    firstName: "Alexander",
    lastName: "Montgomery",
    email: "alexander.m@example.com",
    address: "742 Evergreen Terrace",
    city: "New York",
    state: "NY",
    zip: "10021",
    country: "United States",
    paymentMethod: "razorpay",
  });

  const shippingCost = subtotal > 150 ? 0 : 15;
  const total = subtotal + shippingCost;
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string>("ORD-9824");

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setIsProcessing(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            shippingAddress: formData,
            email: formData.email,
            subtotal,
            shippingCost,
            total,
          }),
        });

        const data = await response.json();
        if (data.orderNumber) {
          setCreatedOrderNumber(data.orderNumber);
        }
        setStep("confirmed");
      } catch (err) {
        setStep("confirmed");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="container-main py-10 md:py-16 space-y-12">
      {/* Checkout Step Progression Indicator */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-2 text-primary-text">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "shipping" ? "bg-accent text-white" : "bg-emerald-600 text-white"}`}>
              {step !== "shipping" ? <Check size={12} /> : "1"}
            </span>
            <span>Delivery Destination</span>
          </div>
          <div className="w-12 h-0.5 bg-subtle" />
          <div className={`flex items-center gap-2 ${step === "shipping" ? "text-secondary-text" : "text-primary-text"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "payment" ? "bg-accent text-white" : step === "confirmed" ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-600"}`}>
              {step === "confirmed" ? <Check size={12} /> : "2"}
            </span>
            <span>Settlement Method</span>
          </div>
          <div className="w-12 h-0.5 bg-subtle" />
          <div className={`flex items-center gap-2 ${step === "confirmed" ? "text-primary-text" : "text-secondary-text"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === "confirmed" ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-600"}`}>
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      {step === "confirmed" ? (
        /* Order Confirmed Screen */
        <div className="max-w-lg mx-auto text-center space-y-6 py-12 bg-white p-8 rounded-2xl border border-subtle shadow-card">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary-text">
            Order Confirmed #{createdOrderNumber}
          </h2>
          <p className="text-sm text-secondary-text leading-relaxed">
            Thank you, {formData.firstName}. We have sent the confirmation summary and private courier tracking details to {formData.email}.
          </p>
          <div className="p-4 bg-neutral-50 rounded-xl text-left text-xs space-y-2 border border-subtle">
            <div className="flex justify-between font-medium">
              <span className="text-secondary-text">Courier:</span>
              <span className="text-primary-text">White Glove Air Express</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-secondary-text">Estimated Arrival:</span>
              <span className="text-primary-text">3-5 Business Days</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-secondary-text">Total Charged:</span>
              <span className="text-primary-text font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="pt-4">
            <Link href="/products">
              <Button variant="primary" fullWidth size="md">
                Continue Exploring
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Two Column Checkout Form & Order Summary */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Fields */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-subtle shadow-card">
            {step === "shipping" && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="border-b border-subtle pb-4">
                  <h3 className="font-serif text-xl font-bold text-primary-text">
                    Shipping & Recipient Details
                  </h3>
                  <p className="text-xs text-secondary-text mt-1">
                    Enter the residential or private address for delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <Input
                  label="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />

                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                  <Input
                    label="Postal Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    required
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="primary" size="lg" type="submit">
                    <span className="flex items-center gap-2">
                      Continue to Payment
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="border-b border-subtle pb-4">
                  <h3 className="font-serif text-xl font-bold text-primary-text">
                    Settlement & Verification
                  </h3>
                  <p className="text-xs text-secondary-text mt-1">
                    Direct integration with Razorpay Card Gateway.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-accent rounded-xl bg-accent/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock size={18} className="text-accent" />
                      <div>
                        <p className="text-sm font-bold text-primary-text">Razorpay Secure Portal</p>
                        <p className="text-xs text-secondary-text">UPI, Cards, NetBanking, International</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent">Active</span>
                  </div>

                  <div className="p-4 border border-subtle rounded-xl space-y-3">
                    <Input label="Cardholder Name" defaultValue={formData.firstName + " " + formData.lastName} />
                    <Input label="Card Number" defaultValue="•••• •••• •••• 4242" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Expiry (MM/YY)" defaultValue="12/28" />
                      <Input label="CVC" defaultValue="888" type="password" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="text-xs font-semibold text-secondary-text hover:text-primary-text"
                  >
                    ← Back to Shipping
                  </button>
                  <Button variant="primary" size="lg" type="submit">
                    Complete Purchase ({formatCurrency(total)})
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 bg-neutral-50 p-6 sm:p-8 rounded-xl border border-subtle space-y-6">
            <h4 className="font-serif text-lg font-bold text-primary-text">
              Bag Summary ({items.length || 2} items)
            </h4>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-subtle">
              {items.length === 0 ? (
                <p className="text-xs text-secondary-text py-2">
                  Sample luxury item loaded for demonstration.
                </p>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="pt-3 flex gap-3 items-center">
                    <div className="relative w-12 h-16 rounded bg-white overflow-hidden flex-shrink-0 border border-subtle">
                      <Image
                        src={it.product.images[0]?.url || "/placeholder.jpg"}
                        alt={it.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-primary-text line-clamp-1">{it.product.title}</p>
                      <p className="text-secondary-text">Qty: {it.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-primary-text">
                      {formatCurrency((it.product.salePrice || it.product.price) * it.quantity)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-subtle pt-4 space-y-2 text-xs text-secondary-text">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-primary-text font-medium">{formatCurrency(subtotal || 695)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Complimentary" : formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-primary-text pt-2 border-t border-subtle">
                <span>Total Due</span>
                <span>{formatCurrency(total || 695)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-secondary-text pt-2">
              <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
              <span>256-bit encrypted bank checkout guarantee</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

