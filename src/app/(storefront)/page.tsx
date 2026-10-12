"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { getNewArrivals, getBestSellers, testimonials } from "@/lib/mock-data";
import { getHeroSlides, getCategories, getProducts } from "@/lib/db";
import { Product, Category, HeroSlide } from "@/types";
import ProductCard from "@/components/storefront/ProductCard";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isHoveringCategories, setIsHoveringCategories] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [fetchedSlides, fetchedCats, fetchedNew, fetchedBest] =
        await Promise.all([
          getHeroSlides(),
          getCategories(),
          getProducts({ limit: 4 }),
          getProducts({ tag: "bestseller", limit: 4 }),
        ]);
      setSlides(fetchedSlides);
      setCategoryList(fetchedCats);
      setNewArrivals(fetchedNew);
      setBestSellers(fetchedBest);
    }
    loadData();
  }, []);

  // Auto-advance hero slides every 6 seconds
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const slide = slides[currentSlide] || {
    id: "default",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920",
    heading: "Autumn Collection 2026",
    subheading:
      "Architectural silhouettes crafted in pure virgin wool and cashmere.",
    ctaText: "Explore Collection",
    ctaLink: "/products",
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!categoryScrollRef.current) return;
    const container = categoryScrollRef.current;

    // Dynamically calculate the exact distance of 1 card + its gap
    const firstCard = container.firstElementChild as HTMLElement;
    const secondCard = container.children[1] as HTMLElement;

    let scrollDistance = 340; // Fallback if cards aren't rendered yet
    if (firstCard && secondCard) {
      scrollDistance = secondCard.offsetLeft - firstCard.offsetLeft;
    }

    const targetScroll =
      container.scrollLeft +
      (direction === "left" ? -scrollDistance : scrollDistance);

    const start = container.scrollLeft;
    const change = targetScroll - start;
    const duration = 400; // Animation duration in ms
    let startTime: number | null = null;

    function animateScroll(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease-out curve

      container.scrollLeft = start + change * ease;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[82vh] min-h-[580px] max-h-[900px] w-full overflow-hidden bg-black text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority
              className="object-cover object-center brightness-[0.70]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Overlay Details */}
        <div className="absolute inset-0 flex flex-col justify-between container-main py-12 md:py-16 pointer-events-none">
          <div />

          {/* Centered / Left Text Content */}
          <div className="max-w-2xl pointer-events-auto space-y-6">
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/80 font-medium"
            >
              Autumn / Winter 2026 Archive
            </motion.p>

            <motion.h1
              key={`h-${slide.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-serif text-neutral-200 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              {slide.heading}
            </motion.h1>

            <motion.p
              key={`desc-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm md:text-base text-neutral-200 leading-relaxed max-w-lg"
            >
              {slide.subheading}
            </motion.p>

            <motion.div
              key={`btn-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-2 flex items-center gap-4"
            >
              <Link href={slide.ctaLink}>
                <Button variant="primary" size="lg">
                  <span className="flex items-center gap-2">
                    {slide.ctaText}
                    <ArrowRight size={18} />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Carousel Indicators & Controls */}
          <div className="flex items-center justify-between pointer-events-auto pt-6 border-t border-white/20">
            <div className="flex gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    idx === currentSlide ? "w-10 bg-white" : "w-3 bg-white/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-white">
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + (slides.length || 1)) % (slides.length || 1),
                  )
                }
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % (slides.length || 1))
                }
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-subtle">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-100 text-primary-text">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-text">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-secondary-text mt-1">
                On global orders over $150
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-100 text-primary-text">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-text">
                Artisanal Craftsmanship
              </h4>
              <p className="text-xs text-secondary-text mt-1">
                Hand-finished natural fibers
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-100 text-primary-text">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-text">
                Effortless Returns
              </h4>
              <p className="text-xs text-secondary-text mt-1">
                30 days prepaid return cycle
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-100 text-primary-text">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-text">
                Secure Settlement
              </h4>
              <p className="text-xs text-secondary-text mt-1">
                Encrypted checkout verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES (Dynamic Card-Width Smooth Scroll) */}
      <section className="container-main space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Curated Silhouettes
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-text mt-1">
              Shop by Category
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="text-sm font-semibold text-accent hover:underline flex items-center gap-1.5 mr-2"
            >
              Explore All <ArrowRight size={15} />
            </Link>

            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              className="p-2.5 rounded-full border border-subtle hover:bg-neutral-100 text-primary-text transition-colors"
              aria-label="Scroll categories left"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              className="p-2.5 rounded-full border border-subtle hover:bg-neutral-100 text-primary-text transition-colors"
              aria-label="Scroll categories right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={categoryScrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar py-3 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categoryList.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group block relative flex-shrink-0
          w-[76vw] max-w-[300px]
          sm:w-[42vw] sm:max-w-[340px]
          lg:w-[31vw] lg:max-w-[380px]
          aspect-[4/5] rounded-2xl overflow-hidden
          bg-neutral-100 shadow-sm border border-subtle
          hover:shadow-card-hover transition-shadow duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center
            group-hover:scale-105 transition-transform
            duration-700 ease-out"
                sizes="(max-width: 640px) 76vw,
                       (max-width: 1024px) 42vw,
                       380px"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6 text-white">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/75 mb-1">
                  Collection
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {cat.name}
                </h3>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/20 mt-3 text-xs text-white/80">
                  <span>{cat.productCount} signature designs</span>

                  <span className="flex items-center gap-1 font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                    View <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="container-main space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Fresh Additions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-primary-text hover:text-accent transition-colors flex items-center gap-1.5"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} index={idx} />
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL EDITORIAL BANNER */}
      <section className="container-main">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-6 max-w-xl z-10">
            <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold tracking-widest uppercase">
              Limited Archive Release
            </span>
            <h3 className="font-serif text-3xl text-white sm:text-5xl font-bold leading-tight">
              The Cashmere & Wool Capsule
            </h3>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              Constructed in high-altitude mills using Mongolian undercoat hair.
              Unparalleled insulating softness tailored for cold fronts.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/products?category=knitwear">
                <Button variant="primary" size="md">
                  Shop the Capsule
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  size="md"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  View Lookbook
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full lg:w-96 aspect-square rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&fit=crop"
              alt="Cashmere Capsule"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 384px"
            />
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="container-main space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Signature Pieces
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-primary-text hover:text-accent transition-colors flex items-center gap-1.5"
          >
            All Best Sellers <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} index={idx} />
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-secondary-bg py-24">
        <div className="container-main space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Endorsements
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text">
              What Our Patrons Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl border border-subtle shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <StarRating rating={item.rating} size={14} />
                  <p className="text-sm text-secondary-text italic leading-relaxed">
                    &ldquo;{item.body}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-subtle">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatarUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-primary-text">
                      {item.name}
                    </h5>
                    <p className="text-xs text-secondary-text">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
