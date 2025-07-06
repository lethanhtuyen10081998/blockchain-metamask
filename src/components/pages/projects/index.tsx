"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/common/constants";
import Image from "next/image";

export function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-white">
              Featured Projects
            </CardTitle>
            <CardDescription className="text-white/70">
              Some of my recent work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={
                          project.image || "/images/projects/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-50 md:h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                        width={1000}
                        height={1000}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`text-xs ${
                            project.status === "Live"
                              ? "bg-green-600/20 text-green-300"
                              : "bg-blue-600/20 text-blue-300"
                          } backdrop-blur-sm`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm md:text-base text-white">
                          {project.title}
                        </h3>
                        <span className="text-xs text-white/60">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-white/70 mb-3">
                        {project.description}
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-blue-600/20 text-blue-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
