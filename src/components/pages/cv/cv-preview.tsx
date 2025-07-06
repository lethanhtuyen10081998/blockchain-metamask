"use client";

import { motion } from "framer-motion";
import { X, Download, PrinterIcon as Print } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVMainContent } from "@/components/pages/cv/cv-main-content";

interface CVPreviewProps {
  locale: "en" | "vi";
  onClose: () => void;
}

export function CVPreview({ onClose }: CVPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Preview Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">CV Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Print className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CV Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-8 bg-white" style={{ minHeight: "297mm" }}>
            <CVMainContent />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
