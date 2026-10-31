import React from 'react';
import { getFaqs } from '@/lib/api';
import FAQAccordion from '@/components/FAQAccordion';
import LetterForm from '@/components/LetterForm';
import { MessageCircle, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Questions & Answers | TeddyPups U.A.E.',
  description:
    'Frequently asked questions about adopting teacup puppies in Dubai. Health checks, showroom visits, vaccinations, and delivery.'
};

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ebd9c3] bg-white px-4 py-1.5 shadow-xs mb-4">
            <span className="text-sm">🐾</span>
            <span className="font-scrawl text-xs font-semibold uppercase tracking-wider text-[#4a3728]">
              sniff out a question
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#4a3728]">
            Questions &amp; answers
          </h1>
          <p className="mt-4 text-sm text-[#6a5340] max-w-lg mx-auto leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our concierge team is available 24/7.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="https://wa.me/971541676733"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4a3728] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#6a5340]"
            >
              <MessageCircle className="size-4 text-[#f2be6b]" />
              <span>Ask on WhatsApp (+971 54 167 6733)</span>
            </a>
          </div>
        </div>

        {/* Board Meta Badge */}
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-[#6a5340] px-2">
          <span className="font-scrawl text-sm text-[#4a3728]">9 notes on the board</span>
          <span className="text-[11px] bg-[#fbf7ee] px-2.5 py-1 rounded-full border border-[#ebd9c3]">
            Verified Pet Care
          </span>
        </div>

        {/* Accordion List */}
        <FAQAccordion items={faqs} />

        {/* Still have questions? */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              we are here to help
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#4a3728] mt-1">
              Ask your own question
            </h2>
          </div>
          <LetterForm defaultMessage="Hi TeddyPups! I have a question about your puppies:" />
        </div>
      </div>
    </div>
  );
}
