import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TeddyPups U.A.E.',
  description: 'Privacy policy and data protection for TeddyPups U.A.E.'
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4a3728] mb-8 text-center">
          Privacy Policy
        </h1>
        <div className="rounded-3xl border border-[#ebd9c3] bg-white p-8 sm:p-12 space-y-6 text-sm text-[#6a5340] leading-relaxed">
          <p>
            At TeddyPups U.A.E., we respect your personal privacy. We only collect the necessary contact information (name, phone/WhatsApp number, email, and preferred area) submitted through our letterform or WhatsApp inquiries.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#4a3728]">How We Use Your Information</h2>
          <p>
            Your information is used solely to answer your questions regarding available puppies, coordinate showroom visits, and provide adoption updates. We never sell or share your information with external third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
