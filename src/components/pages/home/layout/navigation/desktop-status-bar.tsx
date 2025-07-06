"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DesktopStatusBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="hidden md:flex fixed bottom-0 left-20 right-0 h-16 bg-black/20 backdrop-blur-xl border-t border-white/10 items-center justify-between px-8 z-30"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-white/60">Available for work</span>
        </div>
        <Separator orientation="vertical" className="h-6 bg-white/10" />
        <span className="text-sm text-white/60">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="outline"
          className="border-white/30 text-white hover:bg-white hover:text-black bg-transparent"
        >
          <Download className="w-4 h-4 mr-2" />
          Resume
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Mail className="w-4 h-4 mr-2" />
          Hire Me
        </Button>
      </div>
    </motion.div>
  );
}
