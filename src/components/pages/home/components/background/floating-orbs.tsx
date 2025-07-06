"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export function FloatingOrbs() {
  const orbs = useMemo(() => {
    return [...Array(6)].map(() => {
      const size = Math.random() * 300 + 100;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const deltaX = Math.random() * 100 - 50;
      const deltaY = Math.random() * 100 - 50;
      const duration = Math.random() * 10 + 10;

      return {
        size,
        left,
        top,
        deltaX,
        deltaY,
        duration,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, orb.deltaX, 0],
            y: [0, orb.deltaY, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
