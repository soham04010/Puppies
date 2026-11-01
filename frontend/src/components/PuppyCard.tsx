"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Puppy, MediaObject } from "@/types";

interface Doodle {
  kind: "sparkle" | "heart" | "dashes" | "swirl" | "dots" | "paw";
  x: number;
  y: number;
  rot: number;
  size: number;
  ink: string;
}

interface Geometry {
  mask: string;
  outline: string;
  retrace: string;
  wash: {
    d: string;
    dx: number;
    dy: number;
    color: string;
  };
  tilt: number;
  doodles: Doodle[];
}

const p = (e: number) => e.toFixed(2);

function u(e: () => number, t: number, a: number, s = 40, l = 0, r = 2 * Math.PI) {
  const i = [6.28 * e(), 6.28 * e(), 6.28 * e()];
  const n = 1 + (e() - 0.5) * 0.05;
  const o: [number, number][] = [];
  for (let c = 0; c < s; c++) {
    const d = l + (c / (r >= 2 * Math.PI ? s : s - 1)) * r;
    const h = t + a * (0.55 * Math.sin(2 * d + i[0]) + 0.3 * Math.sin(3 * d + i[1]) + 0.15 * Math.sin(5 * d + i[2]));
    o.push([50 + Math.cos(d) * h * n, 50 + (Math.sin(d) * h) / n]);
  }
  return o;
}

function m(e: [number, number][], t: boolean) {
  const a = e.length;
  const s = (s: number) => e[t ? (s + a) % a : Math.min(a - 1, Math.max(0, s))];
  let l = `M${p(e[0][0])} ${p(e[0][1])}`;
  const r = t ? a : a - 1;
  for (let c = 0; c < r; c++) {
    const t0 = s(c - 1);
    const a0 = s(c);
    const r0 = s(c + 1);
    const i0 = s(c + 2);
    const n = [a0[0] + (r0[0] - t0[0]) / 6, a0[1] + (r0[1] - t0[1]) / 6];
    const o = [r0[0] - (i0[0] - a0[0]) / 6, r0[1] - (i0[1] - a0[1]) / 6];
    l += `C${p(n[0])} ${p(n[1])} ${p(o[0])} ${p(o[1])} ${p(r0[0])} ${p(r0[1])}`;
  }
  return t ? `${l}Z` : l;
}

const WASH_COLORS = ["#f2be6b", "#f9cdbf", "#bfddf5", "#fbe3b4", "#e8c39a"];
const INK_COLORS = ["#c2622b", "#a24a1a", "#2a170e", "#d4893f"];
const DOODLE_KINDS: Array<Doodle["kind"]> = ["sparkle", "heart", "dashes", "swirl", "dots", "paw"];

function createSvgMask(path: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${path}" fill="#000"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getSketchGeometry(slug: string): Geometry {
  const prng = (function (str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 0x1000193);
    }
    let a = h >>> 0;
    return () => {
      let e = (a = (a + 0x6d2b79f5) >>> 0);
      return (
        (e = Math.imul(e ^ (e >>> 15), 1 | e)),
        (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) / 0x100000000
      );
    };
  })(slug);

  const mask = m(u(prng, 45.5, 2.6), true);
  const outline = m(u(prng, 47.8, 3.1), true);
  const l = prng() * Math.PI * 2;
  const retrace = m(u(prng, 49, 3.4, 30, l, Math.PI * (1.15 + 0.5 * prng())), false);
  const wash = {
    d: m(u(prng, 46.5, 3.6), true),
    dx: (prng() - 0.5) * 9,
    dy: 3 + 4 * prng(),
    color: WASH_COLORS[Math.floor(prng() * WASH_COLORS.length)],
  };
  const tilt = (prng() - 0.5) * 5;
  const o = [
    [0.86, 1.08],
    [1.16, 1.42],
    [-0.08, 0.16],
  ]
    .map((e) => ({ z: e, k: prng() }))
    .sort((a, b) => a.k - b.k)
    .map((e) => e.z);

  const count = 2 + Math.floor(2 * prng());
  const doodles: Doodle[] = [];
  const picked = new Set<string>();

  for (let i = 0; i < count; i++) {
    let kind = DOODLE_KINDS[Math.floor(prng() * DOODLE_KINDS.length)];
    if (picked.has(kind)) {
      kind = DOODLE_KINDS.find((k) => !picked.has(k)) || kind;
    }
    picked.add(kind);
    const [s0, l0] = o[i];
    const r = Math.PI * (s0 + prng() * (l0 - s0));
    const dist = 55 + 4 * prng();
    doodles.push({
      kind,
      x: 50 + Math.cos(r) * dist,
      y: 50 + Math.sin(r) * dist,
      rot: (prng() - 0.5) * 50,
      size: 0.85 + 0.35 * prng(),
      ink: INK_COLORS[Math.floor(prng() * INK_COLORS.length)],
    });
  }

  return { mask, outline, retrace, wash, tilt, doodles };
}

function DoodleSvg({ d }: { d: Doodle }) {
  const transform = `translate(${d.x.toFixed(1)} ${d.y.toFixed(1)}) rotate(${d.rot.toFixed(0)}) scale(${d.size.toFixed(2)})`;
  const strokeProps = {
    fill: "none",
    stroke: d.ink,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <g transform={transform}>
      <g className="tp-sketch__doodle">
        {d.kind === "sparkle" && (
          <path
            d="M0 -6c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z"
            fill={d.ink}
          />
        )}
        {d.kind === "heart" && (
          <path
            d="M0 5C-4.6 1.8-6.4-.8-6.4-3.2c0-1.9 1.5-3.3 3.3-3.3 1.3 0 2.4.7 3.1 1.9.7-1.2 1.8-1.9 3.1-1.9 1.8 0 3.3 1.4 3.3 3.3C6.4-.8 4.6 1.8 0 5z"
            {...strokeProps}
          />
        )}
        {d.kind === "dashes" && (
          <path d="M-5 -5l4 2M-6 0h5M-5 5l4 -2" {...strokeProps} />
        )}
        {d.kind === "swirl" && (
          <path
            d="M0 0c1.6-.6 2.4 1.4.8 2.6-2 1.4-4.6-.4-4-3 .7-3 4.8-3.8 6.8-1.2 2.4 3-0.2 7.4-3.8 7.2"
            {...strokeProps}
          />
        )}
        {d.kind === "dots" && (
          <g fill={d.ink}>
            <circle cx="-4" cy="1" r="1.2" />
            <circle cx="0" cy="-2" r="1.2" />
            <circle cx="4" cy="1" r="1.2" />
          </g>
        )}
        {d.kind === "paw" && (
          <path
            d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
            transform="scale(.17) translate(-32 -34)"
            fill={d.ink}
            opacity={0.85}
          />
        )}
      </g>
    </g>
  );
}

const STATUS_LABELS: Record<string, string> = {
  available: "Available",
  reserved: "Reserved",
  rehomed: "Gone home",
};

const DEFAULT_SIZES = "(min-width: 1536px) 17rem, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw";

interface PuppySketchProps {
  puppy: Puppy;
  index?: number;
  sizes?: string;
  preload?: boolean;
  small?: boolean;
}

export function PuppySketch({
  puppy,
  index = 0,
  sizes = DEFAULT_SIZES,
  preload = false,
  small = false,
}: PuppySketchProps) {
  const geo = useMemo(() => getSketchGeometry(puppy.slug), [puppy.slug]);
  const hasVideo = puppy.media?.some((m) => m.kind === "video");
  const coverUrl = puppy.cover?.url || puppy.images?.[0] || "";
  const isGoneHome = puppy.status === "rehomed";
  const statusLabel = STATUS_LABELS[puppy.status] || "Available";

  const ariaLabel = `${puppy.displayName || puppy.name}, ${puppy.breed}, ${puppy.genderLabel || puppy.gender}, ${puppy.age}, ${statusLabel.toLowerCase()}`;

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className={`tp-sketch${small ? " tp-sketch--small" : ""}`}
      data-reveal="true"
      style={
        {
          "--tilt": `${geo.tilt.toFixed(2)}deg`,
          "--d": `${(index % 8) * 70}ms`,
          "--wash": geo.wash.color,
        } as React.CSSProperties
      }
      aria-label={ariaLabel}
    >
      <span className="tp-sketch__frame">
        {/* Watercolor Organic Wash */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="tp-sketch__wash"
          style={{
            translate: `${geo.wash.dx.toFixed(1)}% ${geo.wash.dy.toFixed(1)}%`,
          }}
        >
          <path d={geo.wash.d} />
        </svg>

        {/* Masked Photo */}
        <span
          className="tp-sketch__photo"
          style={{
            maskImage: createSvgMask(geo.mask),
            WebkitMaskImage: createSvgMask(geo.mask),
          }}
        >
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={puppy.displayName || puppy.name}
              fill
              sizes={sizes}
              priority={preload}
              className="object-cover"
              style={{
                objectPosition: puppy.cover?.focalX
                  ? `${(puppy.cover.focalX * 100).toFixed(1)}% ${(puppy.cover.focalY! * 100).toFixed(1)}%`
                  : "50% 50%",
              }}
            />
          )}
        </span>

        {/* Ink Hand-drawn Outlines & Doodles */}
        <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__ink">
          <path d={geo.outline} pathLength={1} className="tp-sketch__line" />
          <path d={geo.retrace} pathLength={1} className="tp-sketch__line tp-sketch__line--retrace" />
          {geo.doodles.map((d, i) => (
            <DoodleSvg key={i} d={d} />
          ))}
        </svg>

        {/* Badges / Stickers */}
        {!small && !isGoneHome && (
          <span className="tp-sketch__sticker font-scrawl">{statusLabel}</span>
        )}
        {hasVideo && <span className="tp-sketch__video">▶ video</span>}
        {isGoneHome && (
          <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
            gone home ♥
          </span>
        )}
      </span>

      {/* Typography */}
      <span className="tp-sketch__name font-plush">{puppy.displayName || puppy.name}</span>
      {!small && (
        <span className="tp-sketch__meta">
          {puppy.name ? `${puppy.breed} · ` : ""}
          {puppy.genderLabel ? puppy.genderLabel.toLowerCase() : puppy.gender}
          {puppy.age ? ` · ${puppy.age}` : ""}
        </span>
      )}
    </Link>
  );
}

// Export default alias for existing imports
export default function PuppyCard({ puppy }: { puppy: Puppy }) {
  return <PuppySketch puppy={puppy} />;
}
