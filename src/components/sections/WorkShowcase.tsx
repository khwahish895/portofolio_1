import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Smartphone, X, ArrowRight, Github, ExternalLink } from "lucide-react";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: "web" | "mobile";
  image?: string;
  tech: string[];
  links: { label: string; url: string; icon: any }[];
  color: string;
  bgColor: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    id: "1",
    title: "ai-carrer",
    description: "Career guidance platform with AI-powered resume and job matching recommendations.",
    category: "web",
    tech: ["React", "TypeScript", "Tailwind CSS", "AI"],
    links: [
      { label: "Live", url: "https://ai-carrer-copilot.netlify.app/", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/ai-carrer-copilot", icon: Github },
    ],
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50/10",
  },
  {
    id: "2",
    title: "ai-document",
    description: "Document automation service that summarizes, categorizes, and generates reports with AI.",
    category: "web",
    tech: ["React", "Next.js", "OpenAI", "Node.js"],
    links: [
      { label: "Live", url: "https://aidocumen.netlify.app/", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/ai-document", icon: Github },
    ],
    color: "from-fuchsia-400 to-pink-500",
    bgColor: "bg-fuchsia-50/10",
  },
  {
    id: "3",
    title: "ai-financial",
    description: "Personal finance dashboard with AI insights, spending forecasts, and budgeting tools.",
    category: "web",
    tech: ["React", "TypeScript", "Chart.js", "API"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/ai-financial-analyzer", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/ai-financial-analyzer", icon: Github },
    ],
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-50/10",
  },
  {
    id: "4",
    title: "ai-recipe",
    description: "Recipe recommendation engine that generates meal plans and shopping lists using AI.",
    category: "web",
    tech: ["React", "Node.js", "Firebase", "AI"],
    links: [
      { label: "Live", url: "https://ai-recipe-maker-magic.lovable.app", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/ai-recipe-chef", icon: Github },
    ],
    color: "from-orange-400 to-yellow-500",
    bgColor: "bg-orange-50/10",
  },
  {
    id: "5",
    title: "ai-website",
    description: "Website builder with AI-driven content creation and instant style customization.",
    category: "web",
    tech: ["Next.js", "Tailwind CSS", "AI", "Vercel"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/ai-website-builder", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/ai-website-builder", icon: Github },
    ],
    color: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50/10",
  },
  {
    id: "6",
    title: "application store",
    description: "Marketplace for web tools and applications with ratings, search, and curated collections.",
    category: "web",
    tech: ["React", "Express.js", "MongoDB", "Stripe"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/application-store", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/application-store", icon: Github },
    ],
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50/10",
  },
  {
    id: "7",
    title: "aura intelligence",
    description: "AI analytics suite for intelligent business insights, sentiment tracking, and forecasting.",
    category: "web",
    tech: ["React", "D3.js", "Python", "AI"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/Aura-Intelligence", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/Aura-Intelligence", icon: Github },
    ],
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50/10",
  },
  {
    id: "8",
    title: "automation",
    description: "Workflow automation dashboard that integrates triggers, tasks, and AI-assisted actions.",
    category: "web",
    tech: ["React", "Node.js", "GraphQL", "Tailwind CSS"],
    links: [
      { label: "Live", url: "https://keen-blini-a38c73.netlify.app/", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/automation-", icon: Github },
    ],
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50/10",
  },
  {
    id: "9",
    title: "blog studio",
    description: "Content studio for bloggers with markdown editing, scheduling, and media management.",
    category: "web",
    tech: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    links: [
      { label: "Live", url: "https://blog-wizardry-kit.lovable.app", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/blog-studio-ai", icon: Github },
    ],
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50/10",
  },
  {
    id: "10",
    title: "book tracker",
    description: "Reading tracker for book lovers with progress tracking, notes, and recommendations.",
    category: "web",
    tech: ["React", "TypeScript", "Firebase", "Algolia"],
    links: [
      { label: "Live", url: "https://booktracker.onhercules.app/", icon: ExternalLink },
      { label: "Code", url: "https://booktracker.onhercules.app/", icon: Github },
    ],
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50/10",
  },
  {
    id: "11",
    title: "coffee shop",
    description: "Cafe ordering experience with menu browsing, online payments, and loyalty rewards.",
    category: "web",
    tech: ["React", "Node.js", "Stripe", "Tailwind CSS"],
    links: [
      { label: "Live", url: "https://khwahish895.github.io/coffee-shop/", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/coffee-shop", icon: Github },
    ],
    color: "from-indigo-400 to-blue-500",
    bgColor: "bg-indigo-50/10",
  },
  {
    id: "12",
    title: "cursor hover",
    description: "Interactive UI library showcasing custom hover experiences and animated cursor states.",
    category: "web",
    tech: ["React", "Framer Motion", "CSS", "TypeScript"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/cursor-hover", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/cursor-hover", icon: Github },
    ],
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50/10",
  },
  {
    id: "13",
    title: "e-commerce",
    description: "Modern online store with product browsing, cart checkout, and order management.",
    category: "web",
    tech: ["React", "Commerce.js", "Stripe", "Tailwind CSS"],
    links: [
      { label: "Live", url: "https://candid-tapioca-a2de94.netlify.app/", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/e-commerce--", icon: Github },
    ],
    color: "from-cyan-400 to-teal-500",
    bgColor: "bg-cyan-50/10",
  },
  {
    id: "14",
    title: "food delivery",
    description: "Restaurant ordering platform with delivery tracking, menus, and customer reviews.",
    category: "web",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/food-delivery", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/food-delivery", icon: Github },
    ],
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-sky-50/10",
  },
  {
    id: "15",
    title: "chat application",
    description: "Real-time messaging app with chat rooms, notifications, and file sharing.",
    category: "web",
    tech: ["React", "WebSocket", "Firebase", "Tailwind CSS"],
    links: [
      { label: "Live", url: "https://nexuschat-app.netlify.app/login", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/chat-application", icon: Github },
    ],
    color: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50/10",
  },
  {
    id: "16",
    title: "online voting",
    description: "Secure online voting platform with voter authentication and live result reporting.",
    category: "web",
    tech: ["React", "Node.js", "PostgreSQL", "Auth0"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/voting", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/voting", icon: Github },
    ],
    color: "from-red-400 to-orange-500",
    bgColor: "bg-red-50/10",
  },
  {
    id: "17",
    title: "plant disease",
    description: "Plant health monitoring tool that detects disease risk and recommends treatments.",
    category: "web",
    tech: ["React", "TensorFlow.js", "TypeScript", "API"],
    links: [
      { label: "Live", url: "https://github.com/khwahish895/plant-disease-recogniton", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/plant-disease-recogniton", icon: Github },
    ],
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-50/10",
  },
{
    id: "18",
    title: "Decision Helper",
    description: "Home organization platform for managing routines, chores, and cleaning plans.",
    category: "web",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    links: [
      { label: "Live", url: "https://wisely-choose.lovable.app", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/decision-compass.git", icon: Github },
    ],
    color: "from-lime-400 to-green-500",
    bgColor: "bg-lime-50/10",
  },
{
    id: "19",
    title: "AnonAdvice",
    description: "Task management assistant that schedules priorities and sends reminders.",
    category: "web",
    tech: ["React", "TypeScript", "Redux", "Calendar API"],
    links: [
      { label: "Live", url: "https://anonadvice.onhercules.app/", icon: ExternalLink },
      { label: "Code", url: "https://anonadvice.onhercules.app/", icon: Github },
    ],
    color: "from-fuchsia-400 to-pink-500",
    bgColor: "bg-fuchsia-50/10",
  },
{
    id: "20",
    title: "LifeQuest",
    description: "Smart assistant dashboard with voice commands, reminders, and productivity tools.",
    category: "web",
    tech: ["React", "Speech Recognition", "AI", "Node.js"],
    links: [
      { label: "Live", url: "https://app-bdp54qfpalfl.appmedo.com", icon: ExternalLink },
      { label: "Code", url: "https://app-bdp54qfpalfl.appmedo.com", icon: Github },
    ],
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50/10",
  },
  {
    id: "21",
    title: "clean start",
    description: "Mobile app for home organization with daily routines and cleaning schedules.",
    category: "mobile",
    tech: ["React Native", "Firebase", "TypeScript"],
    links: [
      { label: "App Store", url: "https://ethereal-clean-start-flow.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://ethereal-clean-start-flow.base44.app", icon: Github },
    ],
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-50/10",
  },
  {
    id: "22",
    title: "daily task hepler",
    description: "Mobile task tracker with smart scheduling and notification reminders.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Google Calendar API"],
    links: [
      { label: "App Store", url: "https://daily-errand-go.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://daily-errand-go.base44.app", icon: Github },
    ],
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50/10",
  },
  {
    id: "23",
    title: "digital assistant",
    description: "Intelligent mobile assistant with voice control and AI-powered suggestions.",
    category: "mobile",
    tech: ["React Native", "Speech Recognition", "AI"],
    links: [
      { label: "App Store", url: "https://github.com/khwahish895/DigitalAssist", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/DigitalAssist", icon: Github },
    ],
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-50/10",
  },
  {
    id: "24",
    title: "shecook",
    description: "Female-focused cooking app with recipes, cooking tips, and community features.",
    category: "mobile",
    tech: ["React Native", "Firebase", "Redux"],
    links: [
      { label: "App Store", url: "https://attached-assets--khwahishsinghcs.replit.app/", icon: ExternalLink },
      { label: "Code", url: "https://attached-assets--khwahishsinghcs.replit.app/", icon: Github },
    ],
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50/10",
  },
  {
    id: "25",
    title: "sanjeevani",
    description: "Healthcare wellness app with symptom tracking, doctor consultation, and records.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Health Kit"],
    links: [
      { label: "App Store", url: "https://sanjeevani-village-care.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://sanjeevani-village-care.base44.app", icon: Github },
    ],
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-50/10",
  },
  {
    id: "26",
    title: "food order",
    description: "Mobile food ordering app with restaurant browsing and real-time delivery tracking.",
    category: "mobile",
    tech: ["React Native", "Node.js", "Socket.io", "Maps API"],
    links: [
      { label: "App Store", url: "https://food-order-hub--khwahishsingh20.replit.app", icon: ExternalLink },
      { label: "Code", url: "https://food-order-hub--khwahishsingh20.replit.app", icon: Github },
    ],
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50/10",
  },
  {
    id: "27",
    title: "task flow",
    description: "Project task management app with kanban boards, team collaboration, and analytics.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Cloud Functions"],
    links: [
      { label: "App Store", url: "https://preview.builtwithrocket.new/taskflow-jm1cz48", icon: ExternalLink },
      { label: "Code", url: "https://preview.builtwithrocket.new/taskflow-jm1cz48", icon: Github },
    ],
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50/10",
  },
  {
    id: "28",
    title: "quick mart",
    description: "Quick shopping app for grocery and essentials with fast checkout and delivery.",
    category: "mobile",
    tech: ["React Native", "Firebase", "Stripe"],
    links: [
      { label: "App Store", url: "https://attached-assets--khyatisingh322.replit.app", icon: ExternalLink },
      { label: "Code", url: "https://attached-assets--khyatisingh322.replit.app", icon: Github },
    ],
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50/10",
  },
  {
    id: "29",
    title: "health ai",
    description: "AI-powered health monitoring app with fitness tracking and wellness recommendations.",
    category: "mobile",
    tech: ["Flutter", "TensorFlow", "Health API", "AI"],
    links: [
      { label: "App Store", url: "https://preview.builtwithrocket.new/healthai-companion-lg3p119", icon: ExternalLink },
      { label: "Code", url: "https://preview.builtwithrocket.new/healthai-companion-lg3p119", icon: Github },
    ],
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50/10",
  },
  {
    id: "30",
    title: "cafe",
    description: "Coffee shop app for browsing menu, ordering, and loyalty rewards.",
    category: "mobile",
    tech: ["React Native", "Firebase", "Payment Gateway"],
    links: [
      { label: "App Store", url: "https://massive-brew-dash-cafe.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://massive-brew-dash-cafe.base44.app", icon: Github },
    ],
    color: "from-purple-400 to-indigo-500",
    bgColor: "bg-purple-50/10",
  },
  {
    id: "31",
    title: "qr code generator",
    description: "Mobile app to generate, scan, and share QR codes with customization options.",
    category: "mobile",
    tech: ["React Native", "QR Code Library", "Camera API"],
    links: [
      { label: "App Store", url: "https://preview.builtwithrocket.new/qrflow-s0ttq11", icon: ExternalLink },
      { label: "Code", url: "https://preview.builtwithrocket.new/qrflow-s0ttq11", icon: Github },
    ],
    color: "from-lime-400 to-green-500",
    bgColor: "bg-lime-50/10",
  },
  {
    id: "32",
    title: "Smart Expense Tracker with AI Insights",
    description: "Track expenses, analyze spending, and get AI-powered financial insights on mobile.",
    category: "mobile",
    tech: ["React Native", "AI", "Firebase", "Charts"],
    links: [
      { label: "App Store", url: "https://astute-smart-spend-wise.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://astute-smart-spend-wise.base44.app", icon: Github },
    ],
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50/10",
  },
  {
    id: "33",
    title: "Local Services Finder App",
    description: "Find and book local services like plumbers, electricians, and tutors nearby.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Maps API"],
    links: [
      { label: "App Store", url: "https://www.anything.com/mobile-preview/5e2c0750-071c-4dad-aa88-1b06161e4923", icon: ExternalLink },
      { label: "Code", url: "https://www.anything.com/mobile-preview/5e2c0750-071c-4dad-aa88-1b06161e4923", icon: Github },
    ],
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50/10",
  },
  {
    id: "34",
    title: "Habit Tracker with Gamification",
    description: "Build habits and stay motivated with streaks, rewards, and gamified challenges.",
    category: "mobile",
    tech: ["React Native", "Redux", "Firebase"],
    links: [
      { label: "App Store", url: "https://motivation-quest.lovable.app", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/habitflow-ai.git", icon: Github },
    ],
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50/10",
  },
  {
    id: "35",
    title: "AI Fitness Coach",
    description: "Personalized fitness plans, workout tracking, and AI-driven health recommendations.",
    category: "mobile",
    tech: ["Flutter", "AI", "Health API"],
    links: [
      { label: "App Store", url: "https://jumping-fit-forge-flow.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://jumping-fit-forge-flow.base44.app", icon: Github },
    ],
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50/10",
  },
  {
    id: "36",
    title: "Lost & Found Community App",
    description: "Report, search, and recover lost items in your community with real-time updates.",
    category: "mobile",
    tech: ["React Native", "Firebase", "Maps API"],
    links: [
      { label: "App Store", url: "https://lumpy-find-lost-found.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://lumpy-find-lost-found.base44.app", icon: Github },
    ],
    color: "from-indigo-400 to-blue-500",
    bgColor: "bg-indigo-50/10",
  },
  {
    id: "37",
    title: "Event & Fest Manager App",
    description: "Organize, promote, and manage events or college fests with schedules and ticketing.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Calendar API"],
    links: [
      { label: "App Store", url: "https://eventify-magic-spark.lovable.app", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/event-hub-plus.git", icon: Github },
    ],
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50/10",
  },
  {
    id: "38",
    title: "Language Learning App",
    description: "Interactive language lessons, quizzes, and pronunciation practice on mobile.",
    category: "mobile",
    tech: ["React Native", "Firebase", "Text-to-Speech API"],
    links: [
      { label: "App Store", url: "https://www.jotform.com/app/build/261203791615454", icon: ExternalLink },
      { label: "Code", url: "https://www.jotform.com/app/build/261203791615454", icon: Github },
    ],
    color: "from-lime-400 to-green-500",
    bgColor: "bg-lime-50/10",
  },
  {
    id: "39",
    title: "Digital Notes Organizer",
    description: "Organize, search, and sync notes across devices with cloud backup.",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Cloud Storage"],
    links: [
      { label: "App Store", url: "https://github.com/khwahish895/SmartNotesAI", icon: ExternalLink },
      { label: "Code", url: "https://github.com/khwahish895/SmartNotesAI", icon: Github },
    ],
    color: "from-fuchsia-400 to-pink-500",
    bgColor: "bg-fuchsia-50/10",
  },
  {
    id: "40",
    title: "AI Resume & Interview Prep App",
    description: "Create resumes, get AI feedback, and practice interviews with smart Q&A.",
    category: "mobile",
    tech: ["React Native", "AI", "Speech Recognition"],
    links: [
      { label: "App Store", url: "https://pristine-boost-career-path.base44.app", icon: ExternalLink },
      { label: "Code", url: "https://pristine-boost-career-path.base44.app", icon: Github },
    ],
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50/10",
  },
];

export default function WorkShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "web" | "mobile">("all");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const filteredWorks = WORK_ITEMS.filter(
    (work) => selectedCategory === "all" || work.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0f0518]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(236,72,153,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            My Work Showcase
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore my collection of web and mobile applications built with passion and precision
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            All Works
          </button>

          <button
            onClick={() => setSelectedCategory("web")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === "web"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            <Globe className="w-4 h-4" />
            Web App
          </button>

          <button
            onClick={() => setSelectedCategory("mobile")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === "mobile"
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Mobile App
          </button>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedWork(work)}
                className="group cursor-pointer"
              >
                <div className={`h-full rounded-2xl border border-slate-700/50 ${work.bgColor} backdrop-blur-sm p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50`}>
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${work.color} text-white`}>
                      {work.category === "web" ? (
                        <Globe className="w-6 h-6" />
                      ) : (
                        <Smartphone className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                      work.category === "web"
                        ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/30"
                        : "bg-gradient-to-r from-pink-500/30 to-rose-500/30 border border-pink-400/30"
                    }`}>
                      {work.category === "web" ? "Web App" : "Mobile App"}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {work.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {work.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {work.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded-full border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View More Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${work.color} text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        <AnimatePresence>
          {filteredWorks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-slate-400 text-lg">
                No works found for the selected category
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${selectedWork.color} text-white flex-shrink-0`}>
                    {selectedWork.category === "web" ? (
                      <Globe className="w-8 h-8" />
                    ) : (
                      <Smartphone className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedWork.title}</h2>
                    <p className="text-slate-400">
                      {selectedWork.category === "web" ? "Web Application" : "Mobile Application"}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed">
                  {selectedWork.description}
                </p>

                <div>
                  <h3 className="text-white font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 text-slate-300 px-3 py-2 rounded-lg border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-700">
                  {selectedWork.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r ${selectedWork.color} text-white font-medium hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
