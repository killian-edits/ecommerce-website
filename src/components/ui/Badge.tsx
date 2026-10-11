"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "new" | "sale";
  size?: "sm" | "md";
  className?: string;
  pulse?: boolean;
}

const variantClasses = {
  default: "bg-gray-100 text-secondary-text",
  success: "bg-emerald-50 text-success",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-destructive",
  info: "bg-blue-50 text-accent",
  new: "bg-primary-text text-white",
  sale: "bg-destructive text-white",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium uppercase tracking-wider rounded-full",
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        variantClasses[variant],
        pulse && "animate-pulse-badge",
        className
      )}
    >
      {children}
    </span>
  );
}

