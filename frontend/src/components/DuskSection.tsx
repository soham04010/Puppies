"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PupBuddy from "@/components/PupBuddy";

const POLAROIDS = [
  {
    id: 1,
    title: "Lulu 🧸 with her new mummy ❤️",
    tilt: "-2.2deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--center",
    delay: "330ms",
    src: "/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg",
  },
  {
    id: 2,
    title: "Adorable Maltipoo baby 🧸❤️",
    tilt: "1.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape--left",
    delay: "0ms",
    src: "/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg",
  },
  {
    id: 3,
    title: "My new teddy puppy 🥰🧸",
    tilt: "-0.9deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape--right",
    delay: "550ms",
    src: "/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg",
  },
  {
    id: 4,
    title: "Our new puppies 🧸🥰🤗",
    tilt: "2.4deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--tl",
    hasDoubleTape: true,
    delay: "110ms",
    src: "/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg",
  },
  {
    id: 5,
    title: "New puppy 🧸😍",
    tilt: "-1.5deg",
    tape: "#e9dcc4",
    tapeClass: "tp-tape--center",
    delay: "660ms",
    src: "/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg",
  },
  {
    id: 6,
    title: "Gang of 3 😍🧸",
    tilt: "0.8deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape--right",
    delay: "220ms",
    src: "/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg",
  },
  {
    id: 7,
    title: "So happy 😍😍",
    tilt: "-2.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape--left",
    delay: "770ms",
    src: "/media/4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg",
  },
  {
    id: 8,
    title: "New pup 🤗💫",
    tilt: "1.2deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape--center",
    delay: "440ms",
    src: "/media/3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg",
  },
];

export default function DuskSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section
      data-pup-scene="true"
      data-tone="dark"
      className="tp-scene tp-dusk"
      style={{ "--sky-top": "#a65a30", "--sky-bottom": "#4d2b19" } as React.CSSProperties}
      aria-labelledby="dusk-title"
    >
      <div className="tp-dusk__sky gutter">
        <div className="tp-dusk__head">
          <h2 id="dusk-title" className="font-plush text-huge">
            Happy families &amp; puppies
          </h2>
          <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>
        <figure className="tp-dusk__note">
          <blockquote className="font-plush-text">
            “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          </blockquote>
          <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
        </figure>
      </div>

      <div className="tp-photowall">
        <div className="tp-photowall__wall">
          <ul className="tp-photowall__prints" aria-label="Photos from TeddyPups families">
            {POLAROIDS.map((p, idx) => (
              <li
                key={p.id}
                data-reveal="true"
                style={{ "--d": p.delay } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="tp-photowall__print"
                  aria-label={`Open photo ${idx + 1} of 64: ${p.title}`}
                  onClick={() => setSelectedPhoto(p.src)}
                >
                  <span
                    className="tp-polaroid"
                    style={{
                      "--tilt": p.tilt,
                      "--tape": p.tape,
                      "--i": `${idx}`,
                    } as React.CSSProperties}
                  >
                    <span aria-hidden="true" className={`tp-tape ${p.tapeClass}`}></span>
                    {p.hasDoubleTape && (
                      <span aria-hidden="true" className="tp-tape tp-tape--tr"></span>
                    )}
                    <span className="tp-polaroid__photo">
                      <img
                        alt="A happy TeddyPups family with their new puppy"
                        loading="lazy"
                        width={433}
                        height={433}
                        decoding="async"
                        className="w-full h-auto object-cover"
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw"
                        src={p.src}
                      />
                    </span>
                    <span className="tp-polaroid__caption font-scrawl">{p.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="tp-facade__ground">
            <span aria-hidden="true" className="tp-facade__door"></span>
            <span aria-hidden="true" className="tp-lamp">
              <span className="tp-lamp__light"></span>
            </span>
            <Link className="btn btn-primary tp-facade__cta" href="/happy-families">
              See every happy family
            </Link>

            {/* Authentic Mascot Sitting at Dusk */}
            <PupBuddy
              pose="sit"
              facing="right"
              className="pup-stop tp-dusk__teddy"
            />
          </div>
        </div>
        <div aria-hidden="true" className="tp-street__pavement"></div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-[#fffdf8] p-4 shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-[#4a3728] text-white hover:bg-[#c2622b]"
            >
              ✕
            </button>
            <img
              src={selectedPhoto}
              alt="Teddy puppy with happy family"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
