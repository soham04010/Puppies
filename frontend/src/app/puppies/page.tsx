import React, { Suspense } from 'react';
import { getPuppies } from '@/lib/api';
import PuppiesClient from './PuppiesClient';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Available Puppies | TeddyPups U.A.E.',
  description:
    'Browse our adorable selection of available teacup puppies in Dubai. View photos, breeds, ages, and origins.'
};

export default async function PuppiesPage({
  searchParams
}: {
  searchParams: Promise<{ breed?: string; origin?: string }>;
}) {
  const params = await searchParams;
  const initialBreed = params.breed || 'all';
  const initialOrigin = params.origin || 'all';

  const puppies = await getPuppies();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
            real puppies, real photos
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4a3728] mt-2">
            Available puppies
          </h1>
          <p className="mt-3 text-sm text-[#6a5340] leading-relaxed">
            Every puppy is vaccinated, dewormed, microchipped, and health-certified by licensed UAE veterinarians before joining your family.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-[#6a5340]">Loading puppies...</div>}>
          <PuppiesClient
            initialPuppies={puppies}
            initialBreed={initialBreed}
            initialOrigin={initialOrigin}
          />
        </Suspense>
      </div>
    </div>
  );
}
