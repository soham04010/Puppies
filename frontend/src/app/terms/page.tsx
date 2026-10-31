import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | TeddyPups U.A.E.',
  description: 'Terms of service and adoption conditions for TeddyPups U.A.E.'
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4a3728] mb-8 text-center">
          Terms of Service
        </h1>
        <div className="rounded-3xl border border-[#ebd9c3] bg-white p-8 sm:p-12 space-y-6 text-sm text-[#6a5340] leading-relaxed">
          <p>
            Welcome to TeddyPups U.A.E. By accessing our website, visiting our showroom, or requesting an adoption consultation, you agree to comply with our terms and ethical adoption guidelines.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#4a3728]">Showroom Consultations</h2>
          <p>
            Showroom appointments are scheduled to provide dedicated one-on-one time for families. We reserve the right to prioritize bookings based on availability.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#4a3728]">Adoption & Reservations</h2>
          <p>
            Reservations for custom imported teacup puppies are secured upon confirmation of consultation. All documentation and veterinary travel paperwork will be shared transparently via WhatsApp prior to travel.
          </p>
        </div>
      </div>
    </div>
  );
}
