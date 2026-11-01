"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import confetti from "canvas-confetti";
import { submitEnquiry } from "@/lib/api";

export interface PuppyOption {
  id: string;
  label: string;
}

export interface LetterFormSuccess {
  heading: string;
  body: string;
}

export interface LetterFormProps {
  puppies?: PuppyOption[];
  puppyId?: string;
  puppyName?: string;
  defaultPuppyId?: string;
  defaultMessage?: string;
  whatsappHref?: string;
  success?: LetterFormSuccess;
}

const DEFAULT_PUPPIES: PuppyOption[] = [
  { id: "4218427a-dd65-4b09-a089-584b912aa7ab", label: "Max (Maltipoo, boy)" },
  { id: "0abcf3f5-0080-44c1-b1e1-2a2de24a3cf4", label: "Korean Teacup Maltipoo (girl)" },
  { id: "c5d2cf3c-51e8-4ecf-ac94-97ef8fceb6ec", label: "Korean Teacup Poodle (girl)" },
  { id: "9cb7d6db-bf35-4e63-8e61-ca63e1925dbd", label: "Maltipoo & Cavapoo (boy)" },
  { id: "b39adb3f-eace-45af-a2e8-425de01ffc50", label: "Toy Poodle (boy & girl)" },
  { id: "027d7333-a8b2-49de-9bbc-9a47af88ebac", label: "Maltipoo (girl)" },
  { id: "ec3a42bf-bd62-46ba-962d-8f94f09715c5", label: "Pomeranian (girl)" },
  { id: "e486e544-f1fd-48f9-8ba0-f556d7ee44e7", label: "Copper (Cavapoo, boy)" },
  { id: "d2d146b2-6454-4e05-967a-87f2ab02946d", label: "Shih Tzu (girl)" },
  { id: "0fe92eee-1937-48e1-b48b-77292a6f25d8", label: "Shih Tzu (boy)" },
  { id: "0deaea0d-1c0e-4e85-868b-3c7376358e03", label: "Maltipoo (girl)" },
  { id: "cbfa8ebd-7e0c-4818-b0ec-144ede4d3352", label: "Maltipoo (girl)" },
  { id: "35d5e8bd-bebb-41c7-b0a9-256482edb3c8", label: "Korean Teacup Pomeranian (girl)" },
  { id: "9fd5c518-a1ce-46d4-b9a4-8fb9714717f4", label: "Korean Teacup Pomeranian (girl)" },
  { id: "e838ce49-59e0-4f3e-ab83-55cd2d98d2a2", label: "Korean Teacup Pomeranian (boy)" },
];

const DEFAULT_SUCCESS: LetterFormSuccess = {
  heading: "Message received!",
  body: "Thank you — our team will get back to you promptly. For the quickest reply, message us on WhatsApp.",
};

export default function LetterForm({
  puppies = DEFAULT_PUPPIES,
  puppyId,
  puppyName,
  defaultPuppyId,
  defaultMessage = "",
  whatsappHref = "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.",
  success = DEFAULT_SUCCESS,
}: LetterFormProps) {
  const initialPuppyId = puppyId || defaultPuppyId || "";
  const initialMsg =
    defaultMessage || (puppyName ? `Hi! I'd love to know more about ${puppyName}.` : "");

  const [phase, setPhase] = useState<"writing" | "sealing" | "posting" | "sent">("writing");
  const [minHeight, setMinHeight] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    puppyId: initialPuppyId,
    message: initialMsg,
    website: "", // honeypot
  });

  const formBoxRef = useRef<HTMLDivElement>(null);
  const sentBoxRef = useRef<HTMLDivElement>(null);
  const selectId = useId();
  const textareaId = useId();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot check
    if (formData.website) return;

    // Validation
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = "Please enter a valid phone number";
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMessage("Please complete the required details on your letter.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Lock height so there is no layout jump
    if (formBoxRef.current) {
      setMinHeight(formBoxRef.current.offsetHeight);
    }

    setPhase("sealing");

    const apiPromise = submitEnquiry({
      ...formData,
      source: initialPuppyId ? "puppy-detail" : "contact-page",
    }).catch(() => null);

    setTimeout(() => {
      setPhase("posting");
    }, 750);

    setTimeout(async () => {
      await apiPromise;
      setMinHeight(undefined);
      setPhase("sent");
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 1750);
  };

  useEffect(() => {
    if (phase === "sent" && sentBoxRef.current) {
      sentBoxRef.current.focus({ preventScroll: true });
    }
  }, [phase]);

  return (
    <div
      ref={formBoxRef}
      className="tp-post"
      data-phase={phase}
      style={{ minHeight }}
    >
      {phase !== "sent" && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="tp-letterform"
          aria-hidden={phase !== "writing" ? true : undefined}
          inert={phase !== "writing"}
        >
          {/* Paw Stamp */}
          <span aria-hidden="true" className="tp-letter__stamp">
            <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </span>

          <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

          {errorMessage && (
            <div role="alert" className="tp-letterform__alert">
              <p className="font-semibold">{errorMessage}</p>
              {Object.keys(fieldErrors).length > 0 && (
                <ul>
                  {Object.entries(fieldErrors).map(([k, err]) => (
                    <li key={k}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <p className="tp-letterform__line">
            my name is{" "}
            <span className="tp-blank" style={{ "--size": "16ch" } as React.CSSProperties}>
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
            , and you can reach me on{" "}
            <span className="tp-blank" style={{ "--size": "15ch" } as React.CSSProperties}>
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
            </span>{" "}
            or by email at{" "}
            <span className="tp-blank" style={{ "--size": "20ch" } as React.CSSProperties}>
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
            I live in{" "}
            <span className="tp-blank" style={{ "--size": "13ch" } as React.CSSProperties}>
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
            , and I&apos;m curious about{" "}
            <span className="tp-blank tp-blank--select">
              <label htmlFor={selectId} className="sr-only">
                Puppy you&apos;re interested in (optional)
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
            placeholder="Anything else you'd like to tell us…"
            className="tp-letterform__note"
            value={formData.message}
            onChange={handleInputChange}
          />

          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                name="website"
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
              {isSubmitting ? "Sealing the envelope…" : "Post my letter"}
            </button>
          </div>
        </form>
      )}

      {/* Sealing & Posting Animated Mailbox Scene */}
      {(phase === "sealing" || phase === "posting") && (
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

      {/* Sent Success State */}
      {phase === "sent" && (
        <div ref={sentBoxRef} tabIndex={-1} role="status" className="tp-post__sent">
          <svg viewBox="0 0 200 150" aria-hidden="true" className="tp-post__box tp-post__box--sent">
            <rect x="86" y="96" width="28" height="52" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
            <path d="M30 50a70 44 0 0 1 140 0v52H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
            <rect x="58" y="58" width="84" height="12" rx="6" fill="#2a170e" />
            <path d="M170 92V22" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
            <path d="M170 22h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
          </svg>
          <p className="font-plush mt-4 text-[2rem]">{success.heading}</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">{success.body}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-6"
          >
            WhatsApp us
          </a>
        </div>
      )}
    </div>
  );
}
