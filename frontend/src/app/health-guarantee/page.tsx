import React from 'react';
import { ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Guarantee & Veterinary Standards | TeddyPups U.A.E.',
  description:
    'Our comprehensive veterinary health guarantee and commitment to ethical pet adoption in Dubai.'
};

export default function HealthGuaranteePage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ShieldCheck className="size-10 text-[#f2be6b] mx-auto mb-3" />
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4a3728]">
            Our Health Guarantee
          </h1>
          <p className="mt-3 text-sm text-[#6a5340]">
            Every puppy’s well-being is our highest priority.
          </p>
        </div>

        <div className="rounded-3xl border border-[#ebd9c3] bg-white p-8 sm:p-12 space-y-8 shadow-xs text-sm text-[#6a5340] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#4a3728]">1. Licensed Veterinary Certification</h2>
            <p>
              Prior to joining your family, every puppy receives a thorough medical examination from licensed veterinarians in Dubai. Each puppy comes with an official veterinary passport detailing age-appropriate vaccinations and deworming treatments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#4a3728]">2. Viral & Infectious Health Warranty</h2>
            <p>
              We provide a 14-day warranty against common viral conditions (including Parvovirus and Canine Distemper) from the date of physical adoption, provided the puppy is examined by a certified veterinary hospital.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#4a3728]">3. Microchipping & UAE Compliance</h2>
            <p>
              In full compliance with UAE Federal animal welfare regulations, all puppies are microchipped with a globally recognizable 15-digit ISO identification number.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#4a3728]">4. Lifetime Concierge Care</h2>
            <p>
              Our care does not end upon adoption. Our team remains accessible 24/7 on WhatsApp for settling-in assistance, diet transition advice, and grooming recommendations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
