"use client";
import { motion, MotionConfig } from "framer-motion";

export default function Orb() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-label="Orb"
        className="relative h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(245,158,11,0.7), rgba(245,158,11,0.25) 60%, rgba(245,158,11,0.1) 100%)",
          boxShadow: "0 0 40px rgba(245,158,11,0.35)"
        }}
        animate={{ scale: [1.0, 1.03, 1.0] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          style={{
            background:
              "conic-gradient(from 180deg, rgba(255,255,255,0.4), transparent 40%, rgba(255,255,255,0.4))",
            mixBlendMode: "soft-light"
          }}
        />
      </motion.div>
    </MotionConfig>
  );
} 