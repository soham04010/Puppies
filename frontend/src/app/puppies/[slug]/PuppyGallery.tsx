"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaObject } from "@/types";

interface PuppyGalleryProps {
  name: string;
  media: MediaObject[];
}

const PAGE_SIZES = "(min-width: 1024px) 55vw, 92vw";

export default function PuppyGallery({ name, media }: PuppyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const total = media.length;
  const current = media[activeIdx];

  const navigate = useCallback(
    (newIdx: number) => {
      setDirection(newIdx > activeIdx ? 1 : -1);
      setActiveIdx((newIdx % total + total) % total);
    },
    [activeIdx, total]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(activeIdx + 1);
      if (e.key === "ArrowLeft") navigate(activeIdx - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIdx, navigate]);

  if (!current) return null;

  const itemLabel = (idx: number) =>
    `${name}, ${media[idx].kind === "video" ? "video" : "photo"} ${idx + 1} of ${total}`;

  return (
    <div>
      {/* Main Storypage Container */}
      <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.button
            key={current.id}
            type="button"
            custom={direction}
            className="absolute inset-0 block size-full cursor-zoom-in"
            initial={{
              clipPath:
                direction > 0
                  ? "inset(0% 0% 0% 100%)"
                  : "inset(0% 100% 0% 0%)",
              rotateY: -14 * direction,
              transformPerspective: 1400,
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              rotateY: 0,
            }}
            exit={{
              opacity: 0.4,
              scale: 0.97,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: direction > 0 ? "0% 50%" : "100% 50%",
            }}
            onClick={() => {
              dialogRef.current?.showModal();
              setIsOpen(true);
            }}
            aria-label={`Open ${itemLabel(activeIdx)} full screen`}
          >
            {current.kind === "video" ? (
              <video
                src={current.url}
                poster={current.poster?.url}
                className="size-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                aria-label={current.alt}
              />
            ) : (
              <Image
                src={current.url}
                alt={current.alt || name}
                fill
                priority={activeIdx === 0}
                sizes={PAGE_SIZES}
                className="object-cover"
                style={{
                  objectPosition: current.focalX
                    ? `${(current.focalX * 100).toFixed(1)}% ${(current.focalY! * 100).toFixed(1)}%`
                    : "50% 50%",
                  backgroundColor: current.color || "#785838",
                }}
              />
            )}
          </motion.button>
        </AnimatePresence>

        {/* Prev / Next Page Overlay Controls */}
        {total > 1 && (
          <div className="absolute inset-x-4 bottom-4 flex justify-between z-10 pointer-events-auto">
            <button
              type="button"
              onClick={() => navigate(activeIdx - 1)}
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold transition-transform hover:scale-105 active:scale-95"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
              {activeIdx + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => navigate(activeIdx + 1)}
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold transition-transform hover:scale-105 active:scale-95"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Bar */}
      {total > 1 && (
        <ul
          className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
          aria-label={`All photos of ${name}`}
        >
          {media.map((item, idx) => {
            const thumbUrl = item.kind === "video" ? item.poster?.url : item.url;
            const isSelected = idx === activeIdx;

            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(idx)}
                  aria-label={itemLabel(idx)}
                  aria-current={isSelected}
                  className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                    isSelected
                      ? "-rotate-3 -translate-y-1 border-toffee-deep shadow-md"
                      : "border-cocoa/30 hover:-rotate-2 hover:border-cocoa"
                  }`}
                >
                  {thumbUrl && (
                    <Image
                      src={thumbUrl}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                      style={{
                        objectPosition: item.focalX
                          ? `${(item.focalX * 100).toFixed(1)}% ${(item.focalY! * 100).toFixed(1)}%`
                          : "50% 50%",
                      }}
                    />
                  )}
                  {item.kind === "video" && (
                    <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-lg text-milk">
                      ▶
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Full-screen Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        aria-label={`${name} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 open:flex open:flex-col"
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
      >
        {isOpen && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="font-scrawl text-lg">{itemLabel(activeIdx)}</p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa transition-transform hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>

            <div className="relative flex-1 touch-pan-y flex items-center justify-center p-4">
              {current.kind === "video" ? (
                <video
                  src={current.url}
                  poster={current.poster?.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-full max-w-full object-contain rounded-2xl"
                />
              ) : (
                <div className="relative size-full">
                  <Image
                    src={current.url}
                    alt={current.alt || name}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {total > 1 && (
              <div className="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
                <button
                  type="button"
                  onClick={() => navigate(activeIdx - 1)}
                  className="h-12 rounded-full border-2 border-milk px-6 font-semibold transition-transform hover:scale-105 active:scale-95"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => navigate(activeIdx + 1)}
                  className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa transition-transform hover:scale-105 active:scale-95"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
