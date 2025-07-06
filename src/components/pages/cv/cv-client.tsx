"use client";

import { CVMainContent } from "@/components/pages/cv/cv-main-content";
import { CVPreview } from "@/components/pages/cv/cv-preview";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

interface CVClientProps {
  locale: "en" | "vi";
}

export default function CVClient({ locale }: CVClientProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (isPreviewMode) {
    return (
      <CVPreview locale={locale} onClose={() => setIsPreviewMode(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/20 shadow-lg">
            <CVMainContent />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
