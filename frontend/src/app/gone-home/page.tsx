import React from 'react';
import { getGoneHomePuppies } from '@/lib/api';
import PuppyCard from '@/components/PuppyCard';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gone Home | TeddyPups U.A.E.',
  description:
    'Explore our alumni puppies who have happily transitioned into their forever homes across Dubai and the UAE.'
};

export default async function GoneHomePage() {
  const alumniPuppies = await getGoneHomePuppies();

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ebd9c3] bg-white px-4 py-1.5 shadow-xs mb-4">
            <Heart className="size-3.5 fill-[#f2be6b] text-[#f2be6b]" />
            <span className="font-scrawl text-xs font-semibold uppercase tracking-wider text-[#4a3728]">
              happily settled
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#4a3728]">
            Gone home
          </h1>
          <p className="mt-4 text-sm text-[#6a5340] leading-relaxed">
            These precious little ones have already joined their forever families. Take a look at the beloved breeds we have placed in Dubai homes!
          </p>
        </div>

        {/* Puppies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumniPuppies.map(puppy => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] p-10 text-center max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-[#4a3728]">
            Looking for an available pup?
          </h3>
          <p className="text-xs text-[#6a5340] mt-2">
            We regularly update our available puppies with new healthy litters.
          </p>
          <div className="mt-6">
            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 rounded-full bg-[#4a3728] px-8 py-3.5 text-xs font-semibold text-white hover:bg-[#6a5340] transition-colors"
            >
              <span>See available puppies</span>
              <ArrowRight className="size-4 text-[#f2be6b]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
