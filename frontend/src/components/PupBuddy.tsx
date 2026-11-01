"use client";

import React, { useRef, useEffect } from "react";
import { PupSvg, Puppet } from "@/components/PupJourney";

interface PupBuddyProps {
  pose?: "sit" | "walk" | "stand" | "peek" | "happy" | "bow" | "snug";
  facing?: "left" | "right";
  act?: "treadmill" | "tilt" | "basket";
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  strideSpeed?: number;
  walkProgress?: number;
  isWalking?: boolean;
  asStop?: boolean;
}

export default function PupBuddy({
  pose = "sit",
  facing = "right",
  act,
  className = "",
  style,
  label = "Teddy, the TeddyPups puppy",
  asStop = false,
}: PupBuddyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bubble = bubbleRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    const dir = facing === "left" ? -1 : 1;
    const puppet = new Puppet(svg as unknown as SVGElement, pose, dir);
    puppet.face(dir);
    puppet.wag(pose === "snug" ? 0.25 : 0.6);

    let animId: number;
    let lastTime = performance.now() / 1000;
    let idleTimer = lastTime;
    let speechUntil = 0;
    let mouseTarget: { x: number; y: number; t: number } | null = null;
    let isIntersecting = false;

    const loop = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      // Look at cursor if recently active
      if (mouseTarget && now - mouseTarget.t < 3) {
        puppet.lookAt(mouseTarget);
      } else {
        puppet.lookAt(null);
      }

      // Act behaviors
      if (act === "tilt") {
        puppet.cock(
          Math.sin(0.9 * now) > 0.35 ? 13 : Math.sin(0.9 * now) < -0.35 ? -10 : 0
        );
      } else if (act === "basket") {
        // basket breathing / gentle snoozing
        if (now - idleTimer > 6) {
          idleTimer = now;
          if (Math.random() < 0.6) {
            puppet.wag(0.5);
            setTimeout(() => puppet.wag(0.25), 1800);
          }
        }
      } else {
        // Idle tilt or wag periodically
        if (now - idleTimer > 9) {
          idleTimer = now;
          if (Math.random() < 0.5) {
            puppet.cock(12);
            setTimeout(() => puppet.cock(0), 1800);
          } else {
            puppet.wag(1);
            setTimeout(() => puppet.wag(0.6), 2200);
          }
        }
      }

      // Speech bubble timer
      if (bubble && bubble.dataset.show === "true" && now > speechUntil) {
        bubble.dataset.show = "false";
      }

      puppet.tick(dt, now);

      if (isIntersecting) {
        animId = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (asStop && document.documentElement.dataset.pup) {
        isIntersecting = false;
      }
      if (isIntersecting) {
        lastTime = performance.now() / 1000;
        animId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(animId);
      }
    });

    observer.observe(container);

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        mouseTarget = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        puppet.petting(true);
        puppet.wag(1);
      }
    };

    const handlePointerLeave = () => {
      puppet.petting(false);
      puppet.wag(pose === "snug" ? 0.25 : 0.6);
    };

    const handleClick = () => {
      const barks = [
        "woof!",
        "yip! ❤️",
        "every puppy is family!",
        "come meet us!",
        "tail wags for you!",
      ];
      const text = barks[Math.floor(Math.random() * barks.length)];
      if (bubble) {
        bubble.textContent = text;
        bubble.dataset.show = "true";
        speechUntil = performance.now() / 1000 + 1.8;
      }
      puppet.wag(1);
      puppet.cock(15);
      setTimeout(() => puppet.cock(0), 1200);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [pose, facing, act, asStop]);

  return (
    <div
      ref={containerRef}
      className={`pup-buddy relative select-none cursor-pointer ${className}`}
      style={style}
      role="img"
      aria-label={label}
      data-facing={facing}
    >
      <PupSvg pose={pose} facing={facing} label={label} />
      <span
        ref={bubbleRef}
        aria-hidden={true}
        className="pup-bubble pointer-events-none"
        data-show="false"
      />
    </div>
  );
}
