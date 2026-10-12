import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, HeartHandshake } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* Editorial Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[640px] w-full overflow-hidden bg-black text-white flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&fit=crop"
          alt="The Atelier"
          fill
          priority
          className="object-cover object-center brightness-[0.55]"
          sizes="100vw"
        />
        <div className="container-main relative z-10 space-y-4 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/80 font-medium">
            Maison LUXE &bull; Heritage & Vision
          </p>
          <h1 className="font-serif text-neutral-300 text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
            Crafting Longevity Through Architectural Form
          </h1>
          <p className="text-neutral-200 text-sm md:text-base leading-relaxed">
            Founded on the principle that true elegance is quiet, considered,
            and enduring.
          </p>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-secondary-text font-bold">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-text leading-snug">
              Every garment is an intentional dialogue between tactile texture
              and sculpted silhouette.
            </h2>
            <p className="text-secondary-text text-sm leading-relaxed">
              We reject the cycles of disposable fashion in favor of
              generational wardrobe pieces. From raw Mongolian cashmere combed
              ethically at high altitudes to virgin Italian wool milled in
              Biella, our materials are selected for how they age, drape, and
              endure.
            </p>
            <p className="text-secondary-text text-sm leading-relaxed">
              Each piece is created in limited runs with multi-generational
              artisanal partners across Italy, Scotland, France, and Japan.
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&fit=crop"
              alt="Atelier Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="bg-secondary-bg py-20">
        <div className="container-main space-y-12">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <p className="text-caption-sm text-secondary-text uppercase tracking-widest">
              Foundational Commitments
            </p>
            <h2 className="font-serif text-3xl font-bold text-primary-text">
              The Three Tenets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-subtle shadow-card space-y-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-primary-text">
                <Sparkles size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Uncompromising Purity
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed">
                We work strictly with unblended natural fibers: certified virgin
                wools, pure grade-A cashmere, and French flax linen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-subtle shadow-card space-y-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-primary-text">
                <Shield size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Generational Longevity
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed">
                Reinforced seam construction and timeless lines ensure that
                pieces look as relevant a decade from now as the day they were
                first worn.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-subtle shadow-card space-y-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-primary-text">
                <HeartHandshake size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Artisanal Sovereignty
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed">
                We partner with independent European and Japanese family-owned
                mills, guaranteeing fair wages and preserving centuries of
                master tailoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-main text-center space-y-6 max-w-xl mx-auto">
        <h2 className="font-serif text-3xl font-bold text-primary-text">
          Explore the Archive
        </h2>
        <p className="text-secondary-text text-sm">
          Discover our current collection of tailored garments and signature
          accessories.
        </p>
        <div>
          <Link href="/products">
            <Button variant="primary" size="lg">
              <span className="flex items-center gap-2">
                View Collection
                <ArrowRight size={16} />
              </span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
