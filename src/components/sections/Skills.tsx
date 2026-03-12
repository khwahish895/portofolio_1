import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2, Layout, Smartphone, Palette, Terminal, Zap, Server,
  Database, Cloud, Brain, Cpu, Globe, Layers, Box, GitBranch,
  CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react";

// --- Types ---

type SkillCategory = {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: string[];
  color?: string;
};

type ProgressSkill = {
  name: string;
  level: number; // 0-100
  color?: string;
};

type ProgressCardData = {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: ProgressSkill[];
  details: string[];
};

type SoftSkill = {
  title: string;
  description: string;
};

interface CategoryCardProps {
  category: SkillCategory;
  key?: any;
}

interface ProgressCardProps {
  data: ProgressCardData;
  key?: any;
}

interface IconCloudItemProps {
  item: typeof ICON_CLOUD[number];
  key?: any;
}

interface SoftSkillCardProps {
  skill: SoftSkill;
  key?: any;
}

// --- Data ---

const TECHNICAL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Layout,
    color: "indigo",
    skills: [
      "HTML5, CSS3, JavaScript (ES6+)",
      "Responsive Design, Mobile-First",
      "UI Development, Component-Based",
      "Accessibility (WCAG basics)",
      "Performance Optimization"
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: Code2,
    color: "blue",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap"
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: Smartphone,
    color: "rose",
    skills: [
      "Android Development",
      "Flutter (Basics)",
      "Progressive Web Apps (PWA)",
      "Mobile Web Optimization"
    ]
  },
  {
    id: "styling",
    title: "Styling & UI",
    icon: Palette,
    color: "fuchsia",
    skills: [
      "CSS Animations & Transitions",
      "Flexbox, Grid",
      "Design Systems",
      "Figma (UI Handoff)"
    ]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: Terminal,
    color: "emerald",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Chrome DevTools",
      "Postman (API Testing)"
    ]
  },
  {
    id: "automation",
    title: "Automation & Productivity",
    icon: Zap,
    color: "amber",
    skills: [
      "Build Tools (Vite, Webpack basics)",
      "Task Automation",
      "Code Reusability & Optimization"
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs (Basic)",
    icon: Server,
    color: "sky",
    skills: [
      "REST APIs",
      "Firebase (Auth, Firestore)",
      "Node.js (Basics)"
    ]
  }
];

const PROGRESS_CARDS: ProgressCardData[] = [
  {
    id: "programming",
    title: "Programming & Development",
    icon: Code2,
    skills: [
      { name: "HTML, CSS, JavaScript", level: 90, color: "bg-indigo-500" },
      { name: "PHP", level: 70, color: "bg-blue-500" },
      { name: "SQL", level: 75, color: "bg-emerald-500" }
    ],
    details: [
      "Strong foundation in web standards",
      "Experience with relational databases",
      "Server-side scripting proficiency"
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud (Basic)",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 40, color: "bg-slate-400" },
      { name: "Kubernetes", level: 30, color: "bg-slate-400" },
      { name: "Jenkins", level: 35, color: "bg-slate-400" },
      { name: "AWS", level: 45, color: "bg-orange-400" },
      { name: "GitHub Actions", level: 50, color: "bg-slate-500" }
    ],
    details: [
      "Containerization basics",
      "CI/CD pipeline awareness",
      "Cloud infrastructure fundamentals"
    ]
  },
  {
    id: "ai",
    title: "AI & ML",
    icon: Brain,
    skills: [
      { name: "Generative AI", level: 60, color: "bg-purple-500" },
      { name: "Machine Learning", level: 50, color: "bg-rose-500" },
      { name: "Data Analytics", level: 55, color: "bg-cyan-500" },
      { name: "Streamlit", level: 65, color: "bg-red-500" }
    ],
    details: [
      "Prompt engineering & integration",
      "Data visualization dashboards",
      "Model training basics"
    ]
  }
];

const ICON_CLOUD = [
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Flutter", slug: "flutter" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "VS Code", slug: "visualstudiocode" },
  { name: "Android", slug: "android" },
  { name: "GitHub Actions", slug: "githubactions" },
  { name: "Python", slug: "python" },
  { name: "Java", slug: "java" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Streamlit", slug: "streamlit" },
  { name: "Gradio", slug: "gradio" },
  { name: "Gemini AI", slug: "googlegemini" },
  { name: "Bash", slug: "gnubash" },
  { name: "XAMPP", slug: "xampp" },
  { name: "Cursor", slug: "cursor" },
  { name: "C / C++", slug: "cplusplus" },
  { name: "DSA", icon: Cpu },
  { name: "PyCharm", slug: "pycharm" },
  { name: "NextAuth", slug: "nextdotjs" }, // Auth.js/NextAuth logo
  { name: "bolt.new", icon: Zap },
  { name: "dev.ai", icon: Brain },
  { name: "PHP", slug: "php" },
  { name: "MySQL", slug: "mysql" },
  { name: "Machine Learning", icon: Brain },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonaws" }
];

const SOFT_SKILLS: SoftSkill[] = [
  { title: "Problem Solving", description: "Breaking down complex issues into manageable steps." },
  { title: "Creative Thinking", description: "Finding innovative solutions to design challenges." },
  { title: "Communication", description: "Clear and effective exchange of ideas." },
  { title: "Adaptability", description: "Thriving in changing environments and tech stacks." },
  { title: "Attention to Detail", description: "Focusing on the small things that matter." },
  { title: "Time Management", description: "Prioritizing tasks to meet deadlines efficiently." },
  { title: "Collaboration", description: "Working seamlessly within diverse teams." },
  { title: "Critical Thinking", description: "Analyzing facts to form sound judgments." },
  { title: "Self Learning", description: "Continuously updating skills and knowledge." },
  { title: "User Empathy", description: "Understanding and advocating for user needs." },
  { title: "Team Work", description: "Supporting and uplifting team members." }
];

// --- Components ---

const CategoryCard = ({ category }: CategoryCardProps) => {
  const colorMap: Record<string, string> = {
    indigo: "hover:border-indigo-200 hover:shadow-indigo-500/10 bg-indigo-50 text-indigo-600 hover:text-indigo-700",
    blue: "hover:border-blue-200 hover:shadow-blue-500/10 bg-blue-50 text-blue-600 hover:text-blue-700",
    rose: "hover:border-rose-200 hover:shadow-rose-500/10 bg-rose-50 text-rose-600 hover:text-rose-700",
    fuchsia: "hover:border-fuchsia-200 hover:shadow-fuchsia-500/10 bg-fuchsia-50 text-fuchsia-600 hover:text-fuchsia-700",
    emerald: "hover:border-emerald-200 hover:shadow-emerald-500/10 bg-emerald-50 text-emerald-600 hover:text-emerald-700",
    amber: "hover:border-amber-200 hover:shadow-amber-500/10 bg-amber-50 text-amber-600 hover:text-amber-700",
    sky: "hover:border-sky-200 hover:shadow-sky-500/10 bg-sky-50 text-sky-600 hover:text-sky-700",
  };

  const activeColor = category.color || "indigo";
  const styles = colorMap[activeColor] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ y: -5, rotate: 2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`group relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-700 p-6 shadow-sm transition-all duration-300 hover:shadow-2xl ${styles.split(' ').slice(0, 2).map(s => s.replace('hover:shadow-', 'hover:shadow-2xl ')).join(' ')}`}
    >
      {/* Default State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 group-hover:opacity-0"
      >
        <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${styles.split(' ').slice(2, 4).join(' ')}`}>
          <category.icon className="h-8 w-8" />
        </div>
        <motion.h3
          className="text-center font-display text-xl font-bold text-slate-900"
          animate={{ x: [0, 3, -3, 0], y: [0, -3, 0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
        >
          {category.title}
        </motion.h3>
      </motion.div>

      {/* Hover State */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ${styles.split(' ').slice(2, 3).join(' ')}/50`}>
        <h4 className={`mb-3 font-display text-lg font-bold ${styles.split(' ').slice(4).join(' ')}`}>{category.title}</h4>
        <ul className="space-y-1.5 text-center">
          {category.skills.map((skill, idx) => (
            <li key={idx} className="text-sm font-medium text-slate-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProgressCard = ({ data }: ProgressCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02, rotate: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border bg-slate-700 p-6 shadow-md transition-all duration-500 ${isExpanded
        ? "border-indigo-400 shadow-xl ring-2 ring-indigo-100"
        : "border-slate-200 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20"
        }`}
    >
      <motion.div layout="position" className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isExpanded ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
          <data.icon className="h-5 w-5" />
        </div>
        <motion.h3 className="font-display text-lg font-bold text-slate-900"
            whileHover={{ scale: 1.05, color: "#6366f1" }}
            transition={{ type: "spring", stiffness: 200 }}
          >{data.title}</motion.h3>
        <div className="ml-auto text-slate-400">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </motion.div>

      <motion.div layout className="space-y-4">
        {data.skills.map((skill, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <motion.span className="text-slate-700"
                whileHover={{ scale: 1.02, color: "#6366f1" }}
                transition={{ duration: 0.2 }}
              >{skill.name}</motion.span>
              <span className="text-slate-400">{skill.level}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className={`h-full rounded-full ${skill.color || 'bg-indigo-500'}`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 border-t border-slate-100 pt-4"
          >
            <ul className="space-y-2">
              {data.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 text-sm text-slate-600"
                  whileHover={{ scale: 1.02, x: 2 }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const IconCloudItem = ({ item }: IconCloudItemProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.1, zIndex: 50 }}
      className="group relative flex h-14 w-14 items-center justify-center rounded-xl bg-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:ring-indigo-200"
    >
      {item.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${item.slug}`}
          alt={item.name}
          className="h-7 w-7 opacity-70 transition-all group-hover:scale-110 group-hover:opacity-100"
          onError={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              e.currentTarget.style.display = 'none';
              const textNode = document.createElement('span');
              textNode.className = "text-[10px] font-bold text-indigo-600 text-center px-1";
              textNode.innerText = item.name.length > 5 ? item.name.substring(0, 3) + '..' : item.name;
              parent.appendChild(textNode);
            }
          }}
        />
      ) : item.icon ? (
        <item.icon className="h-7 w-7 text-indigo-500/70 transition-colors group-hover:text-indigo-600" />
      ) : (
        <span className="font-display font-bold text-indigo-600 text-xs">{item.name[0]}</span>
      )}

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1.5 text-[10px] font-bold text-white shadow-xl group-hover:flex">
        {item.name}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900"></div>
      </div>
    </motion.div>
  );
};

const SoftSkillCard = ({ skill }: SoftSkillCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-700 p-6 text-center shadow-lg transition-all hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
      <motion.h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
        animate={{ y: [0, -3, 0, 3, 0], color: ['#1e293b', '#6366f1', '#1e293b'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {skill.title}
      </motion.h3>
      <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:mt-2 group-hover:opacity-100">
        <p className="text-sm text-slate-600">{skill.description}</p>
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"technical" | "soft">("technical");

  return (
    <div className="w-full py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0 }}
        className="mb-12 text-center"
      >
        <motion.h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl"
          animate={{ y: [0, -5, 0, 5, 0], color: ['#1e293b', '#6366f1', '#1e293b'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          My <span className="text-indigo-600">Skills</span>
        </motion.h2>
        <motion.p className="text-lg text-slate-600"
          animate={{
            x: [0, 3, -3, 0],
            y: [0, -3, 0, 3, 0],
            color: ["#475569", "#6366f1", "#475569"]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        >
          Tools, technologies, and strengths I work with
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 100 }}
        className="mb-12 flex justify-center"
      >
        <div className="flex rounded-full bg-slate-100 p-1">
          <motion.button
            onClick={() => setActiveTab("technical")}
            whileHover={{ scale: 1.05 }}
            animate={activeTab === "technical" ? { boxShadow: ["0 0 4px rgba(99,102,241,0.4)", "0 0 8px rgba(99,102,241,0.8)", "0 0 4px rgba(99,102,241,0.4)"] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === "technical"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            Technical Skills
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("soft")}
            whileHover={{ scale: 1.05 }}
            animate={activeTab === "soft" ? { boxShadow: ["0 0 4px rgba(99,102,241,0.4)", "0 0 8px rgba(99,102,241,0.8)", "0 0 4px rgba(99,102,241,0.4)"] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === "soft"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            Soft Skills
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <AnimatePresence mode="wait">
        {activeTab === "technical" ? (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TECHNICAL_CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            {/* Progress Cards Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {PROGRESS_CARDS.map((card) => (
                <ProgressCard key={card.id} data={card} />
              ))}
            </div>

            {/* Icon Cloud */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 lg:p-12">
              <motion.h3 className="mb-8 text-center font-display text-2xl font-bold text-slate-900"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
              >
                Tools & Technologies
              </motion.h3>
              <div className="flex flex-wrap justify-center gap-4">
                {ICON_CLOUD.map((item, idx) => (
                  <IconCloudItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SOFT_SKILLS.map((skill, idx) => (
              <SoftSkillCard key={idx} skill={skill} />
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
