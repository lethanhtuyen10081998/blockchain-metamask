"use client";

import { MouseCursor } from "@/components/material/mouse-cursor";
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
          <div className="min-h-screen relative overflow-hidden">
            <MouseCursor />

            <main>
              <AnimatePresence mode="wait">{children}</AnimatePresence>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
