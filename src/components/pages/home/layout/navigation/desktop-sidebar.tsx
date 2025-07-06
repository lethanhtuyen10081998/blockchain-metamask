"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { navigationItems } from "@/common/constants";
import { usePathname, useRouter } from "next/navigation";

export function DesktopSidebar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40 flex-col items-center py-8"
      >
        {/* Logo */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-8 cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white font-bold text-xl">P</span>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-4 flex-1">
          {navigationItems.map((item, index) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <motion.button
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    pathname === item.link
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/10 text-white/60 hover:text-white"
                  }`}
                  onClick={() => router.push(`${item.link}`)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Music Player */}
        <motion.button
          className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white/60 hover:text-white"
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>
      </motion.aside>
    </TooltipProvider>
  );
}
