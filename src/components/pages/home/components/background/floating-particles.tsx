"use client";

import { motion } from "framer-motion";

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}
