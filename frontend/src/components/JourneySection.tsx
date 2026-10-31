"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface StepItem {
  title: string;
  desc: string;
}

const STEPS: StepItem[] = [
  {
    title: "Choose your breed",
    desc: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    title: "Get photos & details",
    desc: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    title: "Secure & safe delivery",
    desc: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
];

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stepsListRef = useRef<HTMLOListElement>(null);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  // Scroll sync: As user scrolls through steps, activate corresponding WhatsApp chat step
  useEffect(() => {
    const list = stepsListRef.current;
    if (!list) return;

    const items = Array.from(list.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            if (idx >= 0) {
              setActiveStep(idx);
            }
          }
        }
      },
      { rootMargin: "-28% 0px -62% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Realistic WhatsApp typing indicator effect on step transition
  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => setIsTyping(false), 650);
    return () => clearTimeout(t);
  }, [activeStep]);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat"
      style={{ "--sky-top": "#f7d18d", "--sky-bottom": "#f0b866" } as React.CSSProperties}
      aria-labelledby="journey-title"
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>
          <ol ref={stepsListRef} className="tp-chat__steps">
            {STEPS.map((s, idx) => (
              <li
                key={s.title}
                className="tp-chat__step cursor-pointer"
                data-active={activeStep === idx ? "true" : undefined}
                data-done={activeStep > idx ? "true" : undefined}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStep(idx);
                  }
                }}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">
                  {idx + 1}
                </span>
                <h3 className="font-plush tp-chat__title">{s.title}</h3>
                <p className="tp-chat__text">{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
            How it works
          </Link>
        </div>

        <div className="tp-chat__side">
          <div className="tp-phone" aria-label="A WhatsApp conversation with TeddyPups U.A.E." role="group">
            <div className="tp-phone__bar">
              <Image
                alt="TeddyPups"
                width={40}
                height={40}
                className="tp-phone__avatar"
                src="/brand/logo.png"
              />
              <span>
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">online</span>
              </span>
            </div>

            <div className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">Hi TeddyPups! I&apos;d love to know more about your puppies.</p>

              {/* Step 0: Breed options */}
              <div className="tp-msg-group" data-step="0" data-show={activeStep >= 0 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    <li>
                      <Link href="/puppies?breed=maltipoo">Maltipoo</Link>
                    </li>
                    <li>
                      <Link href="/puppies?breed=pomeranian">Pomeranian</Link>
                    </li>
                    <li>
                      <Link href="/puppies?breed=poodle">Poodle</Link>
                    </li>
                    <li>
                      <Link href="/puppies?breed=cavapoo">Cavapoo</Link>
                    </li>
                    <li>
                      <Link href="/puppies?breed=shih-tzu">Shih Tzu</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 1: Photos & HD Video */}
              <div className="tp-msg-group" data-step="1" data-show={activeStep >= 1 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    <span className="tp-snaps__one relative overflow-hidden">
                      <Image
                        alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                        fill
                        className="object-cover"
                        sizes="9rem"
                        src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      />
                    </span>
                    <span className="tp-snaps__one relative overflow-hidden">
                      <Image
                        alt="The apricot teddy bear puppy from our showroom, close up"
                        fill
                        className="object-cover"
                        sizes="9rem"
                        src="/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                      />
                    </span>
                    <span className="tp-snaps__one relative overflow-hidden">
                      <Image
                        alt="The apricot teddy bear puppy from our showroom, looking up"
                        fill
                        className="object-cover"
                        sizes="9rem"
                        src="/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg"
                      />
                    </span>
                    <span className="tp-snaps__one relative overflow-hidden">
                      <Image
                        alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                        fill
                        className="object-cover"
                        sizes="9rem"
                        src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      />
                    </span>
                  </div>
                </div>

                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-clip">
                    <video
                      ref={videoRef}
                      src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                      poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                    ></video>
                    <button
                      type="button"
                      className="tp-clip__play"
                      aria-pressed={isPlaying}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      onClick={handleVideoToggle}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                        {isPlaying ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="tp-msg tp-msg--them">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </div>

              {/* Step 2: Delivery & Happy Arrival */}
              <div className="tp-msg-group" data-step="2" data-show={activeStep >= 2 ? "true" : "false"}>
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                    <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart" />
                  </svg>
                </div>
              </div>

              {/* Typing indicator */}
              <p className="tp-typing" data-show={isTyping ? "true" : "false"} aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </p>
            </div>

            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          {/* Mascot sitting by WhatsApp */}
          <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-chat__teddy">
            <svg viewBox="0 0 160 160" className="size-full" fill="none">
              <ellipse cx="80" cy="140" rx="42" ry="6" fill="#2a170e" opacity="0.2" />
              <path d="M48 68 Q36 60 40 82 Q44 94 54 88" fill="#e4a352" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
              <path d="M112 68 Q124 60 120 82 Q116 94 106 88" fill="#e4a352" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
              <circle cx="80" cy="88" r="38" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
              <circle cx="68" cy="80" r="4.5" fill="#2a170e" />
              <circle cx="92" cy="80" r="4.5" fill="#2a170e" />
              <circle cx="69.5" cy="78" r="1.5" fill="#fff" />
              <circle cx="93.5" cy="78" r="1.5" fill="#fff" />
              <ellipse cx="80" cy="92" rx="6" ry="4.5" fill="#2a170e" />
              <path d="M80 96.5 Q74 102 68 98 M80 96.5 Q86 102 92 98" stroke="#2a170e" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="60" cy="92" r="5" fill="#f9b9a6" opacity="0.6" />
              <circle cx="100" cy="92" r="5" fill="#f9b9a6" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
