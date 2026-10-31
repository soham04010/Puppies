import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Puppy } from '@/types';
import { Heart, Sparkles, MapPin } from 'lucide-react';

interface PuppyCardProps {
  puppy: Puppy;
}

export default function PuppyCard({ puppy }: PuppyCardProps) {
  // Use first image or fallback
  const primaryImage = puppy.images?.[0] || '/media/placeholder.jpg';

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#ebd9c3] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#fbf7ee]">
        <Image
          src={primaryImage}
          alt={puppy.title || `${puppy.name} - ${puppy.breed}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-xs ${
              puppy.status === 'Gone Home'
                ? 'bg-[#4a3728] text-white'
                : 'bg-white/90 text-[#4a3728] backdrop-blur-xs'
            }`}
          >
            {puppy.status === 'Gone Home' ? 'Gone Home' : 'Available'}
          </span>
        </div>

        {/* Origin Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fffdf8]/90 px-2.5 py-0.5 text-[11px] font-medium text-[#6a5340] backdrop-blur-xs">
            <MapPin className="size-3 text-[#f2be6b]" />
            <span className="truncate max-w-[140px]">{puppy.origin}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f2be6b] px-2.5 py-0.5 text-[11px] font-bold text-[#4a3728]">
            {puppy.gender}
          </span>
        </div>
      </div>

      {/* Details Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#4a3728] transition-colors group-hover:text-[#e5a84b]">
              {puppy.name}
            </h3>
            <p className="text-xs font-medium text-[#6a5340]">{puppy.breed}</p>
          </div>
          <span className="rounded-full bg-[#fbf7ee] px-2.5 py-1 text-[11px] font-semibold text-[#4a3728] border border-[#ebd9c3]">
            {puppy.age}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-[#fbf7ee] flex items-center justify-between text-xs">
          <span className="font-scrawl text-sm text-[#4a3728]">View details</span>
          <span className="inline-flex items-center justify-center size-8 rounded-full bg-[#fbf7ee] text-[#4a3728] group-hover:bg-[#4a3728] group-hover:text-white transition-colors">
            🐾
          </span>
        </div>
      </div>
    </Link>
  );
}
