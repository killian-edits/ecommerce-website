"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text z-10">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          placeholder=" "
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 border rounded-lg bg-white",
            "text-primary-text text-body outline-none",
            "transition-all duration-200",
            "focus:border-accent focus:ring-2 focus:ring-accent/20",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
              : "border-subtle-dark",
            icon && "pl-12",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute top-4 text-secondary-text text-body",
            "transition-all duration-200 pointer-events-none origin-left",
            "peer-focus:-translate-y-2.5 peer-focus:scale-75",
            "peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75",
            focused || props.value ? "text-accent" : "",
            icon ? "left-12" : "left-4"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextArea({
  label,
  error,
  className,
  id,
  ...props
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          id={inputId}
          placeholder=" "
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 border rounded-lg bg-white",
            "text-primary-text text-body outline-none resize-none",
            "transition-all duration-200 min-h-[120px]",
            "focus:border-accent focus:ring-2 focus:ring-accent/20",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
              : "border-subtle-dark",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 top-4 text-secondary-text text-body",
            "transition-all duration-200 pointer-events-none origin-left",
            "peer-focus:-translate-y-2.5 peer-focus:scale-75",
            "peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75",
            focused ? "text-accent" : ""
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

