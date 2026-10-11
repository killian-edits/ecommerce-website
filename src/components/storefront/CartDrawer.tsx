"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "WELCOME10") {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setCouponMsg("10% discount applied!");
    } else if (couponCode.toUpperCase() === "FREESHIP") {
      setCouponMsg("Free shipping unlocked!");
    } else {
      setCouponMsg("Invalid promotional code");
    }
  };

  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shippingCost);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-primary-text">
                  Shopping Bag
                </h3>
                <span className="text-xs font-semibold bg-neutral-100 text-secondary-text px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-secondary-text hover:text-primary-text rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <ShoppingBag size={28} />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-primary-text">
                    Your bag is empty
                  </h4>
                  <p className="text-sm text-secondary-text max-w-xs">
                    Explore our collection of garments and signature accessories.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <motion.div className="space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0, x: 20 }}
                        animate={{ opacity: 1, height: "auto", x: 0 }}
                        exit={{ opacity: 0, height: 0, x: 50 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 pb-6 border-b border-subtle"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]?.url || "/placeholder.jpg"}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="text-sm font-medium text-primary-text line-clamp-1">
                                {item.product.title}
                              </h5>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-neutral-400 hover:text-destructive transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <p className="text-xs text-secondary-text mt-0.5">
                              {item.variant ? Object.values(item.variant.options).join(" / ") : item.product.category}
                            </p>
                            <p className="text-xs font-semibold text-primary-text mt-1">
                              {formatCurrency(item.variant?.price || item.product.salePrice || item.product.price)}
                            </p>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-subtle rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-100 text-secondary-text hover:text-primary-text transition-colors"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="px-3 text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 text-secondary-text hover:text-primary-text transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <span className="text-sm font-semibold text-primary-text">
                              {formatCurrency((item.variant?.price || item.product.salePrice || item.product.price) * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-subtle bg-neutral-50/50 space-y-4">
                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (try WELCOME10)"
                    className="flex-1 bg-white border border-subtle px-3 py-2 text-xs uppercase tracking-wider rounded-md focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-800 text-white px-3 py-2 text-xs font-medium rounded-md hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {couponMsg && (
                  <p className={`text-xs ${discount > 0 ? "text-success" : "text-secondary-text"}`}>
                    {couponMsg}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-secondary-text pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-primary-text font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Complimentary" : formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary-text pt-2 border-t border-subtle">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                    <Button variant="primary" fullWidth size="lg">
                      <span className="flex items-center gap-2">
                        Proceed to Checkout
                        <ArrowRight size={16} />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

