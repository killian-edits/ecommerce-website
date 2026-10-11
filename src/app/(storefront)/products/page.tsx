"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import { products, categories } from "@/lib/mock-data";
import ProductCard from "@/components/storefront/ProductCard";
import Button from "@/components/ui/Button";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) return false;
        const currentPrice = p.salePrice || p.price;
        if (currentPrice > priceRange) return false;
        if (selectedTag && !p.tags.includes(selectedTag)) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice || a.price;
        const priceB = b.salePrice || b.price;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [selectedCategory, priceRange, sortBy, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange(1000);
    setSelectedTag(null);
  };

  return (
    <div className="container-main py-10 md:py-16 space-y-10">
      {/* Breadcrumb & Page Title */}
      <div className="space-y-3">
        <nav className="text-xs text-secondary-text flex items-center gap-2">
          <Link href="/" className="hover:text-primary-text">Home</Link>
          <span>/</span>
          <span className="text-primary-text font-medium">Wardrobe Archive</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary-text">
              All Creations
            </h1>
            <p className="text-sm text-secondary-text mt-1">
              Showing {filteredProducts.length} curated {filteredProducts.length === 1 ? "design" : "designs"}
            </p>
          </div>

          {/* Sort Selector & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-subtle rounded-lg text-sm font-medium bg-white"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-subtle rounded-lg px-4 py-2.5 pr-9 text-sm font-medium text-primary-text focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="newest">Sort: New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside
          className={`lg:block ${
            mobileFilterOpen
              ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
              : "hidden"
          } space-y-8 bg-white lg:bg-transparent lg:p-0 rounded-xl`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-subtle lg:hidden">
              <h3 className="font-serif text-xl font-bold">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2">
                <X size={20} />
              </button>
            </div>
          )}

          {/* Categories Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-text">
              Categories
            </h4>
            <div className="space-y-1.5 text-sm">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`block w-full text-left py-1 transition-colors ${
                  selectedCategory === "all"
                    ? "font-bold text-accent"
                    : "text-secondary-text hover:text-primary-text"
                }`}
              >
                All Garments
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`block w-full text-left py-1 transition-colors ${
                    selectedCategory === cat.slug
                      ? "font-bold text-accent"
                      : "text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {cat.name} ({cat.productCount})
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary-text">
                Max Price
              </h4>
              <span className="text-sm font-semibold">${priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
            <div className="flex justify-between text-xs text-secondary-text">
              <span>$100</span>
              <span>$1,000</span>
            </div>
          </div>

          {/* Collection Tag Filters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-text">
              Highlight Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {["new", "bestseller"].map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider border transition-colors ${
                    selectedTag === tag
                      ? "bg-primary-text text-white border-primary-text"
                      : "border-subtle bg-white text-secondary-text hover:border-neutral-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <div className="pt-4 border-t border-subtle">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-xs font-semibold text-secondary-text hover:text-destructive transition-colors"
            >
              <RotateCcw size={13} />
              Reset All Filters
            </button>
          </div>

          {mobileFilterOpen && (
            <div className="pt-6 lg:hidden">
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {filteredProducts.length} Results
              </Button>
            </div>
          )}
        </aside>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-3 space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-xl border border-subtle p-8">
              <p className="font-serif text-xl font-bold">No garments match your filters</p>
              <p className="text-sm text-secondary-text">
                Try expanding your price range or clearing category filters.
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

