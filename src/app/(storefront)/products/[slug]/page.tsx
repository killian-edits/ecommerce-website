"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";
import { products, getProductBySlug, getReviewsByProduct } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/storefront/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "italian-wool-overcoat";
  const product = getProductBySlug(slug) || products[0];
  const reviews = getReviewsByProduct(product.id);
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Charcoal");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [addedEffect, setAddedEffect] = useState(false);

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    addItem(product, undefined, quantity);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 2000);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-main py-10 md:py-16 space-y-20">
      {/* Breadcrumb */}
      <nav className="text-xs text-secondary-text flex items-center gap-2">
        <Link href="/" className="hover:text-primary-text">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-text">Products</Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-primary-text"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-primary-text font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual */}
          <div className="relative aspect-[3/4] max-h-[720px] w-full rounded-xl overflow-hidden bg-neutral-100 shadow-sm border border-subtle">
            <Image
              src={product.images[activeImageIndex]?.url || product.images[0].url}
              alt={product.title}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Thumbnail Slider */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? "border-accent shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Configurator & Purchasing (5 Cols) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          {/* Header & Meta */}
          <div className="space-y-3 pb-6 border-b border-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-secondary-text">
                {product.category} • SKU: {product.sku}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                In Stock ({product.stock} left)
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary-text leading-tight">
              {product.title}
            </h1>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-primary-text">
                  {formatCurrency(displayPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-secondary-text line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={15} />
                <span className="text-xs text-secondary-text underline">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-bold tracking-wider uppercase text-primary-text">
                Palette
              </span>
              <span className="text-secondary-text font-medium">{selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {["Charcoal", "Navy", "Camel"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all ${
                    selectedColor === color
                      ? "border-primary-text bg-primary-text text-white shadow-sm"
                      : "border-subtle hover:border-neutral-400 bg-white text-secondary-text"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-bold tracking-wider uppercase text-primary-text">
                Proportion
              </span>
              <button className="text-accent underline font-medium">Sizing Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {["XS", "S", "M", "L", "XL"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === sz
                      ? "border-accent bg-accent text-white shadow-sm"
                      : "border-subtle bg-white text-primary-text hover:border-neutral-400"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              {/* Quantity Adjuster */}
              <div className="flex items-center border border-subtle rounded-lg bg-white px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-sm text-secondary-text hover:text-primary-text"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2 py-2 text-sm text-secondary-text hover:text-primary-text"
                >
                  +
                </button>
              </div>

              {/* Main Button */}
              <div className="flex-1">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <span className="flex items-center justify-center gap-2">
                    {addedEffect ? (
                      <>
                        <Check size={18} />
                        Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Bag • {formatCurrency(displayPrice * quantity)}
                      </>
                    )}
                  </span>
                </Button>
              </div>

              {/* Wishlist Button */}
              <button
                className="p-3.5 border border-subtle rounded-lg hover:border-neutral-400 text-secondary-text hover:text-destructive transition-colors bg-white"
                aria-label="Save to Wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Reassurance Features */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-subtle text-center text-[11px] text-secondary-text">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={18} className="text-primary-text" />
                <span>Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw size={18} className="text-primary-text" />
                <span>30-Day Exchange</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-primary-text" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Accordion Specs & Information */}
          <div className="border-t border-subtle divide-y divide-subtle pt-2">
            {/* Description Accordion */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion("description")}
                className="w-full flex items-center justify-between text-sm font-bold text-primary-text text-left"
              >
                <span>Garment Description & Silhouette</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeAccordion === "description" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "description" && (
                <div className="pt-3 text-xs leading-relaxed text-secondary-text">
                  {product.description}
                </div>
              )}
            </div>

            {/* Specifications Accordion */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full flex items-center justify-between text-sm font-bold text-primary-text text-left"
              >
                <span>Material & Tailoring Specifications</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeAccordion === "specs" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "specs" && (
                <div className="pt-3 text-xs text-secondary-text space-y-2">
                  {product.specs ? (
                    Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-subtle/50">
                        <span className="font-semibold text-primary-text">{k}</span>
                        <span>{v}</span>
                      </div>
                    ))
                  ) : (
                    <p>Natural fibers curated across ethical workshops.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-subtle space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-text">
              Client Appraisals ({reviews.length})
            </h3>
            <p className="text-xs text-secondary-text mt-1">
              Independent verified customer testimonials
            </p>
          </div>
          <Button variant="outline" size="sm">
            Write a Review
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xl border border-subtle shadow-card space-y-3"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={rev.rating} size={14} />
                <span className="text-[11px] text-secondary-text">{rev.createdAt}</span>
              </div>
              <h5 className="text-sm font-bold text-primary-text">{rev.title}</h5>
              <p className="text-xs text-secondary-text leading-relaxed">
                &ldquo;{rev.body}&rdquo;
              </p>
              <div className="pt-2 text-[11px] font-semibold text-primary-text flex items-center gap-1.5">
                <span>{rev.userName}</span>
                {rev.isVerified && (
                  <span className="text-emerald-600 font-normal">• Verified Buyer</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-subtle space-y-8">
          <div>
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Complimentary Pairings
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-text mt-1">
              You May Also Admire
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

