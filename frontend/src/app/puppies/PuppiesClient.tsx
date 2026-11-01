"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Puppy, BreedRef } from "@/types";
import { PuppySketch } from "@/components/PuppyCard";
import PupBuddy from "@/components/PupBuddy";

interface PuppiesClientProps {
  initialPuppies: Puppy[];
  breeds: BreedRef[];
  whatsappHref?: string;
}

function StickerChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`tp-sticker-chip${active ? " is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
        {label}
      </span>
      {children}
    </div>
  );
}

const FILTER_KEYS = ["origin", "breed", "gender", "collection"] as const;

export default function PuppiesClient({
  initialPuppies,
  breeds,
  whatsappHref = "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20looking%20for%20a%20puppy%20%E2%80%94%20what%20do%20you%20have%20at%20the%20moment%3F",
}: PuppiesClientProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilters = useMemo(
    () => ({
      origin: searchParams.get("origin") ?? "",
      breed: searchParams.get("breed") ?? "",
      gender: searchParams.get("gender") ?? "",
      collection: searchParams.get("collection") ?? "",
    }),
    [searchParams]
  );

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && activeFilters[key as keyof typeof activeFilters] !== value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    window.history.replaceState(null, "", newUrl);
    router.replace(newUrl, { scroll: false });
  };

  const clearAllFilters = () => {
    window.history.replaceState(null, "", pathname);
    router.replace(pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    return initialPuppies.filter((p) => {
      if (activeFilters.origin && p.origin?.slug !== activeFilters.origin) {
        return false;
      }
      if (
        activeFilters.breed &&
        !p.breeds.some((b) => b.slug === activeFilters.breed)
      ) {
        return false;
      }
      if (
        activeFilters.gender &&
        p.gender !== activeFilters.gender &&
        p.gender !== "male-female"
      ) {
        return false;
      }
      if (
        activeFilters.collection &&
        !p.collections?.some((c) => c.slug === activeFilters.collection)
      ) {
        return false;
      }
      return true;
    });
  }, [initialPuppies, activeFilters]);

  const hasAnyFilter = FILTER_KEYS.some((k) => !!activeFilters[k]);
  const activeBreeds = breeds.filter((b) =>
    initialPuppies.some((p) => p.breeds.some((pb) => pb.slug === b.slug))
  );
  const hasKoreanTeacup = initialPuppies.some((p) =>
    p.collections?.some((c) => c.slug === "korean-teacup")
  );
  const hasLocal = initialPuppies.some((p) => p.origin?.slug === "local");

  return (
    <div>
      {/* Sketchpad Filter Chips */}
      <div
        role="group"
        aria-label="Filter puppies"
        className="tp-sketchpad flex flex-col gap-4"
      >
        {/* Where */}
        <FilterGroup label="where">
          <StickerChip
            active={!activeFilters.origin && !activeFilters.collection}
            onClick={clearAllFilters}
          >
            Everywhere
          </StickerChip>
          {hasLocal && (
            <StickerChip
              active={activeFilters.origin === "local"}
              onClick={() => setFilter("origin", "local")}
            >
              In Dubai
            </StickerChip>
          )}
          <StickerChip
            active={activeFilters.origin === "imported"}
            onClick={() => setFilter("origin", "imported")}
          >
            Imported
          </StickerChip>
          {hasKoreanTeacup && (
            <StickerChip
              active={activeFilters.collection === "korean-teacup"}
              onClick={() => setFilter("collection", "korean-teacup")}
            >
              Korean Teacup
            </StickerChip>
          )}
        </FilterGroup>

        {/* Breed */}
        <FilterGroup label="breed">
          {activeBreeds.map((b) => (
            <StickerChip
              key={b.slug}
              active={activeFilters.breed === b.slug}
              onClick={() => setFilter("breed", b.slug)}
            >
              {b.name}
            </StickerChip>
          ))}
        </FilterGroup>

        {/* Boy or Girl */}
        <FilterGroup label="boy or girl">
          <StickerChip
            active={activeFilters.gender === "male"}
            onClick={() => setFilter("gender", "male")}
          >
            Boys
          </StickerChip>
          <StickerChip
            active={activeFilters.gender === "female"}
            onClick={() => setFilter("gender", "female")}
          >
            Girls
          </StickerChip>
          {hasAnyFilter && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="link-ink ml-auto text-[0.95rem] font-semibold"
            >
              Clear filters
            </button>
          )}
        </FilterGroup>
      </div>

      {/* Result Status Counter */}
      <p
        className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]"
        aria-live="polite"
      >
        {filtered.length === 1 ? "1 puppy" : `${filtered.length} puppies`}{" "}
        {hasAnyFilter ? "match" : "looking for a home"}
      </p>

      {/* Grid or Empty State */}
      {filtered.length > 0 ? (
        <ul className="tp-sketches mt-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((pup, idx) => (
              <motion.li
                key={pup.id}
                layout
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <PuppySketch
                  puppy={pup}
                  index={idx}
                  preload={idx < 4}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="tp-sketchpad mt-10 grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10">
          <PupBuddy
            pose="sit"
            act="tilt"
            className="mx-auto w-44 md:w-52"
            label="Teddy, tilting his head"
          />
          <div>
            <p className="font-plush text-big">No puppies match just now.</p>
            <p className="mt-3 max-w-[48ch] text-cocoa-soft">
              Tell us what you&apos;re hoping for and we&apos;ll let you know what&apos;s
              in our showroom or what we can bring in for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Ask on WhatsApp
              </a>
              <button
                type="button"
                onClick={clearAllFilters}
                className="btn btn-ghost"
              >
                Show all puppies
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
