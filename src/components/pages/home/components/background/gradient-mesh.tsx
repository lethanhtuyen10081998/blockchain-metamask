"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.3))",
            "linear-gradient(90deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.3))",
            "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.3))",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.3))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
