import {
  Home,
  User,
  Briefcase,
  FolderOpen,
  MessageCircle,
  FileText,
} from "lucide-react";

export const navigationItems = [
  { id: "home", label: "Home", icon: Home, link: "/" },
  { id: "about", label: "About", icon: User, link: "/about" },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    link: "/experience",
  },
  { id: "projects", label: "Projects", icon: FolderOpen, link: "/projects" },
  { id: "contact", label: "Contact", icon: MessageCircle, link: "/contact" },
  { id: "cv", label: "CV", icon: FileText, link: "/cv" },
];

export const skills = [
  { name: "React/Next.js", level: 100, color: "from-blue-500 to-cyan-500" },
  { name: "TypeScript", level: 100, color: "from-blue-600 to-blue-400" },
  { name: "Node.js", level: 90, color: "from-green-500 to-emerald-500" },
  { name: "Nestjs", level: 90, color: "from-orange-500 to-emerald-500" },
  { name: "Node.js", level: 90, color: "from-purple-500 to-blue-500" },
  { name: "Stripe", level: 90, color: "from-blue-500 to-pink-500" },
  { name: "Material UI", level: 90, color: "from-purple-500 to-blue-500" },
  { name: "Tiptap", level: 90, color: "from-blue-500 to-emerald-500" },
  { name: "n8n", level: 90, color: "from-indigo-500 to-blue-500" },
  { name: "UI/UX Design", level: 88, color: "from-purple-500 to-pink-500" },
  { name: "PostgreSQL", level: 82, color: "from-indigo-500 to-purple-500" },
  { name: "AWS/Docker", level: 70, color: "from-orange-500 to-red-500" },
  { name: "AI/ML", level: 70, color: "from-indigo-500 to-purple-500" },
];

export const projects = [
  {
    id: 1,
    title: "Travel Management System",
    description: `Travel management system for managing travel expenses and bookings. Using AI to generate reports and insights.`,
    tech: [
      "Next.js",
      "PostgreSQL",
      "AI/ML",
      "Stripe",
      "Material UI",
      "Tiptap",
      "Node.js",
      "AWS",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
    ],
    image: "/images/projects/travel.png",
    status: "Live",
    year: "2024",
    teams: [
      {
        members: ["Le Thanh Tuyen", "Le Son Thien"],
        size: 1,
        role: "Backend Developer",
      },
      {
        members: ["Le Thanh Tuyen", "Le Son Thien"],
        size: 1,
        role: "Frontend Developer",
      },
    ],
  },
  {
    id: 2,
    title: "TAG Grading",
    description:
      "TAG Grading is a platform for grading and analyzing the quality of the product. Using Shopify and eBay, create product listing and manage orders.",
    tech: [
      "ReactJS",
      "MarkerJS",
      "Node.js",
      "TypeScript",
      "Stripe",
      "Material UI",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "CI/CD",
      "eBay",
      "Shopify",
    ],
    image: "/images/projects/taggrading.png",
    status: "Active",
    year: "2023",
    teams: [
      {
        members: ["PM DevBlock Company"],
        size: 1,
        role: "Project Manager",
      },
      {
        members: ["BE NodeJS Developer DevBlock Company"],
        size: 2,
        role: "BE NodeJS Developer from Vietnam",
      },
      {
        members: ["BE Python Developer DevBlock Company"],
        size: 1,
        role: "BE Python from US",
      },
      {
        members: ["FE Developer DevBlock Company", "Le Thanh Tuyen"],
        size: 2,
        role: "FE Developer from Vietnam",
      },
      {
        members: ["Quality Control DevBlock Company"],
        size: 1,
        role: "Quality Control",
      },
      {
        members: ["Business Analyst DevBlock Company"],
        size: 1,
        role: "Business Analyst",
      },
    ],
  },
  {
    id: 3,
    title: "Origins",
    description:
      "The Origins Certified™ seal represents product excellence through responsible, sustainable farming practices that build consumer confidence and loyalty",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Material UI",
      "Next.js",
      "AWS",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
    ],
    image: "/images/projects/origin.png",
    status: "Active",
    year: "2023",
    teams: [
      {
        members: ["PM DevBlock Company"],
        size: 1,
        role: "Project Manager",
      },
      {
        members: ["BE NodeJS Developer DevBlock Company"],
        size: 2,
        role: "BE NodeJS Developer from Vietnam",
      },
      {
        members: ["BE Python Developer DevBlock Company"],
        size: 1,
        role: "BE Python from US",
      },
      {
        members: ["FE Developer DevBlock Company", "Le Thanh Tuyen"],
        size: 2,
        role: "FE Developer from Vietnam",
      },
      {
        members: ["Quality Control DevBlock Company"],
        size: 1,
        role: "Quality Control",
      },
      {
        members: ["Business Analyst DevBlock Company"],
        size: 1,
        role: "Business Analyst",
      },
    ],
  },
  {
    id: 4,
    title: "Carina",
    description:
      "Carina is an easy-to-use website where care professionals can match with those seeking home care and child care.",
    tech: [
      "GraphQL",
      "Node.js",
      "PostgreSQL",
      "Material UI",
      "Next.js",
      "AWS",
      "Docker",
      "CI/CD",
    ],
    image: "/images/projects/carina.png",
    status: "Active",
    year: "2021",
    teams: [
      {
        members: ["PM DevBlock Company"],
        size: 1,
        role: "Project Manager",
      },
      {
        members: ["BE NodeJS Developer DevBlock Company"],
        size: 2,
        role: "BE NodeJS Developer from Vietnam",
      },
      {
        members: ["BE Python Developer DevBlock Company"],
        size: 1,
        role: "BE Python from US",
      },
      {
        members: ["FE Developer DevBlock Company", "Le Thanh Tuyen"],
        size: 2,
        role: "FE Developer from Vietnam",
      },
      {
        members: ["Quality Control DevBlock Company"],
        size: 1,
        role: "Quality Control",
      },
      {
        members: ["Business Analyst DevBlock Company"],
        size: 1,
        role: "Business Analyst",
      },
    ],
  },
];

export const experience = [
  {
    year: "2025",
    title: "Engineer Software Developer",
    company: "DevBlock Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    current: true,
    time: "2020-2025",
    description:
      "Lead development of scalable web applications serving 100K+ users. Architect cloud infrastructure and mentor junior developers.",
    achievements: [
      "Built AI-powered e-commerce platform increasing conversion by 35%",
      "Reduced server costs by 40% through AWS optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Developed a new feature for the product",
    ],
    technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker", "...."],
  },
  {
    year: "2019",
    title: "FullStack Developer",
    company: "SmartSoft Vietnam",
    location: "Ho Chi Minh City, Vietnam",
    current: false,
    time: "2019-2020",
    description:
      "Lead development of scalable web applications serving 100K+ users. Architect cloud infrastructure and mentor junior developers.",
    achievements: [
      "Reduced server costs by 40% through AWS optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "PHP", "...."],
  },
];
