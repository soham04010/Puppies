import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Heart,
  Plane,
  Home,
  Truck,
  CheckCircle2,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | TeddyPups U.A.E.',
  description:
    'Learn how adopting a miniature puppy in Dubai works. Discover our Downtown showroom visits and international VIP import process.'
};

export default function HowItWorksPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
            every puppy is family
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#4a3728] mt-2">
            How it works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6a5340] leading-relaxed">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make your journey joyful, safe, and seamless.
          </p>
        </div>

        {/* Section 1: In-Person Showroom Visits */}
        <section className="mb-24 rounded-3xl border border-[#ebd9c3] bg-white p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2be6b]/30 px-3 py-1 text-xs font-bold text-[#4a3728]">
                <Home className="size-3.5 text-[#4a3728]" />
                <span>Downtown Dubai Showroom</span>
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#4a3728]">
                Meet your puppy in person
              </h2>
              <p className="text-sm text-[#6a5340] leading-relaxed">
                Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We provide a calm, clean, boutique environment where puppies can play and families can bond before deciding.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6a5340]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Bond face-to-face before deciding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Same-day adoption available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Licensed vet health passports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Free doorstep delivery in Dubai</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#fbf7ee] border border-[#ebd9c3] p-8 text-center space-y-4">
              <span className="text-4xl">🏙️</span>
              <h3 className="font-serif text-xl font-bold text-[#4a3728]">Ready to visit?</h3>
              <p className="text-xs text-[#6a5340]">
                Our Downtown Dubai showroom is open daily by appointment to ensure one-on-one attention for every family.
              </p>
              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20book%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a3728] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#6a5340]"
              >
                <MessageCircle className="size-4 text-[#f2be6b]" />
                <span>Book a Showroom Visit</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Order Upon Request (Import) */}
        <section className="mb-24 rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 rounded-2xl bg-white border border-[#ebd9c3] p-8 text-center space-y-4 order-2 lg:order-1">
              <span className="text-4xl">✈️</span>
              <h3 className="font-serif text-xl font-bold text-[#4a3728]">Order Upon Request</h3>
              <p className="text-xs text-[#6a5340]">
                Looking for a specific teacup bloodline, color, or gender? We source rare breeds directly from top Korean &amp; European breeders.
              </p>
              <Link
                href="/puppies?origin=imported"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4a3728] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#6a5340]"
              >
                <span>Browse Imported Pups</span>
                <ArrowRight className="size-4 text-[#f2be6b]" />
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2be6b]/30 px-3 py-1 text-xs font-bold text-[#4a3728]">
                <Plane className="size-3.5 text-[#4a3728]" />
                <span>International VIP Concierge</span>
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#4a3728]">
                Bringing home rare teacup lines
              </h2>
              <p className="text-sm text-[#6a5340] leading-relaxed">
                From Korean teacup poodles to rare Maltese, Pomeranian, and Yorkie lines, we connect you with the world&apos;s finest certified ethical breeders. We manage all travel documentation, pre-departure health checks, and climate-controlled flight transport.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6a5340]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Real photos &amp; videos before travel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Verified pedigree certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Full customs clearance handled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f2be6b]" />
                  <span>Stress-free safe arrival guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Delivery & Collection */}
        <section id="delivery" className="rounded-3xl border border-[#ebd9c3] bg-white p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              safe &amp; secure
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#4a3728] mt-1">
              Delivery &amp; collection
            </h2>
            <p className="mt-2 text-sm text-[#6a5340]">
              We ensure your puppy&apos;s journey home is as comfortable and comforting as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#fffdf8] border border-[#ebd9c3] p-6 text-center">
              <span className="text-3xl mb-3 block">🚗</span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Local Dubai Delivery</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                Enjoy complimentary, climate-controlled doorstep delivery anywhere within Dubai and Abu Dhabi.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffdf8] border border-[#ebd9c3] p-6 text-center">
              <span className="text-3xl mb-3 block">🏢</span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Showroom Collection</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                Collect your puppy directly from our Downtown Dubai showroom, where we provide a welcome starter pack.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffdf8] border border-[#ebd9c3] p-6 text-center">
              <span className="text-3xl mb-3 block">🌍</span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Worldwide Shipping</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                We partner with certified pet travel specialists to deliver puppies safely to loving families across the GCC and internationally.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
