"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-4"
    >
      <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Portfolio
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="border-white/30 text-white bg-transparent"
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Mail className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
}
