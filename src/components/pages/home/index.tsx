"use client";

import { skills } from "@/common/constants";
import { FloatingOrbs } from "@/components/pages/home/components/background/floating-orbs";
import { GradientMesh } from "@/components/pages/home/components/background/gradient-mesh";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Code,
  FolderOpen,
  Heart,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-8 md:row-span-2 relative"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden">
          <FloatingOrbs />
          <GradientMesh />

          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4 badge-gradient text-blue-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Available for Projects
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              <motion.span
                className="inline-block"
                style={{
                  background:
                    "linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #10b981)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                Creative
              </motion.span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl"
            >
              Crafting exceptional digital experiences with cutting-edge
              technologies and innovative design solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                onClick={() => router.push("/cv")}
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View CV
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Heart className="w-5 h-5 mr-2" />
                Let&apos;s Talk
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-6">
        {[
          { number: "20+", label: "Projects", icon: FolderOpen },
          { number: "5+", label: "Years", icon: Calendar },
          { number: "100%", label: "Satisfaction", icon: Star },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-4 md:p-6 flex md:flex-row flex-col items-center gap-2 md:gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-colors">
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-lg md:text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-xs md:text-sm">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Skills & Recent Project */}
      <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Quick Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-12"
        >
          <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl text-white">
                <Code className="w-5 h-5 mr-2" />
                Core Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {skills.slice(0, 4).map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-white/60">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="md:col-span-6">
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm group cursor-pointer hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg md:text-xl text-white">
                  <span className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Latest Project
                  </span>
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <div className="space-y-4 ">
                      <Image
                        src="/images/projects/travel.png"
                        alt="Latest project"
                        className="w-full h-40 md:h-40 object-cover rounded-lg"
                        width={1000}
                        height={1000}
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          Travel Management System
                        </h4>
                        <p className="text-sm text-white/70">
                          Travel management system for managing travel expenses
                          and bookings. Using AI to generate reports and
                          insights.
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-blue-600/20 text-blue-300 text-xs">
                          Next.js
                        </Badge>
                        <Badge className="bg-purple-600/20 text-purple-300 text-xs">
                          AI/ML
                        </Badge>
                        <Badge className="bg-green-600/20 text-green-300 text-xs">
                          Stripe
                        </Badge>
                        <Badge className="bg-green-600/20 text-amber-300 text-xs">
                          Nestjs + Oracle
                        </Badge>
                        <Badge className="bg-green-600/20 text-amber-300 text-xs">
                          Material UI
                        </Badge>
                        <Badge className="bg-green-600/20 text-green-400 text-xs">
                          Tiptap
                        </Badge>
                        <Badge className="bg-green-600/20 text-cyan-400 text-xs">
                          n8n
                        </Badge>
                        <Badge className="bg-green-600/20 text-orange-700 text-xs">
                          Node.js
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <div className="space-y-4 ">
                      <Image
                        src="/images/projects/taggrading.png"
                        alt="Latest project"
                        className="w-full h-40 md:h-40 object-cover rounded-lg"
                        width={1000}
                        height={1000}
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          TAG Grading
                        </h4>
                        <p className="text-sm text-white/70">
                          TAG Grading is a platform for grading and analyzing
                          the quality of the product.
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-blue-600/20 text-blue-300 text-xs">
                          React JS
                        </Badge>
                        <Badge className="bg-purple-600/20 text-purple-300 text-xs">
                          AI/ML
                        </Badge>
                        <Badge className="bg-green-600/20 text-green-300 text-xs">
                          Stripe
                        </Badge>
                        <Badge className="bg-green-600/20 text-amber-300 text-xs">
                          PostgreSQL
                        </Badge>
                        <Badge className="bg-green-600/20 text-amber-300 text-xs">
                          Material UI
                        </Badge>
                        <Badge className="bg-green-600/20 text-green-400 text-xs">
                          Node.js
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
