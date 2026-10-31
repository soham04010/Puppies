"use client";

import React from "react";
import Image from "next/image";
import LetterForm from "@/components/LetterForm";

export default function ContactPage() {
  return (
    <div data-page="contact" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{ "--sky-top": "#fff9ee", "--sky-bottom": "#f9dca4" } as React.CSSProperties}
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 id="contact-title" className="font-plush text-giant max-w-[12ch] lg:col-span-7">
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Right column: Interactive Stationery Letterform */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <LetterForm />
            </div>

            {/* Left column: Visit information and Google Maps */}
            <div className="flex flex-col gap-8 lg:col-span-5 lg:row-start-1">
              <div className="rounded-3xl border border-[#ebd9c3] bg-white/80 p-8 shadow-xs">
                <span className="font-scrawl text-sm text-[#c2622b] uppercase tracking-wider font-semibold">
                  Visit our showroom
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#4a3728] mt-2">
                  Downtown Dubai
                </h2>
                <p className="mt-3 text-sm text-[#6a5340] leading-relaxed">
                  Meet our healthy, playful puppies in person in a calm, welcoming environment. We are open daily by appointment.
                </p>

                <div className="mt-6 space-y-3 text-xs text-[#6a5340]">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-[#4a3728]">Hours:</span> Daily 10:00 AM – 9:00 PM (By Appointment)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-[#4a3728]">Location:</span> Downtown Dubai, United Arab Emirates
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-[#4a3728]">WhatsApp:</span>
                    <a
                      href="https://wa.me/971541676733"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#4a3728] hover:text-[#c2622b] underline"
                    >
                      +971 54 167 6733
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-[#4a3728]">Email:</span>
                    <a
                      href="mailto:concierge@teddypups.ae"
                      className="font-medium text-[#4a3728] hover:text-[#c2622b] underline"
                    >
                      concierge@teddypups.ae
                    </a>
                  </p>
                </div>

                <a
                  href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-6 !bg-white"
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Showroom Photo Card */}
              <div className="overflow-hidden rounded-3xl border border-[#ebd9c3] bg-white shadow-xs">
                <div className="relative aspect-4/3 w-full">
                  <Image
                    alt="Apricot teddy bear puppy held up in showroom"
                    src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-scrawl text-sm text-[#4a3728]">
                    every puppy is family
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
