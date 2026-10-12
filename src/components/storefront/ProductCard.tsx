"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const displayPrice = product.salePrice || product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Image container */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary-bg mb-3"
      >
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={product.images[0]?.url || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>

        {/* Second image on hover */}
        {product.images[1] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[1].url}
              alt={`${product.title} alternate view`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          {product.tags.includes("new") && (
            <Badge variant="new" pulse>
              NEW
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="sale">
              {Math.round(
                ((product.price - (product.salePrice || 0)) / product.price) *
                  100,
              )}
              % OFF
            </Badge>
          )}
        </div>

        {/* Quick actions on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="absolute bottom-3 left-3 right-3 flex gap-2 z-10"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/95 backdrop-blur-sm rounded-lg text-sm font-medium text-primary-text hover:bg-white transition-colors cursor-pointer shadow-card"
          >
            <ShoppingBag size={16} />
            Quick Add
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.preventDefault()}
            className="p-2.5 bg-white/95 backdrop-blur-sm rounded-lg text-secondary-text hover:text-destructive hover:bg-white transition-colors cursor-pointer shadow-card"
          >
            <Heart size={16} />
          </motion.button>
        </motion.div>
      </Link>

      {/* Product info */}
      <div className="px-1 space-y-1">
        <p className="text-caption-sm uppercase text-secondary-text">
          {product.category}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="block text-product-title font-serif text-primary-text hover:text-accent transition-colors line-clamp-1"
        >
          {product.title}
        </Link>
        <StarRating
          rating={product.rating}
          size={14}
          reviewCount={product.reviewCount}
        />
        <div className="flex items-center gap-2">
          <span className="text-body-lg font-semibold text-primary-text">
            {formatCurrency(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-secondary-text line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
