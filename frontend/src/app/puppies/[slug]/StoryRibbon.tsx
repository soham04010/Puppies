"use client";

import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";

export default function StoryRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end end"],
  });

  return (
    <div ref={ref} aria-hidden="true" className="tp-ribbon">
      <div className="tp-ribbon__track">
        <motion.span
          className="tp-ribbon__band"
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        />
      </div>
    </div>
  );
}
