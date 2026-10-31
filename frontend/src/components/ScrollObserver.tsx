"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    // 1. IntersectionObserver for scroll-driven reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            entry.target.setAttribute("data-revealed", "true");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    // Target sections and animatable cards
    const targets = document.querySelectorAll(
      ".tp-scene, .tp-way, .tp-chat, .tp-post, .tp-letterform, .tp-door, .tp-polaroid, .tp-window, .tp-flight, [data-pup-scene]"
    );
    targets.forEach((el) => observer.observe(el));

    // 2. Parallax tilt & look effect for [data-pup-look] elements
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
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
