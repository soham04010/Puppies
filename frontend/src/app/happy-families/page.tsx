import React from "react";
import type { Metadata } from "next";
import HappyFamiliesWall from "./HappyFamiliesWall";
import PupBuddy from "@/components/PupBuddy";
import polaroidsData from "@/data/authentic_polaroids.json";

export const metadata: Metadata = {
  title: "Happy families — TeddyPups U.A.E.",
  description:
    "Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.",
};

export default function HappyFamiliesPage() {
  return (
    <div data-page="families" className="tp-page">
      <section aria-labelledby="families-title" className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-memories__head">
            <div>
              <p
                className="font-scrawl text-lg text-toffee-ink"
                data-reveal="true"
              >
                our wall of happy endings
              </p>
              <h1
                id="families-title"
                className="font-plush text-giant tp-memories__title"
                data-reveal="true"
              >
                Happy families
                <svg
                  viewBox="0 0 48 44"
                  className="tp-memories__heart"
                  aria-hidden="true"
                >
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
              <p
                className="text-lede mt-6 max-w-[50ch] text-cocoa-soft"
                data-reveal="true"
              >
                Nothing makes us happier than seeing our puppies in loving homes!
                Here are some beautiful moments shared by our amazing clients
                after welcoming their furry friends.
              </p>
              <p
                className="font-scrawl mt-5 text-lg text-toffee-ink"
                data-reveal="true"
              >
                {polaroidsData.length} moments and counting
              </p>
            </div>

            <figure className="tp-memories__note" data-reveal="true">
              <span
                aria-hidden="true"
                className="tp-tape tp-tape--center"
                style={{ "--tape": "#cfe5f6" } as React.CSSProperties}
              />
              <blockquote className="font-plush-text">
                “TeddyPups truly made our dream a reality. They supported us at
                every step of the import journey. Our Maltipoo arrived healthy,
                cheerful, and absolutely perfect. Having 24/7 support throughout
                the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl">
                Sarah M., Dubai, UAE
              </figcaption>
            </figure>
          </div>

          <div className="mt-16 md:mt-20">
            <HappyFamiliesWall polaroids={polaroidsData} />
          </div>

          <div className="tp-memories__foot">
            <PupBuddy
              pose="sit"
              facing="left"
              label="Teddy, admiring the wall"
              className="w-36 md:w-44"
            />
            <span className="tp-moon" aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  );
}
