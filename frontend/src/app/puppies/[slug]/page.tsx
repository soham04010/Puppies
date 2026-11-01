import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPuppyBySlug, getPuppies } from "@/lib/api";
import PuppyGallery from "./PuppyGallery";
import StoryRibbon from "./StoryRibbon";
import LetterForm from "@/components/LetterForm";
import PupBuddy from "@/components/PupBuddy";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const puppies = await getPuppies();
  return puppies.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPuppyBySlug(slug);
  if (!result) return { title: "Puppy Not Found | TeddyPups" };

  const { puppy } = result;
  const name = puppy.displayName || puppy.name;
  return {
    title: `${name}, ${puppy.breed} puppy (${puppy.genderLabel.toLowerCase()}) | TeddyPups U.A.E.`,
    description: `Meet ${name}, our adorable ${puppy.breed} teacup puppy. Vaccinated, microchipped, and vet-checked in Dubai.`,
    openGraph: {
      title: `${name} - ${puppy.breed} | TeddyPups Dubai`,
      description: `Teddy bear teacup ${puppy.breed} puppy in Dubai.`,
      images: puppy.cover?.url ? [{ url: puppy.cover.url }] : [],
    },
  };
}

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPuppyBySlug(slug);

  if (!result) {
    notFound();
  }

  const { puppy, prev, next } = result;
  const name = puppy.displayName || puppy.name;
  const coverColor = puppy.cover?.color || "#785838";

  const whatsappHref = `https://wa.me/971541676733?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${name} (${puppy.breed}). Could you share more details and availability?`
  )}`;

  const prevCover = prev.cover?.url || prev.images?.[0] || "";
  const nextCover = next.cover?.url || next.images?.[0] || "";

  const statusChipText =
    puppy.status === "rehomed"
      ? "Gone home"
      : puppy.status === "reserved"
      ? "Reserved"
      : "Available now";

  return (
    <div data-page="pup" className="tp-page">
      <article
        className="tp-storybook"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${coverColor} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
        }}
      >
        <StoryRibbon />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Puppies",
                  item: "https://puppy.instabizweb.com/puppies",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: name,
                  item: `https://puppy.instabizweb.com/puppies/${puppy.slug}`,
                },
              ],
            }),
          }}
        />

        <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-[0.95rem] font-semibold text-cocoa-soft"
          >
            <Link className="link-ink" href="/puppies">
              Available puppies
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{name}</span>
          </nav>

          {/* Chapter 1: hello, it's me */}
          <p className="tp-chapter">
            <span aria-hidden="true" className="tp-chapter__n font-plush">
              1
            </span>
            <span className="font-scrawl">hello, it&apos;s me</span>
          </p>

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Gallery Column */}
            <div className="min-w-0 lg:col-span-7">
              <PuppyGallery name={name} media={puppy.media} />
            </div>

            {/* Profile Board Column */}
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                <div
                  className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20 relative"
                  data-reveal="true"
                >
                  <span aria-hidden="true" className="tp-tag__ring"></span>

                  {/* Teddy peeking over the tag */}
                  <div
                    className="pup-buddy absolute -top-[4.8rem] right-6 w-[9.5rem]"
                    data-facing="right"
                  >
                    <PupBuddy pose="peek" facing="right" />
                  </div>

                  <span className="chip">
                    <svg
                      viewBox="0 0 64 64"
                      className="size-4 text-toffee"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d={PAW_PATH} />
                    </svg>
                    {statusChipText}
                  </span>

                  <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                    {name}
                  </h1>
                  <p className="mt-2 text-lg font-semibold text-cocoa-soft">
                    {puppy.breed}
                  </p>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        Breed
                      </dt>
                      <dd className="font-semibold">{puppy.breed}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        Boy or girl
                      </dt>
                      <dd className="font-semibold">{puppy.genderLabel}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        Age
                      </dt>
                      <dd className="font-semibold">{puppy.age}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        Ready
                      </dt>
                      <dd className="font-semibold">Immediately</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">
                        Origin
                      </dt>
                      <dd className="font-semibold">
                        {puppy.origin?.name || "In showroom"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp flex-1"
                    >
                      Enquire on WhatsApp
                    </a>
                    <a
                      href={`#enquire-${puppy.slug}`}
                      className="btn btn-ghost flex-1 text-center"
                    >
                      Write to concierge
                    </a>
                  </div>
                </div>

                {/* Chapter 2: what comes with [Name] */}
                <div className="tp-paper mt-8 -rotate-1 rounded-[1.8rem] border-[3px] border-cocoa bg-milk p-6">
                  <p className="tp-chapter">
                    <span className="tp-chapter__n font-plush">2</span>
                    <span className="font-scrawl">
                      what comes with {name}
                    </span>
                  </p>
                  <p className="font-plush mt-3 text-[1.4rem]">
                    Every Teddy Pup comes
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[0.95rem] font-semibold text-cocoa-soft">
                    <li className="flex items-center gap-2">
                      <span className="text-toffee-deep">✓</span> Verified UAE veterinary health certificate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-toffee-deep">✓</span> Up to date vaccinations &amp; internal deworming
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-toffee-deep">✓</span> UAE microchip registered with official database
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-toffee-deep">✓</span> Starter premium nutrition &amp; transition bundle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-toffee-deep">✓</span> 24/7 lifetime concierge support &amp; guidance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3: Letter to Concierge */}
          <section
            id={`enquire-${puppy.slug}`}
            aria-labelledby={`enquire-title-${puppy.slug}`}
            className="tp-letter mt-20 grid gap-10 lg:grid-cols-12 relative"
          >
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg
                viewBox="0 0 64 64"
                className="size-9"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d={PAW_PATH} />
              </svg>
            </span>
            <div className="lg:col-span-4">
              <p className="tp-chapter">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  3
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h2
                id={`enquire-title-${puppy.slug}`}
                className="font-plush text-big mt-2"
              >
                Ask about {name}
              </h2>
              <p className="mt-4 text-cocoa-soft">
                Leave your details and our team will get back to you promptly — or
                message us on WhatsApp for the quickest reply.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <LetterForm
                puppyId={puppy.id}
                puppyName={name}
                whatsappHref={whatsappHref}
              />
            </div>
          </section>

          {/* More Puppies Navigation */}
          <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1"
              href={`/puppies/${prev.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                {prevCover && (
                  <Image
                    src={prevCover}
                    alt={prev.displayName || prev.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">
                  Previous pup
                </span>
                <span className="font-plush text-[1.6rem]">
                  {prev.displayName || prev.name}
                </span>
              </span>
            </Link>

            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right"
              href={`/puppies/${next.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                {nextCover && (
                  <Image
                    src={nextCover}
                    alt={next.displayName || next.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">
                  Next pup
                </span>
                <span className="font-plush text-[1.6rem]">
                  {next.displayName || next.name}
                </span>
              </span>
            </Link>
          </nav>
        </div>
      </article>
    </div>
  );
}
