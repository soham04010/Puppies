"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const pawPath = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-hero"
      style={{ "--sky-top": "#fffdf8", "--sky-bottom": "#fff1d8", "--quilt": "#fff1d8" } as React.CSSProperties}
      aria-labelledby="hero-title"
    >
      <span aria-hidden="true" className="tp-hero__sun"></span>

      {/* Sky paw prints trail curving towards center puppy - exactly matching Image 2 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden z-10">
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "93%", top: "220px", transform: "rotate(22deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "89.5%", top: "235px", transform: "rotate(16deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "86%", top: "242px", transform: "rotate(10deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "82.5%", top: "226px", transform: "rotate(2deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "79%", top: "248px", transform: "rotate(-6deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "75.5%", top: "235px", transform: "rotate(-14deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "72%", top: "255px", transform: "rotate(-22deg)" }}><path d={pawPath} fill="currentColor" /></svg>
        <svg viewBox="0 0 64 64" className="absolute size-4 text-[#c2622b] opacity-80" style={{ left: "68%", top: "238px", transform: "rotate(-28deg)" }}><path d={pawPath} fill="currentColor" /></svg>
      </div>

      <div className="tp-hero__copy gutter">
        <p className="tp-hero__note font-scrawl">
          every puppy is family
          <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" aria-hidden="true">
            <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
        <h1 id="hero-title" className="tp-hero__title font-plush">
          <span className="tp-hero__line">Premium teacup</span>
          <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
        </h1>
        <p className="tp-hero__lede">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>
        <div className="tp-hero__actions">
          <Link className="btn btn-primary" href="/puppies">View available puppies</Link>
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      <div className="tp-hero__stage">
        <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
          <li className="tp-lineup__seat" style={{ "--x": "9%", "--w": "8.6rem", "--peek": "0.62", "--tilt": "-5deg", "--i": "0" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Max, Maltipoo" href="/puppies/maltipoo-max-male">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Max, male Maltipoo puppy" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp" />
              </span>
            </Link>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "22.5%", "--w": "10.4rem", "--peek": "0.8", "--tilt": "3deg", "--i": "1" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Korean Teacup Maltipoo, Korean Teacup Maltipoo" href="/puppies/korean-teacup-maltipoo-female">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Female Korean Teacup Maltipoo puppy" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg" />
              </span>
            </Link>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "35%", "--w": "9.2rem", "--peek": "0.7", "--tilt": "-2deg", "--i": "2" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Korean Teacup Poodle, Korean Teacup Poodle" href="/puppies/korean-teacup-poodle-female">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Female Korean Teacup Poodle puppy" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg" />
              </span>
            </Link>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "65%", "--w": "9.4rem", "--peek": "0.74", "--tilt": "3deg", "--i": "3" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Maltipoo &amp; Cavapoo, Maltipoo &amp; Cavapoo" href="/puppies/maltipoo-cavapoo-male">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Male Maltipoo &amp; Cavapoo puppy" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg" />
              </span>
            </Link>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "77.5%", "--w": "10.6rem", "--peek": "0.82", "--tilt": "-3deg", "--i": "4" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Toy Poodle, Toy Poodle" href="/puppies/toy-poodle-male-female">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Toy Poodle puppy" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg" />
              </span>
            </Link>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "91%", "--w": "8.4rem", "--peek": "0.6", "--tilt": "4deg", "--i": "5" } as React.CSSProperties}>
            <Link className="tp-lineup__pup" data-pup-friend="true" aria-label="Meet Maltipoo, Maltipoo" href="/puppies/maltipoo-female-2">
              <span className="tp-lineup__photo relative block h-full w-full overflow-hidden">
                <img alt="Female Maltipoo puppy" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" sizes="11rem" src="/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg" />
              </span>
            </Link>
          </li>
        </ul>

        {/* Luggage Tags matching Image 2 */}
        <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
          <li className="tp-lineup__seat" style={{ "--x": "9%", "--w": "8.6rem", "--peek": "0.62", "--tilt": "-5deg", "--i": "0" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Max</span></span>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "22.5%", "--w": "10.4rem", "--peek": "0.8", "--tilt": "3deg", "--i": "1" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Korean Teacup Maltipoo</span></span>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "35%", "--w": "9.2rem", "--peek": "0.7", "--tilt": "-2deg", "--i": "2" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Korean Teacup Poodle</span></span>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "65%", "--w": "9.4rem", "--peek": "0.74", "--tilt": "3deg", "--i": "3" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Maltipoo &amp; Cavapoo</span></span>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "77.5%", "--w": "10.6rem", "--peek": "0.82", "--tilt": "-3deg", "--i": "4" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Toy Poodle</span></span>
          </li>
          <li className="tp-lineup__seat" style={{ "--x": "91%", "--w": "8.4rem", "--peek": "0.6", "--tilt": "4deg", "--i": "5" } as React.CSSProperties}>
            <span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">Maltipoo</span></span>
          </li>
        </ul>

        {/* Center Cartoon Teddy Puppy peeking over the quilt blanket */}
        <div data-pup-stop="true" data-pose="peek" data-facing="right" data-act="peekaboo" data-behind="true" data-lane="true" className="pup-stop tp-hero__teddy">
          <div className="pup-buddy" data-facing="right">
            <svg viewBox="0 0 300 240" style={{ overflow: "visible" }} role="img" aria-label="Teddy, the TeddyPups puppy, peeking over the quilt" focusable="false">
              <g data-p="root">
                <ellipse data-p="shadow" cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                <g data-p="head" transform="translate(0 4)">
                  <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path data-p="earL" d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(-6 174 82)" />
                  <path data-p="earR" d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(6 250 82)" />
                  <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <g data-p="eyes">
                    <g data-p="open">
                      <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                      <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                      <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                      <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                      <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                      <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                    </g>
                  </g>
                  <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                  <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path data-p="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
                </g>
                <g data-p="ledge">
                  <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Scalloped diamond quilt blanket ledge */}
        <div aria-hidden="true" className="tp-quilt">
          <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
