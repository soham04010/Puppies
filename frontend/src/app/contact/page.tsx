import React from 'react';
import LetterForm from '@/components/LetterForm';
import { MessageCircle, Mail, MapPin, Clock, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visit & Contact | TeddyPups U.A.E.',
  description:
    'Visit our Downtown Dubai showroom or contact TeddyPups on WhatsApp. Book an appointment to meet our teacup puppies.'
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
            say hello
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#4a3728] mt-2">
            Get in touch with us
          </h1>
          <p className="mt-4 text-sm text-[#6a5340] leading-relaxed">
            Whether you want to visit our Downtown Dubai showroom, ask about an available puppy, or learn about our international import service, we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Card */}
            <div className="rounded-3xl border border-[#ebd9c3] bg-white p-6 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                  <MessageCircle className="size-6 fill-white" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#4a3728]">WhatsApp Concierge</h3>
                  <p className="text-xs text-[#6a5340]">Instant replies &amp; live video calls</p>
                  <a
                    href="https://wa.me/971541676733"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-[#4a3728] hover:text-[#e5a84b] underline"
                  >
                    +971 54 167 6733
                  </a>
                </div>
              </div>
            </div>

            {/* Showroom Location Card */}
            <div className="rounded-3xl border border-[#ebd9c3] bg-white p-6 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#fbf7ee] text-[#4a3728] border border-[#ebd9c3]">
                  <MapPin className="size-6 text-[#f2be6b]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#4a3728]">Downtown Dubai Showroom</h3>
                  <p className="text-xs text-[#6a5340]">Downtown Dubai, United Arab Emirates</p>
                  <p className="mt-1 text-[11px] font-medium text-[#6a5340]">Daily 10:00 AM – 9:00 PM (By Appointment)</p>
                </div>
              </div>
            </div>

            {/* Email & Phone Card */}
            <div className="rounded-3xl border border-[#ebd9c3] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#6a5340]">
                <Mail className="size-4 text-[#f2be6b] shrink-0" />
                <span>concierge@teddypups.ae</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6a5340]">
                <Phone className="size-4 text-[#f2be6b] shrink-0" />
                <span>+971 54 167 6733</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-3xl border border-[#ebd9c3] bg-[#fbf7ee] p-6 text-center">
              <span className="font-serif text-sm font-bold text-[#4a3728]">Follow our journey</span>
              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href="https://www.instagram.com/teddypups.worldwide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white border border-[#ebd9c3] text-[#4a3728] hover:bg-[#4a3728] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@teddypupsuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white border border-[#ebd9c3] text-[#4a3728] hover:bg-[#4a3728] hover:text-white transition-colors text-xs font-serif font-bold"
                >
                  TT
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567496944539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white border border-[#ebd9c3] text-[#4a3728] hover:bg-[#4a3728] hover:text-white transition-colors text-xs font-serif font-bold"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: LetterForm */}
          <div className="lg:col-span-7">
            <LetterForm defaultMessage="Hi TeddyPups, I'd love to schedule a visit to your Downtown Dubai showroom!" />
          </div>
        </div>
      </div>
    </div>
  );
}
