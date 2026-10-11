"use client";

import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStarArray } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = 16,
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const stars = getStarArray(rating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {stars.map((type, i) => {
          if (type === "full") {
            return (
              <Star
                key={i}
                size={size}
                className="fill-amber-400 text-amber-400"
              />
            );
          }
          if (type === "half") {
            return (
              <StarHalf
                key={i}
                size={size}
                className="fill-amber-400 text-amber-400"
              />
            );
          }
          return (
            <Star
              key={i}
              size={size}
              className="text-gray-200"
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-primary-text ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-secondary-text">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

