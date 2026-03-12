import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, ArrowUpRight, Heart, ArrowUp } from "lucide-react";

const ROLES = [
  "I’M A FRONTEND DEVELOPER",
  "MOBILE WEB ENTHUSIAST",
  "PROBLEM SOLVER",
  "MOBILE APP DEVELOPER",
  "VIBE CODER"
];

const QUICK_ACTIONS = [
  "About",
  "Skills",
  "Education",
  "Contact"
];

const nameVariants = {
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
      delayChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.3
    }
  }
};

export default function Footer({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [loopState, setLoopState] = useState("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 1500); // 1.2s visible + transition time approx
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopState((prev) => (prev === "visible" ? "exit" : "visible"));
    }, 8000); // Loop every 8 seconds
    return () => clearInterval(timer);
  }, []);

  const name = "Khwahish Singh";
  const description = "I design frontend and mobile interfaces by deconstructing complex issues, automating mundane processes, and coding with flow. I'm passionate about creating thoughtful, human-centered design that is intuitive, smooth, and meaningful.";

  return (
    <motion.footer
      className="w-full border-t border-slate-200 bg-black/5 backdrop-blur-sm transition-colors duration-500 dark:border-slate-800 dark:bg-black/20 dark:shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)] bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNEqSZT099G7DmiWXiqJP1fr-wEe93DA3JQQ&s)',
        backgroundSize: "110% 110%",
        backgroundPosition: "50% 50%",
      }}
      animate={{
        backgroundPosition: ["50% 50%", "54% 46%", "50% 50%"],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          {/* Left Side - Identity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex max-w-md flex-col gap-6"
          >
            <motion.div
              variants={nameVariants}
              initial="hidden"
              animate={loopState}
            >
              <h2 className="flex flex-wrap gap-x-1 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {name.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>
            </motion.div>

            {/* Animated Roles */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-bold tracking-wider text-indigo-600 dark:text-indigo-400"
                >
                  {ROLES[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate={loopState}
              className="text-sm leading-relaxed text-slate-500 dark:text-slate-400"
              transition={{ delay: 0.2 }}
            >
              {description.split(" ").map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-1">
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Center/Right - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 lg:items-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setActiveTab(action);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition transform duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-[0_0_18px_rgba(99,102,241,0.9)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-900 dark:hover:text-indigo-400"
                >
                  {action}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/khwahish895"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                <Github className="h-4 w-4 transition-shadow duration-300 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.9)] group-hover:scale-105" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:shadow-[0_0_6px_rgba(99,102,241,0.85)] group-hover:scale-110" />
              </a>
              <a
                href="https://www.linkedin.com/in/khwahish-singh-997628295/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                <Linkedin className="h-4 w-4 transition-shadow duration-300 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.9)] group-hover:scale-105" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:shadow-[0_0_6px_rgba(99,102,241,0.85)] group-hover:scale-110" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="w-full mb-12"
        >

        </motion.div>

        {/* Copyright */}
        <div className="relative mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="text-center text-xs text-black dark:text-black"
          >
            <p>
              © 2026 Khwahish Singh. Made with
              <Heart className="inline h-3 w-3 text-red-500 mx-1" />
              All rights reserved.
            </p>
          </motion.div>

          {/* Right Corner Glowing Arrow (Above the line) */}
          <div className="absolute -top-10 right-0 lg:-top-12">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{
                scale: 1.15,
                shadow: "0 0 25px rgba(99,102,241,0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.9)]"
            >
              <ArrowUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
              <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/40" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
