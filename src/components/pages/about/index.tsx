"use client";

import { skills } from "@/common/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 min-h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-white">
              About Me
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-white/70">
              Passionate about creating digital experiences that matter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              I&apos;m a passionate full-stack developer with expertise in
              modern web technologies. I specialize in creating exceptional
              digital experiences that combine beautiful design with powerful
              functionality and cutting-edge performance.
            </p>
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              With over 3 years of experience, I&apos;ve worked with startups
              and established companies to build scalable applications that
              serve thousands of users. I believe in writing clean, maintainable
              code and staying up-to-date with the latest industry trends.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <div>
                <h4 className="font-semibold mb-3 text-white">Frontend</h4>
                <div className="space-y-2">
                  {[
                    "React/Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Material UI",
                    "Tiptap",
                    "Stripe",
                  ].map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-sm text-white/80">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Backend</h4>
                <div className="space-y-2">
                  {[
                    "Node.js",
                    "PostgreSQL",
                    "Redis",
                    "Docker",
                    "Nestjs",
                    "AI/ML",
                    "PHP",
                  ].map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-sm text-white/80">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills Progress */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-4"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {skills.map(
              (
                skill: { name: string; level: number; color: string },
                index: number
              ) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-white/60">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              )
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
