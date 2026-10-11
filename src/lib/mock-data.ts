import {
  Product,
  Category,
  HeroSlide,
  Review,
  Testimonial,
  Order,
  Customer,
  Coupon,
  SiteSettings,
} from "@/types";

export const siteSettings: SiteSettings = {
  siteName: "LUXE",
  tagline: "Curated Living, Refined Style",
  logoUrl: "/logo.svg",
  contactEmail: "hello@luxe.store",
  contactPhone: "+1 (555) 123-4567",
  businessAddress: "123 Commerce Street, New York, NY 10001",
  currencySymbol: "$",
  socialInstagram: "https://instagram.com/luxe",
  socialFacebook: "https://facebook.com/luxe",
  socialTwitter: "https://twitter.com/luxe",
  announcementBarActive: true,
  announcementBarText: "Free shipping on orders over $150 — Use code FREESHIP",
  announcementBarLink: "/products",
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
    heading: "Autumn Collection 2024",
    subheading: "Discover pieces crafted for the modern individual. Timeless design meets exceptional quality.",
    ctaText: "Shop Collection",
    ctaLink: "/products",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop",
    heading: "New Season Essentials",
    subheading: "Elevate your everyday wardrobe with carefully curated essentials that blend comfort with style.",
    ctaText: "Explore Now",
    ctaLink: "/products?category=essentials",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop",
    heading: "The Art of Detail",
    subheading: "Every stitch tells a story. Premium materials, artisanal craftsmanship, and designs that endure.",
    ctaText: "Discover More",
    ctaLink: "/products?category=premium",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Outerwear",
    slug: "outerwear",
    description: "Premium jackets, coats, and layers",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    productCount: 24,
  },
  {
    id: "2",
    name: "Knitwear",
    slug: "knitwear",
    description: "Luxurious sweaters and cardigans",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3f0e?w=600&h=800&fit=crop",
    productCount: 18,
  },
  {
    id: "3",
    name: "Shirts",
    slug: "shirts",
    description: "Classic and contemporary shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    productCount: 32,
  },
  {
    id: "4",
    name: "Trousers",
    slug: "trousers",
    description: "Tailored pants and casual bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    productCount: 21,
  },
  {
    id: "5",
    name: "Accessories",
    slug: "accessories",
    description: "Bags, scarves, and essentials",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    productCount: 45,
  },
  {
    id: "6",
    name: "Footwear",
    slug: "footwear",
    description: "Shoes, boots, and sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
    productCount: 28,
  },
];

const productImages = {
  wool_coat: [
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&h=1000&fit=crop",
  ],
  cashmere_sweater: [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop",
  ],
  linen_shirt: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
  ],
  leather_bag: [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop",
  ],
  sneakers: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop",
  ],
  tailored_trousers: [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
  ],
  silk_scarf: [
    "https://images.unsplash.com/photo-1601924921557-45e6ddf3ef5c?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop",
  ],
  denim_jacket: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop",
  ],
};

export const products: Product[] = [
  {
    id: "1",
    title: "Italian Wool Overcoat",
    slug: "italian-wool-overcoat",
    description: "A masterfully tailored overcoat crafted from the finest Italian wool. Features a clean silhouette with notch lapels, interior pocket details, and a luxuriously soft hand feel that improves with every wear.",
    category: "Outerwear",
    categorySlug: "outerwear",
    price: 895,
    salePrice: 695,
    sku: "OW-001",
    stock: 15,
    status: "active",
    images: productImages.wool_coat.map((url, i) => ({
      id: `1-${i}`,
      url,
      alt: "Italian Wool Overcoat",
      sortOrder: i,
    })),
    tags: ["new", "bestseller"],
    rating: 4.8,
    reviewCount: 124,
    options: [
      { id: "1-s", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "1-c", name: "Color", values: ["Charcoal", "Navy", "Camel"] },
    ],
    specs: {
      Material: "100% Italian Virgin Wool",
      Lining: "Cupro",
      Closure: "Button front",
      Care: "Dry clean only",
      Origin: "Made in Italy",
    },
    createdAt: "2024-09-15",
  },
  {
    id: "2",
    title: "Cashmere Crewneck Sweater",
    slug: "cashmere-crewneck-sweater",
    description: "Ultra-soft Mongolian cashmere knit in a relaxed-fit crewneck. This piece offers unmatched warmth without bulk, making it perfect for layering or wearing on its own.",
    category: "Knitwear",
    categorySlug: "knitwear",
    price: 385,
    sku: "KN-001",
    stock: 42,
    status: "active",
    images: productImages.cashmere_sweater.map((url, i) => ({
      id: `2-${i}`,
      url,
      alt: "Cashmere Crewneck Sweater",
      sortOrder: i,
    })),
    tags: ["new"],
    rating: 4.9,
    reviewCount: 89,
    options: [
      { id: "2-s", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "2-c", name: "Color", values: ["Ivory", "Heather Grey", "Black", "Forest"] },
    ],
    specs: {
      Material: "100% Grade-A Mongolian Cashmere",
      Weight: "12-gauge knit",
      Fit: "Relaxed",
      Care: "Hand wash cold",
      Origin: "Made in Scotland",
    },
    createdAt: "2024-09-20",
  },
  {
    id: "3",
    title: "Relaxed Linen Shirt",
    slug: "relaxed-linen-shirt",
    description: "A breezy linen shirt with a relaxed silhouette, perfect for warm-weather dressing. Made from premium French flax linen that softens beautifully with each wash.",
    category: "Shirts",
    categorySlug: "shirts",
    price: 165,
    sku: "SH-001",
    stock: 68,
    status: "active",
    images: productImages.linen_shirt.map((url, i) => ({
      id: `3-${i}`,
      url,
      alt: "Relaxed Linen Shirt",
      sortOrder: i,
    })),
    tags: ["bestseller"],
    rating: 4.7,
    reviewCount: 203,
    options: [
      { id: "3-s", name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] },
      { id: "3-c", name: "Color", values: ["White", "Sky Blue", "Sand", "Olive"] },
    ],
    specs: {
      Material: "100% French Flax Linen",
      Fit: "Relaxed",
      Collar: "Camp collar",
      Care: "Machine wash cold",
      Origin: "Made in Portugal",
    },
    createdAt: "2024-08-10",
  },
  {
    id: "4",
    title: "Artisan Leather Tote",
    slug: "artisan-leather-tote",
    description: "Hand-stitched from full-grain vegetable-tanned leather, this tote bag develops a rich patina over time. Features an interior laptop sleeve, magnetic closure, and brass hardware.",
    category: "Accessories",
    categorySlug: "accessories",
    price: 425,
    salePrice: 340,
    sku: "AC-001",
    stock: 8,
    status: "active",
    images: productImages.leather_bag.map((url, i) => ({
      id: `4-${i}`,
      url,
      alt: "Artisan Leather Tote",
      sortOrder: i,
    })),
    tags: ["bestseller"],
    rating: 4.6,
    reviewCount: 67,
    options: [
      { id: "4-c", name: "Color", values: ["Tan", "Black", "Cognac"] },
    ],
    specs: {
      Material: "Full-grain vegetable-tanned leather",
      Dimensions: '15" W x 12" H x 5" D',
      Hardware: "Solid brass",
      Interior: "Cotton twill lining, laptop sleeve",
      Origin: "Handmade in Florence, Italy",
    },
    createdAt: "2024-07-25",
  },
  {
    id: "5",
    title: "Minimalist Leather Sneakers",
    slug: "minimalist-leather-sneakers",
    description: "Clean-lined sneakers crafted from smooth Italian calfskin leather with a margom rubber sole. The epitome of understated luxury footwear.",
    category: "Footwear",
    categorySlug: "footwear",
    price: 295,
    sku: "FW-001",
    stock: 35,
    status: "active",
    images: productImages.sneakers.map((url, i) => ({
      id: `5-${i}`,
      url,
      alt: "Minimalist Leather Sneakers",
      sortOrder: i,
    })),
    tags: ["new", "bestseller"],
    rating: 4.8,
    reviewCount: 156,
    options: [
      { id: "5-s", name: "Size", values: ["7", "8", "9", "10", "11", "12", "13"] },
      { id: "5-c", name: "Color", values: ["White", "Black", "Grey"] },
    ],
    specs: {
      Material: "Italian calfskin leather upper",
      Sole: "Margom rubber",
      Insole: "Leather-lined cushioned",
      Care: "Leather conditioner recommended",
      Origin: "Made in Italy",
    },
    createdAt: "2024-09-25",
  },
  {
    id: "6",
    title: "Tailored Wool Trousers",
    slug: "tailored-wool-trousers",
    description: "Impeccably tailored trousers in a refined wool blend with a gentle drape. Features a mid-rise waist, tapered leg, and subtle stretch for all-day comfort.",
    category: "Trousers",
    categorySlug: "trousers",
    price: 245,
    sku: "TR-001",
    stock: 22,
    status: "active",
    images: productImages.tailored_trousers.map((url, i) => ({
      id: `6-${i}`,
      url,
      alt: "Tailored Wool Trousers",
      sortOrder: i,
    })),
    tags: [],
    rating: 4.5,
    reviewCount: 91,
    options: [
      { id: "6-s", name: "Size", values: ["28", "30", "32", "34", "36", "38"] },
      { id: "6-c", name: "Color", values: ["Charcoal", "Navy", "Stone"] },
    ],
    specs: {
      Material: "98% Wool, 2% Elastane",
      Fit: "Slim-tapered",
      Rise: "Mid-rise",
      Care: "Dry clean recommended",
      Origin: "Made in Portugal",
    },
    createdAt: "2024-08-20",
  },
  {
    id: "7",
    title: "Silk-Cashmere Scarf",
    slug: "silk-cashmere-scarf",
    description: "A generous silk-cashmere blend scarf with an incredibly soft hand feel and subtle sheen. Versatile enough for both casual and formal styling.",
    category: "Accessories",
    categorySlug: "accessories",
    price: 195,
    sku: "AC-002",
    stock: 53,
    status: "active",
    images: productImages.silk_scarf.map((url, i) => ({
      id: `7-${i}`,
      url,
      alt: "Silk-Cashmere Scarf",
      sortOrder: i,
    })),
    tags: ["new"],
    rating: 4.7,
    reviewCount: 45,
    options: [
      { id: "7-c", name: "Color", values: ["Burgundy", "Navy", "Camel", "Grey"] },
    ],
    specs: {
      Material: "70% Cashmere, 30% Silk",
      Dimensions: '80" x 24"',
      Weight: "Lightweight",
      Care: "Dry clean only",
      Origin: "Made in Nepal",
    },
    createdAt: "2024-09-28",
  },
  {
    id: "8",
    title: "Heritage Denim Jacket",
    slug: "heritage-denim-jacket",
    description: "A modern take on the classic denim jacket, made from heavyweight Japanese selvedge denim. Pre-washed for a broken-in feel with beautiful fading potential.",
    category: "Outerwear",
    categorySlug: "outerwear",
    price: 325,
    sku: "OW-002",
    stock: 19,
    status: "active",
    images: productImages.denim_jacket.map((url, i) => ({
      id: `8-${i}`,
      url,
      alt: "Heritage Denim Jacket",
      sortOrder: i,
    })),
    tags: [],
    rating: 4.6,
    reviewCount: 78,
    options: [
      { id: "8-s", name: "Size", values: ["S", "M", "L", "XL"] },
      { id: "8-c", name: "Color", values: ["Indigo", "Washed Black"] },
    ],
    specs: {
      Material: "14oz Japanese selvedge denim",
      Fit: "Regular",
      Closure: "Button front",
      Care: "Cold wash infrequently",
      Origin: "Made in Japan",
    },
    createdAt: "2024-08-05",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Alexander M.",
    rating: 5,
    title: "Absolutely stunning quality",
    body: "This overcoat exceeded all expectations. The wool is incredibly soft, the tailoring is impeccable, and it drapes beautifully. Worth every penny.",
    isVerified: true,
    createdAt: "2024-10-01",
  },
  {
    id: "2",
    productId: "1",
    userName: "Sarah K.",
    rating: 5,
    title: "Investment piece",
    body: "Bought this as an investment piece and I am not disappointed. The attention to detail is remarkable — from the stitching to the buttons to the lining.",
    isVerified: true,
    createdAt: "2024-09-28",
  },
  {
    id: "3",
    productId: "1",
    userName: "James R.",
    rating: 4,
    title: "Great coat, runs slightly large",
    body: "Beautiful coat with excellent construction. I'd recommend sizing down if you're between sizes. The camel color is gorgeous in person.",
    isVerified: true,
    createdAt: "2024-09-25",
  },
  {
    id: "4",
    productId: "2",
    userName: "Emma L.",
    rating: 5,
    title: "Softest sweater I own",
    body: "The cashmere quality is outstanding. It's incredibly warm without being heavy, and the color is exactly as shown. Already planning to buy another color.",
    isVerified: true,
    createdAt: "2024-10-03",
  },
  {
    id: "5",
    productId: "5",
    userName: "Michael T.",
    rating: 5,
    title: "Perfect minimalist sneaker",
    body: "These are the cleanest sneakers I've ever owned. The leather quality is superb and the sole is very comfortable for all-day wear.",
    isVerified: true,
    createdAt: "2024-09-30",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Victoria Chen",
    role: "Creative Director",
    body: "LUXE has completely transformed my wardrobe. Every piece I've purchased has become a staple. The quality is consistently exceptional.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Thomas Brennan",
    role: "Architect",
    body: "Finally, a brand that understands that less is more. The minimalist aesthetic and premium materials make these pieces timeless.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Amelia Foster",
    role: "Editor",
    body: "The attention to detail is what sets LUXE apart. From packaging to product, every touchpoint feels premium and considered.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Daniel Park",
    role: "Photographer",
    body: "I appreciate brands that value craftsmanship. LUXE delivers on that promise with every single piece. My go-to for essentials.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-10001",
    email: "customer@example.com",
    items: [
      { id: "1", productId: "1", title: "Italian Wool Overcoat", image: productImages.wool_coat[0], variant: "Charcoal / M", quantity: 1, unitPrice: 695, lineTotal: 695 },
      { id: "2", productId: "3", title: "Relaxed Linen Shirt", image: productImages.linen_shirt[0], variant: "White / L", quantity: 2, unitPrice: 165, lineTotal: 330 },
    ],
    status: "delivered",
    paymentStatus: "paid",
    subtotal: 1025,
    discount: 0,
    shipping: 0,
    tax: 82,
    total: 1107,
    shippingAddress: { fullName: "John Doe", phone: "+1 555-0123", addressLine1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "United States" },
    createdAt: "2024-09-15",
    updatedAt: "2024-09-20",
  },
  {
    id: "2",
    orderNumber: "ORD-10002",
    email: "jane@example.com",
    items: [
      { id: "3", productId: "2", title: "Cashmere Crewneck Sweater", image: productImages.cashmere_sweater[0], variant: "Ivory / S", quantity: 1, unitPrice: 385, lineTotal: 385 },
    ],
    status: "shipped",
    paymentStatus: "paid",
    subtotal: 385,
    discount: 38.5,
    shipping: 12,
    tax: 27.72,
    total: 386.22,
    shippingAddress: { fullName: "Jane Smith", phone: "+1 555-0456", addressLine1: "456 Oak Ave", city: "Los Angeles", state: "CA", zip: "90001", country: "United States" },
    trackingNumber: "1Z999AA10123456784",
    trackingCarrier: "UPS",
    createdAt: "2024-10-01",
    updatedAt: "2024-10-03",
  },
  {
    id: "3",
    orderNumber: "ORD-10003",
    email: "alex@example.com",
    items: [
      { id: "4", productId: "5", title: "Minimalist Leather Sneakers", image: productImages.sneakers[0], variant: "White / 10", quantity: 1, unitPrice: 295, lineTotal: 295 },
      { id: "5", productId: "7", title: "Silk-Cashmere Scarf", image: productImages.silk_scarf[0], variant: "Navy", quantity: 1, unitPrice: 195, lineTotal: 195 },
    ],
    status: "processing",
    paymentStatus: "paid",
    subtotal: 490,
    discount: 0,
    shipping: 12,
    tax: 40.16,
    total: 542.16,
    shippingAddress: { fullName: "Alex Johnson", phone: "+1 555-0789", addressLine1: "789 Pine St", addressLine2: "Apt 4B", city: "Chicago", state: "IL", zip: "60601", country: "United States" },
    createdAt: "2024-10-05",
    updatedAt: "2024-10-05",
  },
  {
    id: "4",
    orderNumber: "ORD-10004",
    email: "maria@example.com",
    items: [
      { id: "6", productId: "4", title: "Artisan Leather Tote", image: productImages.leather_bag[0], variant: "Tan", quantity: 1, unitPrice: 340, lineTotal: 340 },
    ],
    status: "pending",
    paymentStatus: "pending",
    subtotal: 340,
    discount: 0,
    shipping: 12,
    tax: 28.16,
    total: 380.16,
    shippingAddress: { fullName: "Maria Garcia", phone: "+1 555-0321", addressLine1: "321 Elm St", city: "Miami", state: "FL", zip: "33101", country: "United States" },
    createdAt: "2024-10-06",
    updatedAt: "2024-10-06",
  },
  {
    id: "5",
    orderNumber: "ORD-10005",
    email: "customer@example.com",
    items: [
      { id: "7", productId: "8", title: "Heritage Denim Jacket", image: productImages.denim_jacket[0], variant: "Indigo / L", quantity: 1, unitPrice: 325, lineTotal: 325 },
    ],
    status: "cancelled",
    paymentStatus: "refunded",
    subtotal: 325,
    discount: 0,
    shipping: 12,
    tax: 26.96,
    total: 363.96,
    shippingAddress: { fullName: "John Doe", phone: "+1 555-0123", addressLine1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "United States" },
    createdAt: "2024-10-02",
    updatedAt: "2024-10-04",
  },
];

export const customers: Customer[] = [
  { id: "1", name: "John Doe", email: "customer@example.com", totalOrders: 5, totalSpent: 2850, joinDate: "2024-01-15", status: "active", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", totalOrders: 3, totalSpent: 1245, joinDate: "2024-03-22", status: "active", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { id: "3", name: "Alex Johnson", email: "alex@example.com", totalOrders: 2, totalSpent: 890, joinDate: "2024-05-10", status: "active", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { id: "4", name: "Maria Garcia", email: "maria@example.com", totalOrders: 1, totalSpent: 380, joinDate: "2024-08-01", status: "active", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { id: "5", name: "Robert Wilson", email: "robert@example.com", totalOrders: 8, totalSpent: 4200, joinDate: "2024-02-14", status: "active" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", totalOrders: 0, totalSpent: 0, joinDate: "2024-09-30", status: "inactive" },
];

export const coupons: Coupon[] = [
  { id: "1", code: "WELCOME10", type: "percentage", value: 10, minOrderAmount: 50, usageLimit: 1000, timesUsed: 342, isActive: true, validFrom: "2024-01-01", validTo: "2024-12-31" },
  { id: "2", code: "FREESHIP", type: "fixed", value: 12, minOrderAmount: 150, usageLimit: 500, timesUsed: 128, isActive: true, validFrom: "2024-01-01", validTo: "2024-12-31" },
  { id: "3", code: "SUMMER25", type: "percentage", value: 25, minOrderAmount: 200, usageLimit: 200, timesUsed: 200, isActive: false, validFrom: "2024-06-01", validTo: "2024-08-31" },
];

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => p.categorySlug === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getReviewsByProduct = (productId: string): Review[] => {
  return reviews.filter((r) => r.productId === productId);
};

export const getNewArrivals = (): Product[] => {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
};

