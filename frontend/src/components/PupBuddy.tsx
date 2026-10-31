"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";

// Colors extracted from reference site chunk_1ll.js (mod 1063 & 55334)
export const PUPPY_COLORS = {
  fur: "#f2be6b",
  furDark: "#e4a352",
  muzzle: "#fbe3b4",
  blush: "#f9b9a6",
  collar: "#a24a1a",
  outline: "#2a170e",
  tongue: "#e98c8c",
  mouthOpen: "#6b2a1c",
};

// Generates scalloped/puffy cloud path
function createFluffyPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  bumps: number,
  amplitude: number,
  startAngle: number = -Math.PI / 2,
  tiltDeg: number = 0
) {
  const tilt = (tiltDeg * Math.PI) / 180;
  const point = (angle: number, offset: number) => {
    const cosA = Math.cos(angle) * (rx + offset);
    const sinA = Math.sin(angle) * (ry + (ry / rx) * offset);
    const x = cx + cosA * Math.cos(tilt) - sinA * Math.sin(tilt);
    const y = cy + cosA * Math.sin(tilt) + sinA * Math.cos(tilt);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  };

  let d = "";
  for (let i = 0; i < bumps; i++) {
    const a1 = startAngle + (i / bumps) * Math.PI * 2;
    const a2 = startAngle + ((i + 1) / bumps) * Math.PI * 2;
    const mid = (a1 + a2) / 2;
    d += `${i === 0 ? `M${point(a1, 0)}` : ""}Q${point(mid, 2.1 * amplitude)} ${point(a2, 0)}`;
  }
  return `${d}Z`;
}

// Pre-computed SVG shape paths
const SHAPES = {
  body: createFluffyPath(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: createFluffyPath(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: createFluffyPath(70, 126, 17, 16, 9, 3.2),
  tailStem: "M86 152 C80 146 76 140 74 136",
  haunch: createFluffyPath(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw: "M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z",
  head: createFluffyPath(212, 100, 51, 46, 16, 3.6),
  topknot: createFluffyPath(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: createFluffyPath(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: createFluffyPath(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle: "M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z",
  nose: "M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z",
  mouth: "M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2",
  mouthOpen: "M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z",
  tongue: "M207.6 127.4 Q212 136.6 216.4 127.4 Z",
  collar: "M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z",
  tag: "M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z",
  ledgePaws: "M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z",
  ledgeToes: "M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5",
  shadow: { cx: 150, cy: 230, rx: 92, ry: 7 },
};

function createLegPath(width: number, length: number) {
  const hw = width / 2;
  return `M${-hw} -14 C${-hw} 4 -12 ${length - 18} -12 ${length - 9} C-12 ${length - 2} -7 ${length} 0 ${length} C9 ${length} 13 ${length - 3} 13 ${length - 9} C13 ${length - 18} ${hw} 4 ${hw} -14`;
}

// Shoulder and hip pivot joints
const JOINTS = {
  shoulderNear: [186, 194],
  shoulderFar: [168, 192],
  hipNear: [110, 194],
  hipFar: [94, 192],
  tailBase: [84, 150],
  headPivot: [212, 100],
  earLPivot: [174, 82],
  earRPivot: [250, 82],
  bodyCenter: [196, 206],
};

const LEGS = {
  front: createLegPath(24, 228 - JOINTS.shoulderNear[1]),
  frontFar: createLegPath(22, 228 - JOINTS.shoulderFar[1]),
  back: createLegPath(30, 228 - JOINTS.hipNear[1]),
  backFar: createLegPath(28, 228 - JOINTS.hipFar[1]),
};

interface PupBuddyProps {
  pose?: "sit" | "walk" | "stand" | "peek";
  facing?: "left" | "right";
  act?: "treadmill" | "tilt";
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  strideSpeed?: number;
}

export default function PupBuddy({
  pose = "sit",
  facing = "right",
  act,
  className = "",
  style,
  label = "Teddy, the TeddyPups puppy",
  strideSpeed = 1,
}: PupBuddyProps) {
  const [phase, setPhase] = useState(0);
  const [blink, setBlink] = useState(0);
  const [happy, setHappy] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartCounter = useRef(0);
  const speechTimer = useRef<NodeJS.Timeout | null>(null);

  // Blinking cycle
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlink(1);
      setTimeout(() => setBlink(0), 160);
      timeout = setTimeout(triggerBlink, 2400 + Math.random() * 3200);
    };
    timeout = setTimeout(triggerBlink, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Continuous walking or idle animation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (pose === "walk" || act === "treadmill") {
        setPhase((prev) => (prev + dt * 5.2 * strideSpeed) % (Math.PI * 2));
      } else {
        // Subtle breathing / tail wag
        setPhase((prev) => (prev + dt * 2.2) % (Math.PI * 2));
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [pose, act, strideSpeed]);

  const handleClick = (e: React.MouseEvent) => {
    setHappy(true);
    const id = heartCounter.current++;
    const rect = e.currentTarget.getBoundingClientRect();
    setHearts((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
      setHappy(false);
    }, 1400);

    const barks = ["woof!", "yip! ❤️", "every puppy is family!", "come meet us!"];
    const text = barks[Math.floor(Math.random() * barks.length)];
    setSpeech(text);
    if (speechTimer.current) clearTimeout(speechTimer.current);
    speechTimer.current = setTimeout(() => setSpeech(null), 2000);
  };

  // Dynamic transforms based on phase and pose
  const isWalking = pose === "walk" || act === "treadmill";
  const isSitting = pose === "sit";
  const isPeeking = pose === "peek";

  // Leg angles in radians converted to degrees
  const sinP = Math.sin(phase);
  const sinPOpp = Math.sin(phase + Math.PI);
  const strideAmp = isWalking ? 26 : 0;

  const fnRot = isWalking ? sinP * strideAmp : isSitting ? 0 : 0;
  const ffRot = isWalking ? sinPOpp * strideAmp : isSitting ? 0 : 0;
  const bnRot = isWalking ? sinPOpp * strideAmp : isSitting ? 0 : 0;
  const bfRot = isWalking ? sinP * strideAmp : isSitting ? 0 : 0;

  // Body bobbing
  const bodyBobY = isWalking ? -Math.abs(Math.sin(phase * 2)) * 3.5 : Math.sin(phase) * 1.2;
  const bodyRot = isSitting ? -22 : isWalking ? Math.sin(phase) * 1.5 : 0;

  // Tail wagging
  const tailRot = isWalking
    ? Math.sin(phase * 2) * 18
    : isSitting
    ? 24 + Math.sin(phase * 1.5) * 12
    : Math.sin(phase * 1.5) * 14;

  // Head bobbing & tilt
  const headBobY = isWalking ? -Math.abs(Math.sin(phase * 2 - 0.7)) * 2.8 : Math.sin(phase) * 1.5;
  const earLRot = isWalking ? Math.sin(phase * 2) * 5 : Math.sin(phase) * 3;
  const earRRot = isWalking ? -Math.sin(phase * 2) * 5 : -Math.sin(phase) * 3;

  const rootTransform = facing === "left" ? "translate(300 0) scale(-1 1)" : undefined;

  return (
    <div
      className={`pup-buddy relative select-none cursor-pointer ${className}`}
      style={style}
      onClick={handleClick}
      role="img"
      aria-label={label}
    >
      {/* Speech bubble */}
      {speech && (
        <span
          className="pup-bubble pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-[#4a3728] px-3 py-1 font-scrawl text-xs font-bold text-[#fffdf8] shadow-md transition-all"
          data-show="true"
        >
          {speech}
        </span>
      )}

      {/* Floating hearts on click */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute text-lg animate-ping"
          style={{ left: `${h.x}px`, top: `${h.y}px`, animationDuration: "1s" }}
        >
          ❤️
        </span>
      ))}

      <svg
        viewBox="0 0 300 240"
        className="size-full overflow-visible"
        focusable="false"
      >
        <g data-p="root" transform={rootTransform}>
          {/* Ground shadow */}
          <ellipse
            data-p="shadow"
            cx={SHAPES.shadow.cx}
            cy={SHAPES.shadow.cy}
            rx={isWalking ? SHAPES.shadow.rx * (1 - 0.05 * Math.abs(sinP)) : SHAPES.shadow.rx}
            ry={SHAPES.shadow.ry}
            fill={PUPPY_COLORS.outline}
            opacity={isPeeking ? 0 : 0.12}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* Full body & legs (visible unless peeking) */}
          {!isPeeking && (
            <g
              data-p="body"
              transform={`translate(0 ${bodyBobY.toFixed(1)}) rotate(${bodyRot.toFixed(1)} ${JOINTS.bodyCenter[0]} ${JOINTS.bodyCenter[1]})`}
            >
              {/* Back Far Leg (bf) */}
              {!isSitting && (
                <g
                  data-p="bf"
                  transform={`translate(${JOINTS.hipFar[0]} ${JOINTS.hipFar[1]}) rotate(${bfRot.toFixed(1)})`}
                >
                  <path d={`${LEGS.backFar}Z`} fill={PUPPY_COLORS.furDark} />
                  <path
                    d={LEGS.backFar}
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-3.5 29 v5 M4.5 29 v5"
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Front Far Leg (ff) */}
              {!isSitting && (
                <g
                  data-p="ff"
                  transform={`translate(${JOINTS.shoulderFar[0]} ${JOINTS.shoulderFar[1]}) rotate(${ffRot.toFixed(1)})`}
                >
                  <path d={`${LEGS.frontFar}Z`} fill={PUPPY_COLORS.furDark} />
                  <path
                    d={LEGS.frontFar}
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-3.5 29 v5 M4.5 29 v5"
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Tail */}
              <g
                data-p="tail"
                transform={`rotate(${tailRot.toFixed(1)} ${JOINTS.tailBase[0]} ${JOINTS.tailBase[1]})`}
              >
                <path
                  d={SHAPES.tailStem}
                  fill="none"
                  stroke={PUPPY_COLORS.outline}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d={SHAPES.tailStem}
                  stroke={PUPPY_COLORS.fur}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={SHAPES.tail}
                  fill={PUPPY_COLORS.fur}
                  stroke={PUPPY_COLORS.outline}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Back Near Leg (bn) */}
              {!isSitting && (
                <g
                  data-p="bn"
                  transform={`translate(${JOINTS.hipNear[0]} ${JOINTS.hipNear[1]}) rotate(${bnRot.toFixed(1)})`}
                >
                  <path d={`${LEGS.back}Z`} fill={PUPPY_COLORS.fur} />
                  <path
                    d={LEGS.back}
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-3.5 27 v5 M4.5 27 v5"
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Main Body */}
              <path
                d={SHAPES.body}
                fill={PUPPY_COLORS.fur}
                stroke={PUPPY_COLORS.outline}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Fluffy Chest */}
              <path
                d={SHAPES.chest}
                fill={PUPPY_COLORS.fur}
                stroke={PUPPY_COLORS.outline}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Front Near Leg (fn) */}
              {!isSitting && (
                <g
                  data-p="fn"
                  transform={`translate(${JOINTS.shoulderNear[0]} ${JOINTS.shoulderNear[1]}) rotate(${fnRot.toFixed(1)})`}
                >
                  <path d={`${LEGS.front}Z`} fill={PUPPY_COLORS.fur} />
                  <path
                    d={LEGS.front}
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-3.5 27 v5 M4.5 27 v5"
                    fill="none"
                    stroke={PUPPY_COLORS.outline}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          )}

          {/* Sitting Haunch and Paw */}
          {isSitting && !isPeeking && (
            <g data-p="haunch" transform={`translate(0 ${bodyBobY.toFixed(1)})`}>
              <path
                d={SHAPES.haunch}
                fill={PUPPY_COLORS.fur}
                stroke={PUPPY_COLORS.outline}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={SHAPES.haunchPaw}
                fill={PUPPY_COLORS.fur}
                stroke={PUPPY_COLORS.outline}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M132 222v5M139 222v5"
                fill="none"
                stroke={PUPPY_COLORS.outline}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Head & Face */}
          <g
            data-p="head"
            transform={`translate(${isSitting ? -10 : 0} ${(headBobY + (isSitting ? -6 : 0)).toFixed(1)})`}
          >
            {/* Red Collar & Gold Tag */}
            <path
              d={SHAPES.collar}
              fill={PUPPY_COLORS.collar}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={SHAPES.tag}
              fill={PUPPY_COLORS.muzzle}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Left Ear */}
            <path
              data-p="earL"
              d={SHAPES.earL}
              fill={PUPPY_COLORS.furDark}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`rotate(${earLRot.toFixed(1)} ${JOINTS.earLPivot[0]} ${JOINTS.earLPivot[1]})`}
            />

            {/* Right Ear */}
            <path
              data-p="earR"
              d={SHAPES.earR}
              fill={PUPPY_COLORS.furDark}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`rotate(${earRRot.toFixed(1)} ${JOINTS.earRPivot[0]} ${JOINTS.earRPivot[1]})`}
            />

            {/* Head Silhouette */}
            <path
              d={SHAPES.head}
              fill={PUPPY_COLORS.fur}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Topknot Hair */}
            <path
              d={SHAPES.topknot}
              fill={PUPPY_COLORS.fur}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Muzzle */}
            <path d={SHAPES.muzzle} fill={PUPPY_COLORS.muzzle} />

            {/* Blush Cheeks */}
            <circle cx="181" cy="116" r="7" fill={PUPPY_COLORS.blush} opacity="0.85" />
            <circle cx="243" cy="116" r="7" fill={PUPPY_COLORS.blush} opacity="0.85" />

            {/* Eyes */}
            <g data-p="eyes">
              {blink > 0 ? (
                /* Blinking eye slits */
                <path
                  d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                  fill="none"
                  stroke={PUPPY_COLORS.outline}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
              ) : happy ? (
                /* Happy arch eyes */
                <path
                  d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                  fill="none"
                  stroke={PUPPY_COLORS.outline}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
              ) : (
                /* Open sparkling eyes */
                <g data-p="open">
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill={PUPPY_COLORS.outline} />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill={PUPPY_COLORS.outline} />
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
              )}
            </g>

            {/* Nose */}
            <path d={SHAPES.nose} fill={PUPPY_COLORS.outline} />

            {/* Mouth */}
            <path
              d={SHAPES.mouth}
              fill="none"
              stroke={PUPPY_COLORS.outline}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Tongue */}
            <path
              data-p="tongue"
              d={SHAPES.tongue}
              fill={PUPPY_COLORS.tongue}
              stroke={PUPPY_COLORS.outline}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>

          {/* Peeking Ledge Paws (only in peek pose) */}
          {isPeeking && (
            <g data-p="ledge">
              <path
                d={SHAPES.ledgePaws}
                fill={PUPPY_COLORS.fur}
                stroke={PUPPY_COLORS.outline}
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={SHAPES.ledgeToes}
                fill="none"
                stroke={PUPPY_COLORS.outline}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
