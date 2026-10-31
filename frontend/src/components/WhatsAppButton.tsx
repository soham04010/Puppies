'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {hovered && (
        <div className="hidden sm:block rounded-full border border-[#ebd9c3] bg-white px-4 py-2 text-xs font-medium text-[#4a3728] shadow-lg animate-fade-in">
          Chat with concierge on WhatsApp 🐾
        </div>
      )}
      <a
        href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20available%20puppies."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="size-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
