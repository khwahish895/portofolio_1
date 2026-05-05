import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Brain,
  Shield,
  Wallet,
  Clock,
  Map,
  ExternalLink,
  Github,
  X,
} from "lucide-react";

type MinorProject = {
  id: string;
  title: string;
  shortDescription: string;
  purpose: string;
  problemItSolves: string;
  useCase: string;
  features: string[];
  technologies: string[];
  icon: any;
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
};

export default function MinorProjectsSection() {
  const projects = useMemo<MinorProject[]>(
    () => [
{
        id: "cognitive-load-estimator",
        title: "Cognitive Load Estimator",
        shortDescription:
          "AI-based tool that estimates a user's mental workload using behavioral inputs and interaction patterns.",
        purpose: "Measure mental effort during tasks.",
        problemItSolves:
          "Helps quantify cognitive strain so tasks, interfaces, and workflows can be improved for focus and learning.",
        useCase: "Education research, productivity tracking.",
        features: [
          "Task difficulty analysis",
          "Real-time cognitive load prediction",
          "Data visualization dashboard",
        ],
        technologies: ["Python", "Machine Learning", "Streamlit / Web Dashboard"],
        icon: Brain,
        githubUrl: "https://github.com/khwahish895/Cognitive-Load-Estimator",
        demoUrl: "https://cognitive-load-estimator.netlify.app/",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
      },
      {
        id: "digital-footprint-analyzer",
        title: "Digital Footprint Analyzer",
        shortDescription:
          "Analyzes a user's online activity to understand digital presence and privacy exposure.",
        purpose: "Help users understand their online footprint.",
        problemItSolves:
          "Makes privacy exposure visible by summarizing digital traces and highlighting risk areas.",
        useCase: "Cyber awareness and digital safety.",
        features: [
          "Social media footprint analysis",
          "Privacy risk detection",
          "Activity summary reports",
        ],
        technologies: ["Python", "Data Analysis", "APIs"],
        icon: Shield,
        githubUrl: "https://github.com/khwahish895/digital-footprint-analyzer",
        demoUrl: "https://digital-footprint-analyzer.netlify.app/",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
      },
      {
        id: "smart-expense-tracker",
        title: "Smart Expense Tracker",
        shortDescription:
          "An intelligent expense management tool that categorizes spending automatically.",
        purpose: "Track and manage personal finances.",
        problemItSolves:
          "Reduces manual effort in budgeting by automatically organizing expenses and surfacing insights.",
        useCase: "Personal finance management.",
        features: [
          "Automatic expense categorization",
          "Monthly spending insights",
          "Budget alerts",
          "Visual charts",
        ],
        technologies: ["Python / Flutter / Web Dashboard"],
        icon: Wallet,
        githubUrl: "https://github.com/khwahish895/smart-expence-tracker",
        demoUrl: "https://friendly-moonbeam-872bfc.netlify.app/",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
      },
      {
        id: "procrastination-detector",
        title: "Procrastination Detector",
        shortDescription:
          "Analyzes user activity patterns to detect procrastination behavior.",
        purpose: "Identify productivity loss patterns.",
        problemItSolves:
          "Detects focus breaks and patterns that cause delay so users can improve habits and output.",
        useCase: "Productivity improvement tools.",
        features: [
          "Task completion analysis",
          "Focus time monitoring",
          "Productivity score",
          "Behavioral insights",
        ],
        technologies: ["Python", "Data Analytics", "ML"],
        icon: Clock,
        githubUrl: "https://github.com/khwahish895/procrastination-detector",
        demoUrl: "https://procrastination-detector-c24cvjmudcymnmqycgduvx.streamlit.app/",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop"
      },
      {
        id: "travel-hub",
        title: "Travel Hub",
        shortDescription:
          "A centralized travel planning platform that helps users organize trips.",
        purpose: "Simplify trip planning.",
        problemItSolves:
          "Brings budgets, itineraries, and recommendations into one place to reduce planning friction.",
        useCase: "Personal travel planning.",
        features: [
          "Destination suggestions",
          "Budget planner",
          "Itinerary builder",
          "Travel recommendations",
        ],
        technologies: ["Web App / APIs / Maps Integration"],
        icon: Map,
        githubUrl: "https://github.com/khwahish895/travelhub",
        demoUrl: "https://khwahish05.netlify.app/",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
      },
    ],
    []
  );

  const [active, setActive] = useState<MinorProject | null>(null);

  return (
    <div className="mt-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <h3 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
          Minor <span className="text-cyan-400">Projects</span>
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Experimental academic projects exploring AI, analytics, and productivity tools.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.25) }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
<div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px] transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

            {/* Project Image */}
            {p.image && (
              <div className="absolute inset-0 opacity-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
              </div>
            )}

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <p.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-extrabold text-white leading-snug">
                  {p.title}
                </h4>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {p.shortDescription}
                </p>
              </div>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {p.technologies.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-200/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative mt-4 flex flex-wrap gap-3">
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-100 transition-colors hover:bg-white/10"
                >
                  <Github className="h-3.5 w-3.5" />
                  View Code
                </a>
              )}
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200 transition-colors hover:bg-cyan-500/20"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Demo
                </a>
              )}
            </div>

            <div className="relative mt-6">
              <motion.button
                type="button"
                onClick={() => setActive(p)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-600/15 transition-all"
              >
                More Details <ExternalLink className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring" as any, stiffness: 220, damping: 22 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f0a1f]/85 p-7 shadow-[0_0_120px_rgba(34,211,238,0.12)] sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-cyan-500/10">
                  <active.icon className="h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
                    {active.shortDescription}
                  </p>
                </div>
              </div>

              <div className="relative mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/90">
                    Purpose
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-100/90">
                    {active.purpose}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/90">
                    Problem it solves
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-100/90">
                    {active.problemItSolves}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/90">
                  Key features
                </p>
                <ul className="mt-3 space-y-2">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-100/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                      <span className="font-semibold">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/90">
                  Technologies used
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-200/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/90">
                  Use case
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100/90">
                  {active.useCase}
                </p>
              </div>

              {(active.githubUrl || active.demoUrl) && (
                <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                  {active.demoUrl && (
                    <a
                      href={active.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white"
                    >
                      Demo <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-100 transition-colors hover:bg-white/10"
                    >
                      GitHub <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

