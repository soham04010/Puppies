'use client';

import React, { useState, useMemo } from 'react';
import { Puppy } from '@/types';
import PuppyCard from '@/components/PuppyCard';
import FilterBar from '@/components/FilterBar';

interface PuppiesClientProps {
  initialPuppies: Puppy[];
  initialBreed?: string;
  initialOrigin?: string;
}

export default function PuppiesClient({
  initialPuppies,
  initialBreed = 'all',
  initialOrigin = 'all'
}: PuppiesClientProps) {
  const [selectedBreed, setSelectedBreed] = useState(initialBreed);
  const [selectedOrigin, setSelectedOrigin] = useState(initialOrigin);

  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter(p => {
      // Breed match
      if (selectedBreed !== 'all') {
        if (!p.breed.toLowerCase().includes(selectedBreed.toLowerCase())) {
          return false;
        }
      }
      // Origin match
      if (selectedOrigin !== 'all') {
        const originLower = p.origin.toLowerCase();
        if (selectedOrigin === 'local') {
          if (!originLower.includes('dubai') && !originLower.includes('local') && !originLower.includes('showroom')) {
            return false;
          }
        } else if (selectedOrigin === 'imported') {
          if (!originLower.includes('import') && !originLower.includes('korea')) {
            return false;
          }
        }
      }
      return true;
    });
  }, [initialPuppies, selectedBreed, selectedOrigin]);

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="rounded-2xl border border-[#ebd9c3] bg-white p-6 shadow-xs">
        <FilterBar
          selectedBreed={selectedBreed}
          onSelectBreed={setSelectedBreed}
          selectedOrigin={selectedOrigin}
          onSelectOrigin={setSelectedOrigin}
          totalCount={filteredPuppies.length}
        />
      </div>

      {/* Puppies Grid */}
      {filteredPuppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPuppies.map(puppy => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] p-12 text-center">
          <span className="text-3xl">🐾</span>
          <h3 className="mt-3 font-serif text-xl font-bold text-[#4a3728]">
            No puppies found for this selection
          </h3>
          <p className="mt-2 text-xs text-[#6a5340]">
            We regularly receive new litters from our trusted breeders. Try resetting filters or chat with us on WhatsApp to request this breed!
          </p>
          <button
            onClick={() => {
              setSelectedBreed('all');
              setSelectedOrigin('all');
            }}
            className="mt-6 rounded-full bg-[#4a3728] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#6a5340]"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
