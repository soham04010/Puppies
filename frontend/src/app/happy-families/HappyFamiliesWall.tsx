"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PolaroidItem {
  id: number;
  title: string;
  tilt: string;
  tape: string;
  tapeClass: string;
  hasDoubleTape: boolean;
  delay: string;
  src: string;
  width: number;
  height: number;
}

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: 70 * direction,
    rotate: 5 * direction,
    scale: 0.92,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 26 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: -70 * direction,
    rotate: -5 * direction,
    scale: 0.92,
    transition: { duration: 0.22 },
  }),
};

export default function HappyFamiliesWall({
  polaroids,
}: {
  polaroids: PolaroidItem[];
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const total = polaroids.length;

  const navigate = useCallback(
    (newIdx: number, dir: number) => {
      setDirection(dir);
      setActiveIdx((newIdx % total + total) % total);
    },
    [total]
  );

  const closeViewer = useCallback(() => {
    setActiveIdx(null);
    dialogRef.current?.close();
  }, []);

  const openViewer = useCallback((idx: number) => {
    setDirection(1);
    setActiveIdx(idx);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(activeIdx + 1, 1);
      if (e.key === "ArrowLeft") navigate(activeIdx - 1, -1);
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIdx, navigate, closeViewer]);

  const current = activeIdx !== null ? polaroids[activeIdx] : null;

  return (
    <>
      <ul className="tp-wall" aria-label="Photos from TeddyPups families">
        {polaroids.map((p, idx) => (
          <li
            key={p.id}
            className="tp-wall__item"
            data-reveal="true"
            style={{ "--d": p.delay } as React.CSSProperties}
          >
            <button
              type="button"
              className="tp-wall__print"
              aria-label={`Open photo ${idx + 1} of ${total}${p.title ? `: ${p.title}` : ""}`}
              onClick={() => openViewer(idx)}
            >
              <span
                className="tp-polaroid"
                style={
                  {
                    "--tilt": p.tilt,
                    "--tape": p.tape,
                    "--i": idx,
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true" className={`tp-tape ${p.tapeClass}`} />
                {p.hasDoubleTape && (
                  <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                )}

                <span className="tp-polaroid__photo">
                  <img
                    alt="A happy TeddyPups family with their new puppy"
                    loading="lazy"
                    width={p.width}
                    height={p.height}
                    decoding="async"
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                    src={p.src}
                  />
                </span>

                <span className="tp-polaroid__caption font-scrawl">
                  {p.title}
                </span>
              </span>

              <svg
                viewBox="0 0 64 64"
                className="tp-wall__paw"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d={PAW_PATH} />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {/* Full-screen Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 open:flex open:flex-col z-50"
        onClose={() => setActiveIdx(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeViewer();
        }}
        data-lenis-prevent="true"
      >
        {current && activeIdx !== null && (
          <div className="flex h-full flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="font-scrawl text-lg">
                {activeIdx + 1} / {total}
                {current.title ? ` — ${current.title}` : ""}
              </p>
              <button
                type="button"
                onClick={closeViewer}
                className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Photo Center with Drag and Animation */}
            <div className="relative flex-1 overflow-hidden flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 touch-pan-y flex items-center justify-center p-4 select-none"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -80) navigate(activeIdx + 1, 1);
                    else if (info.offset.x > 80) navigate(activeIdx - 1, -1);
                  }}
                >
                  <div className="relative size-full max-h-[82vh] max-w-[85vw] flex items-center justify-center">
                    <img
                      src={current.src}
                      alt={current.title || "Happy TeddyPups family"}
                      className="max-h-full max-w-full object-contain pointer-events-none rounded-lg"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Preload adjacent photos */}
              <span aria-hidden="true" className="sr-only">
                {[...new Set([(activeIdx - 1 + total) % total, (activeIdx + 1) % total])].map(
                  (i) => (
                    <img key={polaroids[i].id} src={polaroids[i].src} alt="" />
                  )
                )}
              </span>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
              <button
                type="button"
                onClick={() => navigate(activeIdx - 1, -1)}
                className="h-12 rounded-full border-2 border-milk px-6 font-semibold transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => navigate(activeIdx + 1, 1)}
                className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
