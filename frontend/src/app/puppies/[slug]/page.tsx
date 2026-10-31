import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPuppyBySlug, getPuppies } from '@/lib/api';
import PuppyGallery from './PuppyGallery';
import LetterForm from '@/components/LetterForm';
import {
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Heart,
  Plane,
  Sparkles
} from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const puppies = await getPuppies();
  return puppies.map(p => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPuppyBySlug(slug);
  if (!result) return { title: 'Puppy Not Found | TeddyPups' };

  const { puppy } = result;
  return {
    title: `${puppy.name}, ${puppy.breed} puppy (${puppy.gender.toLowerCase()}) | TeddyPups U.A.E.`,
    description: `Meet ${puppy.name}, our adorable ${puppy.breed} available in Dubai. Vaccinated, dewormed, and health-certified with lifetime care.`,
    openGraph: {
      title: `${puppy.name} - ${puppy.breed} (${puppy.gender})`,
      description: `Teddy bear teacup ${puppy.breed} in Dubai.`,
      images: puppy.images?.[0] ? [{ url: puppy.images[0] }] : []
    }
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPuppyBySlug(slug);

  if (!result) {
    notFound();
  }

  const { puppy, prev, next } = result;

  const whatsappText = encodeURIComponent(
    `Hi TeddyPups! I'd love to know more about ${puppy.name} (${puppy.breed}).`
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#6a5340]">
          <Link href="/puppies" className="hover:text-[#4a3728] transition-colors">
            Available puppies
          </Link>
          <ChevronRight className="size-3 text-[#ebd9c3]" />
          <span className="font-semibold text-[#4a3728] truncate">{puppy.name}</span>
        </nav>

        {/* Top Grid: Gallery + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <PuppyGallery images={puppy.images} name={puppy.name} />
          </div>

          {/* Right Column: Specs & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f2be6b]/30 px-3 py-1 text-xs font-bold text-[#4a3728] mb-3">
                <Sparkles className="size-3 text-[#4a3728]" />
                <span>{puppy.status}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4a3728]">
                {puppy.name}
              </h1>
              <p className="font-scrawl text-sm text-[#e5a84b] mt-1 font-semibold">
                hello, it&apos;s me!
              </p>

              {/* Specs Table */}
              <div className="mt-6 rounded-2xl border border-[#ebd9c3] bg-white p-6 shadow-xs divide-y divide-[#fbf7ee]">
                <div className="flex justify-between py-3 text-sm">
                  <span className="font-medium text-[#6a5340]">Breed</span>
                  <span className="font-serif font-bold text-[#4a3728]">{puppy.breed}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="font-medium text-[#6a5340]">Boy or girl</span>
                  <span className="font-serif font-bold text-[#4a3728]">{puppy.gender}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="font-medium text-[#6a5340]">Age</span>
                  <span className="font-serif font-bold text-[#4a3728]">{puppy.age}</span>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <span className="font-medium text-[#6a5340]">Where</span>
                  <span className="font-serif font-bold text-[#4a3728]">{puppy.origin}</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`https://wa.me/971541676733?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#20ba59] transition-all active:scale-98"
                >
                  <MessageCircle className="size-5 fill-white" />
                  <span>Ask about this puppy on WhatsApp</span>
                </a>

                <a
                  href="#enquire"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#ebd9c3] bg-white py-3.5 text-sm font-semibold text-[#4a3728] hover:bg-[#fbf7ee] transition-all"
                >
                  <span>Send an enquiry</span>
                </a>
              </div>
            </div>

            {/* Inclusions Box */}
            <div className="rounded-2xl border border-[#ebd9c3] bg-[#fbf7ee] p-6">
              <h3 className="font-serif text-base font-bold text-[#4a3728] flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#f2be6b]" />
                <span>Every Teddy Pup comes</span>
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-[#6a5340]">
                {puppy.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-[#f2be6b]" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: The Way Home Roadmap */}
        <section className="mt-20 border-t border-[#ebd9c3] pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              the way home
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#4a3728] mt-1">
              Coming home from abroad or showroom
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-[#ebd9c3] bg-white p-6 text-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#fbf7ee] text-xs font-serif font-bold text-[#4a3728] mx-auto mb-3 border border-[#ebd9c3]">
                1
              </span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Reserve your puppy</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                Tell us which puppy has captured your heart and secure your reservation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#ebd9c3] bg-white p-6 text-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#fbf7ee] text-xs font-serif font-bold text-[#4a3728] mx-auto mb-3 border border-[#ebd9c3]">
                2
              </span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Personalized consultation</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                We finalize details with you and share live photos &amp; health updates.
              </p>
            </div>

            <div className="rounded-2xl border border-[#ebd9c3] bg-white p-6 text-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#fbf7ee] text-xs font-serif font-bold text-[#4a3728] mx-auto mb-3 border border-[#ebd9c3]">
                3
              </span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Health check &amp; arrival</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                We manage vet checks, travel documentation, and climate-controlled flight transport.
              </p>
            </div>

            <div className="rounded-2xl border border-[#ebd9c3] bg-white p-6 text-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#fbf7ee] text-xs font-serif font-bold text-[#4a3728] mx-auto mb-3 border border-[#ebd9c3]">
                4
              </span>
              <h4 className="font-serif text-base font-bold text-[#4a3728]">Welcome home</h4>
              <p className="mt-2 text-xs text-[#6a5340]">
                We help your new companion settle in smoothly with 24/7 care support.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Letterform Inquiry Component */}
        <section id="enquire" className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-scrawl text-sm text-[#e5a84b] uppercase tracking-wider font-semibold">
              dear TeddyPups…
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#4a3728] mt-1">
              Ask about {puppy.name}
            </h2>
          </div>

          <LetterForm
            puppyId={puppy.id}
            puppyName={puppy.name}
            defaultMessage={`Hi! I'd love to know more about ${puppy.name} (${puppy.breed}).`}
          />
        </section>

        {/* Section 4: Prev & Next Puppy Navigation */}
        <div className="mt-20 flex items-center justify-between border-t border-[#ebd9c3] pt-8 text-sm">
          {prev.slug ? (
            <Link
              href={`/puppies/${prev.slug}`}
              className="flex items-center gap-2 font-medium text-[#4a3728] hover:text-[#e5a84b] transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Previous pup: {prev.name}</span>
            </Link>
          ) : (
            <div />
          )}

          {next.slug && (
            <Link
              href={`/puppies/${next.slug}`}
              className="flex items-center gap-2 font-medium text-[#4a3728] hover:text-[#e5a84b] transition-colors"
            >
              <span>Next pup: {next.name}</span>
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
