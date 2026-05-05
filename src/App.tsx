import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { Download, Menu, X, Sun, Moon, Mail } from "lucide-react";
import SplashScreen from "./components/SplashScreen";
import HomeSection from "./components/sections/Home";
import AboutSection from "./components/sections/About";
import SkillsSection from "./components/sections/Skills";
import ExperienceSection from "./components/sections/Industrial training";
import EducationSection from "./components/sections/Education";
import TrainingsSection from "./components/sections/Trainings";
import CertificatesSection from "./components/sections/Certificates";
import ProjectsSection from "./components/sections/Projects";
import WorkShowcase from "./components/sections/WorkShowcase";
import BlogsSection from "./components/sections/Blogs";
import ContactSection from "./components/sections/Contact";
import AdminDashboard from "./components/sections/AdminDashboard";
import AcademicResults from "./components/sections/AcademicResults";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";
import ChatBot from "./components/ChatBot";
import GalleryButton from "./components/GalleryButton";
import ResearchPaper from "./components/ResearchPaper";

const NAV_ITEMS = [
  "Home",
  "About",
  "Industrial training",
  "Skills",
  "Education",
  "Trainings",
  "Projects",
  "Certificates",
  "Result",
  "Blogs",
  "Contact",
  "Admin",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mouse position for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -0.5 to 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Force Dark Mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);


  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen transition-colors duration-500 relative overflow-hidden bg-[#0f0518] text-slate-100">

        {/* 3D Background Effects with Parallax */}
        <Background3D mouseX={mouseX} mouseY={mouseY} />

        {/* Content Wrapper to ensure z-index above background */}
        <div className="relative z-10">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-40 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between rounded-2xl border px-3 py-2.5 shadow-sm backdrop-blur-md transition-all duration-500 border-slate-800/50 bg-slate-900/70">
              {/* Logo */}
              <div className="flex items-center group">
                <motion.div className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors border-white/20 overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236,72,153,0.8)" }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <img src="/header-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              {/* Desktop Nav */}
              <div className="hidden items-center gap-1 lg:flex">
                {NAV_ITEMS.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                    }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 12px rgba(99,102,241,0.7)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${activeTab === item
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                    animate={activeTab === item ? { boxShadow: ["0 0 8px rgba(99,102,241,0.4)", "0 0 14px rgba(99,102,241,0.8)", "0 0 8px rgba(99,102,241,0.4)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {activeTab === item && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-indigo-600 shadow-md shadow-indigo-500/20"
                        transition={{ type: "spring" as any, bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">

                <a
                  href="https://drive.google.com/file/d/1e4Cgk3Bns_cJaDHpzr6BL4_IN27V-rDq/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative hidden items-center gap-2 overflow-hidden rounded-full px-3 py-1 text-xs font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 sm:flex bg-gradient-to-r from-indigo-600 to-rose-500"
                >
                  <span className="relative z-10">Resume</span>
                  <Download className="relative z-10 h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full lg:hidden bg-slate-800 text-slate-300"
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </nav>
          </header>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-30 flex flex-col px-6 pt-28 lg:hidden bg-slate-950"
              >
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left text-2xl font-medium ${activeTab === item ? "text-indigo-600" : "text-slate-100"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="min-h-[60vh]"
              >
{activeTab === "Home" && <HomeSection setActiveTab={setActiveTab} />}
                {activeTab === "About" && <AboutSection />}
                {activeTab === "Industrial training" && <ExperienceSection />}
                {activeTab === "Education" && <EducationSection />}
                {activeTab === "Trainings" && <TrainingsSection />}
                {activeTab === "Projects" && <ProjectsSection />}
                {activeTab === "WorkShowcase" && <WorkShowcase />}
                {activeTab === "Certificates" && <CertificatesSection />}
                {activeTab === "Result" && <AcademicResults />}
                {activeTab === "Blogs" && <BlogsSection />}
                {activeTab === "Contact" && <ContactSection />}
                {activeTab === "Admin" && <AdminDashboard />}

              </motion.div>
            </AnimatePresence>
          </main>
          <Footer setActiveTab={setActiveTab} />
<ResearchPaper />
          <GalleryButton setActiveTab={setActiveTab} />
          <ChatBot />
        </div>
      </div>
    </>
  );
}
