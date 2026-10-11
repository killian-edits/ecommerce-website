"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent/50 btn-shimmer",
  secondary:
    "bg-primary-text text-white hover:bg-gray-800 focus-visible:ring-gray-500/50",
  outline:
    "bg-transparent border-2 border-primary-text text-primary-text hover:bg-primary-text hover:text-white focus-visible:ring-primary-text/50",
  ghost:
    "bg-transparent text-primary-text hover:bg-black/5 focus-visible:ring-gray-500/50",
  destructive:
    "bg-destructive text-white hover:bg-red-700 focus-visible:ring-destructive/50",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-body",
  lg: "px-8 py-4 text-body-lg font-medium",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      disabled={disabled || isLoading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "cursor-pointer select-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {!isLoading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}

