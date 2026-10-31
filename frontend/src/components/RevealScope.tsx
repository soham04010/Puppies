"use client";

import React, { useEffect, useRef } from "react";

export default function RevealScope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rootEl.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).dataset.revealed = "true";
      });
      return;
    }

    const unrevealedElements = new Set<Element>();

    const reveal = (el: Element) => {
      (el as HTMLElement).dataset.revealed = "true";
      observer.unobserve(el);
    };

    const isCurtainDown = () => {
      const curtain = document.querySelector(".tp-curtain");
      if (!curtain) return false;
      const state = (curtain as HTMLElement).dataset.state;
      return (
        state === "intro" ||
        state === "covering" ||
        state === "covered" ||
        state === "snap"
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          if (isCurtainDown()) {
            unrevealedElements.add(target);
          } else {
            reveal(target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    const observeEl = (el: Element) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.dataset.armed) {
        observer.observe(htmlEl);
        return;
      }
      const rect = htmlEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !isCurtainDown()) {
        htmlEl.dataset.revealed = "true";
        return;
      }
      htmlEl.dataset.armed = "true";
      observer.observe(htmlEl);
    };

    rootEl.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(observeEl);

    const mutationObserver = new MutationObserver(() => {
      rootEl.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(observeEl);
    });

    mutationObserver.observe(rootEl, { childList: true, subtree: true });

    // When the intro curtain lifts, release any queued unrevealed elements
    const handleCurtainLifted = () => {
      unrevealedElements.forEach(reveal);
      unrevealedElements.clear();
    };

    window.addEventListener("tp:arrived", handleCurtainLifted);
    const curtainTimer = setTimeout(handleCurtainLifted, 1500);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("tp:arrived", handleCurtainLifted);
      clearTimeout(curtainTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
