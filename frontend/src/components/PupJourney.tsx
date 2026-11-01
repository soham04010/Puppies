"use client";

import React, { useEffect, useRef } from "react";

// ==========================================
// 1. CONSTANTS & GEOMETRIC PATHS (mod 1063 & 49054)
// ==========================================

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

function ellipsePath(cx: number, cy: number, rx: number, ry: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const p = (x: number, y: number) =>
    `${(cx + x * cos - y * sin).toFixed(2)} ${(cy + x * sin + y * cos).toFixed(2)}`;
  return `M${p(rx, 0)}C${p(rx, 0.5523 * ry)} ${p(0.5523 * rx, ry)} ${p(0, ry)}C${p(-0.5523 * rx, ry)} ${p(
    -rx,
    0.5523 * ry
  )} ${p(-rx, 0)}C${p(-rx, -(0.5523 * ry))} ${p(-(0.5523 * rx), -ry)} ${p(0, -ry)}C${p(
    0.5523 * rx,
    -ry
  )} ${p(rx, -(0.5523 * ry))} ${p(rx, 0)}Z`;
}

export const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" +
  ellipsePath(14.6, 29.2, 5.3, 6.9, -28) +
  ellipsePath(24.2, 16.6, 5.5, 7.3, -10) +
  ellipsePath(39.8, 16.6, 5.5, 7.3, 10) +
  ellipsePath(49.4, 29.2, 5.3, 6.9, 28);

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

export const SHAPES = {
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

export const JOINTS = {
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

export const LEGS = {
  front: createLegPath(24, 228 - JOINTS.shoulderNear[1]),
  frontFar: createLegPath(22, 228 - JOINTS.shoulderFar[1]),
  back: createLegPath(30, 228 - JOINTS.hipNear[1]),
  backFar: createLegPath(28, 228 - JOINTS.hipFar[1]),
};

export interface PoseState {
  bodyRot: number;
  bodyX: number;
  bodyY: number;
  stretch: number;
  headX: number;
  headY: number;
  headRot: number;
  earL: number;
  earR: number;
  tail: number;
  fn: number;
  ff: number;
  bn: number;
  bf: number;
  sit: number;
  eyes: number;
  happy: number;
  tongue: number;
  mouth: number;
  front: number;
}

const BASE_POSE: PoseState = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

export const POSES: Record<string, PoseState> = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  happy: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, happy: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...BASE_POSE, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...BASE_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

const POSE_KEYS = Object.keys(BASE_POSE) as (keyof PoseState)[];

export interface MotionState {
  phase: number;
  stride: number;
  time: number;
  wag: number;
  gazeX: number;
  gazeY: number;
  blink: number;
  ear: number;
}

const INITIAL_MOTION: MotionState = {
  phase: 0,
  stride: 0,
  time: 0,
  wag: 0,
  gazeX: 0,
  gazeY: 0,
  blink: 0,
  ear: 0,
};

const round2 = (t: number) => Math.round(100 * t) / 100;
const rotStr = (deg: number, [cx, cy]: number[]) => `rotate(${round2(deg)} ${cx} ${cy})`;

function lerpPoses(p0: PoseState, p1: PoseState, t: number): PoseState {
  const res = { ...p0 };
  for (const k of POSE_KEYS) {
    res[k] = p0[k] + (p1[k] - p0[k]) * t;
  }
  return res;
}

function computePuppetFrame(pose: PoseState, motion: MotionState = INITIAL_MOTION) {
  const sinPhase = Math.sin(motion.phase);
  const sinPhaseOpp = Math.sin(motion.phase + Math.PI);
  const amp = 20 + 10 * motion.stride;
  const bob = (1 - Math.cos(2 * motion.phase)) / 2;
  const isWalking = +(motion.stride > 0.01);
  const idleBreathing = Math.sin(2.4 * motion.time) * (1 - isWalking);

  const bodyY = pose.bodyY - bob * (2.5 + 4 * motion.stride) * isWalking + 0.6 * idleBreathing;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(motion.phase) * isWalking;
  const invBodyRot = -pose.bodyRot;

  const wagAmp = 5 + 17 * motion.wag;
  const wagFreq = 1.2 + 2.6 * motion.wag;
  const tailRot = pose.tail + Math.sin(motion.time * wagFreq * Math.PI * 2) * wagAmp;
  const headBob =
    -((1 - Math.cos(2 * motion.phase - 0.7)) / 2) * (2 + 3 * motion.stride) * isWalking +
    0.9 * idleBreathing;

  return {
    body: `translate(${round2(pose.bodyX)} ${round2(bodyY)}) ${rotStr(bodyRot, JOINTS.bodyCenter)} translate(${JOINTS.bodyCenter[0]} 0) scale(${round2(pose.stretch)} 1) translate(${-JOINTS.bodyCenter[0]} 0)`,
    fn: `translate(${JOINTS.shoulderNear[0]} ${JOINTS.shoulderNear[1]}) rotate(${round2(pose.fn + invBodyRot + sinPhase * amp * isWalking)})`,
    ff: `translate(${JOINTS.shoulderFar[0]} ${JOINTS.shoulderFar[1]}) rotate(${round2(pose.ff + invBodyRot + sinPhaseOpp * amp * isWalking)})`,
    bn: `translate(${JOINTS.hipNear[0]} ${JOINTS.hipNear[1]}) rotate(${round2(pose.bn + sinPhaseOpp * amp * isWalking)})`,
    bf: `translate(${JOINTS.hipFar[0]} ${JOINTS.hipFar[1]}) rotate(${round2(pose.bf + sinPhase * amp * isWalking)})`,
    tail: rotStr(tailRot, JOINTS.tailBase),
    haunch: `translate(0 ${round2(-0.06 * pose.bodyRot)})`,
    head: `translate(${round2(pose.headX)} ${round2(pose.headY + headBob)}) ${rotStr(pose.headRot + 1.4 * Math.sin(motion.phase) * isWalking, JOINTS.headPivot)}`,
    earL: rotStr(pose.earL + motion.ear + 4 * Math.sin(2 * motion.phase) * isWalking, JOINTS.earLPivot),
    earR: rotStr(pose.earR - motion.ear - 4 * Math.sin(2 * motion.phase) * isWalking, JOINTS.earRPivot),
    eyes: `translate(${round2(3.4 * motion.gazeX)} ${round2(2.6 * motion.gazeY)})`,
    blink: `translate(0 ${round2(98 * motion.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * motion.blink)})`,
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: `translate(${round2(0.6 * pose.bodyX)} 0) scale(${round2(1 - 0.05 * bob * isWalking)} 1)`,
    shadowOpacity: round2(0.12 * (1 - pose.front)),
  };
}

// ==========================================
// 2. PUPPET CONTROLLER CLASS (mod 89681)
// ==========================================

const BINDINGS: [string, string, keyof ReturnType<typeof computePuppetFrame>][] = [
  ["shadow", "transform", "shadow"],
  ["shadow", "opacity", "shadowOpacity"],
  ["body", "transform", "body"],
  ["body", "opacity", "side"],
  ["chest", "opacity", "side"],
  ["bf", "transform", "bf"],
  ["bf", "opacity", "backLegs"],
  ["bn", "transform", "bn"],
  ["bn", "opacity", "backLegs"],
  ["ff", "transform", "ff"],
  ["fn", "transform", "fn"],
  ["tail", "transform", "tail"],
  ["haunch", "transform", "haunch"],
  ["haunch", "opacity", "haunchOpacity"],
  ["head", "transform", "head"],
  ["earL", "transform", "earL"],
  ["earR", "transform", "earR"],
  ["eyes", "transform", "eyes"],
  ["open", "opacity", "openEyes"],
  ["blink", "transform", "blink"],
  ["happy", "opacity", "happyEyes"],
  ["shut", "opacity", "shutEyes"],
  ["tongue", "opacity", "tongue"],
  ["mouth", "opacity", "mouth"],
  ["ledge", "opacity", "ledge"],
];

const dampExp = (t: number, e: number) => 1 - Math.exp(-t / e);
const clampVal = (t: number, min = -1, max = 1) => Math.max(min, Math.min(max, t));

export class Puppet {
  svg: SVGElement;
  els: Map<string, SVGElement>;
  written: Map<string, string>;
  pose: PoseState;
  target: PoseState;
  m: MotionState;
  facing: number;
  facingTarget: number;
  strideTarget: number;
  wagTarget: number;
  gazeTarget: { x: number; y: number };
  tilt: number;
  tiltTarget: number;
  earV: number;
  nextBlink: number;
  blinkAt: number;
  woofUntil: number;
  bounce: number;
  bounceV: number;
  offset: number;
  offsetTarget: number;
  pet: number;
  petTarget: number;
  turn: number;
  lean: number;

  constructor(svg: SVGElement, initialPose = "sit", initialFacing = 1) {
    this.svg = svg;
    this.els = new Map();
    this.written = new Map();
    this.m = { ...INITIAL_MOTION };
    this.strideTarget = 0;
    this.wagTarget = 0.35;
    this.gazeTarget = { x: 0, y: 0 };
    this.tilt = 0;
    this.tiltTarget = 0;
    this.earV = 0;
    this.nextBlink = 1.2;
    this.blinkAt = -1;
    this.woofUntil = 0;
    this.bounce = 0;
    this.bounceV = 0;
    this.offset = 0;
    this.offsetTarget = 0;
    this.pet = 0;
    this.petTarget = 0;
    this.turn = 0.07;
    this.lean = 0;

    svg.querySelectorAll<SVGElement>("[data-p]").forEach((el) => {
      if (el.dataset.p) this.els.set(el.dataset.p, el);
    });

    this.pose = { ...(POSES[initialPose] || POSES.sit) };
    this.target = this.pose;
    this.facing = initialFacing;
    this.facingTarget = initialFacing;
    this.turn = 0.07;
  }

  setPose(pose: string | PoseState) {
    this.target = typeof pose === "string" ? POSES[pose] || POSES.sit : pose;
  }

  jump(pose: string, facing?: number) {
    this.pose = { ...(POSES[pose] || POSES.sit) };
    this.target = POSES[pose] || POSES.sit;
    if (facing) this.facing = this.facingTarget = facing;
  }

  face(dir: number, speed = 0.07) {
    this.facingTarget = dir;
    this.turn = speed;
  }

  get facingDir() {
    return this.facingTarget;
  }

  stride(val: number) {
    this.strideTarget = clampVal(val, 0, 1);
  }

  advance(dist: number) {
    this.m.phase += (dist / 46) * Math.PI;
  }

  walkedTo(pos: number) {
    this.m.phase = (pos / 46) * Math.PI;
  }

  wag(val: number) {
    this.wagTarget = clampVal(val, 0, 1);
  }

  cock(deg: number) {
    this.tiltTarget = deg;
  }

  lookAt(target: { x: number; y: number } | null) {
    if (!target) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const pivotX = this.facingTarget > 0 ? JOINTS.headPivot[0] : 300 - JOINTS.headPivot[0];
    const centerX = rect.left + (pivotX / 300) * rect.width;
    const centerY = rect.top + (JOINTS.headPivot[1] / 240) * rect.height;
    const dx = target.x - centerX;
    const dy = target.y - centerY;
    const dist = Math.hypot(dx, dy) || 1;
    const norm = Math.min(1, dist / 160);
    this.gazeTarget = {
      x: (dx / dist) * norm * this.facingTarget,
      y: (dy / dist) * norm,
    };
  }

  woof(time: number) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(scale = 1) {
    this.earV += 220 * scale;
  }

  hop(scale = 1) {
    this.bounceV = -230 * scale;
    this.earV += 200 * scale;
  }

  yawn(time: number, dur = 0.9) {
    this.woofUntil = time + dur;
  }

  dash(dist: number) {
    this.offsetTarget = dist;
  }

  petting(isPet: boolean) {
    this.petTarget = +isPet;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dt: number, time: number) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;
    this.pose = lerpPoses(this.pose, this.target, dampExp(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * dampExp(dt, this.turn || 0.07);
    m.stride += (this.strideTarget - m.stride) * dampExp(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;
    m.wag += (this.wagTarget - m.wag) * dampExp(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * dampExp(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * dampExp(dt, 0.07);
    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * dampExp(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clampVal(m.ear + this.earV * dt, -28, 28);
    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * dampExp(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) this.offset = this.offsetTarget;
    const dOffset = Math.abs(this.offset - prevOffset);
    if (dOffset) this.advance(dOffset);
    const strideDelta = dt > 0 ? Math.min(1, dOffset / dt / 180) : 0;

    this.pet += (this.petTarget - this.pet) * dampExp(dt, 0.15);
    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }
    const blinkProgress = (time - this.blinkAt) / 0.15;
    m.blink = blinkProgress >= 0 && blinkProgress <= 1 ? Math.sin(blinkProgress * Math.PI) : 0;

    const currentFrame = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const rendered = computePuppetFrame(
      currentFrame,
      strideDelta > m.stride ? { ...m, stride: strideDelta } : m
    );

    const rawFacing = isNaN(this.facing) ? (this.facingTarget || 1) : this.facing;
    const safeFacing = Math.abs(rawFacing) < 0.02 ? 0.02 * Math.sign(rawFacing || 1) : rawFacing;
    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(150 0) scale(${safeFacing.toFixed(3)} 1) translate(-150 0)`;

    const rootEl = this.els.get("root");
    if (rootEl && this.written.get("root:transform") !== rootTransform) {
      rootEl.setAttribute("transform", rootTransform);
      this.written.set("root:transform", rootTransform);
    }

    for (const [part, attr, key] of BINDINGS) {
      const el = this.els.get(part);
      if (!el) continue;
      const val = String(rendered[key]);
      const cacheKey = `${part}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

// ==========================================
// 3. PURE SVG MASCOT MARKUP (mod 55334)
// ==========================================

function LegElement({
  part,
  d,
  len,
  fill,
  transform,
  opacity,
}: {
  part: string;
  d: string;
  len: number;
  fill: string;
  transform?: string;
  opacity?: number;
}) {
  const strokeProps = {
    stroke: PUPPY_COLORS.outline,
    strokeWidth: 3.4,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const toesPath = `M-3.5 ${len - 7} v5 M4.5 ${len - 7} v5`;

  return (
    <g data-p={part} transform={transform} opacity={opacity}>
      <path d={`${d}Z`} fill={fill} />
      <path d={d} fill="none" {...strokeProps} />
      <path d={toesPath} fill="none" {...strokeProps} strokeWidth={2.4} />
    </g>
  );
}

export function PupSvg({
  pose = "peek",
  facing = "right",
  className = "",
  label,
  style,
}: {
  pose?: string;
  facing?: "left" | "right";
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}) {
  const d = POSES[pose] || POSES.peek;
  const f = computePuppetFrame(d);
  const flip = facing === "left" ? "translate(300 0) scale(-1 1)" : undefined;
  const strokeProps = {
    stroke: PUPPY_COLORS.outline,
    strokeWidth: 3.4,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const lineProps = { ...strokeProps, fill: "none" };

  return (
    <svg
      viewBox="0 0 300 240"
      className={className}
      style={{ overflow: "visible", ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={!label || undefined}
      focusable="false"
    >
      <g data-p="root" transform={flip}>
        <ellipse
          data-p="shadow"
          cx="150"
          cy="230"
          rx="92"
          ry="7"
          fill={PUPPY_COLORS.outline}
          opacity={f.shadowOpacity}
          transform={f.shadow}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <g data-p="body" transform={f.body} opacity={f.side}>
          <LegElement part="bf" d={LEGS.backFar} len={JOINTS.hipFar[1] - 192} fill={PUPPY_COLORS.furDark} transform={f.bf} opacity={f.backLegs} />
          <LegElement part="ff" d={LEGS.frontFar} len={JOINTS.shoulderFar[1] - 192} fill={PUPPY_COLORS.furDark} transform={f.ff} />
          <g data-p="tail" transform={f.tail}>
            <path d={SHAPES.tailStem} fill="none" {...strokeProps} strokeWidth={9} />
            <path d={SHAPES.tailStem} fill="none" stroke={PUPPY_COLORS.fur} strokeWidth={4} strokeLinecap="round" />
            <path d={SHAPES.tail} fill={PUPPY_COLORS.fur} {...strokeProps} />
          </g>
          <LegElement part="bn" d={LEGS.back} len={JOINTS.hipNear[1] - 194} fill={PUPPY_COLORS.fur} transform={f.bn} opacity={f.backLegs} />
          <path d={SHAPES.body} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <path d={SHAPES.chest} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <LegElement part="fn" d={LEGS.front} len={JOINTS.shoulderNear[1] - 194} fill={PUPPY_COLORS.fur} transform={f.fn} />
        </g>
        <g data-p="haunch" opacity={f.haunchOpacity} transform={f.haunch}>
          <path d={SHAPES.haunch} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <path d={SHAPES.haunchPaw} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <path d="M132 222v5M139 222v5" {...lineProps} strokeWidth={2.4} />
        </g>
        <g data-p="head" transform={f.head}>
          <path d={SHAPES.collar} fill={PUPPY_COLORS.collar} {...strokeProps} strokeWidth={3} />
          <path d={SHAPES.tag} fill={PUPPY_COLORS.muzzle} {...strokeProps} strokeWidth={2.4} />
          <path data-p="earL" d={SHAPES.earL} fill={PUPPY_COLORS.furDark} {...strokeProps} transform={f.earL} />
          <path data-p="earR" d={SHAPES.earR} fill={PUPPY_COLORS.furDark} {...strokeProps} transform={f.earR} />
          <path d={SHAPES.head} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <path d={SHAPES.topknot} fill={PUPPY_COLORS.fur} {...strokeProps} strokeWidth={3} />
          <path d={SHAPES.muzzle} fill={PUPPY_COLORS.muzzle} />
          <circle cx="181" cy="116" r="7" fill={PUPPY_COLORS.blush} opacity={0.85} />
          <circle cx="243" cy="116" r="7" fill={PUPPY_COLORS.blush} opacity={0.85} />
          <g data-p="eyes" transform={f.eyes}>
            <g data-p="open" opacity={f.openEyes}>
              <g data-p="blink" transform={f.blink}>
                <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill={PUPPY_COLORS.outline} />
                <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill={PUPPY_COLORS.outline} />
                <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
              </g>
            </g>
          </g>
          <path data-p="happy" d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101" {...lineProps} opacity={f.happyEyes} />
          <path data-p="shut" d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" {...lineProps} opacity={f.shutEyes} />
          <path d={SHAPES.nose} fill={PUPPY_COLORS.outline} />
          <path d={SHAPES.mouth} {...lineProps} strokeWidth={3} />
          <path data-p="tongue" d={SHAPES.tongue} fill={PUPPY_COLORS.tongue} stroke={PUPPY_COLORS.outline} strokeWidth={2.2} strokeLinejoin="round" opacity={f.tongue} />
          <g data-p="mouth" opacity={f.mouth}>
            <path d={SHAPES.mouthOpen} fill={PUPPY_COLORS.mouthOpen} {...strokeProps} strokeWidth={2.6} />
            <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill={PUPPY_COLORS.tongue} />
          </g>
        </g>
        <g data-p="ledge" opacity={f.ledge}>
          <path d={SHAPES.ledgePaws} fill={PUPPY_COLORS.fur} {...strokeProps} />
          <path d={SHAPES.ledgeToes} {...lineProps} strokeWidth={2.4} />
        </g>
      </g>
    </svg>
  );
}

// ==========================================
// 4. TRICKS & HEARTS EMITTER (mod 8478)
// ==========================================

function spawnHearts(container: HTMLElement, x: number, y: number) {
  for (let s = 0; s < 5; s++) {
    const el = document.createElement("span");
    el.className = "pup-heart";
    el.textContent = "♥";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    container.append(el);

    const ox = (Math.random() - 0.5) * 90;
    const oy = -70 - 60 * Math.random();
    el.animate(
      [
        { transform: "translate(-50%, 0) scale(0.4)", opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: `translate(calc(-50% + ${ox.toFixed(0)}px), ${oy.toFixed(0)}px) scale(1.1)`, opacity: 0 },
      ],
      {
        duration: 1150 + 110 * s,
        delay: 80 * s,
        easing: "cubic-bezier(.2,.7,.3,1)",
        fill: "backwards",
      }
    ).finished.then(
      () => el.remove(),
      () => el.remove()
    );
  }
}

// ==========================================
// 5. GLOBAL TRAVELER MASCOT SYSTEM (PupJourney)
// ==========================================

const PUPPY_ORIGIN = { x: 150, y: 228 };
const DEFAULT_BOX = [48, 30, 288, 236];
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (v: number) => v * v * (3 - 2 * v);
const smoothBetween = (min: number, max: number, v: number) =>
  max === min ? +(v >= max) : smoothstep(clamp((v - min) / (max - min)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const softMax = (e: number, t: number, a: number) => {
  const s = (e - t) / a;
  return s > 20 ? e : t + a * Math.log1p(Math.exp(s));
};
const softMin = (e: number, t: number, a: number) => -softMax(-e, -t, a);

function clampToSafe(
  x: number,
  y: number,
  s: number,
  box: number[],
  safe: { left: number; top: number; right: number; bottom: number },
  l = 8
) {
  const leftPad = (PUPPY_ORIGIN.x - box[0]) * s;
  const rightPad = (box[2] - PUPPY_ORIGIN.x) * s;
  const topPad = (PUPPY_ORIGIN.y - box[1]) * s;
  const bottomPad = (box[3] - PUPPY_ORIGIN.y) * s;
  const resX =
    safe.right - safe.left > leftPad + rightPad
      ? softMin(softMax(x, safe.left + leftPad, l), safe.right - rightPad, l)
      : (safe.left + safe.right) / 2 - (rightPad - leftPad) / 2;
  const resY =
    safe.bottom - safe.top > topPad + bottomPad
      ? softMin(softMax(y, safe.top + topPad, l), safe.bottom - bottomPad, l)
      : safe.bottom - bottomPad;
  return { x: resX, y: resY };
}

function lerpBox(a: number[], b: number[], t: number) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
}

function bezier(
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p1: { x: number; y: number },
  t: number
) {
  const l = 1 - t;
  const r = l * l * l;
  const i = 3 * l * l * t;
  const o = 3 * l * t * t;
  const d = t * t * t;
  return {
    x: r * p0.x + i * c1.x + o * c2.x + d * p1.x,
    y: r * p0.y + i * c1.y + o * c2.y + d * p1.y,
  };
}

const BOX_MAP: Record<string, number[]> = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
};
const getBox = (pose: string) => BOX_MAP[pose] ?? DEFAULT_BOX;
const SINK_OFFSET = PUPPY_ORIGIN.y - 159;
const LANE_SCALE = [0.6, 0.86];
const DESKTOP_SCALE = [0.42, 0.78];
const RANDOM_TRICKS = ["jump", "woof", "love", "sneeze"];
const setDataset = (el: HTMLElement, k: string, v: string) => {
  if (el.dataset[k] !== v) el.dataset[k] = v;
};

interface Stop {
  x: number;
  track: { kind: string; top: number; from?: number; to?: number };
  s: number;
  behind: boolean;
  sink: number;
  box: number[];
}

interface Meta {
  scene: HTMLElement | null;
  pose: string;
  facing: number;
  act: string;
  looks: HTMLElement[];
  track: HTMLElement | null;
}

interface JourneyData {
  lane: boolean;
  stops: Stop[];
  meta: Meta[];
  holds: [number, number][];
  blend: number;
  mainTop: number;
}

function getStopCenter(stop: Stop, scrollY: number) {
  const track = stop.track;
  const top =
    track.kind === "page"
      ? track.top - scrollY
      : track.kind === "screen"
      ? track.top
      : scrollY < (track.from ?? 0)
      ? track.top - (scrollY - (track.from ?? 0))
      : scrollY > (track.to ?? 0)
      ? track.top - (scrollY - (track.to ?? 0))
      : track.top;
  return {
    x: stop.x + PUPPY_ORIGIN.x * stop.s,
    y: top + PUPPY_ORIGIN.y * stop.s,
  };
}

function findInterval(holds: [number, number][], scrollY: number) {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let a = 0; a < holds.length - 1; a++) {
    const s = holds[a][1];
    const n = holds[a + 1][0];
    if (scrollY < n) return { k: a, t: clamp((scrollY - s) / Math.max(1, n - s)) };
    if (scrollY <= holds[a + 1][1]) return { k: a + 1, t: 0 };
  }
  return { k: holds.length - 1, t: 0 };
}

function computeHoldRange(
  stop: Stop,
  safe: { left: number; top: number; right: number; bottom: number },
  rangeRatio: number[]
) {
  if (stop.track.kind === "pin") {
    return [stop.track.from ?? 0, stop.track.to ?? 0] as [number, number];
  }
  const sTop = stop.track.top;
  const boxTop = sTop + stop.box[1] * stop.s;
  const boxBottom = sTop + stop.box[3] * stop.s;
  const boxCenter = (boxTop + boxBottom) / 2;
  const viewHeight = safe.bottom - safe.top;
  let holdFrom = boxCenter - (safe.top + rangeRatio[1] * viewHeight);
  let holdTo = boxCenter - (safe.top + rangeRatio[0] * viewHeight);
  holdFrom = Math.max(holdFrom, boxBottom - safe.bottom);
  if (holdFrom > (holdTo = Math.min(holdTo, boxTop - safe.top))) {
    holdFrom = holdTo = boxCenter - (safe.top + viewHeight / 2);
  }
  return [holdFrom, holdTo] as [number, number];
}

function measureStops(probeEl: HTMLElement): JourneyData {
  const isMobile = matchMedia("(max-width: 767px), (pointer: coarse) and (max-height: 519px)").matches;
  const clientWidth = document.documentElement.clientWidth;
  const probeHeight = probeEl.getBoundingClientRect().height || window.innerHeight;
  const headerEl = document.getElementById("site-header");
  const headerH = headerEl?.offsetHeight ?? 76;
  const waBar = document.querySelector<HTMLElement>("[data-whatsapp-bar]");
  const waHeight = waBar?.getClientRects().length ? waBar.getBoundingClientRect().height : 0;
  const safeRect = {
    left: 10,
    top: headerH + 10,
    right: clientWidth - 10,
    bottom: probeHeight - 10 - waHeight,
  };
  const main = document.getElementById("main");
  const stops: Stop[] = [];
  const meta: Meta[] = [];
  const holds: [number, number][] = [];

  const processStop = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const pose = el.dataset.pose || "sit";
    const act = el.dataset.act ?? "";
    const scale = rect.width / 300;
    const s = act === "basket" || isMobile ? scale : 1.12 * scale;
    const p = pose === "peek" ? { x: PUPPY_ORIGIN.x, y: 159 } : PUPPY_ORIGIN;

    let stickyParent: HTMLElement | null = null;
    for (let cur = el.parentElement; cur && cur !== document.body; cur = cur.parentElement) {
      if (getComputedStyle(cur).position === "sticky") {
        stickyParent = cur;
        break;
      }
    }

    let track: { kind: string; top: number; from?: number; to?: number };
    if (!stickyParent) {
      track = { kind: "page", top: rect.top + window.scrollY };
    } else {
      const stickyTop = parseFloat(getComputedStyle(stickyParent).top) || 0;
      const deltaTop = rect.top - stickyParent.getBoundingClientRect().top;
      const origPos = stickyParent.style.position;
      stickyParent.style.position = "relative";
      const parentRect = stickyParent.getBoundingClientRect();
      const grandParent = stickyParent.parentElement!;
      const grandParentBottom =
        grandParent.getBoundingClientRect().bottom -
        (parseFloat(getComputedStyle(grandParent).paddingBottom) || 0);
      stickyParent.style.position = origPos;
      const from = parentRect.top + window.scrollY - stickyTop;
      const to = grandParentBottom + window.scrollY - parentRect.height - stickyTop;
      track =
        to <= from
          ? { kind: "page", top: parentRect.top + window.scrollY + deltaTop }
          : { kind: "pin", top: stickyTop + deltaTop, from, to };
    }

    if (track.kind !== "screen") {
      track.top += p.y * (scale - s);
    }

    const stop: Stop = {
      x: rect.left + p.x * (scale - s),
      track,
      s,
      behind: el.dataset.behind === "true",
      sink: 0,
      box: getBox(pose),
    };
    const scene = el.closest<HTMLElement>("[data-pup-scene]");
    stops.push(stop);
    meta.push({
      scene,
      pose,
      facing: el.dataset.facing === "left" ? -1 : 1,
      act,
      looks: scene ? [...scene.querySelectorAll<HTMLElement>("[data-pup-look]")] : [],
      track: act === "treadmill" ? scene?.querySelector<HTMLElement>("[data-treadmill]") ?? null : null,
    });

    let holdRange = computeHoldRange(stop, safeRect, isMobile ? LANE_SCALE : DESKTOP_SCALE);
    if (!isMobile && scene && stop.track.kind === "page" && act !== "basket" && act !== "peekaboo") {
      const h = safeRect.bottom - safeRect.top;
      const sceneTop = scene.getBoundingClientRect().top + window.scrollY - safeRect.top + 0.08 * h;
      const pupBottom = stop.track.top + stop.box[3] * stop.s - safeRect.bottom;
      if (holdRange[1] > sceneTop) {
        const maxScene = Math.max(sceneTop, pupBottom + 0.12 * h);
        holdRange = [
          Math.max(pupBottom, maxScene - Math.max(holdRange[1] - holdRange[0], 0.2 * h)),
          maxScene,
        ];
      }
    }
    holds.push(holdRange);
  };

  const allStops = [...document.querySelectorAll<HTMLElement>("[data-pup-stop]")].filter(
    (e) => e.getClientRects().length
  );

  if (isMobile) {
    const laneStops = allStops.filter((e) => e.dataset.lane === "true");
    const first = laneStops[0];
    const last = laneStops.length > 1 ? laneStops[laneStops.length - 1] : undefined;
    if (first) processStop(first);

    const firstScene = meta[0]?.scene ?? null;
    const scenes = [...document.querySelectorAll<HTMLElement>("#main [data-pup-scene]")].filter(
      (e) => e !== firstScene && e.getClientRects().length
    );
    const s = Math.min(0.62, Math.max(0.5, clientWidth / 650));
    const peekBox = getBox("peek");

    scenes.forEach((scene, i) => {
      const isEven = i % 2 === 0;
      const x = isEven ? safeRect.left + 2 - peekBox[0] * s : safeRect.right - 2 - peekBox[2] * s;
      stops.push({
        x,
        track: { kind: "screen", top: 0 },
        s,
        behind: false,
        sink: SINK_OFFSET,
        box: peekBox,
      });
      meta.push({
        scene,
        pose: "peek",
        facing: isEven ? 1 : -1,
        act: "lane",
        looks: [],
        track: null,
      });
      const rect = scene.getBoundingClientRect();
      const topHold = rect.top + window.scrollY - 0.42 * probeHeight;
      const botHold = rect.bottom + window.scrollY - 0.58 * probeHeight;
      holds.push(topHold <= botHold ? [topHold, botHold] : [(topHold + botHold) / 2, (topHold + botHold) / 2]);
    });

    if (last) processStop(last);
  } else {
    allStops.forEach(processStop);
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Resolve holds
  const resolvedHolds = holds.map((h) =>
    h[0] <= h[1] ? [h[0], h[1]] : [(h[0] + h[1]) / 2, (h[0] + h[1]) / 2]
  ) as [number, number][];

  if (resolvedHolds.length) {
    resolvedHolds[0][0] = -Infinity;
    const last = resolvedHolds[resolvedHolds.length - 1];
    last[1] = Infinity;
    last[0] = Math.min(last[0], maxScroll - 1);

    const travelDists = stops.slice(1).map((s, i) => {
      const prev = stops[i];
      const hSpan = (DESKTOP_SCALE[1] - DESKTOP_SCALE[0]) * probeHeight;
      const minSpan = (isMobile ? 0.32 : 0.5) * probeHeight;
      return Math.min(
        1.4 * probeHeight,
        Math.max(
          minSpan,
          1.15 * Math.hypot(Math.abs(s.x + PUPPY_ORIGIN.x * s.s - (prev.x + PUPPY_ORIGIN.x * prev.s)), hSpan)
        )
      );
    });

    for (let i = 0; i < resolvedHolds.length - 1; i++) {
      const curr = resolvedHolds[i];
      const next = resolvedHolds[i + 1];
      if (next[0] < curr[1]) {
        const mid = (curr[1] + next[0]) / 2;
        curr[1] = Math.max(curr[0], mid);
        next[0] = Math.min(next[1], mid);
        if (next[0] < curr[1]) next[0] = curr[1];
      }
      let gap = travelDists[i] - (next[0] - curr[1]);
      if (gap > 0) {
        const shrinkCurr = Math.min(gap / 2, curr[1] - curr[0]);
        const shrinkNext = Math.min(gap / 2, next[1] - next[0]);
        curr[1] -= shrinkCurr;
        next[0] += shrinkNext;
        const remaining = Math.min((gap -= shrinkCurr + shrinkNext), next[1] - next[0]);
        next[0] += remaining;
        if ((gap -= remaining) > 0) {
          curr[1] -= Math.min(gap, curr[1] - curr[0]);
        }
      }
    }
    for (const h of resolvedHolds) {
      if (h[1] < h[0]) h[1] = h[0];
    }
  }

  return {
    lane: isMobile,
    stops,
    meta,
    holds: resolvedHolds,
    blend: 0.12 * probeHeight,
    mainTop: main ? main.getBoundingClientRect().top + window.scrollY : 0,
  };
}

function computeJourney(journey: JourneyData, scrollY: number) {
  const getSafeRect = () => {
    const clientW = document.documentElement.clientWidth;
    const headerH = (document.getElementById("site-header")?.offsetHeight ?? 76) + 10;
    if (journey.lane) {
      const waBar = document.querySelector<HTMLElement>("[data-whatsapp-bar]");
      const top = waBar?.getClientRects().length ? waBar.getBoundingClientRect().top : window.innerHeight - 6;
      return { left: 10, top: headerH, right: clientW - 10, bottom: top + 40 };
    }
    const waBar = document.querySelector<HTMLElement>("[data-whatsapp-bar]");
    const bot = waBar?.getClientRects().length ? waBar.getBoundingClientRect().top : window.innerHeight;
    return { left: 10, top: headerH, right: clientW - 10, bottom: Math.min(window.innerHeight, bot) - 10 };
  };

  const safeRect = getSafeRect();
  const { k: P, t: B } = findInterval(journey.holds, scrollY);

  if (B <= 0 || P >= journey.stops.length - 1) {
    const stop = journey.stops[P];
    const center = getStopCenter(stop, scrollY);
    const clamped = clampToSafe(center.x, center.y, stop.s, stop.box, safeRect);
    return {
      x: clamped.x,
      y: clamped.y,
      s: stop.s,
      front: !stop.behind,
      airborne: false,
      k: P,
      t: 0,
      walked: 0,
    };
  }

  const r = journey.stops[P];
  const i = journey.stops[P + 1];
  const holdEnd = journey.holds[P][1];
  const nextHoldStart = journey.holds[P + 1][0];
  const travelRange = Math.max(1, nextHoldStart - holdEnd);
  const v = clamp((scrollY - holdEnd) / travelRange);

  const p0Center = getStopCenter(r, holdEnd);
  const p1Center = getStopCenter(i, nextHoldStart);

  // Compute Bézier Curve
  const p0 = { x: p0Center.x, y: p0Center.y - r.sink * r.s };
  const p1 = { x: p1Center.x, y: p1Center.y - i.sink * i.s };
  const dx = p1.x - p0.x;
  const safeWidth = safeRect.right - safeRect.left;
  const handleDist = Math.max(0.45 * Math.abs(dx), 0);
  const sign = dx >= 0 ? 1 : -1;
  let c1 = { x: p0.x + sign * handleDist, y: p0.y };
  let c2 = { x: p1.x - sign * handleDist, y: p1.y };
  const minDx = 0.14 * safeWidth;

  if (Math.abs(dx) < minDx) {
    const midX = (p0.x + p1.x) / 2;
    const safeMidX = (safeRect.left + safeRect.right) / 2;
    const bulge = (midX < safeMidX ? 1 : -1) * (minDx - Math.abs(dx)) * 0.9;
    c1 = { x: c1.x + bulge, y: lerp(p0.y, p1.y, 0.2) };
    c2 = { x: c2.x + bulge, y: lerp(p0.y, p1.y, 0.8) };
  }

  const clampPt = (pt: { x: number; y: number }) => ({
    x: Math.min(safeRect.right, Math.max(safeRect.left, pt.x)),
    y: Math.min(safeRect.bottom, Math.max(safeRect.top, pt.y)),
  });

  const curve = {
    p0,
    c1: clampPt(c1),
    c2: clampPt(c2),
    p1,
  };

  const smoothV = v * v * v * (v * (6 * v - 15) + 10);
  const pt = bezier(curve.p0, curve.c1, curve.c2, curve.p1, smoothV);
  const scale = lerp(r.s, i.s, smoothstep(clamp(v / 0.65)));

  const blendFraction = Math.min(0.3, Math.max(0.06, journey.blend / travelRange));
  const blendStart = 1 - smoothBetween(0, blendFraction, v);
  const blendEnd = smoothBetween(1 - blendFraction, 1, v);

  let posY =
    pt.y +
    blendStart * (getStopCenter(r, scrollY).y - p0Center.y) +
    blendEnd * (getStopCenter(i, scrollY).y - p1Center.y);
  const posX = pt.x;

  posY += r.sink * r.s * (1 - smoothBetween(0, 0.22, v)) + i.sink * i.s * smoothBetween(0.78, 1, v);

  let airborne = false;
  if (r.behind && v < 0.36) {
    posY -= Math.sin((v / 0.36) * Math.PI) * Math.min(64 * r.s, 72);
    airborne = v < 0.32;
  }
  if (i.behind && v > 0.68) {
    posY -= Math.sin(((v - 0.68) / 0.32) * Math.PI) * Math.min(56 * i.s, 60);
    airborne = true;
  }
  if (r.sink && v < 0.2) {
    airborne = true;
  }

  const front = !(r.behind && v < 0.12 || i.behind && v > 0.92);

  const clamped = clampToSafe(
    posX,
    posY,
    scale,
    v < 0.5
      ? lerpBox(r.box, DEFAULT_BOX, smoothBetween(0, r.sink ? 0.22 : r.behind ? 0.36 : 0.06, v))
      : lerpBox(DEFAULT_BOX, i.box, smoothBetween(i.sink ? 0.78 : i.behind ? 0.68 : 0.94, 1, v)),
    safeRect
  );

  // Compute walked distance along Bézier curve
  let walked = 0;
  let prevPt = curve.p0;
  const steps = Math.max(1, Math.ceil(32 * clamp(smoothV)));
  for (let l = 1; l <= steps; l++) {
    const cur = bezier(curve.p0, curve.c1, curve.c2, curve.p1, (l / steps) * clamp(smoothV));
    walked += Math.hypot(cur.x - prevPt.x, cur.y - prevPt.y);
    prevPt = cur;
  }

  return {
    x: clamped.x,
    y: clamped.y,
    s: scale,
    front,
    airborne,
    k: P,
    t: v,
    walked,
  };
}

export default function PupJourney() {
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const bubbleAtRef = useRef<HTMLSpanElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const actor = actorRef.current;
    const body = bodyRef.current;
    const bubble = bubbleRef.current;
    const bubbleAt = bubbleAtRef.current;
    const prints = printsRef.current;
    const probe = probeRef.current;
    if (!layer || !actor || !body || !bubble || !bubbleAt || !prints || !probe) return;

    const svg = body.querySelector("svg");
    if (!svg) return;

    const root = document.documentElement;
    let journeyData: JourneyData | null = null;
    let puppet: Puppet | null = null;
    let isLive = false;
    const printsPool = [...prints.children] as HTMLElement[];
    let pawIndex = 0;
    let bubbleHideTime = 0;

    const say = (text: string, now: number, dur = 1.4) => {
      bubble.textContent = text;
      bubble.dataset.show = "true";
      bubbleHideTime = now + dur;
    };

    let pointerTarget: { x: number; y: number; t: number } | null = null;
    let gazeTarget: { el: HTMLElement; until: number } | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        pointerTarget = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("a, button, input, textarea, select, summary")) {
        gazeTarget = { el: t, until: performance.now() / 1000 + 1.4 };
      }
    };

    let lastTime = performance.now() / 1000;
    let lastScrollY = window.scrollY;
    let prevPos: { x: number; y: number } | null = null;
    const springOffset = { x: 0, y: 0, s: 0 };
    let stillTimer = 0;
    let currentStop = -1;
    let arriveTime = 0;
    let lastActionTime = 0;
    let trickQueue: [number, (t: number) => void][] = [];
    let lookIndex = -1;
    let lastLookTime = 0;
    let prevTrackLeft: number | null = null;
    let trackIdleTimer = 0;
    let nextBasketActionTime = 0;
    let lastScrollEventTime = performance.now() / 1000;
    let lastPawStep = -1;
    let lastPawStop = -1;
    let filteredPos: { x: number; y: number } | null = null;
    let laneYAccum = 0;
    let lastMascotClickTime = 0;
    let mascotClickCount = 0;

    const getBottomSafeY = () => {
      const waBar = document.querySelector<HTMLElement>("[data-whatsapp-bar]");
      const rect = waBar?.getClientRects().length ? waBar.getBoundingClientRect() : null;
      return rect && rect.height ? rect.top : window.innerHeight - 6;
    };

    // Animation Tick Loop
    const tick = () => {
      if (!journeyData || !puppet) return;

      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      const currentScrollY = window.scrollY;
      const dScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(dScroll) > 0.5) {
        lastScrollEventTime = now;
      }

      // Execute queued trick callbacks
      while (trickQueue.length && trickQueue[0][0] <= now) {
        trickQueue.shift()![1](now);
      }

      // Compute motion position
      const targetScroll =
        now - lastScrollEventTime > 0.25
          ? (() => {
              const { k, t } = findInterval(journeyData.holds, currentScrollY);
              if (t <= 0 || k >= journeyData.stops.length - 1) return currentScrollY;
              const s0 = journeyData.stops[k];
              const s1 = journeyData.stops[k + 1];
              const minV = s0.sink ? 0.22 : 0.36 * +s0.behind;
              const maxV = s1.sink ? 0.78 : s1.behind ? 0.68 : 1;
              let v = t;
              if (t < minV) v = t < minV / 2 ? 0 : minV;
              else if (t > maxV) v = t > (1 + maxV) / 2 ? 1 : maxV;
              return v === t
                ? currentScrollY
                : journeyData.holds[k][1] + v * (journeyData.holds[k + 1][0] - journeyData.holds[k][1]);
            })()
          : currentScrollY;

      const journey = computeJourney(journeyData, targetScroll);

      // Spring damping
      const damp = Math.exp(-dt / 0.28);
      springOffset.x *= damp;
      springOffset.y *= damp;
      springOffset.s *= damp;
      if (Math.abs(springOffset.x) < 0.05 && Math.abs(springOffset.y) < 0.05) {
        springOffset.x = springOffset.y = 0;
      }

      const finalScale = journey.s + springOffset.s;
      let finalX = journey.x + springOffset.x;
      let finalY = journey.y + springOffset.y;

      // Handle mobile lane smoothing
      const isMobileLane = journeyData.lane;
      const bottomSafe = isMobileLane ? getBottomSafeY() : 0;
      let isResting = true;

      if (isMobileLane) {
        if (!filteredPos) {
          filteredPos = prevPos ? { x: prevPos.x, y: prevPos.y - bottomSafe } : { x: finalX, y: finalY - bottomSafe };
        }
        const alpha = 1 - Math.exp(-dt / 0.14);
        filteredPos.x += (finalX - filteredPos.x) * alpha;
        filteredPos.y += (finalY - bottomSafe - filteredPos.y) * alpha;
        isResting = Math.hypot(finalX - filteredPos.x, finalY - bottomSafe - filteredPos.y) < 1.5;
        finalX = filteredPos.x;
        finalY = bottomSafe + filteredPos.y;
      } else if (filteredPos) {
        filteredPos = null;
      }

      setDataset(layer, "anchor", isMobileLane ? "bottom" : "top");
      const anchorOffset = isMobileLane ? layer.getBoundingClientRect().top : 0;

      const isParked = journey.t === 0 && isResting;
      const stopIndex = journey.k;

      if (isParked) {
        // Dog is parked at a stop
        if (currentStop !== stopIndex) {
          const meta = journeyData.meta[stopIndex];
          trickQueue = [];
          gazeTarget = null;
          currentStop = stopIndex;
          arriveTime = now;
          lastActionTime = now;
          prevTrackLeft = null;
          puppet.reset();
          puppet.setPose(meta.pose);
          puppet.face(meta.facing, 0.14);
          puppet.stride(0);
          puppet.wag(meta.act === "basket" ? 0.3 : 0.7);
          puppet.jolt(0.4);
          nextBasketActionTime = now + 2.4;
        }

        const meta = journeyData.meta[stopIndex];

        // Treadmill tracking: synchronizes walking feet with horizontal scroll
        if (meta.track && !trickQueue.length) {
          const trackLeft = meta.track.getBoundingClientRect().left;
          const dLeft = prevTrackLeft === null ? 0 : trackLeft - prevTrackLeft;
          prevTrackLeft = trackLeft;
          puppet.walkedTo(-trackLeft / finalScale);
          if (Math.abs(dLeft) > 0.15) {
            trackIdleTimer = 0;
            puppet.setPose("walk");
            puppet.stride(1);
            puppet.face(dLeft < 0 ? 1 : -1, 0.16);
          } else if ((trackIdleTimer += dt) > 0.25) {
            puppet.setPose("stand");
            puppet.stride(0);
          }
        }

        if (meta.act === "tilt" && !trickQueue.length && now - arriveTime > 1.2) {
          const s = Math.sin(0.9 * now);
          puppet.cock(s > 0.35 ? 13 : s < -0.35 ? -10 : 0);
        }

        if (meta.act === "basket" && !trickQueue.length && now > nextBasketActionTime) {
          nextBasketActionTime = now + 4.5 + 3 * Math.random();
          if (Math.random() < 0.7) puppet.jolt(0.55);
          else puppet.yawn(now, 0.7);
        }

        // Idle tricks after sitting for > 9s
        if (Math.abs(dScroll) > 0.5) lastActionTime = now;
        if (!trickQueue.length && !meta.track && meta.act !== "basket" && now - lastActionTime > 9) {
          lastActionTime = now;
          if (Math.random() < 0.55) {
            puppet.cock(12);
            say("hm?", now, 1.2);
            setTimeout(() => puppet?.cock(0), 1200);
          } else {
            puppet.wag(1);
            setTimeout(() => puppet?.wag(0.7), 2400);
          }
        }
      } else {
        // Dog is traveling between stops
        if (currentStop !== -1) {
          currentStop = -1;
          trickQueue = [];
          puppet.reset();
        }

        const dist = prevPos ? Math.hypot(finalX - prevPos.x, finalY - prevPos.y) : 0;
        stillTimer = dist > 0.25 ? 0 : stillTimer + dt;

        let airborne = journey.airborne;
        if (airborne) {
          puppet.setPose("hop");
          puppet.stride(0);
        } else if (stillTimer > 0.3) {
          puppet.setPose("stand");
          puppet.stride(0);
        } else {
          puppet.setPose("walk");
          puppet.stride(1);
        }

        if (isMobileLane) {
          laneYAccum += dist;
          puppet.walkedTo(laneYAccum / Math.max(0.05, finalScale));
        } else {
          puppet.walkedTo(journey.walked / Math.max(0.05, finalScale));
        }

        if (prevPos) {
          const dx = finalX - prevPos.x;
          if (Math.abs(dx) > 0.6 && Math.abs(dx) > 0.35 * Math.abs(finalY - prevPos.y)) {
            puppet.face(dx > 0 ? 1 : -1, 0.16);
          }
        }

        // Emit authentic paw prints along the Bézier curve!
        if (!journeyData.lane) {
          const stepIndex = Math.floor(journey.walked / (34 * finalScale));
          if (lastPawStop === stopIndex && stepIndex !== lastPawStep && !journey.airborne && prevPos) {
            const isOdd = 1 & stepIndex;
            const legOffset = isOdd ? 186 : 110;
            const left = finalX - PUPPY_ORIGIN.x * finalScale;
            const top = finalY - PUPPY_ORIGIN.y * finalScale;
            const px = left + (puppet.facingDir > 0 ? legOffset : 300 - legOffset) * finalScale;
            const py = top + 226 * finalScale + currentScrollY - journeyData.mainTop + (isOdd ? -4 : 4) * finalScale;
            const angle = Math.atan2(finalY - prevPos.y + dScroll, finalX - prevPos.x) + Math.PI / 2;
            const size = 14 * Math.max(0.75, 1.5 * finalScale);
            const pawEl = printsPool[pawIndex++ % printsPool.length];
            if (pawEl) {
              pawEl.style.transform = `translate(${(px - size / 2).toFixed(1)}px, ${(py - size / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
              pawEl.style.width = pawEl.style.height = `${size.toFixed(1)}px`;
              pawEl.animate(
                [
                  { opacity: 0 },
                  { opacity: 0.45, offset: 0.08 },
                  { opacity: 0.45, offset: 0.5 },
                  { opacity: 0 },
                ],
                { duration: 2600, easing: "ease-out" }
              );
            }
          }
          lastPawStop = stopIndex;
          lastPawStep = stepIndex;
        }
      }

      prevPos = { x: finalX, y: finalY };

      // Update scene datasets for section triggers
      journeyData.meta.forEach((m, idx) => {
        if (m.scene) {
          setDataset(m.scene, "here", String(isParked && idx === stopIndex));
          setDataset(m.scene, "visited", String(idx <= stopIndex || (idx === stopIndex + 1 && journey.t > 0.92)));
        }
      });

      // Gaze tracking
      if (gazeTarget && gazeTarget.until > now) {
        const rect = gazeTarget.el.getBoundingClientRect();
        puppet.lookAt({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else if (pointerTarget && now - pointerTarget.t < 2.5) {
        puppet.lookAt(pointerTarget);
      } else {
        puppet.lookAt(null);
      }

      // Position actor element
      actor.style.transform = `translate3d(${(finalX - PUPPY_ORIGIN.x * finalScale).toFixed(2)}px, ${(finalY - PUPPY_ORIGIN.y * finalScale - anchorOffset).toFixed(2)}px, 0)`;
      body.style.transform = `scale(${finalScale.toFixed(4)})`;
      setDataset(layer, "front", String(journey.front));
      setDataset(actor, "holding", String(isParked));

      // Speech bubble positioning
      if (bubble.dataset.show === "true") {
        if (now > bubbleHideTime) bubble.dataset.show = "false";
        const bubbleX = (puppet.facingDir > 0 ? 214 : 300 - 214) * finalScale;
        bubbleAt.style.transform = `translate(${bubbleX.toFixed(1)}px, ${(30 * finalScale).toFixed(1)}px)`;
      }

      puppet.tick(dt, now);
      animId = requestAnimationFrame(tick);
    };

    let animId = 0;

    // Click on puppy: trigger interactive trick!
    const handleActorClick = () => {
      if (!puppet || !journeyData) return;
      const now = performance.now() / 1000;
      mascotClickCount = now - lastMascotClickTime < 0.7 ? mascotClickCount + 1 : 1;
      lastMascotClickTime = now;
      lastActionTime = now;

      const tricks = ["woof", "hop", "love", "sneeze"];
      const trick = tricks[Math.floor(Math.random() * tricks.length)];

      if (trick === "woof") {
        puppet.woof(now);
        say("woof!", now);
      } else if (trick === "hop") {
        puppet.hop(1.35);
        say("boing!", now);
      } else if (trick === "love") {
        puppet.wag(1);
        puppet.hop(0.5);
        if (prevPos) {
          spawnHearts(layer, prevPos.x, prevPos.y - 40 * (journeyData.stops[0]?.s || 1));
        }
        say("I like you! ❤️", now, 1.8);
      } else {
        puppet.jolt(1.4);
        puppet.hop(0.4);
        puppet.yawn(now, 0.22);
        say("achoo!", now);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && puppet) {
        puppet.petting(true);
        puppet.wag(1);
      }
    };

    const handlePointerLeave = () => {
      if (puppet) {
        puppet.petting(false);
        puppet.wag(0.7);
      }
    };

    // Setup function
    const startJourney = () => {
      if (isLive || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const data = measureStops(probe);
      if (data.stops.length < 2) return;

      journeyData = data;
      isLive = true;
      root.dataset.pup = data.lane ? "lane" : "live";
      layer.hidden = false;

      const initial = data.meta[0];
      puppet = new Puppet(svg, initial.pose, initial.facing);
      lastScrollY = window.scrollY;
      prevPos = null;
      lastTime = performance.now() / 1000;

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("focusin", handleFocusIn);
      actor.addEventListener("click", handleActorClick);
      actor.addEventListener("pointerenter", handlePointerEnter);
      actor.addEventListener("pointerleave", handlePointerLeave);

      animId = requestAnimationFrame(tick);
    };

    const stopJourney = () => {
      if (!isLive) return;
      isLive = false;
      cancelAnimationFrame(animId);
      delete root.dataset.pup;
      layer.hidden = true;
      delete layer.dataset.anchor;

      journeyData?.meta.forEach((m) => {
        if (m.scene) {
          delete m.scene.dataset.here;
          delete m.scene.dataset.visited;
        }
      });
      journeyData = null;
      puppet = null;
      currentStop = -1;

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("focusin", handleFocusIn);
      actor.removeEventListener("click", handleActorClick);
      actor.removeEventListener("pointerenter", handlePointerEnter);
      actor.removeEventListener("pointerleave", handlePointerLeave);
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isLive || !journeyData) return;
        const fresh = measureStops(probe);
        if (fresh.stops.length < 2) return stopJourney();
        journeyData = fresh;
        root.dataset.pup = fresh.lane ? "lane" : "live";
      }, 120);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    document.fonts?.ready?.then(handleResize);

    startJourney();

    return () => {
      stopJourney();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  return (
    <>
      <div ref={probeRef} aria-hidden={true} className="pup-probe" />
      <div ref={printsRef} aria-hidden={true} className="pup-prints">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden={true} className="pup-layer" hidden data-front="true">
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <PupSvg pose="peek" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
