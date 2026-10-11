"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { siteSettings, categories } from "@/lib/mock-data";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#141414] text-white pt-20 pb-12 border-t border-white/10">
      <div className="container-main">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                {siteSettings.siteName}
              </span>
            </Link>
            <p className="text-secondary-text text-sm leading-relaxed max-w-sm">
              {siteSettings.tagline}. Redefining contemporary luxury through architectural silhouettes and pure craftsmanship.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-sm font-medium tracking-wider uppercase text-white mb-3">
                Join the Journal
              </h4>
              <p className="text-xs text-secondary-text mb-4">
                Be the first to preview seasonal archives and exclusive invitations.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm py-2">
                  <Check size={18} />
                  <span>Thank you for subscribing to LUXE Journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent rounded-l-md transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-5 py-3 text-sm font-medium hover:bg-neutral-200 transition-colors rounded-r-md flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              Collections
            </h4>
            <ul className="space-y-3 text-sm text-secondary-text">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              Maison
            </h4>
            <ul className="space-y-3 text-sm text-secondary-text">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Flagship Boutiques
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent font-medium transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              Client Care
            </h4>
            <ul className="space-y-3 text-sm text-secondary-text">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge Support
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-text">
          <p>© {new Date().getFullYear()} {siteSettings.siteName} Global Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] border border-white/20 rounded px-2 py-0.5">VISA</span>
            <span className="text-[11px] border border-white/20 rounded px-2 py-0.5">MASTERCARD</span>
            <span className="text-[11px] border border-white/20 rounded px-2 py-0.5">AMEX</span>
            <span className="text-[11px] border border-white/20 rounded px-2 py-0.5">RAZORPAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

