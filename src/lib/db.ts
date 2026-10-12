import { supabase } from "@/lib/supabase";
import {
  products as fallbackProducts,
  categories as fallbackCategories,
  heroSlides as fallbackHeroSlides,
  siteSettings as fallbackSiteSettings,
  testimonials as fallbackTestimonials,
} from "@/lib/mock-data";
import { Product, Category, HeroSlide, SiteSettings } from "@/types";

// Fetch Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
    if (error || !data) return fallbackSiteSettings;
    return {
      siteName: data.site_name,
      tagline: data.tagline,
      logoUrl: data.logo_url || "/logo.svg",
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
      businessAddress: data.business_address,
      currencySymbol: data.currency_symbol,
      socialInstagram: data.social_instagram || "",
      socialFacebook: data.social_facebook || "",
      socialTwitter: data.social_twitter || "",
      announcementBarActive: data.announcement_bar_active,
      announcementBarText: data.announcement_bar_text,
      announcementBarLink: data.announcement_bar_link,
    };
  } catch {
    return fallbackSiteSettings;
  }
}

// Fetch Hero Slides
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackHeroSlides;
    return data.map((d) => ({
      id: d.id,
      image: d.image_url,
      heading: d.heading,
      subheading: d.subheading,
      ctaText: d.cta_text,
      ctaLink: d.cta_link,
    }));
  } catch {
    return fallbackHeroSlides;
  }
}

// Fetch Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*, products(count)")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackCategories;
    return data.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      image: c.image_url || "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
      productCount: c.products?.[0]?.count ?? 12,
    }));
  } catch {
    return fallbackCategories;
  }
}

// Helper to format Supabase product row
function formatProductRow(p: any): Product {
  const images = (p.product_images && p.product_images.length > 0)
    ? p.product_images.map((img: any) => ({
        id: img.id,
        url: img.image_url,
        alt: img.alt_text || p.title,
        sortOrder: img.sort_order || 0,
      }))
    : [
        {
          id: `${p.id}-1`,
          url: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800",
          alt: p.title,
          sortOrder: 0,
        },
      ];

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.categories?.name || "Outerwear",
    categorySlug: p.categories?.slug || "outerwear",
    price: Number(p.price),
    salePrice: p.sale_price ? Number(p.sale_price) : undefined,
    sku: p.sku,
    stock: p.stock_quantity ?? 10,
    status: p.status,
    images,
    tags: p.tags || [],
    rating: 4.8,
    reviewCount: 42,
    specs: p.specs || undefined,
    createdAt: p.created_at,
  };
}

// Fetch Products with optional category & limit
export async function getProducts(options?: {
  categorySlug?: string;
  tag?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    let query = supabase
      .from("products")
      .select("*, categories(name, slug), product_images(id, image_url, alt_text, sort_order)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let filtered = [...fallbackProducts];
      if (options?.categorySlug && options.categorySlug !== "all") {
        filtered = filtered.filter((p) => p.categorySlug === options.categorySlug);
      }
      if (options?.tag) {
        filtered = filtered.filter((p) => p.tags.includes(options.tag!));
      }
      if (options?.limit) {
        filtered = filtered.slice(0, options.limit);
      }
      return filtered;
    }

    let results = data.map(formatProductRow);
    if (options?.categorySlug && options.categorySlug !== "all") {
      results = results.filter((p) => p.categorySlug === options.categorySlug);
    }
    if (options?.tag) {
      results = results.filter((p) => p.tags.includes(options.tag!));
    }
    return results;
  } catch {
    return fallbackProducts;
  }
}

// Fetch Single Product by Slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name, slug), product_images(id, image_url, alt_text, sort_order)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return fallbackProducts.find((p) => p.slug === slug) || null;
    }

    return formatProductRow(data);
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) || null;
  }
}

// Fetch Customer Orders
export async function getUserOrders(userId: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// Newsletter Subscription
export async function subscribeToNewsletter(email: string) {
  try {
    const { error } = await supabase.from("subscribers").insert({ email });
    return { success: !error, error };
  } catch (err: any) {
    return { success: false, error: err };
  }
}

