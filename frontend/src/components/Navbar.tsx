"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let prevY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const curY = window.scrollY;
      header.dataset.scrolled = curY > 8 ? "true" : "false";

      if (Math.abs(curY - prevY) > 6) {
        header.dataset.hidden = curY > prevY && curY > 220 ? "true" : "false";
        prevY = curY;
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    const onFocusIn = () => {
      header.dataset.hidden = "false";
    };

    onScroll();
    window.addEventListener("scroll", requestTick, { passive: true });
    header.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", requestTick);
      header.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  // Section spy on homepage
  useEffect(() => {
    if (!isHome) return;

    const handleSpy = () => {
      const sections = [
        { id: "hero", href: "/" },
        { id: "meet", href: "/puppies" },
        { id: "paths", href: "/how-it-works" },
        { id: "chat", href: "/how-it-works" },
        { id: "dusk", href: "/happy-families" },
        { id: "questions", href: "/faq" },
        { id: "cta", href: "/contact" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id) || document.querySelector(`[data-section="${sections[i].id}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveHref(sections[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleSpy);
  }, [isHome]);

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        data-scrolled="false"
        data-hidden="false"
        data-home={isHome ? "true" : undefined}
        className="tp-header fixed inset-x-0 top-0 z-50"
      >
        <div className="tp-header__bar gutter">
          <Link className="tp-header__brand" aria-label="TeddyPups U.A.E. — home" href="/">
            <Image
              alt="TeddyPups"
              width={56}
              height={56}
              className="tp-header__logo"
              src="/brand/logo.png"
              priority
            />
            <span className="font-plush tp-header__name">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="tp-header__nav">
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive ? "true" : "false"}
                      className="tp-nav-link"
                    >
                      <span>{item.label}</span>
                      <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true" fill="currentColor">
                        <path d={PAW_PATH} />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tp-header__actions">
            <a
              className="btn btn-whatsapp"
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>

            <button
              type="button"
              className="tp-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="tp-burger__bun tp-burger__bun--top"></span>
              <span className="tp-burger__bun tp-burger__bun--mid"></span>
              <span className="tp-burger__bun tp-burger__bun--bot"></span>
            </button>
          </div>
        </div>

        {/* Scalloped hem SVG border that appears on scroll */}
        <svg className="tp-header__hem" width="100%" height="24" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-hem" width="48" height="24" patternUnits="userSpaceOnUse">
              <path d="M0 0v14a24 10 0 0 0 48 0V0Z" className="tp-header__hem-fill"></path>
              <path d="M0 14a24 10 0 0 0 48 0" className="tp-header__hem-line"></path>
            </pattern>
          </defs>
          <rect width="100%" height="24" fill="url(#tp-hem)"></rect>
        </svg>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#fffdf8] p-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-6 text-xl font-bold font-serif text-[#4a3728]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#c2622b] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 border-t border-[#ebd9c3] pt-6">
            <a
              href="https://wa.me/971541676733"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full text-center"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
