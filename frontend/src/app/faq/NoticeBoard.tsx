"use client";

import React, { useState, useMemo, useId } from "react";
import PupBuddy from "@/components/PupBuddy";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const TILT_ANGLES = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const PIN_COLORS = [
  "var(--color-toffee)",
  "var(--color-sky-deep)",
  "#d9a13c",
  "#c45a6a",
];

function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const parts = text.split(
    new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  );
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 ? (
          <mark key={idx}>{part}</mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export default function NoticeBoard({
  faqs,
  askHref = "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%20about%20your%20puppies.",
}: {
  faqs: FAQItem[];
  askHref?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const inputId = useId();

  const qTrim = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!qTrim) return faqs;
    return faqs.filter((f) =>
      `${f.question} ${f.answer}`.toLowerCase().includes(qTrim)
    );
  }, [faqs, qTrim]);

  return (
    <div className="tp-notes" data-open={openId || qTrim ? "" : undefined}>
      <aside className="tp-notes__side" aria-label="Find a question">
        <label htmlFor={inputId} className="font-scrawl tp-notes__label">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="delivery, Korea, vaccinated…"
            autoComplete="off"
          />
        </div>
        <p className="tp-notes__count" aria-live="polite">
          {query.trim()
            ? `${filtered.length} ${filtered.length === 1 ? "note" : "notes"} found`
            : `${faqs.length} notes on the board`}
        </p>

        <div className="tp-notes__teddy">
          <span aria-hidden="true" className="tp-notes__bubble font-plush">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          <PupBuddy pose="sit" act="tilt" label="Teddy, reading the notes" />
        </div>

        <a
          href={askHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp tp-notes__ask"
        >
          Ask your own question
        </a>
      </aside>

      <div className="tp-notes__board">
        <ul className="tp-notes__list">
          {filtered.map((item, idx) => {
            const isUnfolded =
              openId === item.id ||
              (!!qTrim && item.answer.toLowerCase().includes(qTrim));

            return (
              <li
                key={item.id}
                className="tp-note"
                data-reveal="true"
                data-unfolded={isUnfolded || undefined}
                style={
                  {
                    "--tilt": `${TILT_ANGLES[idx % TILT_ANGLES.length]}deg`,
                    "--pin": PIN_COLORS[idx % PIN_COLORS.length],
                    "--i": idx,
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true" className="tp-note__pin" />
                <h2 className="tp-note__q">
                  <button
                    type="button"
                    id={`q-${item.id}`}
                    aria-expanded={isUnfolded}
                    aria-controls={`a-${item.id}`}
                    onClick={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                  >
                    <span className="font-plush-text">
                      <HighlightText text={item.question} query={query} />
                    </span>
                    <span aria-hidden="true" className="tp-note__chevron" />
                  </button>
                </h2>
                <div
                  id={`a-${item.id}`}
                  role="region"
                  aria-labelledby={`q-${item.id}`}
                  className="tp-note__answer"
                  inert={!isUnfolded}
                >
                  <div className="tp-note__flap">
                    <p>
                      <HighlightText text={item.answer} query={query} />
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {!filtered.length && (
          <div className="tp-note tp-note--empty">
            <span aria-hidden="true" className="tp-note__pin" />
            <p className="font-plush-text text-[1.2rem] font-bold">
              No note about “{query.trim()}” yet.
            </p>
            <p className="mt-2">
              <a
                href={askHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                Ask us on WhatsApp
              </a>{" "}
              and we&apos;ll answer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
