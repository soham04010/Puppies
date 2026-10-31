"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const unrevealedElements = new Set<Element>();

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

    const reveal = (el: Element) => {
      const htmlEl = el as HTMLElement;
      htmlEl.dataset.revealed = "true";
      htmlEl.classList.add("is-revealed");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          if (isCurtainDown()) {
            unrevealedElements.add(target);
          } else {
            reveal(target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      }
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
        htmlEl.classList.add("is-revealed");
        return;
      }
      htmlEl.dataset.armed = "true";
      observer.observe(htmlEl);
    };

    // Find all reveal targets across the page
    const registerTargets = () => {
      document
        .querySelectorAll(
          "[data-reveal]:not([data-revealed]), .tp-scene, .tp-way, .tp-chat, .tp-post, .tp-letterform, .tp-door, .tp-polaroid, .tp-window, .tp-flight, [data-pup-scene]"
        )
        .forEach(observeEl);
    };

    registerTargets();

    const mutationObserver = new MutationObserver(() => {
      registerTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const onCurtainLifted = () => {
      unrevealedElements.forEach(reveal);
      unrevealedElements.clear();
    };

    window.addEventListener("tp:arrived", onCurtainLifted);
    const fallbackTimer = setTimeout(onCurtainLifted, 1500);

    // Parallax pupil/mascot tracking
    const handleMouseMove = (e: MouseEvent) => {
      const lookers = document.querySelectorAll<HTMLElement>("[data-pup-look='true']");
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      lookers.forEach((el) => {
        const tiltX = mouseY * -6;
        const tiltY = mouseX * 6;
        el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("tp:arrived", onCurtainLifted);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}
