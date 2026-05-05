import { useState, useEffect } from "react";
import { Download, Github, Linkedin, Mail, Instagram, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TypingEffect from "../TypingEffect";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as any,
      stiffness: 100,
    },
  },
  exit: { y: 20, opacity: 0 }
};

const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

const letterVariants = {
  hidden: { y: 50, opacity: 0, rotateX: -90 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring" as any,
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    rotateX: 90,
    transition: { duration: 0.5 }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
    transition: { duration: 0.4 }
  }
};

export default function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [loopState, setLoopState] = useState("visible");
  const name = "Hii, I'M KHWAHISH SINGH";
  const description = "I build frontend and mobile experiences by breaking down complex problems, automating repetitive work, and coding in flow. My focus is on thoughtful, human-centered design that feels intuitive, performs smoothly, and serves a real purpose.";

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopState((prev) => (prev === "visible" ? "exit" : "visible"));
    }, 6000); // Loop every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid min-h-[calc(100vh-140px)] w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
      {/* Left Column: Profile (Shifted Left) */}
      <div className="flex flex-col items-center justify-center space-y-8 lg:col-span-5 lg:items-start lg:pl-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 20, -20, 0] // horizontal oscillation across container
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
          className="relative group"
        >
          {/* Rotating Gradient Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400 via-blue-400 to-purple-400 opacity-75 blur-xl transition-all duration-1000 group-hover:opacity-100 group-hover:duration-200 animate-[spin_20s_linear_infinite_reverse] shadow-[0_0_60px_rgba(99,102,241,0.6)]" />

          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/90 bg-gradient-to-br from-slate-50 to-white shadow-2xl ring-4 ring-white/70 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.6)]">
            <motion.img
              src="/home.png"
              alt="Khwahish Singh"
              className="h-full w-full object-cover object-top"
              animate={{
                rotate: [0, 360],
                x: [0, 20, -20, 0],
                y: [0, 20, -20, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                x: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                y: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
              }}
            />
          </div>

          {/* Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform lg:left-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-600">Available for hiring</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 lg:justify-start"
        >
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab('Projects')}
            className="group relative overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <span className="relative z-10">See My Work</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>

          <motion.a
            variants={itemVariants}
            href="https://drive.google.com/file/d/1e4Cgk3Bns_cJaDHpzr6BL4_IN27V-rDq/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Download CV</span>
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="mailto:khwahishsingh2005@gmail.com"
            className="rounded-full border border-slate-200 bg-white px-3 py-2.5 text-slate-500 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600"
          >
            <Mail className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="flex flex-col justify-center space-y-6 text-center lg:col-span-7 lg:items-start lg:text-left">
        <div className="space-y-2">
          {/* Animated Name */}
          <motion.h1
            variants={letterContainerVariants}
            initial="hidden"
            animate={loopState}
            className="flex flex-wrap justify-center gap-x-3 font-display text-5xl font-bold tracking-tight text-slate-900 lg:justify-start lg:text-7xl"
          >
            {name.split(" ").map((word, i) => (
              <span key={i} className="flex whitespace-nowrap">
                {word.split("").map((char, j) => (
                  <motion.span
                    key={j}
                    variants={letterVariants}
                    className={word === "KHWAHISH" || word === "SINGH" ? "text-indigo-600" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" as any, bounce: 0.4 }}
          >
            <TypingEffect />
          </motion.div>
        </div>

        {/* Animated Description */}
        <motion.p
          initial="hidden"
          animate={loopState}
          variants={{
            visible: { transition: { staggerChildren: 0.02, delayChildren: 0.5 } },
            exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } }
          }}
          className="max-w-lg text-lg leading-relaxed text-slate-600"
        >
          {description.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-1 ${word.includes("thoughtful") || word.includes("human-centered")
                ? "font-medium text-indigo-600"
                : ""
                }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex items-center justify-center gap-4 lg:justify-start"
        >
          <motion.a
            href="https://github.com/khwahish895"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            animate={{ color: ["#6b7280", "#6366f1", "#6b7280"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Github className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/khwahish-singh-997628295/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            animate={{ color: ["#6b7280", "#6366f1", "#6b7280"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Linkedin className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </motion.a>
          <motion.a
            href="mailto:khwahishsingh2005@gmail.com"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-indigo-500 transition-all duration-300 hover:scale-110 hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            animate={{ color: ["#6366f1", "#f43f5e", "#6366f1"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] animate-spin-slow" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/khwahish5632/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            animate={{ color: ["#6b7280", "#6366f1", "#6b7280"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Instagram className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </motion.a>
            <motion.a
              href="tel:+917424988589"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:scale-110 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
              animate={{ color: ["#6b7280", "#6366f1", "#6b7280"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Phone className="h-5 w-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
            </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
