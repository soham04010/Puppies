import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#ebd9c3] bg-[#fbf7ee] text-[#4a3728]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#ebd9c3] bg-white p-1">
                <Image
                  src="/brand/logo.png"
                  alt="TeddyPups Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl font-bold text-[#4a3728]">TeddyPups</span>
            </div>
            <p className="font-serif italic text-sm text-[#4a3728]/80">Home, at last.</p>
            <p className="text-xs leading-relaxed text-[#6a5340]">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#4a3728]">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#6a5340]">
              <li>
                <Link href="/puppies" className="hover:text-[#4a3728] transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link href="/gone-home" className="hover:text-[#4a3728] transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link href="/happy-families" className="hover:text-[#4a3728] transition-colors">
                  Happy families
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#4a3728] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#delivery" className="hover:text-[#4a3728] transition-colors">
                  Delivery & collection
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#4a3728] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#4a3728] transition-colors">
                  Visit & contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#4a3728]">Say hello</h3>
            <ul className="mt-4 space-y-3 text-xs text-[#6a5340]">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="size-4 shrink-0 text-[#f2be6b]" />
                <a
                  href="https://wa.me/971541676733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4a3728] transition-colors font-medium"
                >
                  WhatsApp: +971 54 167 6733
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="size-4 shrink-0 text-[#f2be6b]" />
                <a
                  href="mailto:concierge@teddypups.ae"
                  className="hover:text-[#4a3728] transition-colors"
                >
                  concierge@teddypups.ae
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-[#f2be6b]" />
                <span>Downtown Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-serif text-base font-semibold text-[#4a3728]">Follow the Pups</h3>
            <p className="mt-4 text-xs text-[#6a5340]">
              Catch real daily moments of our joyful puppies playing in Dubai.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/teddypups.worldwide/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#ebd9c3] bg-white text-[#4a3728] hover:bg-[#f2be6b] hover:text-[#4a3728] transition-all"
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
                className="flex size-9 items-center justify-center rounded-full border border-[#ebd9c3] bg-white text-[#4a3728] hover:bg-[#f2be6b] hover:text-[#4a3728] transition-all"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold font-serif">TT</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61567496944539"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#ebd9c3] bg-white text-[#4a3728] hover:bg-[#f2be6b] hover:text-[#4a3728] transition-all"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold font-serif">FB</span>
              </a>
            </div>
            <div className="mt-6 rounded-xl border border-[#ebd9c3] bg-white/70 p-3 text-[11px] text-[#6a5340]">
              <span className="font-semibold text-[#4a3728]">Showroom Hours:</span>
              <p>Daily 10:00 AM – 9:00 PM (By Appointment)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#ebd9c3] pt-8 text-center text-xs text-[#6a5340] sm:flex-row">
          <p>© 2026 TeddyPups U.A.E. All rights reserved.</p>
          <p className="flex items-center gap-1 font-scrawl text-sm text-[#4a3728]">
            <Heart className="size-3 fill-[#f2be6b] text-[#f2be6b]" />
            every puppy is family
          </p>
        </div>
      </div>
    </footer>
  );
}
