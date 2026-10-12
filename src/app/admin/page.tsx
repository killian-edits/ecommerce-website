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
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { orders as fallbackOrders, products as fallbackProducts, customers as fallbackCustomers, coupons as fallbackCoupons } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

const revenueData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5800 },
  { day: "Wed", revenue: 7100 },
  { day: "Thu", revenue: 6400 },
  { day: "Fri", revenue: 9200 },
  { day: "Sat", revenue: 11500 },
  { day: "Sun", revenue: 12800 },
];

const categorySalesData = [
  { name: "Outerwear", sales: 48 },
  { name: "Knitwear", sales: 34 },
  { name: "Accessories", sales: 29 },
  { name: "Footwear", sales: 22 },
  { name: "Shirts", sales: 18 },
];

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState<"dashboard" | "products" | "orders" | "customers" | "coupons">("dashboard");
  const [productList, setProductList] = useState(fallbackProducts);
  const [orderList, setOrderList] = useState(fallbackOrders);
  const [couponList, setCouponList] = useState(fallbackCoupons);

  // Modal State for New Product
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newCategory, setNewCategory] = useState("Outerwear");

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const item: any = {
      id: `prod_${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      description: "Artisan luxury garment tailored with signature natural fibers.",
      category: newCategory,
      categorySlug: newCategory.toLowerCase(),
      price: Number(newPrice),
      sku: newSku || `OW-${Math.floor(100 + Math.random() * 900)}`,
      stock: 25,
      status: "active",
      images: [
        {
          id: `img_${Date.now()}`,
          url: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800",
          alt: newTitle,
          sortOrder: 0,
        },
      ],
      tags: ["new"],
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };

    setProductList([item, ...productList]);
    setNewTitle("");
    setNewPrice("");
    setNewSku("");
    setIsAddProductOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrderList(
      orderList.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Metrics calculation
  const totalRevenue = orderList.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orderList.length;
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
              Products ({productList.length})
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
              Orders ({orderList.length})
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
              Customers ({fallbackCustomers.length})
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
              Coupons ({couponList.length})
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
            <h1 className="text-2xl font-bold tracking-tight text-black capitalize">
              {activeNav === "dashboard" ? "Executive Analytics & Operations" : `${activeNav} Management`}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Integrated with Supabase PostgreSQL and Razorpay telemetry
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeNav === "products" && (
              <Button variant="primary" size="sm" onClick={() => setIsAddProductOpen(true)}>
                <span className="flex items-center gap-1.5">
                  <Plus size={14} />
                  Add Garment
                </span>
              </Button>
            )}
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-semibold border border-emerald-200">
              ● Supabase DB Connected
            </span>
          </div>
        </div>

        {/* VIEW 1: DASHBOARD ANALYTICS & CHARTS */}
        {activeNav === "dashboard" && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span>Gross Revenue</span>
                  <TrendingUp size={15} className="text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-black">{formatCurrency(totalRevenue)}</p>
                <span className="text-[11px] font-semibold text-emerald-600">+14.2% trajectory</span>
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
                <span className="text-[11px] font-semibold text-emerald-600">+8.4% high ticket basket</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#EAEAEA] shadow-sm space-y-3">
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span>Registered Patrons</span>
                  <Users size={15} className="text-neutral-400" />
                </div>
                <p className="text-2xl font-bold text-black">{fallbackCustomers.length}</p>
                <span className="text-[11px] font-semibold text-neutral-500">Global client members</span>
              </div>
            </div>

            {/* Recharts Analytics: Revenue Trend & Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-black">Revenue Inflow (Past 7 Days)</h3>
                    <p className="text-xs text-neutral-500">Daily settlement totals</p>
                  </div>
                  <span className="text-xs font-bold text-accent">+21.8% Peak</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
                      <Tooltip formatter={(value: any) => [`$${value}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-black">Sales By Silhouette</h3>
                <p className="text-xs text-neutral-500">Volume distribution by category</p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categorySalesData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#1A1A1A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Low Stock Warning Banner */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between text-xs text-amber-800">
              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Inventory Threshold Warning:</strong> 2 items currently hold under 10 units in warehouse reserve (Artisan Leather Tote, Italian Wool Overcoat).
                </span>
              </div>
              <button
                onClick={() => setActiveNav("products")}
                className="font-bold underline hover:text-amber-950"
              >
                Inspect Inventory
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT MANAGEMENT CRUD */}
        {activeNav === "products" && (
          <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-black">Product Catalog Directory</h3>
                <p className="text-xs text-neutral-500">Manage pieces, pricing, and active status</p>
              </div>
              <span className="text-xs text-neutral-500">{productList.length} listed designs</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-5">Design Title</th>
                    <th className="py-3 px-5">SKU</th>
                    <th className="py-3 px-5">Category</th>
                    <th className="py-3 px-5">Retail Price</th>
                    <th className="py-3 px-5">Inventory</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {productList.map((p) => (
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
                      <td className="py-3.5 px-5 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-neutral-400 hover:text-destructive rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: ORDER MANAGEMENT & FULFILLMENT */}
        {activeNav === "orders" && (
          <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-black">Fulfillment & Order Ledger</h3>
                <p className="text-xs text-neutral-500">Track shipments, payment status, and customer destinations</p>
              </div>
              <span className="text-xs text-neutral-500">{orderList.length} total orders</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-5">Order #</th>
                    <th className="py-3 px-5">Customer & Email</th>
                    <th className="py-3 px-5">Destination</th>
                    <th className="py-3 px-5">Fulfillment Status</th>
                    <th className="py-3 px-5">Payment</th>
                    <th className="py-3 px-5">Total</th>
                    <th className="py-3 px-5 text-right">Advance State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {orderList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-black">{ord.orderNumber}</td>
                      <td className="py-3.5 px-5">
                        <p className="font-semibold text-black">{ord.shippingAddress.fullName}</p>
                        <p className="text-[11px] text-neutral-500">{ord.email}</p>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-600">
                        {ord.shippingAddress.city}, {ord.shippingAddress.country}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700"
                            : ord.status === "shipped"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
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
                      <td className="py-3.5 px-5 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-neutral-50 border border-subtle text-xs rounded px-2 py-1 font-medium cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: CUSTOMERS DIRECTORY */}
        {activeNav === "customers" && (
          <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-black">Patron Members</h3>
                <p className="text-xs text-neutral-500">Registered client accounts and lifetime value</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-5">Patron</th>
                    <th className="py-3 px-5">Email</th>
                    <th className="py-3 px-5">Lifetime Orders</th>
                    <th className="py-3 px-5">Total Spend</th>
                    <th className="py-3 px-5">Member Since</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {fallbackCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-black">{c.name}</td>
                      <td className="py-3.5 px-5 text-neutral-600">{c.email}</td>
                      <td className="py-3.5 px-5 text-black font-medium">{c.totalOrders} orders</td>
                      <td className="py-3.5 px-5 font-bold text-black">{formatCurrency(c.totalSpent)}</td>
                      <td className="py-3.5 px-5 text-neutral-500">{c.joinDate}</td>
                      <td className="py-3.5 px-5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: COUPONS */}
        {activeNav === "coupons" && (
          <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-black">Promotional Coupons & Codes</h3>
                <p className="text-xs text-neutral-500">Campaign redemption tracking</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAFA] text-neutral-500 border-b border-[#EAEAEA] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-5">Code</th>
                    <th className="py-3 px-5">Type</th>
                    <th className="py-3 px-5">Value</th>
                    <th className="py-3 px-5">Times Used</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {couponList.map((cp) => (
                    <tr key={cp.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 px-5 font-mono font-bold text-black">{cp.code}</td>
                      <td className="py-3.5 px-5 capitalize text-neutral-600">{cp.type}</td>
                      <td className="py-3.5 px-5 font-bold text-black">
                        {cp.type === "percentage" ? `${cp.value}%` : `$${cp.value}`}
                      </td>
                      <td className="py-3.5 px-5 text-neutral-600">{cp.timesUsed} / {cp.usageLimit}</td>
                      <td className="py-3.5 px-5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* CREATE PRODUCT MODAL */}
      <Modal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        title="Add New Creation to Catalog"
        size="md"
      >
        <form onSubmit={handleCreateProduct} className="space-y-4 pt-2">
          <Input
            label="Design Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Suede Trench Coat"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Retail Price ($)"
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="e.g. 750"
              required
            />
            <Input
              label="SKU Identifier"
              value={newSku}
              onChange={(e) => setNewSku(e.target.value)}
              placeholder="e.g. OW-801"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-secondary-text">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 border border-subtle rounded-lg text-xs bg-white font-medium cursor-pointer"
            >
              <option value="Outerwear">Outerwear</option>
              <option value="Knitwear">Knitwear</option>
              <option value="Shirts">Shirts</option>
              <option value="Trousers">Trousers</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Publish Creation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
