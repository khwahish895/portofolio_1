import { motion } from "motion/react";
import { FileText, ExternalLink } from "lucide-react";

export default function ResearchPaper() {
    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
            <motion.a
                href="https://drive.google.com/file/d/1PVpHrAdXsfRX8z7jy4uY48Y_WuYC4E7S/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
                    y: -5
                }}
                whileTap={{ scale: 0.9 }}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-2xl transition-all duration-300"
                title="View Research Paper"
            >
                <FileText className="h-7 w-7 transition-transform group-hover:scale-110" />

                {/* Tooltip */}
                <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 pointer-events-none border border-white/10">
                    Read Research Paper
                    <ExternalLink className="ml-2 inline-block h-3 w-3" />
                </span>

                {/* Pulsing Ring */}
                <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping -z-10" />
            </motion.a>
        </div>
    );
}
