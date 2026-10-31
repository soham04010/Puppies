'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import confetti from 'canvas-confetti';
import { submitEnquiry } from '@/lib/api';

interface PuppyOption {
  id: string;
  label: string;
}

interface LetterFormProps {
  puppies?: PuppyOption[];
  puppyId?: string;
  puppyName?: string;
  defaultPuppyId?: string;
  defaultMessage?: string;
  whatsappHref?: string;
}

const DEFAULT_PUPPIES: PuppyOption[] = [
  { id: 'maltipoo-max-male', label: 'Max (Maltipoo, boy)' },
  { id: 'korean-teacup-maltipoo-female', label: 'Korean Teacup Maltipoo (girl)' },
  { id: 'korean-teacup-poodle-female', label: 'Korean Teacup Poodle (girl)' },
  { id: 'maltipoo-cavapoo-boy', label: 'Maltipoo & Cavapoo (boy)' },
  { id: 'toy-poodle-boy-girl', label: 'Toy Poodle (boy & girl)' },
  { id: 'copper-cavapoo-boy', label: 'Copper (Cavapoo, boy)' },
  { id: 'shih-tzu-girl', label: 'Shih Tzu (girl)' },
  { id: 'pomeranian-girl', label: 'Pomeranian (girl)' }
];

export default function LetterForm({
  puppies = DEFAULT_PUPPIES,
  puppyId,
  puppyName,
  defaultPuppyId,
  defaultMessage = '',
  whatsappHref = "https://wa.me/971541676733?text=Hi%20TeddyPups%20concierge!%20I'd%20love%20to%20learn%20more%20about%20your%20puppies."
}: LetterFormProps) {
  const initialPuppyId = puppyId || defaultPuppyId || '';
  const initialMsg = defaultMessage || (puppyName ? `Hi! I'd love to know more about ${puppyName}.` : '');
  const [phase, setPhase] = useState<'writing' | 'sealing' | 'posting' | 'sent'>('writing');
  const [minHeight, setMinHeight] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: initialPuppyId,
    message: initialMsg,
    website: '' // honeypot
  });

  const formBoxRef = useRef<HTMLDivElement>(null);
  const sentBoxRef = useRef<HTMLDivElement>(null);
  const selectId = useId();
  const textareaId = useId();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMessage('Please complete the required details on your letter.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Lock height to avoid jump during animations
    if (formBoxRef.current) {
      setMinHeight(formBoxRef.current.offsetHeight);
    }

    // Sequence the envelope and mailbox animations
    setPhase('sealing');

    // Make live API request in parallel
    const apiPromise = submitEnquiry({
      ...formData,
      source: initialPuppyId ? 'puppy-detail' : 'contact-page'
    });

    // Phase transitions
    setTimeout(() => {
      setPhase('posting');
    }, 750);

    setTimeout(async () => {
      await apiPromise;
      setMinHeight(undefined);
      setPhase('sent');
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1750);
  };

  useEffect(() => {
    if (phase === 'sent' && sentBoxRef.current) {
      sentBoxRef.current.focus({ preventScroll: true });
    }
  }, [phase]);

  return (
    <div className="relative">
      <div
        ref={formBoxRef}
        className="tp-post"
        data-phase={phase}
        style={{ minHeight }}
      >
        {phase !== 'sent' && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="tp-letterform"
            aria-hidden={phase !== 'writing' ? true : undefined}
            inert={phase !== 'writing' ? true : undefined}
          >
            {/* Postal Stamp with Paw Print */}
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>

            <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

            {errorMessage && (
              <div role="alert" className="tp-letterform__alert mb-4 text-xs font-semibold text-red-600">
                <p>{errorMessage}</p>
              </div>
            )}

            <p className="tp-letterform__line">
              my name is{' '}
              <span className="tp-blank" style={{ '--size': '16ch' } as React.CSSProperties}>
                <input
                  name="name"
                  aria-label="Your name (required)"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-invalid={!!fieldErrors.name || undefined}
                />
              </span>
              , and you can reach me on{' '}
              <span className="tp-blank" style={{ '--size': '15ch' } as React.CSSProperties}>
                <input
                  name="phone"
                  aria-label="Phone or WhatsApp number with country code (required)"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  aria-invalid={!!fieldErrors.phone || undefined}
                />
              </span>
              {' '}or by email at{' '}
              <span className="tp-blank" style={{ '--size': '20ch' } as React.CSSProperties}>
                <input
                  name="email"
                  aria-label="Email (optional)"
                  type="email"
                  autoComplete="email"
                  placeholder="optional"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </span>
              .
            </p>

            <p className="tp-letterform__line">
              I live in{' '}
              <span className="tp-blank" style={{ '--size': '13ch' } as React.CSSProperties}>
                <input
                  name="area"
                  aria-label="Your area (optional)"
                  autoComplete="address-level2"
                  maxLength={80}
                  placeholder="e.g. Dubai Marina"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </span>
              , and I&#39;m curious about{' '}
              <span className="tp-blank tp-blank--select">
                <label htmlFor={selectId} className="sr-only">
                  Puppy you&#39;re interested in (optional)
                </label>
                <select
                  id={selectId}
                  name="puppyId"
                  value={formData.puppyId}
                  onChange={handleInputChange}
                >
                  <option value="">any puppy (not sure yet)</option>
                  {puppies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </span>
              .
            </p>

            <label htmlFor={textareaId} className="sr-only">
              Your message (optional)
            </label>
            <textarea
              id={textareaId}
              name="message"
              rows={4}
              maxLength={2000}
              placeholder="Anything else you&#39;d like to tell us..."
              className="tp-letterform__note"
              value={formData.message}
              onChange={handleInputChange}
            />

            {/* Honeypot anti-spam */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="tp-letterform__sign">
              <p className="font-scrawl">with love, a future puppy parent</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary disabled:opacity-70"
              >
                {phase === 'sealing'
                  ? 'Sealing the envelope...'
                  : phase === 'posting'
                  ? 'Posting to mailbox...'
                  : 'Post my letter'}
              </button>
            </div>
          </form>
        )}

        {/* Sealing & Posting Animation Scene */}
        {(phase === 'sealing' || phase === 'posting') && (
          <div aria-hidden="true" className="tp-post__scene">
            <svg viewBox="0 0 160 112" className="tp-post__envelope">
              <rect x="4" y="18" width="152" height="90" rx="6" fill="#fffdf8" stroke="#2a170e" strokeWidth="4" />
              <path d="M6 104 64 62M154 104 96 62" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
              <path className="tp-post__flap" d="M6 22 80 74 154 22" fill="#fbe3b4" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
              <circle cx="80" cy="72" r="11" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" />
            </svg>
            <svg viewBox="0 0 200 260" className="tp-post__box">
              <rect x="86" y="170" width="28" height="86" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
              <path d="M30 70a70 54 0 0 1 140 0v104H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
              <rect x="58" y="86" width="84" height="14" rx="7" fill="#2a170e" />
              <path d="M44 128h112" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" opacity=".35" />
              <g className="tp-post__flag">
                <path d="M170 120V64" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
                <path d="M170 64h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        )}

        {/* Confirmation Screen */}
        {phase === 'sent' && (
          <div ref={sentBoxRef} tabIndex={-1} role="status" className="tp-post__sent">
            <svg viewBox="0 0 200 150" aria-hidden="true" className="tp-post__box tp-post__box--sent">
              <rect x="86" y="96" width="28" height="52" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
              <path d="M30 50a70 44 0 0 1 140 0v52H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
              <rect x="58" y="58" width="84" height="12" rx="6" fill="#2a170e" />
              <path d="M170 92V22" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
              <path d="M170 22h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
            </svg>
            <p className="font-plush mt-4 text-[2rem]">Letter posted!</p>
            <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">
              We received your note and will be in touch shortly. You can also message us directly on WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                WhatsApp us
              </a>
              <button
                type="button"
                onClick={() => {
                  setPhase('writing');
                  setFormData((prev) => ({ ...prev, name: '', phone: '', email: '' }));
                }}
                className="btn btn-ghost"
              >
                Write another note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sitting Teddy Mascot */}
      <div className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40" data-facing="left">
        <svg viewBox="0 0 300 240" style={{ "overflow": "visible" }} role="img" aria-label="Teddy, waiting for your letter" focusable="false"><g data-p="root" transform="translate(300 0) scale(-1 1)"><ellipse data-p="shadow" cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity="0.12" transform="translate(0 0) scale(1 1)" style={{ "transformBox": "fill-box", "transformOrigin": "center" }} /><g data-p="body" transform="translate(0 -2) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)" opacity="1"><g data-p="bf" transform="translate(94 192) rotate(0)" opacity="0"><path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" /><path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g><g data-p="ff" transform="translate(168 192) rotate(24)"><path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" /><path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g><g data-p="tail" transform="rotate(34 84 150)"><path d="M86 152 C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /></g><g data-p="bn" transform="translate(110 194) rotate(0)" opacity="0"><path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" /><path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g><path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><g data-p="fn" transform="translate(186 194) rotate(24)"><path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" /><path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g></g><g data-p="haunch" opacity="1" transform="translate(0 1.44)"><path d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><path d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><path d="M132 222v5M139 222v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g><g data-p="head" transform="translate(-10 -6) rotate(0 212 100)"><path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" /><path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" /><path data-p="earL" d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(0 174 82)" /><path data-p="earR" d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(0 250 82)" /><path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" /><path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" /><circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" /><circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" /><g data-p="eyes" transform="translate(0 0)"><g data-p="open" opacity="1"><g data-p="blink" transform="translate(0 0) scale(1 1)"><ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" /><ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" /><circle cx="196.6" cy="94.6" r="2.7" fill="#fff" /><circle cx="232.6" cy="94.6" r="2.7" fill="#fff" /><circle cx="192" cy="101.2" r="1.2" fill="#fff" /><circle cx="228" cy="101.2" r="1.2" fill="#fff" /></g></g></g><path data-p="happy" d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" opacity="0" /><path data-p="shut" d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" opacity="0" /><path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" /><path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" /><path data-p="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" opacity="1" /><g data-p="mouth" opacity="0"><path d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z" fill="#6b2a1c" stroke="#2a170e" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" /><path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" /></g></g><g data-p="ledge" opacity="0"><path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" /><path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" /></g></g></svg>
      </div>
    </div>
  );
}
