'use client';

import React from 'react';

interface FilterBarProps {
  selectedBreed: string;
  onSelectBreed: (breed: string) => void;
  selectedOrigin: string;
  onSelectOrigin: (origin: string) => void;
  totalCount: number;
}

const breeds = [
  { id: 'all', label: 'All Breeds' },
  { id: 'maltipoo', label: 'Maltipoo' },
  { id: 'pomeranian', label: 'Pomeranian' },
  { id: 'poodle', label: 'Poodle' },
  { id: 'cavapoo', label: 'Cavapoo' },
  { id: 'shih-tzu', label: 'Shih Tzu' },
  { id: 'pomsky', label: 'Pomsky' }
];

const origins = [
  { id: 'all', label: 'All Origins' },
  { id: 'local', label: 'Showroom in Dubai' },
  { id: 'imported', label: 'Imported for you' }
];

export default function FilterBar({
  selectedBreed,
  onSelectBreed,
  selectedOrigin,
  onSelectOrigin,
  totalCount
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Breed Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {breeds.map(b => {
          const isSelected = selectedBreed.toLowerCase() === b.id.toLowerCase();
          return (
            <button
              key={b.id}
              onClick={() => onSelectBreed(b.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                isSelected
                  ? 'bg-[#4a3728] text-[#fffdf8] shadow-sm'
                  : 'bg-white border border-[#ebd9c3] text-[#6a5340] hover:bg-[#fbf7ee] hover:text-[#4a3728]'
              }`}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      {/* Origin Pills & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ebd9c3]/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#6a5340] mr-1">Origin:</span>
          {origins.map(o => {
            const isSelected = selectedOrigin.toLowerCase() === o.id.toLowerCase();
            return (
              <button
                key={o.id}
                onClick={() => onSelectOrigin(o.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#f2be6b] text-[#4a3728]'
                    : 'bg-[#fbf7ee] border border-[#ebd9c3] text-[#6a5340] hover:bg-[#ebd9c3]'
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-serif text-[#6a5340] italic">
          Showing {totalCount} {totalCount === 1 ? 'puppy' : 'puppies'}
        </span>
      </div>
    </div>
  );
}
