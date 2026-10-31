'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#ebd9c3] bg-white transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#fbf7ee]"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#fbf7ee] text-xs font-serif font-bold text-[#4a3728] border border-[#ebd9c3]">
                  ?
                </span>
                <span className="font-serif text-base font-semibold text-[#4a3728]">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`size-5 text-[#6a5340] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#4a3728]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-[#fbf7ee] bg-[#fffdf8] px-6 py-4">
                <p className="text-sm leading-relaxed text-[#6a5340] pl-10">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
