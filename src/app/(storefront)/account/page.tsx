"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  User,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { orders, products, customers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/storefront/ProductCard";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses" | "wishlist">("orders");
  const customer = customers[0];

  return (
    <div className="container-main py-10 md:py-16 space-y-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-subtle">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-200">
            {customer.avatarUrl ? (
              <Image
                src={customer.avatarUrl}
                alt={customer.name}
                fill
                className="object-cover"
              />
            ) : (
              <User size={32} className="m-auto text-neutral-500" />
            )}
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary-text">
              Welcome back, {customer.name}
            </h1>
            <p className="text-xs text-secondary-text mt-0.5">
              Patron Member since {customer.joinDate} • {customer.email}
            </p>
          </div>
        </div>

        <Link href="/">
          <Button variant="outline" size="sm">
            <span className="flex items-center gap-1.5 text-secondary-text">
              <LogOut size={14} />
              Sign Out
            </span>
          </Button>
        </Link>
      </div>

      {/* Account Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="space-y-1 bg-white p-2 rounded-xl border border-subtle shadow-sm">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "orders"
                ? "bg-primary-text text-white"
                : "text-secondary-text hover:bg-neutral-50 hover:text-primary-text"
            }`}
          >
            <span className="flex items-center gap-3">
              <Package size={16} />
              Order Archive
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "wishlist"
                ? "bg-primary-text text-white"
                : "text-secondary-text hover:bg-neutral-50 hover:text-primary-text"
            }`}
          >
            <span className="flex items-center gap-3">
              <Heart size={16} />
              Private Wishlist
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "addresses"
                ? "bg-primary-text text-white"
                : "text-secondary-text hover:bg-neutral-50 hover:text-primary-text"
            }`}
          >
            <span className="flex items-center gap-3">
              <MapPin size={16} />
              Saved Addresses
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-primary-text text-white"
                : "text-secondary-text hover:bg-neutral-50 hover:text-primary-text"
            }`}
          >
            <span className="flex items-center gap-3">
              <User size={16} />
              Profile Settings
            </span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Tab Panels */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Order History & Status
              </h3>
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-6 rounded-xl border border-subtle shadow-card space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-subtle text-xs">
                      <div>
                        <span className="font-bold text-primary-text">{ord.orderNumber}</span>
                        <span className="text-secondary-text ml-2">• Placed on {ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] bg-neutral-100 text-neutral-800">
                          {ord.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] bg-emerald-50 text-emerald-700">
                          {ord.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y divide-subtle">
                      {ord.items.map((item) => (
                        <div key={item.id} className="py-3 flex items-center gap-4">
                          <div className="relative w-12 h-16 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 text-xs">
                            <h5 className="font-bold text-primary-text">{item.title}</h5>
                            <p className="text-secondary-text">{item.variant}</p>
                            <p className="text-secondary-text mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-xs font-bold text-primary-text">
                            {formatCurrency(item.lineTotal)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs border-t border-subtle">
                      <span className="text-secondary-text">Courier: DHL Express</span>
                      <span className="font-bold text-primary-text text-sm">
                        Total: {formatCurrency(ord.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Saved Wishlist Items
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((prod, idx) => (
                  <ProductCard key={prod.id} product={prod} index={idx} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Delivery Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-accent shadow-sm space-y-2 relative">
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-accent bg-blue-50 px-2 py-0.5 rounded">
                    Default
                  </span>
                  <h5 className="font-bold text-sm text-primary-text">Primary Residence</h5>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    123 Commerce Street, Suite 400<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-subtle shadow-sm space-y-2">
                  <h5 className="font-bold text-sm text-primary-text">Summer Villa</h5>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    88 Ocean Boulevard<br />
                    East Hampton, NY 11937<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-xl border border-subtle shadow-card space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Personal Credentials
              </h3>
              <div className="space-y-4 text-xs max-w-md">
                <div>
                  <label className="text-secondary-text block mb-1">Full Name</label>
                  <input
                    defaultValue={customer.name}
                    className="w-full px-3 py-2 border border-subtle rounded-lg bg-neutral-50"
                  />
                </div>
                <div>
                  <label className="text-secondary-text block mb-1">Email Address</label>
                  <input
                    defaultValue={customer.email}
                    className="w-full px-3 py-2 border border-subtle rounded-lg bg-neutral-50"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

