import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews, getPuppies } from '@/lib/api';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Happy Families | TeddyPups U.A.E.',
  description:
    'Read real stories and view photos from loving families who adopted their miniature teacup puppies from TeddyPups in Dubai.'
};

export default async function HappyFamiliesPage() {
  const [reviews, puppies] = await Promise.all([getReviews(), getPuppies()]);

  // Sample puppy photos to showcase alongside stories
  const happyPhotos = puppies.slice(0, 12).map((p, i) => ({
    image: p.images[0] || '/brand/logo.png',
    name: p.name,
    breed: p.breed
  }));

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
            our wall of happy endings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#4a3728] mt-2">
            Happy families
          </h1>
          <p className="mt-4 text-sm text-[#6a5340] leading-relaxed">
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our TeddyPups family across the UAE.
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-3xl border border-[#ebd9c3] bg-white p-7 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-[#f2be6b] mb-4">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#6a5340] italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#fbf7ee]">
                <p className="font-serif text-base font-bold text-[#4a3728]">{rev.author}</p>
                <p className="text-xs text-[#6a5340]">{rev.location}</p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#fbf7ee] border border-[#ebd9c3] px-3 py-1 text-xs font-semibold text-[#4a3728]">
                  <span>🐾 {rev.pet}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Gallery Wall */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              moments of joy
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#4a3728] mt-1">
              Teddy Pups with their forever families
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {happyPhotos.map((item, idx) => (
              <div
                key={idx}
                style={{ position: 'relative' }}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#ebd9c3] bg-[#fbf7ee]"
              >
                <Image
                  src={item.image}
                  alt={`${item.name} in their forever home`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="font-serif font-bold text-sm">{item.name}</p>
                    <p className="text-[11px] opacity-90">{item.breed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] p-10 text-center max-w-3xl mx-auto">
          <Heart className="size-8 fill-[#f2be6b] text-[#f2be6b] mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold text-[#4a3728]">
            Want to bring home your own bundle of joy?
          </h3>
          <p className="text-xs text-[#6a5340] mt-2 max-w-md mx-auto">
            Browse our available litters or talk directly with our puppy concierge today.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/puppies"
              className="rounded-full bg-[#4a3728] px-6 py-3 text-xs font-semibold text-white hover:bg-[#6a5340]"
            >
              Browse Available Puppies
            </Link>
            <a
              href="https://wa.me/971541676733"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#ebd9c3] bg-white px-6 py-3 text-xs font-semibold text-[#4a3728] hover:bg-[#fbf7ee]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
