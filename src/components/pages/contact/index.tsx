"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Facebook, Github, Mail, Send } from "lucide-react";

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 min-h-[calc(100vh-8rem)]">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-8"
      >
        <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-white">
              Let&apos;s Work Together
            </CardTitle>
            <CardDescription className="text-white/70">
              Ready to bring your vision to life? Let&apos;s discuss your
              project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Name</label>
                <Input
                  placeholder="Your name"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Subject</label>
              <Input
                placeholder="Project inquiry"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Message</label>
              <Textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="bg-white/10 border-white/20 text-white md:rows-6"
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-4 space-y-4 md:space-y-6"
      >
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "lethanhtuyen10081998@gmail.com",
                href: "mailto:lethanhtuyen10081998@gmail.com",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "lethanhtuyen10081998",
                href: "https://github.com/lethanhtuyen10081998",
              },
              {
                icon: Facebook,
                label: "Facebook",
                value: "https://www.facebook.com/kp92prjxq8/",
                href: "https://www.facebook.com/kp92prjxq8/",
              },
            ].map((contact) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-colors">
                  <contact.icon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-sm md:text-base text-white">
                    {contact.label}
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    {contact.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <div className="font-medium text-sm md:text-base text-white">
                  Available for work
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  Open to new opportunities
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
