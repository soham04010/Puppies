import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPuppies, getFaqs, getReviews } from '@/lib/api';
import PuppyCard from '@/components/PuppyCard';
import FAQAccordion from '@/components/FAQAccordion';
import LetterForm from '@/components/LetterForm';
import TwoWaysSection from '@/components/TwoWaysSection';
import JourneySection from '@/components/JourneySection';
import {
  MessageCircle,
  ShieldCheck,
  Heart,
  Plane,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Home
} from 'lucide-react';

export default async function HomePage() {
  const [featuredPuppies, faqs, reviews] = await Promise.all([
    getFeaturedPuppies(),
    getFaqs(),
    getReviews()
  ]);

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-radial from-[#fbf7ee] to-[#fffdf8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ebd9c3] bg-white px-4 py-1.5 shadow-xs mb-6">
            <span className="text-sm">🐾</span>
            <span className="font-scrawl text-xs font-semibold uppercase tracking-wider text-[#4a3728]">
              every puppy is family
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#4a3728] max-w-4xl mx-auto leading-[1.1]">
            Premium teacup <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#e5a84b]">puppies</span> in Dubai
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#6a5340] max-w-2xl mx-auto leading-relaxed">
            Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed imported from trusted international breeders.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 rounded-full bg-[#4a3728] px-8 py-4 text-sm font-semibold text-white shadow-md hover:bg-[#6a5340] hover:shadow-lg active:scale-95 transition-all"
            >
              <span>View available puppies</span>
              <ArrowRight className="size-4 text-[#f2be6b]" />
            </Link>

            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#ebd9c3] bg-white px-8 py-4 text-sm font-semibold text-[#4a3728] shadow-xs hover:bg-[#fbf7ee] active:scale-95 transition-all"
            >
              <MessageCircle className="size-4 text-[#f2be6b]" />
              <span>WhatsApp us</span>
            </a>
          </div>

          {/* Key Value Prop Icons */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/60 border border-[#ebd9c3]/60 backdrop-blur-xs">
              <ShieldCheck className="size-6 text-[#f2be6b] mb-2" />
              <span className="font-serif text-sm font-bold text-[#4a3728]">Vet Certified</span>
              <span className="text-[11px] text-[#6a5340]">Licensed health checks</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/60 border border-[#ebd9c3]/60 backdrop-blur-xs">
              <Home className="size-6 text-[#f2be6b] mb-2" />
              <span className="font-serif text-sm font-bold text-[#4a3728]">Dubai Showroom</span>
              <span className="text-[11px] text-[#6a5340]">Meet puppies in person</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/60 border border-[#ebd9c3]/60 backdrop-blur-xs">
              <Plane className="size-6 text-[#f2be6b] mb-2" />
              <span className="font-serif text-sm font-bold text-[#4a3728]">Korean Imports</span>
              <span className="text-[11px] text-[#6a5340]">Rare ethical teacup lines</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/60 border border-[#ebd9c3]/60 backdrop-blur-xs">
              <Heart className="size-6 text-[#f2be6b] mb-2" />
              <span className="font-serif text-sm font-bold text-[#4a3728]">24/7 Guidance</span>
              <span className="text-[11px] text-[#6a5340]">Lifelong settling advice</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PUPPIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              Ready for loving homes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4a3728] mt-1">
              Meet the pups
            </h2>
            <p className="text-sm text-[#6a5340] mt-1">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>
          <Link
            href="/puppies"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4a3728] hover:text-[#e5a84b] transition-colors"
          >
            <span>See all available puppies</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPuppies.slice(0, 8).map(puppy => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>
      </section>

      {/* 3. TWO WAYS TO MEET YOUR PUPPY (Interactive Wooden Fork & Bobbing Flight) */}
      <TwoWaysSection />

      {/* 4. FOUR-STEP PUPPY JOURNEY (Interactive WhatsApp Phone Simulator) */}
      <JourneySection />

      {/* 5. HAPPY FAMILIES TESTIMONIALS */}
      <section className="bg-[#fbf7ee] py-20 border-y border-[#ebd9c3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              Our wall of happy endings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4a3728] mt-1">
              Happy families & puppies
            </h2>
            <p className="text-sm text-[#6a5340] mt-1">
              Nothing makes us happier than seeing our puppies in their forever homes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-2xl border border-[#ebd9c3] bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#f2be6b] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-[#6a5340] italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#fbf7ee]">
                  <p className="font-serif text-sm font-bold text-[#4a3728]">{rev.author}</p>
                  <p className="text-[11px] text-[#6a5340]">{rev.location}</p>
                  <span className="mt-1 inline-block rounded-full bg-[#fbf7ee] px-2 py-0.5 text-[10px] font-semibold text-[#4a3728]">
                    {rev.pet}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/happy-families"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#4a3728] hover:text-[#e5a84b]"
            >
              <span>View full photo gallery of happy families</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ PREVIEW */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
            sniff out a question
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4a3728] mt-1">
            Questions, answered
          </h2>
          <p className="text-sm text-[#6a5340] mt-1">
            Everything you need to know about adopting from TeddyPups.
          </p>
        </div>

        <FAQAccordion items={faqs.slice(0, 5)} />

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#4a3728] hover:text-[#e5a84b]"
          >
            <span>View all questions & answers</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* 7. BOTTOM BANNER & LETTERFORM */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4a3728]">
            Ready to meet your new best friend?
          </h2>
          <p className="text-sm text-[#6a5340] mt-2">
            Write to us below or start an instant chat on WhatsApp.
          </p>
        </div>

        <LetterForm />
      </section>
    </div>
  );
}
