"use client";

import React, { useEffect, useMemo, useState } from "react";

export type NudgeHintProps = {
  className?: string;            // e.g. "absolute bottom-20 left-1/2 -translate-x-1/2"
  rotateDeg?: number;            // rotate arrow in degrees
  persistKey?: string;           // localStorage key to remember dismissal
  label?: string;                // override label; defaults to Click/Tap based on device
};

export default function NudgeHint({
  className = "",
  rotateDeg = 0,
  persistKey,
  label,
}: NudgeHintProps) {
  const [visible, setVisible] = useState(true);

  // Heuristic: touch = "Tap", otherwise "Click"
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    const mq = window.matchMedia?.("(hover: none) and (pointer: coarse)");
    return navigator.maxTouchPoints > 0 || mq?.matches === true;
  }, []);

  const computedLabel = label ?? (isTouch ? "Tap me" : "Click me");

  useEffect(() => {
    if (!persistKey || typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(persistKey);
    if (dismissed === "1") setVisible(false);
  }, [persistKey]);

  const dismiss = () => {
    setVisible(false);
    if (persistKey && typeof window !== "undefined") {
      window.localStorage.setItem(persistKey, "1");
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={dismiss}
      aria-label={`${computedLabel} (dismiss hint)`}
      className={`pointer-events-auto select-none group ${className}`}
    >
      {/* Bubble */}
      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 shadow-md ring-1 ring-slate-200">
        <span className="text-xs font-medium text-slate-700">{computedLabel}</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
      </div>

      {/* Curved arrow */}
      <svg
        viewBox="0 0 120 80"
        className="mt-1 h-12 w-20 text-slate-700/70"
        style={{ transform: `rotate(${rotateDeg}deg)` }}
        aria-hidden="true"
      >
        <path
          d="M10 70 C 40 60, 65 40, 90 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M85 22 L98 20 L93 32 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
