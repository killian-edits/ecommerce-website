"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { siteSettings } from "@/lib/mock-data";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/products" },
    { label: "Outerwear", href: "/products?category=outerwear" },
    { label: "Knitwear", href: "/products?category=knitwear" },
    { label: "Accessories", href: "/products?category=accessories" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {siteSettings.announcementBarActive && !announcementDismissed && (
        <div className="bg-[#1A1A1A] text-white py-2 px-4 text-xs font-medium tracking-widest text-center flex items-center justify-center relative transition-all">
          <Link
            href={siteSettings.announcementBarLink}
            className="hover:underline flex items-center gap-1.5 justify-center"
          >
            <span>{siteSettings.announcementBarText}</span>
            <ArrowRight size={12} />
          </Link>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-4 text-white/60 hover:text-white p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "h-[64px] bg-white/80 backdrop-blur-md shadow-sm border-b border-subtle"
            : "h-[84px] bg-white border-b border-subtle/40"
        }`}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-primary-text hover:text-accent"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <Link
              href="/products"
              className="text-secondary-text hover:text-primary-text"
            >
              <Search size={20} />
            </Link>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-primary-text group-hover:text-accent transition-colors">
              {siteSettings.siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-secondary-text hover:text-primary-text tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/products"
              className="hidden lg:flex items-center justify-center p-2 text-secondary-text hover:text-primary-text transition-colors"
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/account"
              className="hidden sm:flex items-center justify-center p-2 text-secondary-text hover:text-primary-text transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Cart Trigger Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-primary-text hover:text-accent transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={22} />
              <AnimatePresence>
                {mounted && itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 z-10"
            >
              <div className="flex items-center justify-between pb-6 border-b border-subtle">
                <span className="font-serif text-2xl font-bold tracking-tight">
                  {siteSettings.siteName}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-secondary-text hover:text-primary-text"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col py-6 gap-5 flex-1 overflow-y-auto">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-primary-text hover:text-accent transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-subtle space-y-4">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-secondary-text hover:text-accent font-medium"
                >
                  Admin Panel Preview →
                </Link>
                <p className="text-xs text-secondary-text">
                  © {mounted ? new Date().getFullYear() : ""}{" "}
                  {siteSettings.siteName}. All rights reserved.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
