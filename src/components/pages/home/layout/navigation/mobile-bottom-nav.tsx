"use client";

import { navigationItems } from "@/common/constants";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-xl border-t border-white/10 z-40 flex items-center justify-around px-4"
    >
      {navigationItems.map(
        (item: {
          id: string;
          link: string;
          label: string;
          icon: LucideIcon;
        }) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              pathname === item.link
                ? "text-blue-400 bg-blue-400/10"
                : "text-white/60 hover:text-white"
            }`}
            onClick={() => router.push(item.link)}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        )
      )}
    </motion.nav>
  );
}
