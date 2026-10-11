"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-[3/4] rounded-lg" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 px-6 border-b border-subtle">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded",
            i === 0 ? "w-12 h-12 rounded-lg" : "flex-1"
          )}
        />
      ))}
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="card-base p-6 space-y-3">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-8 w-32 rounded" />
      <Skeleton className="h-3 w-20 rounded" />
    </div>
  );
}

