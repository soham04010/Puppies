"use client";

import React, { useState, useRef, useEffect } from "react";
import PupBuddy from "@/components/PupBuddy";

const TINT_COLORS = ["#fbe3b4", "#fde6de", "#e3f0fb", "#e6f2df"];
const STROKE_ATTRS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEP_ICONS: Record<string, React.ReactNode[]> = {
  local: [
    <svg key="find" viewBox="0 0 48 48">
      <circle cx="21" cy="21" r="12" {...STROKE_ATTRS} />
      <path d="m30 30 10 10" {...STROKE_ATTRS} />
      <path
        d="M21 27c-3-2-4.4-3.6-4.4-5.2a2.2 2.2 0 0 1 4.4-.4 2.2 2.2 0 0 1 4.4.4c0 1.6-1.4 3.2-4.4 5.2z"
        fill="currentColor"
      />
    </svg>,
    <svg key="choose" viewBox="0 0 48 48">
      <path
        d="M24 40C11 31 6 24.5 6 17.8 6 12.4 10.2 8 15.4 8c3.7 0 6.8 2.1 8.6 5.3C25.8 10.1 28.9 8 32.6 8 37.8 8 42 12.4 42 17.8 42 24.5 37 31 24 40z"
        {...STROKE_ATTRS}
      />
      <path d="m17 22 5 5 9-10" {...STROKE_ATTRS} />
    </svg>,
    <svg key="meet" viewBox="0 0 48 48">
      <path
        d="M14 18c-3-6-1-10 3-10s5 4 4 8M34 18c3-6 1-10-3-10s-5 4-4 8"
        {...STROKE_ATTRS}
      />
      <ellipse cx="24" cy="27" rx="13" ry="12" {...STROKE_ATTRS} />
      <circle cx="19.5" cy="25" r="1.6" fill="currentColor" />
      <circle cx="28.5" cy="25" r="1.6" fill="currentColor" />
      <path
        d="M22 31h4l-2 2z"
        {...STROKE_ATTRS}
        fill="currentColor"
        strokeWidth={1.6}
      />
    </svg>,
    <svg key="home" viewBox="0 0 48 48">
      <path d="M5 30V18h22v12M27 22h8l6 6v2H27" {...STROKE_ATTRS} />
      <path d="M5 30h36" {...STROKE_ATTRS} />
      <circle cx="13" cy="33" r="3.4" {...STROKE_ATTRS} />
      <circle cx="34" cy="33" r="3.4" {...STROKE_ATTRS} />
      <path
        d="M16 26c-2.3-1.6-3.4-2.8-3.4-4a1.7 1.7 0 0 1 3.4-.4 1.7 1.7 0 0 1 3.4.4c0 1.2-1.1 2.4-3.4 4z"
        fill="currentColor"
      />
    </svg>,
  ],
  imported: [
    <svg key="reserve" viewBox="0 0 48 48">
      <rect x="7" y="10" width="34" height="30" rx="5" {...STROKE_ATTRS} />
      <path d="M7 19h34M16 6v8M32 6v8" {...STROKE_ATTRS} />
      <path d="m17 29 5 5 9-9" {...STROKE_ATTRS} />
    </svg>,
    <svg key="consult" viewBox="0 0 48 48">
      <path
        d="M6 12a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-9l-6 5v-5h-1a5 5 0 0 1-5-5z"
        {...STROKE_ATTRS}
      />
      <path
        d="M36 17h1a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-1v5l-6-5h-6a5 5 0 0 1-4-2"
        {...STROKE_ATTRS}
      />
    </svg>,
    <svg key="fly" viewBox="0 0 48 48">
      <path
        transform="matrix(-1 0 0 1 48 0)"
        d="M4 27l13-1.5 8-10h4l-4 9.5 9-.8 4-4.7h3l-2 6.6 2 6.6h-3l-4-4.7-9-.8 4 9.5h-4l-8-10L4 29z"
        {...STROKE_ATTRS}
      />
    </svg>,
    <svg key="welcome" viewBox="0 0 48 48">
      <path d="M6 23 24 8l18 15M11 19v21h26V19" {...STROKE_ATTRS} />
      <path
        d="M24 35c-4.6-3.2-6.8-5.7-6.8-8.2a3.4 3.4 0 0 1 6.8-.8 3.4 3.4 0 0 1 6.8.8c0 2.5-2.2 5-6.8 8.2z"
        fill="currentColor"
      />
    </svg>,
  ],
};

const JOURNEYS = [
  {
    key: "local",
    label: "In Dubai",
    hint: "meet in person",
    heading: "In our Dubai showroom",
    body: "Visit us in person in Downtown Dubai. Meet our available puppies, play with them, feel their coat, and see their playful personalities before you decide.",
    note: "Take your puppy home the very same day.",
    steps: [
      {
        title: "Find your puppy",
        text: "Browse our locally available puppies online or come directly to our Downtown Dubai showroom.",
      },
      {
        title: "Choose your favorite",
        text: "Spend time getting to know each puppy. Hold them, play with them, and choose the one that captures your heart.",
      },
      {
        title: "Meet in person",
        text: "Fall in love face-to-face. All puppies in our showroom are vet-checked, healthy, and ready for a loving home.",
      },
      {
        title: "Pick-up or delivery",
        text: "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
      },
    ],
  },
  {
    key: "imported",
    label: "Imported",
    hint: "order upon request",
    heading: "Order upon request",
    body: "Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.",
    note: "From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.",
    steps: [
      {
        title: "Reserve your puppy",
        text: "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.",
      },
      {
        title: "Personalized consultation",
        text: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.",
      },
      {
        title: "Import and arrival",
        text: "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.",
      },
      {
        title: "Welcome home",
        text: "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.",
      },
    ],
  },
];

export default function TwoWaysJourneys() {
  const [activeKey, setActiveKey] = useState("local");
  const [isReady, setIsReady] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const activeIdx = Math.max(
    0,
    JOURNEYS.findIndex((j) => j.key === activeKey)
  );

  const navigateTab = (targetIdx: number) => {
    const nextIdx = (targetIdx + JOURNEYS.length) % JOURNEYS.length;
    setActiveKey(JOURNEYS[nextIdx].key);
    buttonRefs.current[nextIdx]?.focus();
  };

  return (
    <section
      className="tp-journeys"
      aria-labelledby="two-ways-title"
      data-ready={isReady || undefined}
    >
      <div className="tp-journeys__top">
        <div>
          <p className="font-scrawl tp-journeys__kicker">choose your way</p>
          <h2 id="two-ways-title" className="font-plush text-big">
            Two ways home
          </h2>
        </div>

        <div className="tp-journeys__pick">
          {/* Switch control */}
          <div
            role="tablist"
            aria-label="Ways to bring your puppy home"
            className="tp-switch"
            style={
              {
                "--at": activeIdx,
                "--n": JOURNEYS.length,
              } as React.CSSProperties
            }
          >
            <span aria-hidden="true" className="tp-switch__thumb" />
            {JOURNEYS.map((j, idx) => (
              <button
                key={j.key}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${j.key}`}
                aria-selected={activeKey === j.key}
                aria-controls={`panel-${j.key}`}
                tabIndex={activeKey === j.key ? 0 : -1}
                onClick={() => setActiveKey(j.key)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") navigateTab(idx + 1);
                  if (e.key === "ArrowLeft") navigateTab(idx - 1);
                }}
                className="tp-switch__tab"
              >
                <span className="font-plush tp-switch__label">{j.label}</span>
                <span className="tp-switch__hint">{j.hint}</span>
              </button>
            ))}
          </div>

          <PupBuddy
            pose="sit"
            act="tilt"
            className="tp-journeys__teddy"
            label="Teddy, waiting to see which way you pick"
          />
        </div>
      </div>

      {/* Panels */}
      {JOURNEYS.map((j) => (
        <div
          key={j.key}
          role="tabpanel"
          id={`panel-${j.key}`}
          aria-labelledby={`tab-${j.key}`}
          hidden={isReady && activeKey !== j.key}
          className="tp-journey"
        >
          <div className="tp-journey__head">
            <div>
              <h3 className="font-plush tp-journey__title">{j.heading}</h3>
              {j.body && (
                <p className="text-lede mt-4 text-[var(--ink-soft)]">{j.body}</p>
              )}
              {j.note && (
                <p className="font-scrawl mt-4 text-toffee-ink">{j.note}</p>
              )}
            </div>

            {j.key === "imported" ? (
              <div aria-hidden="true" className="tp-postcard tp-postcard--sky">
                <svg
                  viewBox="0 0 320 150"
                  className="tp-postcard__route"
                  preserveAspectRatio="none"
                >
                  <path d="M28 128C90 20 230 20 292 118" />
                </svg>
                <svg
                  viewBox="0 0 64 40"
                  className="tp-postcard__plane"
                  aria-hidden="true"
                >
                  <path
                    d="M4 22l20-2 12-14h6l-6 14 14-1 6-7h4l-3 10 3 10h-4l-6-7-14-1 6 14h-6L24 24 4 22z"
                    fill="#fffdf8"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-scrawl tp-postcard__from">
                  Europe · Korea
                </span>
                <span className="font-scrawl tp-postcard__to">Dubai</span>
              </div>
            ) : (
              <div aria-hidden="true" className="tp-postcard">
                <span className="tp-postcard__sun" />
                <svg
                  viewBox="0 0 300 120"
                  className="tp-postcard__city"
                  aria-hidden="true"
                >
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-scrawl tp-postcard__to tp-postcard__to--left">
                  Downtown Dubai
                </span>
              </div>
            )}
          </div>

          <ol className="tp-steps">
            {j.steps.map((step, idx) => (
              <li
                key={step.title}
                className="tp-step"
                style={
                  {
                    "--i": idx,
                    "--tint": TINT_COLORS[idx % TINT_COLORS.length],
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true" className="tp-step__icon">
                  {(STEP_ICONS[j.key] ?? STEP_ICONS.local)[idx % 4]}
                </span>
                <span className="tp-step__num font-plush">Step {idx + 1}</span>
                <h4 className="font-plush-text tp-step__title">{step.title}</h4>
                <p className="tp-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
