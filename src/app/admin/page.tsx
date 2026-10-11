"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { orders, products, customers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalRevenue / totalOrdersCount;

  return (
    <div className="min-h-screen flex bg-[#F8F9FA] text-[#1A1A1A]">
      {/* 1. ADMIN SIDEBAR (Linear / Vercel Clean Aesthetic) */}
      <aside className="w-64 bg-white border-r border-[#EAEAEA] flex flex-col justify-between py-6 px-4">
        <div className="space-y-6">
          {/* Logo & Switcher */}
          <div className="px-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs">
                L
              </span>
              <span className="font-serif font-bold text-lg tracking-tight">LUXE Studio</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-100 rounded text-neutral-600">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveNav("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === "dashboard"
                  ? "bg-neutral-100 text-black font-bold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveNav("products")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === "products"
                  ? "bg-neutral-100 text-black font-bold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <Package size={16} />
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveNav("orders")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === "orders"
                  ? "bg-neutral-100 text-black font-bold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <ShoppingCart size={16} />
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveNav("customers")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === "customers"
                  ? "bg-neutral-100 text-black font-bold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <Users size={16} />
              Customers
            </button>
            <button
              onClick={() => setActiveNav("coupons")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeNav === "coupons"
                  ? "bg-neutral-100 text-black font-bold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <Tag size={16} />
              Coupons
            </button>
          </nav>
        </div>

        {/* Bottom Storefront Link */}
        <div className="pt-4 border-t border-[#EAEAEA] px-2 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between text-xs font-semibold text-neutral-600 hover:text-black py-2"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              View Live Storefront
            </span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              Executive Overview
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Real-time transactional and inventory indicators
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold border border-emerald-200">
              ● All Systems Operational
            </span>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Gross Revenue</span>
              <TrendingUp size={15} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-black">{formatCurrency(totalRevenue)}</p>
            <span className="text-[11px] font-semibold text-emerald-600">+14.2% from previous month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Total Orders</span>
              <ShoppingCart size={15} className="text-neutral-400" />
            </div>
            <p className="text-2xl font-bold text-black">{totalOrdersCount}</p>
            <span className="text-[11px] font-semibold text-neutral-500">100% fulfillment rate</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Average Order Value</span>
              <TrendingUp size={15} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-black">{formatCurrency(avgOrderValue)}</p>
            <span className="text-[11px] font-semibold text-emerald-600">+8.4% high-ticket conversion</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Active Patrons</span>
              <Users size={15} className="text-neutral-400" />
            </div>
            <p className="text-2xl font-bold text-black">{customers.length}</p>
            <span className="text-[11px] font-semibold text-neutral-500">Global client base</span>
          </div>
        </div>

        {/* Low Stock Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
            <span>
              <strong>Inventory Warning:</strong> 2 items have dropped below 10 units threshold (Artisan Leather Tote, Italian Wool Overcoat).
            </span>
          </div>
          <button className="font-bold underline hover:text-amber-950">
            Reorder Stock
          </button>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
            <h3 className="font-bold text-sm text-black">Recent Orders</h3>
            <span className="text-xs text-neutral-500">Latest 5 ledger events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-5">Order #</th>
                  <th className="py-3 px-5">Customer</th>
                  <th className="py-3 px-5">Items</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Payment</th>
                  <th className="py-3 px-5">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-black">{ord.orderNumber}</td>
                    <td className="py-3.5 px-5 text-neutral-600">{ord.shippingAddress.fullName}</td>
                    <td className="py-3.5 px-5 text-neutral-600">{ord.items.length} units</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-black">
                      {formatCurrency(ord.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Stock Table Preview */}
        <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
            <h3 className="font-bold text-sm text-black">Product Catalog Overview</h3>
            <span className="text-xs text-neutral-500">{products.length} listed garments</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-5">Product Title</th>
                  <th className="py-3 px-5">SKU</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Retail Price</th>
                  <th className="py-3 px-5">Units in Stock</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {products.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-black">{p.title}</td>
                    <td className="py-3.5 px-5 font-mono text-neutral-500">{p.sku}</td>
                    <td className="py-3.5 px-5 text-neutral-600">{p.category}</td>
                    <td className="py-3.5 px-5 font-bold text-black">{formatCurrency(p.price)}</td>
                    <td className="py-3.5 px-5 font-bold">
                      <span className={p.stock < 15 ? "text-amber-600" : "text-black"}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

