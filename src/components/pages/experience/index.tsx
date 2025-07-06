"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/common/constants";

export function ExperienceSection() {
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-12"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-white">
              Professional Experience
            </CardTitle>
            <CardDescription className="text-white/70">
              My journey in the tech industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 border-l-2 border-gradient-to-b from-blue-500 to-purple-500 last:border-l-0"
                >
                  <motion.div
                    className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${
                      exp.current
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                        : "bg-white/20"
                    }`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {exp.title}
                      </h3>
                      <Badge
                        className={
                          exp.current
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-white/10 text-white"
                        }
                      >
                        {exp.current ? "Current" : exp.year}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-1">
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {exp.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
