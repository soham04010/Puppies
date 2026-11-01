import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import TwoWaysJourneys from "./TwoWaysJourneys";
import FlightSection from "./FlightSection";
import PupBuddy from "@/components/PupBuddy";

export const metadata: Metadata = {
  title: "How it works — TeddyPups U.A.E.",
  description:
    "Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.",
};

export default function HowItWorksPage() {
  return (
    <div data-page="how" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={
          {
            "--sky-top": "#fffbf3",
            "--sky-bottom": "#f6cc85",
          } as React.CSSProperties
        }
        aria-labelledby="how-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 id="how-title" className="font-plush text-giant md:col-span-7">
              How it works
            </h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed
              from overseas, TeddyPups is here to make the experience
              unforgettable.
            </p>
          </header>

          {/* Quick jump navigation chips */}
          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a
              href="#two-ways"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
            >
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a
              href="#promise"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
            >
              <span className="font-plush text-toffee">2</span> Our premium puppy
              promise
            </a>
            <a
              href="#delivery"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
            >
              <span className="font-plush text-toffee">3</span> Delivery &amp;
              collection
            </a>
            <a
              href="#why"
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
            >
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          {/* Section 1: Two Ways Home (Interactive switch) */}
          <div id="two-ways">
            <TwoWaysJourneys />
          </div>

          {/* Section 2: Puppy Promise Passport Paper */}
          <section
            id="promise"
            aria-labelledby="promise-title"
            className="tp-paper mt-24 -rotate-[0.6deg]"
          >
            <p
              aria-hidden="true"
              className="font-scrawl text-lg text-toffee-ink"
            >
              puppy passport
            </p>
            <h2
              id="promise-title"
              className="font-plush text-huge mt-1 max-w-[16ch]"
            >
              Our premium puppy promise
            </h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <li
                className="tp-entry"
                style={
                  {
                    "--ink-stamp": "#a24a1a",
                    "--tilt": "-8deg",
                    "--i": 0,
                  } as React.CSSProperties
                }
              >
                <span className="tp-stamp tp-stamp--round">
                  <svg
                    viewBox="0 0 64 64"
                    className="tp-stamp__icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 30h7l3-7 4 13 3-6h7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="tp-stamp__title font-plush">
                    Hand-selected breeders
                  </span>
                </span>
                <p className="tp-entry__text">
                  We work only with breeders who uphold the highest ethical and
                  health standards.
                </p>
              </li>

              <li
                className="tp-entry"
                style={
                  {
                    "--ink-stamp": "#1f6b45",
                    "--tilt": "5deg",
                    "--i": 1,
                  } as React.CSSProperties
                }
              >
                <span className="tp-stamp tp-stamp--ticket">
                  <svg
                    viewBox="0 0 64 64"
                    className="tp-stamp__icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 50c10 4 20 4 30 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2 7"
                    />
                  </svg>
                  <span className="tp-stamp__title font-plush">
                    Full transparency
                  </span>
                </span>
                <p className="tp-entry__text">
                  Photos, videos, and health certificates are shared before your
                  puppy travels.
                </p>
              </li>

              <li
                className="tp-entry"
                style={
                  {
                    "--ink-stamp": "#5a3a28",
                    "--tilt": "-4deg",
                    "--i": 2,
                  } as React.CSSProperties
                }
              >
                <span className="tp-stamp tp-stamp--oval">
                  <svg
                    viewBox="0 0 64 64"
                    className="tp-stamp__icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 14h44v28H30l-12 10v-10h-8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 28h0M32 28h0M42 28h0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="tp-stamp__title font-plush">
                    Safe, stress-free delivery
                  </span>
                </span>
                <p className="tp-entry__text">
                  We handle every detail of the import process, so your puppy
                  arrives happy, healthy, and ready to love you.
                </p>
              </li>
            </ul>
          </section>

          {/* Section 3: Delivery & Collection with Flight Animation */}
          <section
            id="delivery"
            aria-labelledby="delivery-title"
            className="mt-24 grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <h2 id="delivery-title" className="font-plush text-huge">
                Delivery &amp; collection
              </h2>
              <p className="text-lede mt-5 text-[var(--ink-soft)]">
                From a same-day visit in Downtown Dubai to a flight from Korea,
                every puppy travels comfortably and arrives safely.
              </p>
              <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Take your puppy home the same day
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    Local puppies are available immediately — visit, fall in love,
                    and go home together.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Delivery within Dubai
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    Prefer to stay home? We deliver your puppy to your door
                    within Dubai, safely and comfortably.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Safe international cargo
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    We handle all the paperwork and ensure comfortable travel so
                    your puppy arrives happy and stress-free.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Worldwide delivery
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    We safely deliver puppies to loving homes all around the
                    world. Our trusted international cargo partners ensure your
                    new furry friend travels comfortably and arrives safely, no
                    matter the distance.
                  </p>
                </li>
              </ul>
            </div>

            <div className="relative h-[clamp(14rem,30vw,22rem)] lg:col-span-6">
              {/* Dubai Skyline SVG Silhouette */}
              <svg
                viewBox="0 0 300 120"
                className="absolute inset-x-0 bottom-0 w-full text-cocoa/25"
                aria-hidden="true"
              >
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Scroll-Driven Airplane Flight Arc */}
              <FlightSection />
            </div>
          </section>

          {/* Section 4: Why choose us */}
          <section
            id="why"
            aria-labelledby="why-title"
            className="mt-24 grid gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <h2 id="why-title" className="font-plush text-huge">
                Why choose us
              </h2>
              <p className="text-lede mt-6 text-[var(--ink-soft)]">
                We&apos;re here to help you find a new family member. From the
                moment you visit our site to the joyful day your puppy arrives
                at your door, we&apos;re with you every step of the way. Our
                mission is to make the entire adoption process smooth,
                transparent, and full of love.
              </p>
            </div>

            <ul className="space-y-8 lg:col-span-6 lg:col-start-7">
              <li className="flex gap-5">
                <svg
                  viewBox="0 0 64 64"
                  className="size-14 shrink-0 text-toffee-deep"
                  aria-hidden="true"
                >
                  <path
                    d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 50c10 4 20 4 30 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2 7"
                  />
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">
                    International cargo
                  </h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    We safely deliver puppies to loving homes all around the
                    world. Our trusted international cargo partners ensure your
                    new furry friend travels comfortably and arrives safely, no
                    matter the distance.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <svg
                  viewBox="0 0 64 64"
                  className="size-14 shrink-0 text-toffee-deep"
                  aria-hidden="true"
                >
                  <path
                    d="M10 14h44v28H30l-12 10v-10h-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 28h0M32 28h0M42 28h0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">Support 24/7</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    Our team is available 24/7 to answer your questions and
                    assist you through every step of the adoption process. From
                    choosing your puppy to post-delivery support — we&apos;re
                    just a message away.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <svg
                  viewBox="0 0 64 64"
                  className="size-14 shrink-0 text-toffee-deep"
                  aria-hidden="true"
                >
                  <path
                    d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 30h7l3-7 4 13 3-6h7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className="font-plush text-[1.7rem]">Health guarantee</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    All our puppies come with a verified health certificate from
                    licensed vets. We ensure every puppy is vaccinated,
                    dewormed, and thoroughly checked before joining your family.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5: Unique and high quality puppies CTA board */}
          <section
            aria-labelledby="care-title"
            className="tp-board mt-24 grid items-center gap-8 md:grid-cols-[1fr_auto] md:!p-12"
          >
            <div>
              <h2 id="care-title" className="font-plush text-big">
                Unique and high quality puppies
              </h2>
              <p className="text-lede measure mt-5 text-cocoa-soft">
                When you choose TeddyPups, you can trust that you&apos;re getting
                a puppy of the highest quality. We also provide guidance and
                support to new pet owners, offering advice on training,
                nutrition, and general care to ensure a smooth transition for
                you and your new furry friend.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Ask us on WhatsApp
                </a>
                <Link className="btn btn-ghost" href="/puppies">
                  See available puppies
                </Link>
              </div>
            </div>

            <PupBuddy
              pose="bow"
              facing="left"
              label="Teddy, ready to play"
              className="mx-auto w-48 md:w-56"
            />
          </section>
        </div>
      </section>
    </div>
  );
}
