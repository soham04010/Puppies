"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PupBuddy from "@/components/PupBuddy";

interface FeaturedPup {
  id: string;
  slug: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  hasVideo: boolean;
  image: string;
}

const FEATURED_PUPS: FeaturedPup[] = [
  {
    id: "maltipoo-max-male",
    slug: "maltipoo-max-male",
    name: "Max",
    breed: "Maltipoo",
    gender: "boy",
    age: "3 months",
    hasVideo: true,
    image: "/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
  },
  {
    id: "korean-teacup-maltipoo-female",
    slug: "korean-teacup-maltipoo-female",
    name: "Korean Teacup Maltipoo",
    breed: "Korean Teacup Maltipoo",
    gender: "girl",
    age: "2 months",
    hasVideo: true,
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
  },
  {
    id: "korean-teacup-poodle-female",
    slug: "korean-teacup-poodle-female",
    name: "Korean Teacup Poodle",
    breed: "Korean Teacup Poodle",
    gender: "girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
  },
  {
    id: "maltipoo-cavapoo-male",
    slug: "maltipoo-cavapoo-male",
    name: "Maltipoo & Cavapoo",
    breed: "Maltipoo & Cavapoo",
    gender: "boy",
    age: "3 months Maltipoo & 2 months Cavapoo",
    hasVideo: true,
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
  },
  {
    id: "toy-poodle-male-female",
    slug: "toy-poodle-male-female",
    name: "Toy Poodle",
    breed: "Toy Poodle",
    gender: "boy & girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
  },
  {
    id: "maltipoo-female-2",
    slug: "maltipoo-female-2",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "girl",
    age: "3 months",
    hasVideo: true,
    image: "/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
  },
  {
    id: "pomeranian-female",
    slug: "pomeranian-female",
    name: "Pomeranian",
    breed: "Pomeranian",
    gender: "girl",
    age: "3 months",
    hasVideo: false,
    image: "/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
  },
  {
    id: "copper-male",
    slug: "copper-male",
    name: "Copper",
    breed: "Cavapoo",
    gender: "boy",
    age: "2 months",
    hasVideo: false,
    image: "/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg",
  },
  {
    id: "shitzu-female",
    slug: "shitzu-female",
    name: "Shih Tzu",
    breed: "Shih Tzu",
    gender: "girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
  },
  {
    id: "shitzu-male",
    slug: "shitzu-male",
    name: "Shih Tzu",
    breed: "Shih Tzu",
    gender: "boy",
    age: "2 months",
    hasVideo: false,
    image: "/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg",
  },
  {
    id: "maltipoo-female-1",
    slug: "maltipoo-female-1",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "girl",
    age: "2.5 months",
    hasVideo: false,
    image: "/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg",
  },
  {
    id: "maltipoo-female",
    slug: "maltipoo-female",
    name: "Maltipoo",
    breed: "Maltipoo",
    gender: "girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg",
  },
  {
    id: "korean-teacup-pomeranian-1",
    slug: "korean-teacup-pomeranian-1",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg",
  },
  {
    id: "korean-teacup-pomeranian",
    slug: "korean-teacup-pomeranian",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "girl",
    age: "2 months",
    hasVideo: false,
    image: "/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg",
  },
  {
    id: "korean-teacup-pomeranian-male",
    slug: "korean-teacup-pomeranian-male",
    name: "Korean Teacup Pomeranian",
    breed: "Korean Teacup Pomeranian",
    gender: "boy",
    age: "2 months",
    hasVideo: false,
    image: "/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg",
  },
];

const DOOR_COLORS = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default function MeetSection() {
  const pinRangeRef = useRef<HTMLDivElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  const [isPinned, setIsPinned] = useState(false);
  const [maxScrollX, setMaxScrollX] = useState(0);

  // Resize and dynamic door-w calculation matching reference site
  useEffect(() => {
    const updateDimensions = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pinned = isDesktop && !prefersReduced;
      setIsPinned(pinned);

      const track = trackRef.current;
      const hall = hallRef.current;

      if (pinned && track && hall) {
        const stage = hall.parentElement;
        if (stage) {
          const head = stage.querySelector(".tp-meet__head") as HTMLElement | null;
          const plates = Array.from(track.querySelectorAll(".tp-door__plate")) as HTMLElement[];
          const plateH = Math.max(64, ...plates.map((p) => p.offsetHeight || 64));
          const floorH = (hall.querySelector(".tp-meet__floor") as HTMLElement | null)?.offsetHeight ?? 0;
          const headH = head ? head.offsetTop + head.offsetHeight : 0;
          const doorW = Math.max(
            128,
            Math.min(
              256,
              0.15 * window.innerWidth,
              (stage.clientHeight - headH - floorH - plateH - 40) / 1.3
            )
          );
          hall.style.setProperty("--door-w", `${doorW.toFixed(0)}px`);
        }
        setMaxScrollX(Math.max(0, track.scrollWidth - window.innerWidth + 200));
      } else {
        hall?.style.removeProperty("--door-w");
        setMaxScrollX(0);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (hallRef.current?.parentElement) resizeObserver.observe(hallRef.current.parentElement);

    window.addEventListener("resize", updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Smooth scroll sync: tracks scroll position inside the pinned range and translates the track
  useEffect(() => {
    if (!isPinned) return;

    let targetX = 0;
    let currentX = 0;
    let animFrame: number;

    const onScroll = () => {
      const pinRange = pinRangeRef.current;
      if (!pinRange) return;

      const rect = pinRange.getBoundingClientRect();
      const scrollDist = pinRange.offsetHeight - window.innerHeight;
      if (scrollDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollDist));
      targetX = -progress * maxScrollX;
    };

    const render = () => {
      // Smooth lerp (interpolation) for silky inertia feel
      currentX += (targetX - currentX) * 0.18;

      const track = trackRef.current;
      const hall = hallRef.current;

      if (track) {
        track.style.transform = `translateX(${currentX.toFixed(2)}px)`;

        // Calculate 3D door opening state as doors cross center viewport
        const threshold = 0.38 * window.innerWidth;
        const doors = Array.from(track.children) as HTMLElement[];
        for (const door of doors) {
          if (door.classList.contains("tp-door--all")) continue;
          const doorLeft = door.offsetLeft + currentX;
          const isOpen = doorLeft < threshold;
          if (door.dataset.open !== String(isOpen)) {
            door.dataset.open = String(isOpen);
          }
        }
      }

      if (hall) {
        hall.style.setProperty("--floor-x", `${currentX.toFixed(1)}px`);
      }

      animFrame = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [isPinned, maxScrollX]);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-meet"
      data-pinned={isPinned ? "true" : undefined}
      style={{ "--sky-top": "#fff1d8", "--sky-bottom": "#fbe3b4" } as React.CSSProperties}
      aria-labelledby="meet-title"
    >
      <div
        ref={pinRangeRef}
        data-pin-range="true"
        style={{
          height: isPinned ? `calc(100vh + ${Math.round(0.85 * maxScrollX)}px)` : undefined,
          "--pinned": isPinned ? 1 : 0,
        } as React.CSSProperties}
      >
        <div className="tp-meet__stage">
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link className="btn btn-primary shrink-0" href="/puppies">
              See all available puppies
            </Link>
          </header>

          <div ref={hallRef} className="tp-meet__hall">
            <ol
              ref={trackRef}
              className="tp-meet__track"
              data-treadmill="true"
              aria-label="Puppies looking for a family"
            >
              {FEATURED_PUPS.map((pup, idx) => (
                <li
                  key={pup.id}
                  className="tp-door"
                  data-open={isPinned ? "false" : "true"}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).dataset.open = "true";
                  }}
                >
                  <Link
                    href={`/puppies/${pup.slug}`}
                    className="tp-door__link"
                    style={{ "--door": DOOR_COLORS[idx % DOOR_COLORS.length] } as React.CSSProperties}
                  >
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">{pup.name}</span>
                      <span className="tp-door__meta">
                        {pup.name !== pup.breed ? `${pup.breed}, ` : ""}
                        {pup.gender}
                        {pup.age ? `, ${pup.age}` : ""}
                        {pup.hasVideo ? ", with video" : ""}
                      </span>
                    </span>

                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img
                          alt={`${pup.name}, ${pup.breed} puppy`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 size-full object-cover"
                          sizes="(min-width: 1024px) 15rem, 44vw"
                          src={pup.image}
                        />
                      </span>

                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <svg
                            viewBox="0 0 64 64"
                            className="tp-door__peephole"
                            aria-hidden="true"
                            fill="currentColor"
                          >
                            <path d={PAW_PATH} />
                          </svg>
                          <span className="tp-door__knob"></span>
                        </span>
                      </span>

                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>
              ))}

              {/* End Door Card matching reference site */}
              <li className="tp-door tp-door--all" data-open="true">
                <Link href="/puppies" className="tp-door__link">
                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="font-plush tp-door__all">Meet them all &rarr;</span>
                  </span>
                </Link>
              </li>
            </ol>

            {/* Wooden Floor Planks matching reference site */}
            <div aria-hidden="true" className="tp-meet__floor"></div>

            {/* Authentic Animated Mascot Puppy on Treadmill */}
            <PupBuddy
              pose={isPinned ? "walk" : "sit"}
              act={isPinned ? "treadmill" : undefined}
              facing="right"
              className="tp-meet__teddy"
              strideSpeed={1.2}
              style={{
                bottom: "calc(var(--floor-h) - 8px)",
                zIndex: 20,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
