'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PuppyGalleryProps {
  images: string[];
  name: string;
}

export default function PuppyGallery({ images, name }: PuppyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images.length > 0 ? images : ['/brand/logo.png'];

  const prev = () => {
    setActiveIndex(current => (current > 0 ? current - 1 : safeImages.length - 1));
  };

  const next = () => {
    setActiveIndex(current => (current < safeImages.length - 1 ? current + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] shadow-sm">
        <Image
          src={safeImages[activeIndex]}
          alt={`${name} photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
          {activeIndex + 1} / {safeImages.length}
        </div>

        {/* Navigation Arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-[#4a3728] backdrop-blur-xs hover:bg-white transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 text-[#4a3728] backdrop-blur-xs hover:bg-white transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                activeIndex === idx ? 'border-[#4a3728] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
