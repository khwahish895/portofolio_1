import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const roles = [
  "FRONTEND DEVELOPER",
  "MOBILE WEB ENTHUSIAST",
  "PROBLEM SOLVER",
  "MOBILE APP DEVELOPER",
  "VIBE CODER",
];

export default function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[index];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
        }
      } else {
        // Deleting
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index]);

  return (
    <div className="flex h-8 items-center">
      <span className="mr-2 font-mono text-sm font-medium text-slate-500">I'M A</span>
      <span className="font-display text-lg font-bold text-indigo-600 md:text-xl">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block h-5 w-0.5 bg-indigo-400"
      />
    </div>
  );
}
