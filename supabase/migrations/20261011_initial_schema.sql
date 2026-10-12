-- ==============================================================================
-- LUXE E-COMMERCE MASTER DATABASE MIGRATION
-- Tech Stack: Next.js 14 + Supabase + Razorpay
-- Description: Complete 20-table schema, Enums, Constraints, RLS, Storage & Triggers
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('draft', 'active');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE fulfillment_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE coupon_type AS ENUM ('percentage', 'fixed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 3. Core Helper Functions
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 4. Table Definitions
-- ==============================================================================

-- Table 1: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'customer' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 2: site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT DEFAULT 'LUXE' NOT NULL,
    tagline TEXT DEFAULT 'Curated Living, Refined Style',
    logo_url TEXT,
    logo_inverted_url TEXT,
    favicon_url TEXT,
    contact_email TEXT DEFAULT 'concierge@luxe.store',
    contact_phone TEXT DEFAULT '+1 (555) 019-2834',
    business_address TEXT DEFAULT '123 Avenue Montaigne, Paris / 742 Fifth Ave, New York',
    currency_code TEXT DEFAULT 'USD' NOT NULL,
    currency_symbol TEXT DEFAULT '$' NOT NULL,
    tax_rate NUMERIC(5, 2) DEFAULT 8.25 NOT NULL,
    tax_inclusive BOOLEAN DEFAULT false NOT NULL,
    announcement_bar_active BOOLEAN DEFAULT true NOT NULL,
    announcement_bar_text TEXT DEFAULT 'Complimentary global shipping on orders exceeding $150 — Code: FREESHIP',
    announcement_bar_link TEXT DEFAULT '/products',
    announcement_bar_color TEXT DEFAULT '#1A1A1A',
    social_instagram TEXT DEFAULT 'https://instagram.com/luxe',
    social_facebook TEXT DEFAULT 'https://facebook.com/luxe',
    social_twitter TEXT DEFAULT 'https://twitter.com/luxe',
    social_tiktok TEXT,
    social_youtube TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 3: seo_settings
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_title_template TEXT DEFAULT '%s | LUXE Haute Couture & Living',
    default_meta_description TEXT DEFAULT 'Discover architectural garments, Mongolian cashmere, and artisan leather goods.',
    og_default_image_url TEXT,
    ga_tracking_id TEXT,
    fb_pixel_id TEXT,
    search_console_meta TEXT,
    robots_txt TEXT DEFAULT 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://luxe.store/sitemap.xml',
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 4: page_seo
CREATE TABLE IF NOT EXISTS public.page_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT UNIQUE NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT,
    og_image_url TEXT
);

-- Table 5: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sort_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 6: products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    sale_start TIMESTAMPTZ,
    sale_end TIMESTAMPTZ,
    sku TEXT UNIQUE NOT NULL,
    stock_quantity INT DEFAULT 0 NOT NULL,
    track_inventory BOOLEAN DEFAULT true NOT NULL,
    allow_backorders BOOLEAN DEFAULT false NOT NULL,
    status product_status DEFAULT 'active' NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 7: product_images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL,
    alt_text TEXT
);

-- Table 8: product_options
CREATE TABLE IF NOT EXISTS public.product_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Size", "Color"
    sort_order INT DEFAULT 0 NOT NULL
);

-- Table 9: product_option_values
CREATE TABLE IF NOT EXISTS public.product_option_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id UUID NOT NULL REFERENCES public.product_options(id) ON DELETE CASCADE,
    value TEXT NOT NULL, -- e.g. "XL", "Navy"
    sort_order INT DEFAULT 0 NOT NULL
);

-- Table 10: product_variants
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    price NUMERIC(10, 2), -- Price override if different
    stock_quantity INT DEFAULT 0 NOT NULL,
    option_values JSONB NOT NULL, -- array of {option_name: 'Size', value: 'M'}
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 11: addresses
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Sequence for custom order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 10001;

-- Table 12: orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    shipping_method TEXT DEFAULT 'Standard Express',
    shipping_cost NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    tax_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    coupon_code TEXT,
    payment_status payment_status DEFAULT 'pending' NOT NULL,
    fulfillment_status fulfillment_status DEFAULT 'pending' NOT NULL,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    tracking_number TEXT,
    tracking_carrier TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 13: order_items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    image_url TEXT,
    variant_info JSONB,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    line_total NUMERIC(10, 2) NOT NULL
);

-- Table 14: order_timeline
CREATE TABLE IF NOT EXISTS public.order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 15: reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 16: coupons
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    type coupon_type DEFAULT 'percentage' NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    min_order_amount NUMERIC(10, 2) DEFAULT 0.00,
    usage_limit INT,
    per_customer_limit INT DEFAULT 1,
    times_used INT DEFAULT 0 NOT NULL,
    valid_from TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    valid_to TIMESTAMPTZ,
    applicable_products UUID[],
    applicable_categories UUID[],
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 17: subscribers
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 18: hero_slides
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    heading TEXT NOT NULL,
    subheading TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    cta_link TEXT NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- Table 19: wishlist
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (user_id, product_id)
);

-- Table 20: media
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    size INT,
    mime_type TEXT,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 5. Indexes for High Performance
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist(user_id);

-- ==============================================================================
-- 6. Triggers & Automation Functions
-- ==============================================================================

-- A. Auto update updated_at timestamps
CREATE OR REPLACE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER tr_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER tr_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER tr_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE OR REPLACE TRIGGER tr_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- B. Auto-generate Order Number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := 'ORD-' || nextval('order_number_seq')::TEXT;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_orders_order_number
BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- C. Stock Decrement on Order Creation
CREATE OR REPLACE FUNCTION handle_stock_decrement()
RETURNS TRIGGER AS $$
BEGIN
    -- Update main product stock
    UPDATE public.products
    SET stock_quantity = GREATEST(0, stock_quantity - NEW.quantity)
    WHERE id = NEW.product_id AND track_inventory = true;

    -- Update variant stock if applicable
    IF NEW.variant_id IS NOT NULL THEN
        UPDATE public.product_variants
        SET stock_quantity = GREATEST(0, stock_quantity - NEW.quantity)
        WHERE id = NEW.variant_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_order_items_stock
AFTER INSERT ON public.order_items
FOR EACH ROW EXECUTE FUNCTION handle_stock_decrement();

-- D. Increment coupon times_used
CREATE OR REPLACE FUNCTION handle_coupon_usage()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.coupon_code IS NOT NULL AND NEW.coupon_code <> '' THEN
        UPDATE public.coupons
        SET times_used = times_used + 1
        WHERE code = NEW.coupon_code;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_orders_coupon_usage
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION handle_coupon_usage();

-- E. Auto-create Profile record on Supabase auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'customer'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 7. Row Level Security (RLS)
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can view & update their own, Admins can view all
CREATE POLICY "Profiles are viewable by owner and admin" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Publicly viewable catalog & settings
CREATE POLICY "Site settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Site settings admin manage" ON public.site_settings FOR ALL USING (is_admin());

CREATE POLICY "SEO settings public read" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "SEO settings admin manage" ON public.seo_settings FOR ALL USING (is_admin());

CREATE POLICY "Categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Categories admin manage" ON public.categories FOR ALL USING (is_admin());

CREATE POLICY "Products public read" ON public.products FOR SELECT USING (status = 'active' OR is_admin());
CREATE POLICY "Products admin manage" ON public.products FOR ALL USING (is_admin());

CREATE POLICY "Product images public read" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Product images admin manage" ON public.product_images FOR ALL USING (is_admin());

CREATE POLICY "Product options public read" ON public.product_options FOR SELECT USING (true);
CREATE POLICY "Product options admin manage" ON public.product_options FOR ALL USING (is_admin());

CREATE POLICY "Product option values public read" ON public.product_option_values FOR SELECT USING (true);
CREATE POLICY "Product option values admin manage" ON public.product_option_values FOR ALL USING (is_admin());

CREATE POLICY "Product variants public read" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Product variants admin manage" ON public.product_variants FOR ALL USING (is_admin());

CREATE POLICY "Hero slides public read" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Hero slides admin manage" ON public.hero_slides FOR ALL USING (is_admin());

-- Addresses: User can CRUD own addresses
CREATE POLICY "Users can manage own addresses" ON public.addresses
    FOR ALL USING (auth.uid() = user_id);

-- Orders & Order Items
CREATE POLICY "Users can read own orders, admin all" ON public.orders
    FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Anyone can create order" ON public.orders
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update orders" ON public.orders
    FOR UPDATE USING (is_admin());

CREATE POLICY "Users can read own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR is_admin())
        )
    );
CREATE POLICY "Order items insertable" ON public.order_items
    FOR INSERT WITH CHECK (true);

-- Reviews
CREATE POLICY "Reviews public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users insert reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can delete reviews" ON public.reviews
    FOR DELETE USING (is_admin());

-- Coupons
CREATE POLICY "Coupons public read active" ON public.coupons FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY "Admins manage coupons" ON public.coupons FOR ALL USING (is_admin());

-- Newsletter Subscribers
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read subscribers" ON public.subscribers FOR SELECT USING (is_admin());

-- Wishlist
CREATE POLICY "Users manage own wishlist" ON public.wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Media
CREATE POLICY "Media public read" ON public.media FOR SELECT USING (true);
CREATE POLICY "Admins manage media" ON public.media FOR ALL USING (is_admin());

-- ==============================================================================
-- 8. Storage Buckets (Execute via Supabase Storage API or SQL Storage schema)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-assets', 'brand-assets', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('media-library', 'media-library', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', false) ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin Upload Product Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Public Read Brand Assets" ON storage.objects FOR SELECT USING (bucket_id = 'brand-assets');
CREATE POLICY "Admin Upload Brand Assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'brand-assets' AND is_admin());

CREATE POLICY "Public Read Media Library" ON storage.objects FOR SELECT USING (bucket_id = 'media-library');
CREATE POLICY "Admin Upload Media Library" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media-library' AND is_admin());

CREATE POLICY "User Manage Own Avatar" ON storage.objects FOR ALL USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

