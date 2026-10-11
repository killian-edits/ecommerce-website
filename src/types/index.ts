export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  status: "active" | "draft";
  images: ProductImage[];
  tags: string[];
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  options?: ProductOption[];
  specs?: Record<string, string>;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  price?: number;
  stock: number;
  options: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
  createdAt: string;
  avatarUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  trackingNumber?: string;
  trackingCarrier?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  body: string;
  rating: number;
  avatarUrl: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  currencySymbol: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTwitter: string;
  announcementBarActive: boolean;
  announcementBarText: string;
  announcementBarLink: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
  validFrom: string;
  validTo: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  status: "active" | "inactive";
  avatarUrl?: string;
}

