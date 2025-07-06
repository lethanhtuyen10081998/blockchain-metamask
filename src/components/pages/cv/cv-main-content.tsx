"use client";

import { experience, projects, skills } from "@/common/constants";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Award,
  Building,
  Calendar,
  Code,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";

const personalInfo = {
  name: "Tuyen Le Thanh",
  title: "Creative Full-Stack Developer",
  tagline: "Building the future, one line of code at a time",
  email: "lethanhtuyen10081998@gmail.com",
  phone: "+84 0977 432 417",
  location: "Ho Chi Minh City, Vietnam",
  website: "https://tuyenlt.netlify.app",
  github: "https://github.com/lethanhtuyen10081998",
  summary:
    "Passionate full-stack developer with 5+ years crafting exceptional digital experiences. Specialized in React ecosystem, Node.js, and cloud architecture. Love turning complex problems into elegant solutions.",
  avatar: "/images/avatar.jpg",
};

const education = {
  degree: "B.S. Computer Science",
  school: "Ho Chi Minh City University of Technology and Education",
  location: "Ho Chi Minh City, Vietnam",
  period: "2016-2020",
  gpa: "3.2",
  achievements: ["Dean's List", "CS Society President"],
};

const certifications = [
  {
    name: "AWS Solutions Architect",
    issuer: "AWS",
    year: "2023",
    color: "from-orange-400 to-orange-600",
  },
];

export function CVMainContent() {
  return (
    <div className="cv-content bg-white">
      {/* Modern Header with Asymmetric Design */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-100/50 to-transparent rounded-full translate-y-32 -translate-x-32"></div>

        <div className="relative px-4 py-4">
          <div className="flex items-start justify-between">
            {/* Left: Avatar + Name & Title */}
            <div className="flex-1 flex gap-6">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-black/20 shadow-md"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              {/* Name & Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                  {personalInfo.name}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-semibold text-slate-700">
                    {personalInfo.title}
                  </h2>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-slate-600 italic text-sm mb-4">
                  {personalInfo.tagline}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed max-w-lg">
                  {personalInfo.summary}
                </p>
              </motion.div>
            </div>

            {/* Right: Contact Info */}
            <div className="flex-shrink-0 ml-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      {personalInfo.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      {personalInfo.website}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                      <Github className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Experience
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="flex gap-2">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full border-3 ${
                            exp.current
                              ? "bg-emerald-500 border-emerald-200 shadow-lg shadow-emerald-500/50"
                              : "bg-slate-300 border-slate-200"
                          }`}
                        ></div>
                        {index !== experience.length - 1 && (
                          <div className="w-0.5 h-full bg-gradient-to-b from-slate-300 to-slate-200"></div>
                        )}
                      </div>

                      <div className="flex-1 pb-1">
                        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h4 className="text-lg font-bold text-slate-900">
                                {exp.title}
                              </h4>
                              <p className="text-blue-600 font-semibold">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.year}</span>
                              </div>
                              {exp.current && (
                                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mt-1">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>

                          <p className="text-sm text-slate-700 mb-1 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="mb-3">
                            <h5 className="text-sm font-semibold text-slate-900 mb-1">
                              Key Achievements:
                            </h5>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-slate-700"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-sm font-semibold text-slate-900 mb-2">
                              Technologies:
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {exp.technologies.map((tech, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs px-2 py-0 bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Featured Projects
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                  <div key={project.id} className="group">
                    <div className="bg-white rounded-lg border border-slate-200 p-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">
                          {project.id === 1
                            ? "🚀"
                            : project.id === 2
                            ? "🎨"
                            : project.id === 3
                            ? "💬"
                            : "📊"}
                        </div>
                        <Badge
                          className={`text-xs font-medium ${
                            project.status === "Live"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : project.status === "Active"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-orange-100 text-orange-700 border-orange-200"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <h4 className="font-bold text-slate-900 mb-2 text-sm">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs px-2 py-0 bg-slate-50 text-slate-600 border-slate-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0 text-slate-500"
                          >
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* <div className="flex items-center gap-1 text-xs text-slate-500">
                        <ExternalLink className="w-3 h-3" />
                        <span>View Project</span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Skills & Education */}
          <div className="col-span-4 space-y-6">
            {/* Skills */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Skills</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-900">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} shadow-sm`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          duration: 0.8,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Education
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  {education.degree}
                </h4>
                <p className="text-indigo-600 font-semibold mb-2">
                  {education.school}
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  {education.period} • GPA: {education.gpa}
                </p>

                <div className="space-y-2">
                  {education.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-slate-700">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Certifications
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-r ${cert.color} text-white p-4 rounded-lg shadow-lg`}
                  >
                    <h4 className="text-sm font-bold mb-1">{cert.name}</h4>
                    <p className="text-xs">{cert.issuer}</p>
                    <p className="text-xs mt-1">Issued: {cert.year}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
