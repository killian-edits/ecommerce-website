import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#FAFAFA",
          text: "#1A1A1A",
        },
        secondary: {
          bg: "#F5F5F0",
          text: "#6B6B6B",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },
        destructive: "#DC2626",
        success: "#16A34A",
        card: "#FFFFFF",
        admin: {
          bg: "#F8F9FA",
          sidebar: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "hero": ["4rem", { lineHeight: "1.2", fontWeight: "700" }],
        "hero-lg": ["4.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "section": ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        "section-sm": ["2rem", { lineHeight: "1.2", fontWeight: "600" }],
        "product-title": ["1.25rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body": ["0.9375rem", { lineHeight: "1.6" }],
        "body-lg": ["1rem", { lineHeight: "1.6" }],
        "caption": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.1em", fontWeight: "500" }],
        "caption-sm": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em", fontWeight: "500" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      maxWidth: {
        "content": "1440px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        "drawer": "-4px 0 24px rgba(0,0,0,0.08)",
        "modal": "0 8px 32px rgba(0,0,0,0.12)",
      },
      borderColor: {
        subtle: "rgba(0,0,0,0.06)",
        "subtle-dark": "rgba(0,0,0,0.12)",
      },
      animation: {
        "shimmer": "shimmer 2s ease-in-out infinite",
        "pulse-badge": "pulse-badge 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "count-up": "count-up 1s ease-out",
        "scroll-x": "scroll-x 30s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-badge": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "bounce-sm": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
