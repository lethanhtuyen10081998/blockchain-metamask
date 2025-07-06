"use client";

import { MouseCursor } from "@/components/material/mouse-cursor";
import { FloatingParticles } from "@/components/pages/home/components/background/floating-particles";
import { DesktopSidebar } from "@/components/pages/home/layout/navigation/desktop-sidebar";
import { DesktopStatusBar } from "@/components/pages/home/layout/navigation/desktop-status-bar";
import { MobileBottomNav } from "@/components/pages/home/layout/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/components/pages/home/layout/navigation/mobile-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <FloatingParticles />

          <div className="min-h-screen relative overflow-hidden">
            <MouseCursor />

            <MobileHeader />
            <MobileBottomNav />

            <DesktopSidebar />

            <main className="md:ml-24 pt-20 pb-20 md:pt-12 md:pb-16 mx-4">
              <AnimatePresence mode="wait">{children}</AnimatePresence>
            </main>

            <DesktopStatusBar />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
