import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid3X3, X } from "lucide-react";

export default function GalleryButton({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="mb-2 rounded-lg border border-slate-700/50 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm whitespace-nowrap"
          >
            View My Work Gallery
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setActiveTab("WorkShowcase");
          setIsOpen(false);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40 transition-all duration-300 hover:shadow-cyan-500/60 hover:shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Grid3X3 className="h-6 w-6" />
        </motion.div>

        {/* Pulse Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
        />
      </motion.button>
    </div>
  );
}
