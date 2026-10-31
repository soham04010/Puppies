"use client";

import React, { useEffect, useState, useRef } from "react";

export default function PupRunner() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartCounter = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          setIsScrolling(true);
          ticking = false;

          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 400);
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Cycle playful speech bubbles when paused
  useEffect(() => {
    if (!isScrolling) {
      const phrases = [
        "peekaboo!",
        "every puppy is family ❤️",
        "Dubai showroom visits daily!",
        "so fluffy!",
        "come say hello!"
      ];
      const timer = setTimeout(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setSpeech(randomPhrase);
        setTimeout(() => setSpeech(null), 3000);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setSpeech(null);
    }
  }, [isScrolling]);

  const handlePuppyClick = (e: React.MouseEvent) => {
    const id = heartCounter.current++;
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1500);
  };

  const pawPath =
    "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

  return (
    <>
      {/* Floating Paw Prints Layer */}
      <div aria-hidden="true" className="pup-prints pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => {
          // Dynamic positions across the viewport based on scroll
          const x = (i * 19) % 94 + 3;
          const y = ((i * 140 + scrollY * 0.4) % 1200) - 200;
          const opacity = y > 60 && y < 900 ? 0.35 : 0;
          return (
            <svg
              key={i}
              viewBox="0 0 64 64"
              className="absolute size-4 text-[#c2622b] transition-opacity duration-500"
              style={{
                left: `${x}%`,
                top: `${y}px`,
                opacity,
                transform: `rotate(${(i * 37) % 360}deg)`
              }}
            >
              <path d={pawPath} fill="currentColor" />
            </svg>
          );
        })}
      </div>

      {/* Floating Interactive Hearts on Click */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="pup-heart animate-ping text-xl"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              animationDuration: "1.2s"
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </>
  );
}
