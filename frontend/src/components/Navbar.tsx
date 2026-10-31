'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X, Phone, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/puppies', label: 'Puppies' },
  { href: '/happy-families', label: 'Happy families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Visit & contact' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#4a3728] py-1.5 text-center text-xs tracking-wider text-[#fffdf8]">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <Heart className="size-3 fill-[#f2be6b] text-[#f2be6b]" />
          <span>every puppy is family</span>
          <Heart className="size-3 fill-[#f2be6b] text-[#f2be6b]" />
        </p>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'bg-[#fffdf8]/95 shadow-sm backdrop-blur-md' : 'bg-[#fffdf8]'
        } border-b border-[#ebd9c3]`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative h-12 w-12 overflow-hidden rounded-full border border-[#ebd9c3] bg-white shadow-xs transition-transform group-hover:scale-105"
              style={{ position: 'relative' }}
            >
              <Image
                src="/brand/logo.png"
                alt="TeddyPups U.A.E. Logo"
                fill
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-[#4a3728]">
                TeddyPups
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#6a5340]">
                U.A.E. • Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#e5a84b] relative py-1 ${
                    active ? 'text-[#4a3728] font-semibold' : 'text-[#6a5340]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#f2be6b]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4a3728] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#fffdf8] shadow-sm transition-all hover:bg-[#6a5340] hover:shadow-md active:scale-95"
            >
              <MessageCircle className="size-4 text-[#f2be6b]" />
              <span>WhatsApp us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center rounded-xl border border-[#ebd9c3] p-2 text-[#4a3728] hover:bg-[#fbf7ee]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#fffdf8] px-6 py-6 md:hidden">
          <div className="flex items-center justify-between border-b border-[#ebd9c3] pb-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#4a3728]">TeddyPups</span>
              <span className="text-xs text-[#6a5340] italic font-scrawl">where to, friend?</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-[#ebd9c3] p-2 text-[#4a3728] hover:bg-[#fbf7ee]"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-col gap-5 py-8">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl font-serif transition-colors ${
                    active ? 'font-bold text-[#4a3728]' : 'text-[#6a5340]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto border-t border-[#ebd9c3] pt-6 flex flex-col gap-3">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#4a3728] py-3 text-sm font-semibold text-[#fffdf8]"
            >
              <MessageCircle className="size-4 text-[#f2be6b]" />
              <span>WhatsApp: +971 54 167 6733</span>
            </a>
            <a
              href="tel:+971541676733"
              className="flex items-center justify-center gap-2 rounded-full border border-[#ebd9c3] bg-white py-3 text-sm font-semibold text-[#4a3728]"
            >
              <Phone className="size-4" />
              <span>Call Showroom</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
