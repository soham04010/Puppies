import React, { Suspense } from "react";
import { Metadata } from "next";
import { getPuppies, getBreeds } from "@/lib/api";
import PuppiesClient from "./PuppiesClient";
import PupBuddy from "@/components/PupBuddy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available puppies in Dubai | TeddyPups U.A.E.",
  description:
    "Real photos of real teacup puppies available in our Dubai showroom or by import. Maltipoo, Pomeranian, Poodle and rare miniature breeds.",
  openGraph: {
    title: "Available puppies | TeddyPups Dubai",
    description:
      "Every listing shows real photos of the actual puppy. Meet them in Downtown Dubai or enquire on WhatsApp.",
  },
};

export default async function PuppiesPage() {
  const [puppies, breeds] = await Promise.all([getPuppies(), getBreeds()]);

  return (
    <div data-page="pups" className="tp-page">
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p
                className="font-scrawl text-lg text-toffee-ink"
                data-reveal="true"
              >
                from Teddy&apos;s sketchbook
              </p>
              <h1
                id="pups-title"
                className="font-plush text-giant tp-sketchbook__title"
                data-reveal="true"
              >
                Available puppies
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="tp-sketchbook__underline"
                >
                  <path
                    d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1"
                    pathLength={1}
                  />
                </svg>
              </h1>
              <p
                className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft"
                data-reveal="true"
              >
                Every listing shows real photos of the actual puppy. Open a profile
                to see them all, then ask us about them on WhatsApp.
              </p>
            </div>
            <div className="tp-sketchbook__self" data-reveal="true">
              <div className="pup-buddy" data-facing="left">
                <PupBuddy pose="sit" facing="left" />
              </div>
              <span className="font-scrawl tp-sketchbook__caption">
                self-portrait
              </span>
            </div>
          </div>

          <div className="mt-12">
            <Suspense
              fallback={
                <div className="py-12 text-center font-scrawl text-lg">
                  Opening Teddy&apos;s sketchbook…
                </div>
              }
            >
              <PuppiesClient initialPuppies={puppies} breeds={breeds} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
