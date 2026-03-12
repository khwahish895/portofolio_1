import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import MinorProjectsSection from "./MinorProjects";
import {
  Code,
  FileText,
  Presentation,
  ExternalLink,
  Github,
  Globe,
  Download,
  Cpu,
  BarChart3,
  Smartphone,
  ChevronDown,
  Layers,
  Rocket,
  Beaker,
  Heart,
  Mic,
  MoreHorizontal,
  Search,
  X,
  Filter,
  Bot,
  Zap,
  Shield,
  ChevronRight,
  Gamepad2,
  Eye,
  Lightbulb,
  Box,
  Database,
  User,
  LogOut,
  Terminal,
  Monitor,
  Cloud,
  TerminalSquare,
  Music,
  Video,
  Hand,
  Gauge,
  Lamp,
  LayoutDashboard,
  Wrench,
  Workflow,
  Settings
} from "lucide-react";

// --- Types ---

type ExperienceTrack = "Professional" | "Academic";

interface ProjectCardData {
  title: string;
  org?: string;
  description: string;
  highlights: string[];
  role?: string;
  tech?: string[];
  links: { label: string; url: string; icon: any }[];
  icon: any;
  image?: string;
  type?: "Voice" | "Big" | "Small" | "Major" | "Minor" | "Standard" | "Startup" | "MinorWebApp" | "MinorAndroidApp" | "MinorFlutterApp" | "MinorML" | "MinorPython" | "MinorAI" | "MinorGaming";
  // Startup-specific
  stage?: string;
  impact?: string;
  demoUrl?: string;
  codeUrl?: string;
  presentationUrl?: string;
}

const PROF_CATEGORIES = ["Presentation", "Report", "Projects"] as const;
type ProfCategory = typeof PROF_CATEGORIES[number];

const ACAD_CATEGORIES = [
  "Minor Project",
  "Major Project",
  "Startup Project",
  "Experimental Project",
  "College Project",
  "Other Projects",
  "Voice Assistant"
] as const;
type AcadCategory = typeof ACAD_CATEGORIES[number];

const TECH_FILTERS = ["All", "Web App", "Android App", "Flutter App", "Machine Learning", "Python", "AI", "Gaming"] as const;
type TechFilter = typeof TECH_FILTERS[number];

const COLLEGE_FILTERS = ["All", "C", "C++", "Python", "Java", "HTML-CSS"] as const;
type CollegeFilter = typeof COLLEGE_FILTERS[number];

const EXPERIMENTAL_FILTERS = ["All", "Web", "Python", "NodeJS", "Flutter", "3D Website"] as const;
type ExperimentalFilter = typeof EXPERIMENTAL_FILTERS[number];

// --- Mock Data Generators ---

const generateAcademicCards = (count: number, category: string): ProjectCardData[] => {
  return Array.from({ length: count }).map((_, i) => ({
    title: `${category} ${i + 1}`,
    description: `This is a premium academic ${category.toLowerCase()} focused on technical excellence and practical implementation.`,
    highlights: ["In-depth research", "Full-stack development", "Performance optimized"],
    tech: [TECH_FILTERS[Math.floor(Math.random() * (TECH_FILTERS.length - 1)) + 1]],
    links: [{ label: "View Code", url: "#", icon: Github }, { label: "Demo", url: "#", icon: Globe }],
    icon: getIconForCategory(category),
    type: category === "Voice Assistant" ? "Voice" : "Standard"
  }));
};

const getIconForCategory = (cat: string) => {
  switch (cat) {
    case "Minor Project": return Layers;
    case "Major Project": return Rocket;
    case "Startup Project": return Rocket;
    case "Experimental Project": return Beaker;
    case "College Project": return Heart;
    case "Voice Assistant": return Mic;
    default: return Code;
  }
};

// --- Static Data ---

const professionalData: Record<ProfCategory, ProjectCardData[]> = {
  Presentation: [
    {
      title: "Web Development Training Project",
      org: "Centre for Electronic Governance",
      description: "A comprehensive presentation showcasing a full-stack web development training project, covering real-world problem understanding, UI design, frontend implementation, and deployment workflow.",
      highlights: [
        "Project objective and problem statement",
        "Website structure and UI flow",
        "Technologies used and development process",
        "Final outcome and learning summary"
      ],
      links: [
        { label: "View Presentation", url: "https://docs.google.com/presentation/d/1LtuoMxFgu1CLH7VhD9EzxU8eMSr44Cb4/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true", icon: Presentation },
        { label: "Download Slides", url: "https://drive.google.com/file/d/1Zqi8Q7GAN2SCk5SrYOZSq1Fz_VL0W622/view?usp=drive_link", icon: Download }
      ],
      icon: Code,
      tech: ["React", "Node.js", "UI/UX"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Generative AIOps Training Project",
      org: "LinuxWorld",
      description: "Presentation highlighting hands-on training in Generative AI and AIOps, focusing on automation, monitoring, and intelligent system operations using modern AI tools.",
      highlights: [
        "Introduction to Generative AI and AIOps concepts",
        "Use cases in system automation and monitoring",
        "Tools, frameworks, and workflows used",
        "Practical insights and results"
      ],
      links: [
        { label: "View Presentation", url: "https://docs.google.com/presentation/d/10FxpXCjZqlD8bbslXdLnO1_chxkc9R0F/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true", icon: Presentation },
        { label: "Download Slides", url: "https://drive.google.com/file/d/147o-a96iwI4oxOyf2rS5vc_aJM_AbzUe/view?usp=drive_link", icon: Download }
      ],
      icon: Cpu,
      tech: ["GenAI", "AIOps", "Automation"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      title: "Power BI Analytics Project",
      description: "Data analytics presentation demonstrating dashboard creation, data visualization, and business insights using Power BI for decision-making.",
      highlights: [
        "Data collection and preparation",
        "Interactive dashboards and visuals",
        "Key insights and trends",
        "Business impact and conclusions"
      ],
      links: [
        { label: "View Presentation", url: "#", icon: Presentation },
        { label: "Download Slides", url: "#", icon: Download }
      ],
      icon: BarChart3,
      tech: ["Power BI", "DAX", "Analytics"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Android App Development Project",
      description: "Presentation summarizing the development of an Android application, covering UI design, functionality, and real-world mobile app development practices.",
      highlights: [
        "App idea and user flow",
        "UI design and core features",
        "Development tools and technologies",
        "Final app output and learning outcomes"
      ],
      links: [
        { label: "View Presentation", url: "#", icon: Presentation },
        { label: "Download Slides", url: "#", icon: Download }
      ],
      icon: Smartphone,
      tech: ["Android Store", "Kotlin", "Firebase"],
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&h=400&fit=crop"
    }
  ],
  Report: [
    {
      title: "Web Development Training Report",
      org: "Centre for Electronic Governance",
      description: "Detailed industrial training report documenting planning, system design, development process, and outcomes of the web development project.",
      highlights: [
        "Training objectives and scope",
        "System architecture and workflow",
        "Tools, technologies, and methodology",
        "Results and learning outcomes"
      ],
      links: [
        { label: "View Report", url: "https://docs.google.com/document/d/1O491ljEdyx13y-_4l2VmSciFMsFHChXe/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true", icon: FileText },
        { label: "Download Report", url: "https://drive.google.com/file/d/1cLrFL3O5IbLSenSkpwNXqIOUMlkR_sY5/view?usp=drive_link", icon: Download }
      ],
      icon: FileText,
      tech: ["Documentation", "System Design"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
    },
    {
      title: "Generative AIOps Training Report",
      org: "LinuxWorld",
      description: "Comprehensive report covering Generative AI and AIOps training, including concepts, implementation steps, and practical automation use cases.",
      highlights: [
        "AIOps and Generative AI overview",
        "Implementation strategy and tools",
        "Automation workflows",
        "Observations and conclusions"
      ],
      links: [
        { label: "View Report", url: "https://docs.google.com/document/d/11wf4x9tJOwLKgsaaHMaRLrFu9mMyqNrA/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true", icon: FileText },
        { label: "Download Report", url: "https://drive.google.com/file/d/1vmkvMZVqHHWdiMYSTK2R5kHtj12Uw-o2/view?usp=drive_link", icon: Download }
      ],
      icon: FileText,
      tech: ["AIOps", "GenAI Report"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
    },
    {
      title: "Power BI Analytics Project Report",
      description: "Analytical report explaining data processing, dashboard design, and insights generated through Power BI.",
      highlights: [
        "Dataset understanding and cleaning",
        "Dashboard design methodology",
        "Key metrics and insights",
        "Final analysis and outcomes"
      ],
      links: [
        { label: "View Report", url: "#", icon: FileText },
        { label: "Download Report", url: "#", icon: Download }
      ],
      icon: FileText,
      tech: ["Data Science", "Visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Android App Development Project Report",
      description: "Technical report documenting the complete lifecycle of an Android application from idea to implementation and testing.",
      highlights: [
        "App architecture and design",
        "Feature implementation details",
        "Tools and development environment",
        "Testing results and conclusions"
      ],
      links: [
        { label: "View Report", url: "#", icon: FileText },
        { label: "Download Report", url: "#", icon: Download }
      ],
      icon: FileText,
      tech: ["Mobile Dev", "QA Testing"],
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&h=400&fit=crop"
    }
  ],
  Projects: [
    {
      title: "Web Development Training Project",
      org: "Centre for Electronic Governance",
      description: "Built a real-world web application during industrial training, following structured development practices and usability standards.",
      highlights: [
        "Feature development and UI implementation",
        "HTML, CSS, JavaScript, basic React",
        "Role: UI design, frontend logic, testing"
      ],
      links: [
        { label: "View Project", url: "https://drive.google.com/file/d/1H7UIzbKCXPRmYrnHT1XEzbNjCkMh7wKS/view?usp=drive_link", icon: ExternalLink },
        { label: "Live Demo", url: "https://khwahish895.github.io/Portfolio/", icon: Globe },
        { label: "GitHub", url: "https://github.com/khwahish895/Portfolio", icon: Github }
      ],
      icon: Code,
      tech: ["HTML", "CSS", "JavaScript", "React"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
    },
    {
      title: "Generative AIOps Training Project",
      org: "LinuxWorld",
      description: "Hands-on project completed under the Generative AIOps-106 multi-technology training track.",
      highlights: [
        "Automation concepts and AI-assisted workflows",
        "Cloud, DevOps, Generative AI basics",
        "Role: Implementation and experimentation"
      ],
      links: [
        { label: "View Project", url: "https://drive.google.com/file/d/1wbhCtyWzxIALNCt4dwDA-cGHTYvXlePV/view?usp=drive_link", icon: ExternalLink },
        { label: "Live Demo", url: "https://dashboard-6gtrogtyuo2dqb6byhsyhz.streamlit.app/", icon: Globe },
        { label: "GitHub", url: "https://github.com/khwahish895/dashboard", icon: Github }
      ],
      icon: Cpu,
      tech: ["Cloud", "DevOps", "Generative AI"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
    },
    {
      title: "Power BI Analytics Project",
      description: "Created interactive dashboards to analyze and visualize structured datasets.",
      highlights: [
        "Data cleaning and modeling",
        "KPI dashboards and reports",
        "Business-focused insights"
      ],
      links: [
        { label: "View Project", url: "#", icon: ExternalLink },
        { label: "Live Demo", url: "#", icon: Globe },
        { label: "GitHub", url: "#", icon: Github }
      ],
      icon: BarChart3,
      tech: ["Power BI", "Data Modeling", "Analytics"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Android App Development Project",
      description: "Developed a functional Android application focusing on UI flow and user interaction.",
      highlights: [
        "Android Studio",
        "UI layouts and navigation",
        "App logic and testing"
      ],
      links: [
        { label: "View Project", url: "#", icon: ExternalLink },
        { label: "Live Demo", url: "#", icon: Globe },
        { label: "GitHub", url: "#", icon: Github }
      ],
      icon: Smartphone,
      tech: ["Android Studio", "Java/Kotlin", "XML"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    }
  ]
};

const academicData: Record<AcadCategory, ProjectCardData[]> = {
  "Minor Project": [
    {
      title: "HireTrack AI",
      description: "AI-powered recruitment tracking system that helps manage candidates and automate hiring workflows.",
      highlights: ["Candidate management", "Automated workflows", "AI insights"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/hiretrack", icon: Github }, { label: "Live Demo", url: "https://hiretrack-ai.netlify.app/", icon: Globe }],
      icon: Bot,
      tech: ["Web App", "AI", "JavaScript"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
    },
    {
      title: "Password Generator",
      description: "Secure web tool for generating strong, customizable passwords with strength indicators.",
      highlights: ["Customizable lengths", "Strength indicator", "Secure algorithms"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/password-generator", icon: Github }, { label: "Live Demo", url: "https://securepass-pro-generator.netlify.app/", icon: Globe }],
      icon: Shield,
      tech: ["Web App", "JavaScript", "Security"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    {
      title: "Product Comparison Tool",
      description: "Web application that compares products by features, price, and ratings to help users make better decisions.",
      highlights: ["Feature comparison", "Dynamic pricing", "User ratings"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/product-comparison/", icon: Github }, { label: "Live Demo", url: "https://khwahish895.github.io/product-comparison/", icon: Globe }],
      icon: Layers,
      tech: ["Web App", "API", "JavaScript"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Smart Resume Builder",
      description: "Interactive resume builder that generates clean professional resumes with smart formatting.",
      highlights: ["Smart formatting", "PDF export", "Live preview"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/smart-resume-builder.", icon: Github }, { label: "Live Demo", url: "https://glittery-pithivier-045e7d.netlify.app/", icon: Globe }],
      icon: FileText,
      tech: ["Web App", "HTML", "CSS", "JavaScript"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop"
    },
    {
      title: "Auth AI",
      description: "AI-assisted authentication system for smarter and more secure user verification.",
      highlights: ["Smart verification", "Secure Auth", "AI monitoring"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/TitanAuth-AI", icon: Github }, { label: "Live Demo", url: "https://titanauth-ai.netlify.app/", icon: Globe }],
      icon: Shield,
      tech: ["Web App", "AI", "Authentication"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
    },
    {
      title: "Countdown",
      description: "Android app to track important events with real-time countdown timers.",
      highlights: ["Real-time timers", "Event tracking", "Clean UI"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/coutdown", icon: Github }, { label: "Live Demo", url: "https://github.com/khwahish895/coutdown", icon: Globe }],
      icon: Smartphone,
      tech: ["Android App", "Java/Kotlin", "SQLite"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    },
    {
      title: "Digital Capsule",
      description: "Store messages, memories, or notes and unlock them at a future date.",
      highlights: ["Time-locked notes", "Secure storage", "Future unlock"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/digital-capsule", icon: Github }, { label: "Live Demo", url: "https://digital-capsule.netlify.app/", icon: Globe }],
      icon: Shield,
      tech: ["Android App", "Java/Kotlin", "Storage"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop"
    },
    {
      title: "Flashcard Learning",
      description: "Flashcard-based study app using repetition for better memory retention.",
      highlights: ["Spaced repetition", "Custom decks", "Study progress"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/flashcard-learning", icon: Github }, { label: "Live Demo", url: "https://luminacards-ai.netlify.app/", icon: Globe }],
      icon: Layers,
      tech: ["Android App", "Java/Kotlin", "Education"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
    },
    {
      title: "Mood Based Journal",
      description: "Daily journaling app that tracks mood patterns and emotional insights.",
      highlights: ["Mood tracking", "Daily logs", "Emotional insights"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/mood-based-playlist", icon: Github }, { label: "Live Demo", url: "https://github.com/khwahish895/mood-based-playlist", icon: Globe }],
      icon: Heart,
      tech: ["Android App", "Java/Kotlin", "Analytics"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
    },
    {
      title: "Random Recipe",
      description: "Android app that suggests random recipes for quick cooking inspiration.",
      highlights: ["Random suggestions", "Quick inspiration", "Recipe details"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/random-recipe", icon: Github }, { label: "Live Demo", url: "https://github.com/khwahish895/random-recipe", icon: Globe }],
      icon: Bot,
      tech: ["Android App", "Java/Kotlin", "API"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop"
    },
    {
      title: "Barcode Scanner",
      description: "Flutter app that scans and decodes barcodes and QR codes instantly.",
      highlights: ["Instant decoding", "QR/Barcode scanning", "Clean interface"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/barcode-scanner-app", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/barcode-scanner-app", icon: Globe }],
      icon: Search,
      tech: ["Flutter", "Dart", "Camera API"],
      type: "MinorFlutterApp" as const,
      stage: "Completed",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    },
    {
      title: "Expense Tracker",
      description: "Personal finance app for tracking daily expenses and spending patterns.",
      highlights: ["Spending insights", "Daily tracking", "Visual reports"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/expense-tracker", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/expense-tracker", icon: Globe }],
      icon: BarChart3,
      tech: ["Flutter", "Dart", "Finance"],
      type: "MinorFlutterApp" as const,
      stage: "Completed",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      title: "Habit Tracker",
      description: "Productivity app that helps users build and maintain positive habits.",
      highlights: ["Habit streaks", "Reminders", "Progress tracking"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/habit-tracker", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/habit-tracker", icon: Globe }],
      icon: Heart,
      tech: ["Flutter", "Productivity"],
      type: "MinorFlutterApp" as const,
      stage: "Prototype",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
    },
    {
      title: "Note App",
      description: "Minimal note-taking app with organized notes and quick access.",
      highlights: ["Rich text", "Quick search", "Folders"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/notes-app", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/notes-app", icon: Globe }],
      icon: FileText,
      tech: ["Flutter", "Dart", "Storage"],
      type: "MinorFlutterApp" as const,
      stage: "Completed",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
    },
    {
      title: "Todo Cloud App",
      description: "Cloud-synced task management app for organizing daily to-do lists.",
      highlights: ["Cloud sync", "Task categories", "Real-time updates"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/todoapp", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/todoapp", icon: Globe }],
      icon: Layers,
      tech: ["Flutter", "Firebase"],
      type: "MinorFlutterApp" as const,
      stage: "Prototype",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    // Machine Learning Minor Projects
    {
      title: "Customer Churn Prediction",
      description: "Machine learning model that predicts customer churn to help businesses retain users.",
      highlights: ["Predictive analytics", "Customer segmentation", "Retention strategies"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/customer-churn", icon: Github }, { label: "Live Demo", url: "https://customer-churn-oewddvo84shi4zzcjao6yw.streamlit.app/", icon: Globe }],
      icon: Bot,
      tech: ["Machine Learning", "Python", "Scikit-learn"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Email Spam Detector",
      description: "Classification model that detects and filters spam emails automatically.",
      highlights: ["Text classification", "NLP techniques", "Real-time filtering"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/email-spam-detector", icon: Github }, { label: "Live Demo", url: "https://email-spam-detector-7iw4o9pqxsvqii2ec8lwdc.streamlit.app/", icon: Globe }],
      icon: Shield,
      tech: ["Machine Learning", "Python", "NLP"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
    },
    {
      title: "Fake News Detection",
      description: "Natural language processing model that identifies fake or misleading news articles.",
      highlights: ["NLP analysis", "Text preprocessing", "Fake content detection"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/fake-news-detector", icon: Github }, { label: "Live Demo", url: "https://fake-news-detector-bbssmvzf2dtvzv46hjcyqw.streamlit.app/", icon: Globe }],
      icon: Search,
      tech: ["Machine Learning", "Python", "NLP"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
    },
    {
      title: "House Price Prediction",
      description: "Regression model that predicts housing prices based on location and property features.",
      highlights: ["Feature engineering", "Regression analysis", "Price forecasting"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/house-price-prediction", icon: Github }, { label: "Live Demo", url: "https://house-price-prediction-dwk3ogf5u3py4xbz6dojey.streamlit.app/", icon: Globe }],
      icon: BarChart3,
      tech: ["Machine Learning", "Python", "Scikit-learn"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
    },
    {
      title: "Loan Eligibility Prediction",
      description: "ML model that evaluates loan applications and predicts approval eligibility.",
      highlights: ["Risk assessment", "Decision trees", "Credit scoring"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/loan-eligibility", icon: Github }, { label: "Live Demo", url: "https://loan-eligibility-tj6u5ahskiqohzekqrzxsx.streamlit.app/", icon: Globe }],
      icon: Layers,
      tech: ["Machine Learning", "Python", "Scikit-learn"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
    },
    // Python Minor Projects
    {
      title: "Credit Card Fraud Detection",
      description: "Machine learning model that identifies fraudulent credit card transactions.",
      highlights: ["Anomaly detection", "Transaction analysis", "Real-time monitoring"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/credit-fraud-detection", icon: Github }, { label: "View Demo", url: "https://credit-fraud-detection-iutzmujssdg7n4rjrv2s3b.streamlit.app/", icon: Globe }],
      icon: Shield,
      tech: ["Python", "Machine Learning", "Pandas"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Diabetes Prediction System",
      description: "Predicts diabetes risk using medical and health data.",
      highlights: ["Health data analysis", "Risk scoring", "Medical insights"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/diabetes-prediction", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/diabetes-prediction/", icon: Globe }],
      icon: Heart,
      tech: ["Python", "Machine Learning", "NumPy"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
    },
    {
      title: "File Organizer",
      description: "Python automation tool that sorts and organizes files into folders.",
      highlights: ["Automation scripts", "File management", "Folder organization"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/file-organizer", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/file-organizer", icon: Globe }],
      icon: Layers,
      tech: ["Python", "Automation", "OS Module"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop"
    },
    {
      title: "Movie Recommendation System",
      description: "Suggests movies to users based on preferences and similarity models.",
      highlights: ["Collaborative filtering", "Content-based recommendations", "User preferences"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/movie-recommender", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/movie-recommender", icon: Globe }],
      icon: Zap,
      tech: ["Python", "Data Science", "Recommendation"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop"
    },
    {
      title: "Student Performance Predictor",
      description: "Predicts student academic performance using data analysis models.",
      highlights: ["Academic analysis", "Performance metrics", "Data visualization"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/student-performance`", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/student-performance", icon: Globe }],
      icon: BarChart3,
      tech: ["Python", "Data Analysis", "Visualization"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
    },
    // AI Minor Projects
    {
      title: "Digitalens AI",
      description: "AI-powered image analysis system for smart visual insights.",
      highlights: ["Image recognition", "Computer vision", "Visual data processing"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/digitalens-ai", icon: Github }, { label: "Live Demo", url: "https://digital-lens.netlify.app/", icon: Globe }],
      icon: Zap,
      tech: ["AI", "Python", "Computer Vision"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop"
    },
    {
      title: "LensLingo AI",
      description: "Computer vision assistant that interprets images and generates descriptions.",
      highlights: ["Image interpretation", "NLP integration", "Smart descriptions"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/lenslingo", icon: Github }, { label: "Live Demo", url: "https://lenslimgo.netlify.app/", icon: Globe }],
      icon: Search,
      tech: ["AI", "Python", "NLP"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
    },
    {
      title: "Lumina AI Chat",
      description: "Conversational AI chatbot designed for intelligent user interaction.",
      highlights: ["Natural language", "Smart responses", "User engagement"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/ai-chat", icon: Github }, { label: "Live Demo", url: "https://lumina-ai-chat.netlify.app/", icon: Globe }],
      icon: Bot,
      tech: ["AI", "Python", "NLP"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
    },
    {
      title: "VisionFace AI",
      description: "Facial recognition system for identity detection and verification.",
      highlights: ["Face detection", "Identity verification", "Security applications"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/visionface-ai", icon: Github }, { label: "Live Demo", url: "https://visionfi.netlify.app/", icon: Globe }],
      icon: Shield,
      tech: ["AI", "Python", "Facial Recognition"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    {
      title: "VoxScript AI",
      description: "Speech-to-text AI tool that converts voice commands into structured text.",
      highlights: ["Speech recognition", "Voice processing", "Text conversion"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/voxscript-ai", icon: Github }, { label: "Live Demo", url: "https://voxscript-ai.netlify.app/", icon: Globe }],
      icon: Mic,
      tech: ["AI", "Python", "Speech API"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&h=400&fit=crop"
    },
    // Gaming Minor Projects
    {
      title: "Gemini Sonic Voice",
      description: "Voice-controlled game where players interact and control actions using AI voice commands.",
      highlights: ["Voice control", "AI integration", "Interactive gameplay"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/sonic-voice", icon: Github }, { label: "View Demo", url: "https://sonic-voice.netlify.app/", icon: Globe }],
      icon: Gamepad2,
      tech: ["Gaming", "AI", "Python"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&h=400&fit=crop"
    },
    {
      title: "Gemini Voice Quest",
      description: "Adventure-style game where voice commands guide the character through quests.",
      highlights: ["Adventure gameplay", "Voice commands", "Quest system"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/voice-quest", icon: Github }, { label: "View Demo", url: "https://voice-questai.netlify.app/", icon: Globe }],
      icon: Gamepad2,
      tech: ["Gaming", "AI", "Python"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop"
    },
    {
      title: "Neon Runner",
      description: "Fast-paced endless runner game set in a neon cyber-style world.",
      highlights: ["Endless runner", "Neon graphics", "High score system"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/neon-runner", icon: Github }, { label: "View Demo", url: "https://neon-runner-infinity.netlify.app/", icon: Globe }],
      icon: Gamepad2,
      tech: ["Gaming", "Python", "WebGL"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
    },
    {
      title: "QuizBlitz Battle Arena",
      description: "Multiplayer quiz battle game with fast rounds and competitive scoring.",
      highlights: ["Multiplayer", "Quiz battles", "Score system"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/quizblitz-battle-arena", icon: Github }, { label: "View Demo", url: "https://quizblitzbattle.netlify.app/", icon: Globe }],
      icon: Gamepad2,
      tech: ["Gaming", "AI", "Python"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&h=400&fit=crop"
    },
    {
      title: "ReflexPro AI",
      description: "Reaction-speed training game powered by AI difficulty adaptation.",
      highlights: ["AI difficulty", "Reaction training", "Speed challenges"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/reflex-pro", icon: Github }, { label: "View Demo", url: "https://reflex-pro.netlify.app/", icon: Globe }],
      icon: Gamepad2,
      tech: ["Gaming", "AI", "Python"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
    }
  ],
"Major Project": [
    // Gaming Projects
    {
      title: "AetheFit",
      description: "Gamified fitness experience that motivates users through interactive challenges and progress tracking.",
      highlights: ["Interactive workout challenges", "Progress tracking dashboard", "Gamification elements & rewards"],
      links: [{ label: "View Demo", url: "https://aethefit.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/aethefit", icon: Github }],
      icon: Gamepad2,
      tech: ["Unity", "AI", "Game Design", "C#", "Gaming"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop"
    },
    {
      title: "Chronicles of Aetheria",
      description: "Fantasy adventure game set in a mystical world with story-driven quests and exploration.",
      highlights: ["Story-driven gameplay", "Open world exploration", "Character progression system"],
      links: [{ label: "View Demo", url: "https://chronicles-aetheria.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/chronicles-of-aetheria", icon: Github }],
      icon: Gamepad2,
      tech: ["Unity", "Game Design", "AI", "C#", "Gaming"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
    },
    {
      title: "Chronos Weaver",
      description: "Time-manipulation puzzle game where players control timelines to solve challenges.",
      highlights: ["Time manipulation mechanics", "Puzzle design", "Multiple timeline paths"],
      links: [{ label: "View Demo", url: "https://chronos-weaver.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/chronos-weaver", icon: Github }],
      icon: Gamepad2,
      tech: ["Unity", "AI", "Game Design", "C#", "Gaming"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
    },
    {
      title: "Nebula Arcade",
      description: "Retro-inspired arcade collection with modern visuals and competitive scoring.",
      highlights: ["Classic arcade gameplay", "Modern visual effects", "Leaderboard system"],
      links: [{ label: "View Demo", url: "https://nebula-arcade.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/arcade", icon: Github }],
      icon: Gamepad2,
      tech: ["Unity", "Game Design", "AI", "C#", "Gaming"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop"
    },
    {
      title: "Neuro Adjust",
      description: "Adaptive gameplay system that adjusts difficulty using player behavior analysis.",
      highlights: ["AI-powered difficulty adjustment", "Behavior analysis", "Personalized gaming experience"],
      links: [{ label: "View Demo", url: "https://neuro-adjust.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/neuroadjust", icon: Github }],
      icon: Gamepad2,
      tech: ["Unity", "AI", "Machine Learning", "C#", "Gaming"],
      type: "MinorGaming" as const,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop"
    },
    // AI Projects
    {
      title: "Finevise AI",
      description: "AI-powered financial advisory system for smart budgeting and insights.",
      highlights: ["Financial data analysis", "Smart budgeting algorithms", "Investment insights"],
      links: [{ label: "View Demo", url: "https://finevise-ai.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/finevise-ai", icon: Github }],
      icon: Bot,
      tech: ["AI", "Python", "Data Analysis"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
    },
    {
      title: "IntelliTraffix",
      description: "AI-driven traffic monitoring and congestion prediction system.",
      highlights: ["Real-time traffic monitoring", "Congestion prediction", "Computer vision analysis"],
      links: [{ label: "View Demo", url: "https://intellitraffic-ai.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/intellitraffic", icon: Github }],
      icon: Bot,
      tech: ["Computer Vision", "AI", "Python"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop"
    },
    {
      title: "Nova – AI Voice Assistant",
      description: "Intelligent voice assistant for automation, commands, and information retrieval.",
      highlights: ["Voice command processing", "Automation workflows", "Natural language understanding"],
      links: [{ label: "View Demo", url: "https://novaaiassistan.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/nova--ai-assistant", icon: Github }],
      icon: Bot,
      tech: ["NLP", "Speech Recognition", "AI"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
    },
    {
      title: "Rec AI",
      description: "Personalized recommendation system for content, products, or services.",
      highlights: ["User behavior analysis", "Personalized suggestions", "Content filtering"],
      links: [{ label: "View Demo", url: "https://recai-recommendation-engine.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/recai", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "AI", "Data Models"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "SmartAttend AI",
      description: "AI-based attendance system using face recognition and automated tracking.",
      highlights: ["Face recognition", "Automated tracking", "Real-time attendance"],
      links: [{ label: "View Demo", url: "https://smartattent-ai.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/smartattendai", icon: Github }],
      icon: Bot,
      tech: ["Computer Vision", "Python", "AI"],
      type: "MinorAI" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    // Python Projects
    {
      title: "Excel Automation Tool",
      description: "Python-based tool that automates Excel data processing, reporting, and repetitive tasks.",
      highlights: ["Automated data processing", "Report generation", "Batch processing"],
      links: [{ label: "View Demo", url: "https://excel-automation-mnemelstyrtrffvxkpd8ts.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/excel-automation", icon: Github }],
      icon: Code,
      tech: ["Python", "Excel", "Automation"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Fraud Detection System",
      description: "Machine learning system that identifies suspicious financial transactions.",
      highlights: ["Real-time fraud detection", "ML-based analysis", "Alert system"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/fraud-detection", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/fraud-detection", icon: Github }],
      icon: Code,
      tech: ["Python", "ML", "AI"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
    },
    {
      title: "Multiple Disease Prediction",
      description: "AI-powered healthcare model that predicts diseases based on medical inputs.",
      highlights: ["Disease prediction model", "Medical data analysis", "Health insights"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/multiple-disease", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/multiple-disease", icon: Github }],
      icon: Code,
      tech: ["Python", "AI", "ML"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
    },
    {
      title: "Nova",
      description: "Intelligent AI assistant built with Python for automation, queries, and smart responses.",
      highlights: ["Natural language processing", "Task automation", "Smart responses"],
      links: [{ label: "View Demo", url: "https://melodic-paprenjak-dcdafd.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/nova.", icon: Github }],
      icon: Code,
      tech: ["Python", "AI", "NLP"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      title: "Resume Screening System",
      description: "Automated resume analysis tool that ranks candidates based on job requirements.",
      highlights: ["Resume parsing", "Candidate ranking", "Job matching"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/resume-screening/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/resume-screening", icon: Github }],
      icon: Code,
      tech: ["Python", "AI", "ML"],
      type: "MinorPython" as const,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop"
    },
    // Machine Learning Projects
    {
      title: "AI Interview Emotion Analyzer",
      description: "Machine learning system that analyzes candidate emotions during interviews using facial expression detection.",
      highlights: ["Facial expression detection", "Emotion classification", "Real-time analysis"],
      links: [{ label: "View Demo", url: "https://ai-interview-emotion-analyzer.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/AI-interview-emotion-analyzer", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "Python", "Computer Vision", "AI"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop"
    },
    {
      title: "Book Recommender System",
      description: "Personalized recommendation engine suggesting books based on user preferences and reading patterns.",
      highlights: ["User preference analysis", "Personalized suggestions", "Reading pattern tracking"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/book-recommender/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/book-recommender/", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "Python", "Recommendation System"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
    },
    {
      title: "Gaurdio",
      description: "AI-based monitoring system designed to detect anomalies and improve digital security.",
      highlights: ["Anomaly detection", "Security monitoring", "Threat identification"],
      links: [{ label: "View Demo", url: "https://khwahish11.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/guardia", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "Python", "AI Security"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
    },
    {
      title: "PredictSalesAI",
      description: "Predictive analytics model that forecasts future sales trends using historical data.",
      highlights: ["Sales forecasting", "Trend analysis", "Historical data modeling"],
      links: [{ label: "View Demo", url: "https://precious-douhua-ccaae6.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/predictsalesai", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "Python", "Data Analytics"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Text Emotion Analyzer",
      description: "NLP-based model that detects emotions from written text using sentiment and emotion classification.",
      highlights: ["Text classification", "Sentiment analysis", "Emotion detection"],
      links: [{ label: "View Demo", url: "https://text-emotion-analyzer-tzny2oxzyunw5gbudvm9zt.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/text-emotion-analyzer", icon: Github }],
      icon: Bot,
      tech: ["Machine Learning", "NLP", "Python", "AI"],
      type: "MinorML" as const,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
    },
    // Flutter App Projects
    {
      title: "Aura Diary",
      description: "Personal digital diary app for writing thoughts, tracking moods, and reflecting daily.",
      highlights: ["Mood tracking", "Daily journaling", "Personal reflections"],
      links: [{ label: "View Demo", url: "https://auradiary.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/aura-diary", icon: Github }],
      icon: Smartphone,
      tech: ["Flutter", "Firebase", "UI/UX"],
      type: "MinorFlutterApp" as const,
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
    },
    {
      title: "Chat Application",
      description: "Real-time messaging app with instant chat, user authentication, and notifications.",
      highlights: ["Real-time messaging", "User authentication", "Push notifications"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/chat-application", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/chat-application", icon: Github }],
      icon: Smartphone,
      tech: ["Flutter", "Firebase", "Real-time"],
      type: "MinorFlutterApp" as const,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
    },
    {
      title: "Food Fetch",
      description: "Food discovery and ordering app with restaurant listings and quick search.",
      highlights: ["Restaurant listings", "Quick search", "Food ordering"],
      links: [{ label: "View Demo", url: "https://vocal-pithivier-6361b9.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/flutter-food-fetch", icon: Github }],
      icon: Smartphone,
      tech: ["Flutter", "API", "UI/UX"],
      type: "MinorFlutterApp" as const,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    },
    {
      title: "Travel App",
      description: "Travel planning app for exploring destinations, itineraries, and trip organization.",
      highlights: ["Destination exploration", "Itinerary planning", "Trip organization"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/travel-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/travel-app", icon: Github }],
      icon: Smartphone,
      tech: ["Flutter", "Firebase", "API"],
      type: "MinorFlutterApp" as const,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
    },
    {
      title: "Vital Pulse AI",
      description: "AI-powered health monitoring app for tracking vital signals and wellness insights.",
      highlights: ["Vital sign tracking", "Health insights", "Wellness monitoring"],
      links: [{ label: "View Demo", url: "https://calm-cucurucho-f5a62c.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/vital-pulse", icon: Github }],
      icon: Smartphone,
      tech: ["Flutter", "AI", "Health"],
      type: "MinorFlutterApp" as const,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
    },
    // Android App Projects
    {
      title: "BioLensAR",
      description: "Augmented reality Android app that visualizes biological structures and educational models in 3D.",
      highlights: ["AR visualization", "3D models", "Educational content"],
      links: [{ label: "View Demo", url: "https://magnificent-blini-2a742e.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/biolensAR", icon: Github }],
      icon: Smartphone,
      tech: ["Android", "AR", "Education", "3D Visualization"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
    },
    {
      title: "Context Aware Reminder",
      description: "Smart reminder app that triggers tasks based on location, time, and user context.",
      highlights: ["Location-based triggers", "Context awareness", "Smart notifications"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/context-awarereminder", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/context-awarereminder", icon: Github }],
      icon: Smartphone,
      tech: ["Android", "Context Awareness", "Location API"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=400&fit=crop"
    },
    {
      title: "Mood Journal",
      description: "Personal mood tracking application that helps users reflect and monitor emotional patterns.",
      highlights: ["Mood tracking", "Emotional patterns", "Personal insights"],
      links: [{ label: "View Demo", url: "https://dainty-churros-13985e.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/lumina-mood-journal", icon: Github }],
      icon: Smartphone,
      tech: ["Android", "Wellness", "Data Tracking"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
    },
    {
      title: "Study Planner",
      description: "Productivity app for organizing study schedules, tasks, and academic goals.",
      highlights: ["Study schedules", "Task management", "Academic tracking"],
      links: [{ label: "View Demo", url: "https://lumina-study-planner.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/study-planner", icon: Github }],
      icon: Smartphone,
      tech: ["Android", "Productivity", "Task Management"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
    },
    {
      title: "Vox Finance",
      description: "Voice-assisted personal finance tracker for managing expenses and budgets.",
      highlights: ["Voice commands", "Expense tracking", "Budget management"],
      links: [{ label: "View Demo", url: "https://preeminent-gingersnap-21a5e4.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/voxfinance", icon: Github }],
      icon: Smartphone,
      tech: ["Android", "Voice AI", "Finance"],
      type: "MinorAndroidApp" as const,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    // Web App Projects
    {
      title: "Career Stream Pro",
      description: "Career guidance platform that helps users explore career paths, skills, and opportunities.",
      highlights: ["Career exploration", "Skills assessment", "Job opportunities"],
      links: [{ label: "View Demo", url: "https://hilarious-clafoutis-67210c.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/carrer-stream-pro", icon: Github }],
      icon: Code,
      tech: ["Web App", "AI", "Database"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop"
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online shopping platform with product listings, cart, and secure checkout.",
      highlights: ["Product listings", "Shopping cart", "Secure checkout"],
      links: [{ label: "View Demo", url: "https://novamarket-ai-ecommerce.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/ecommerece", icon: Github }],
      icon: Code,
      tech: ["Web App", "Payment Integration", "Database"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "EduSphere AI",
      description: "AI-powered learning platform that personalizes educational content and recommendations.",
      highlights: ["Personalized learning", "AI recommendations", "Educational content"],
      links: [{ label: "View Demo", url: "https://edusphere-ai-lms.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/edusphereai", icon: Github }],
      icon: Code,
      tech: ["AI", "Web App", "Machine Learning"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop"
    },
    {
      title: "Fake Review Detection",
      description: "Machine learning system that identifies and filters fake product reviews.",
      highlights: ["Review analysis", "Fake detection", "Content filtering"],
      links: [{ label: "View Demo", url: "https://delightful-kleicha-103cfc.netlify.app/#/login", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/fake-review-detection", icon: Github }],
      icon: Code,
      tech: ["Machine Learning", "Python", "Data Analysis"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "Nexus Chat",
      description: "Real-time chat platform enabling instant communication and group messaging.",
      highlights: ["Real-time messaging", "Group chat", "Instant communication"],
      links: [{ label: "View Demo", url: "https://nexuschat-app.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/nexus-chat", icon: Github }],
      icon: Code,
      tech: ["WebSockets", "Web App", "Database"],
      type: "MinorWebApp" as const,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
    }
  ],
  "Startup Project": [
    {
      title: "SheCook",
      description: "A platform empowering home cooks, especially women, to sell homemade food locally.",
      highlights: [
        "Home-chef profiles and menus",
        "Local ordering and pickup",
        "Ratings and hygiene trust badges"
      ],
      links: [
        { label: "View Demo", url: "https://transcendent-dolphin-d744ac.netlify.app/", icon: Globe },
        { label: "View Code", url: "https://github.com/khwahish895/shecook", icon: Github }
      ],
      icon: Heart,
      tech: ["Women Empowerment", "Local Economy"],
      type: "Startup" as const,
      stage: "Idea / Concept Stage",
      impact: "Women Empowerment · Local Economy",
      demoUrl: "https://transcendent-dolphin-d744ac.netlify.app/",
      codeUrl: "https://github.com/khwahish895/shecook",
      presentationUrl: "https://docs.google.com/presentation/d/19gVtmSaGqu_jdoa51vH-uJ-ymSOm6gwW/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
    },
    {
      title: "Sanjeevani – Rural Med",
      description: "Digital healthcare support platform connecting rural patients with doctors and medicine access.",
      highlights: [
        "Teleconsultation support",
        "Medicine availability tracking",
        "Voice or SMS health reminders"
      ],
      links: [
        { label: "View Demo", url: "https://khwahish12.netlify.app/", icon: Globe },
        { label: "View Code", url: "https://github.com/khwahish895/MediMed21", icon: Github }
      ],
      icon: Rocket,
      tech: ["Rural Healthcare", "Accessibility"],
      type: "Startup" as const,
      stage: "Idea / Concept Stage",
      impact: "Rural Healthcare · Accessibility",
      demoUrl: "https://khwahish12.netlify.app/",
      codeUrl: "https://github.com/khwahish895/MediMed21",
      presentationUrl: "https://docs.google.com/presentation/d/1n88_nXRLWGBxKvzge2rjxfzqVkfo9w4M/edit?usp=drive_link&ouid=112538470595958137063&rtpof=true&sd=true",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
    }
  ],
  "Experimental Project": [
    // Web Projects (27 total)
    {
      title: "Auth API",
      description: "API-based authentication system for secure login and user validation.",
      highlights: ["Authentication", "API", "Security"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/auth-api", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/auth-api", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/auth-api", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    {
      title: "Auth System",
      description: "Complete user authentication system with login and signup functionality.",
      highlights: ["Authentication", "Login", "Signup"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/auth-system", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/auth-system", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/auth-system", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop"
    },
    {
      title: "Budget System",
      description: "Web tool to track income, expenses, and financial planning.",
      highlights: ["Budget tracking", "Finance", "Expense management"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/budget-tracker/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/budget-tracker", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/budget-tracker/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
    },
    {
      title: "Business Website",
      description: "Modern responsive website designed for business presentation.",
      highlights: ["Business", "Responsive", "Modern design"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/business-website/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/business-website", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/business-website/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
    },
    {
      title: "Calculator",
      description: "Interactive calculator built with JavaScript for basic operations.",
      highlights: ["Calculator", "JavaScript", "Interactive"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/calculator/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/calculator", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/calculator/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
    },
    {
      title: "Website Clone",
      description: "Frontend clone project replicating the layout of a popular website.",
      highlights: ["Clone", "Frontend", "Layout"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/clone/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/clone", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/clone/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "E-Commerce UI",
      description: "Experimental online shopping interface with product listings.",
      highlights: ["E-Commerce", "UI", "Product listings"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/e-commerce", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/e-commerce", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/e-commerce", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Encryption Tool",
      description: "Web tool demonstrating simple data encryption techniques.",
      highlights: ["Encryption", "Security", "Data"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/encryption/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/encryption", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/encryption/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop"
    },
    {
      title: "Image Gallery",
      description: "Responsive image gallery with grid layout and preview feature.",
      highlights: ["Gallery", "Grid", "Responsive"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/image-gallery/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/image-gallery", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/image-gallery/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop"
    },
    {
      title: "Interactive Form",
      description: "Dynamic form with validation and interactive UI behavior.",
      highlights: ["Form", "Validation", "Interactive"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/interactive-form/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/interactive-form", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/interactive-form/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    // Remaining projects (See More)
    {
      title: "Job Portal",
      description: "Web platform for job listings and applications.",
      highlights: ["Job portal", "Listings", "Applications"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/job-portal", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/job-portal", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/job-portal", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
    },
    {
      title: "Movie Explorer",
      description: "Web app to explore movies with search and filter features.",
      highlights: ["Movies", "Search", "API"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/movie/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/movie", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/movie/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop"
    },
    {
      title: "Photo Gallery",
      description: "Photo gallery with lightbox and filtering options.",
      highlights: ["Photos", "Gallery", "Lightbox"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/photo-gallery/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/photo-gallery", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/photo-gallery/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills.",
      highlights: ["Portfolio", "Personal", "Showcase"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/.portfolio", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/.portfolio", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/.portfolio/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      title: "Pricing Card UI",
      description: "Pricing cards for subscription plans with modern design.",
      highlights: ["Pricing", "Cards", "UI"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/pricing-card/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/pricing-card", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/pricing-card/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Quiz App",
      description: "Interactive quiz application with scoring system.",
      highlights: ["Quiz", "Interactive", "Scoring"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/quiz/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/quiz", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/quiz/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop"
    },
    {
      title: "Recipe Website",
      description: "Recipe sharing website with search functionality.",
      highlights: ["Recipe", "Food", "Search"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/recipe-website/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/recipe-website", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/recipe-website/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop"
    },
    {
      title: "Restaurant Menu",
      description: "Digital menu for restaurants with categories.",
      highlights: ["Restaurant", "Menu", "Digital"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/restaurantmenu/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/restaurantmenu", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/restaurantmenu/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
    },
    {
      title: "Secret Project",
      description: "Experimental project with hidden features.",
      highlights: ["Experimental", "Secret", "Hidden"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/secret-project/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/secret-project", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/secret-project/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
    },
    {
      title: "To-Do List",
      description: "Task management app with add and delete features.",
      highlights: ["Tasks", "Management", "CRUD"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/todo-list/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/todo-list", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/todo-list/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
    },
    {
      title: "Simple CMS",
      description: "Basic content management system for websites.",
      highlights: ["CMS", "Content", "Management"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/simple-cms", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/simple-cms", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/simple-cms", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Todo App",
      description: "Task tracking application with local storage.",
      highlights: ["Tasks", "Storage", "Tracking"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/todo-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/todo-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/todo-app", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
    },
    {
      title: "Todo REST API",
      description: "RESTful API for task management operations.",
      highlights: ["REST API", "Tasks", "Backend"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/todo-rest-api/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/todo-rest-api", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/todo-rest-api/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
    },
    {
      title: "URL Shortener",
      description: "Tool to shorten long URLs into compact links.",
      highlights: ["URL", "Shortener", "Links"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/url-shortener", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/url-shortener", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/url-shortener", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "User Management System",
      description: "System to manage user profiles and roles.",
      highlights: ["Users", "Management", "Roles"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/user-management", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/user-management", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/user-management", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0e?w=600&h=400&fit=crop"
    },
    {
      title: "Weather App",
      description: "Weather application showing forecasts and conditions.",
      highlights: ["Weather", "Forecast", "API"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/weather-app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/weather-app", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/weather-app/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop"
    },
    {
      title: "Heart Animation",
      description: "Animated heart effect using CSS and JavaScript.",
      highlights: ["Animation", "Heart", "CSS"],
      tech: ["Web"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/heart-/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/heart-", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/heart-/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop"
    },
    // Flutter Apps (14 projects)
    {
      title: "Animated Login Screen",
      description: "Creative Flutter login UI with smooth animations and transitions.",
      highlights: ["Login UI", "Animations", "Flutter"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/animated-login-screen", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/animated-login-screen", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/animated-login-screen", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
    },
    {
      title: "Budget Tracker",
      description: "Simple personal finance tracker to monitor expenses and budgets.",
      highlights: ["Finance", "Expense tracking", "Budget"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/budget-tracker-", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/budget-tracker-", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/budget-tracker-", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
    },
    {
      title: "Camera App",
      description: "Basic Flutter camera application for capturing and previewing photos.",
      highlights: ["Camera", "Photos", "Capture"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/camera-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/camera-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/camera-app", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop"
    },
    {
      title: "Daily Quotes",
      description: "Displays motivational quotes with clean UI and daily refresh.",
      highlights: ["Quotes", "Motivation", "Daily"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/daily-quotes", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/daily-quotes", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/daily-quotes", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
      title: "Dictionary App",
      description: "Search and view word meanings with a minimal Flutter interface.",
      highlights: ["Dictionary", "Search", "Vocabulary"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/dictionary-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/dictionary-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/dictionary-app", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop"
    },
    {
      title: "Language Flashcards",
      description: "Flashcard-based app for learning vocabulary and new languages.",
      highlights: ["Flashcards", "Language learning", "Education"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/language-flashcards", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/language-flashcards", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/language-flashcards", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
    },
    {
      title: "Local Grocery App",
      description: "Small grocery management app for tracking daily shopping items.",
      highlights: ["Grocery", "Shopping", "Management"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/grocery-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/grocery-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/grocery-app", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
    },
    {
      title: "Mood Journal",
      description: "Track daily mood entries with simple analytics and notes.",
      highlights: ["Mood tracking", "Journal", "Analytics"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/mood-journal", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/mood-journal", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/mood-journal", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop"
    },
    {
      title: "Music Player",
      description: "Flutter music player with playback controls and playlist support.",
      highlights: ["Music", "Player", "Playlist"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/music-player", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/music-player", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/music-player", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
    },
    {
      title: "My Profile UI",
      description: "Personal profile screen UI with editable details.",
      highlights: ["Profile", "UI", "Editable"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/my-profile-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/my-profile-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/my-profile-app", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      title: "Offline Chat Simulator",
      description: "Prototype chat interface simulating messaging without internet.",
      highlights: ["Chat", "Offline", "Messaging"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/offline-chat-simulator", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/offline-chat-simulator", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/offline-chat-simulator", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
    },
    {
      title: "Offline Recipe Book",
      description: "Recipe collection app that works completely offline.",
      highlights: ["Recipe", "Offline", "Cookbook"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/offline-recipe-book", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/offline-recipe-book", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/offline-recipe-book", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop"
    },
    {
      title: "Quote Generator",
      description: "Random quote generator with minimal Flutter UI.",
      highlights: ["Quotes", "Random", "Generator"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/quote-generator", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/quote-generator", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/quote-generator", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop"
    },
    {
      title: "Typing Speed Tester",
      description: "App that measures typing speed and accuracy.",
      highlights: ["Typing", "Speed test", "Accuracy"],
      tech: ["Flutter"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/typing-speed-tester", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/typing-speed-tester", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/typing-speed-tester", icon: ExternalLink }],
      icon: Smartphone,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=400&fit=crop"
    },
    // Node.js Projects (8 projects)
    {
      title: "Animated React",
      description: "React UI experiment featuring smooth animations and interactive components.",
      highlights: ["React", "Animations", "UI Experiment"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/animated-react", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/animated-react", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/animated-react", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
    },
    {
      title: "Express Server",
      description: "Basic backend server built using Express.js for handling API requests.",
      highlights: ["Express", "Backend", "API"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/express-server", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/express-server", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/express-server", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
    },
    {
      title: "Mongo User API",
      description: "REST API for user data management using Node.js and MongoDB.",
      highlights: ["REST API", "MongoDB", "User Data"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/mongo-user-api", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/mongo-user-api", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/mongo-user-api", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop"
    },
    {
      title: "MongoDB Connection",
      description: "Node.js experiment demonstrating database connection and operations with MongoDB.",
      highlights: ["MongoDB", "Database", "Connection"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/mongodb-connection", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/mongodb-connection", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/mongodb-connection", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop"
    },
    {
      title: "React Router App",
      description: "React application implementing dynamic navigation using React Router.",
      highlights: ["React Router", "Navigation", "Dynamic"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/react-router-app", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/react-router-app", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/react-router-app", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "React Search",
      description: "Search interface built with React for filtering and displaying dynamic data.",
      highlights: ["Search", "React", "Filtering"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/react-search", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/react-search", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/react-search", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop"
    },
    {
      title: "Todo API",
      description: "Backend API for managing todo tasks using Node.js and Express.",
      highlights: ["Todo", "API", "Express"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/todo-api", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/todo-api", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/todo-api", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
    },
    {
      title: "User API",
      description: "RESTful API for creating, updating, and retrieving user information.",
      highlights: ["RESTful", "User", "CRUD"],
      tech: ["NodeJS"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/user-api", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/user-api", icon: Github }, { label: "More Details", url: "https://github.com/khwahish895/user-api", icon: ExternalLink }],
      icon: Database,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    // Python Projects (10 total) - Academic → Experimental → Python
    {
      title: "Astrology Analyzer",
      description: "Python-based experiment exploring astrology data and prediction patterns.",
      highlights: ["Astrology data analysis", "Pattern recognition", "Data processing"],
      tech: ["Python"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/astrology", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/astrology", icon: Github }],
      icon: Lamp,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=600&h=400&fit=crop"
    },
    {
      title: "Automation Scripts",
      description: "Python automation scripts designed to simplify repetitive tasks.",
      highlights: ["Task automation", "Scripting", "Productivity"],
      tech: ["Python"],
      links: [{ label: "View Demo", url: "https://automation-ilf57s8wymey6fp8hcxfcj.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/automation", icon: Github }],
      icon: Wrench,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
    },
    {
      title: "AWS Integration Experiment",
      description: "Testing Python integration with AWS services for cloud-based operations.",
      highlights: ["AWS integration", "Cloud operations", "Boto3"],
      tech: ["Python", "AWS", "Cloud"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/aws/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/aws/", icon: Github }],
      icon: Cloud,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
    },
    {
      title: "Command Line Tools",
      description: "Custom Python command-line utilities for productivity and system tasks.",
      highlights: ["CLI development", "System utilities", "Argparse"],
      tech: ["Python", "CLI"],
      links: [{ label: "View Demo", url: "https://command-tetpythodrjds5wafhdexh.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/command/", icon: Github }],
      icon: Terminal,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "Dash App Experiment",
      description: "Interactive data visualization app built using the Dash framework.",
      highlights: ["Dash framework", "Interactive visualization", "Data apps"],
      tech: ["Python", "Dash"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/dash/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/dash/", icon: Github }],
      icon: LayoutDashboard,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Data Dashboard",
      description: "Python-powered dashboard for visualizing and analyzing datasets.",
      highlights: ["Data visualization", "Dashboard creation", "Analytics"],
      tech: ["Python", "Data Visualization"],
      links: [{ label: "View Demo", url: "https://dashboard-6gtrogtyuo2dqb6byhsyhz.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/dashboard", icon: Github }],
      icon: BarChart3,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Finger Counter",
      description: "Computer vision experiment that detects and counts fingers using a webcam.",
      highlights: ["Hand detection", "Computer vision", "Real-time tracking"],
      tech: ["Python", "OpenCV", "Computer Vision"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/finger-counter", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/finger-counter", icon: Github }],
      icon: Hand,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop"
    },
    {
      title: "Linux Automation",
      description: "Python scripts to automate common Linux system tasks and operations.",
      highlights: ["Linux automation", "System scripting", "DevOps"],
      tech: ["Python", "Linux"],
      links: [{ label: "View Demo", url: "https://6cuhhwuawaddjja8xyz45j.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/linux/", icon: Github }],
      icon: Settings,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop"
    },
    {
      title: "Song Player Script",
      description: "Python program that plays and manages music through scripts.",
      highlights: ["Audio playback", "Media control", "Script management"],
      tech: ["Python", "Media Control"],
      links: [{ label: "View Demo", url: "https://bhzamsysbwjc3pggzovjug.streamlit.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/song", icon: Github }],
      icon: Music,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
    },
    {
      title: "Webcam Experiment",
      description: "Real-time webcam processing and image capture using Python.",
      highlights: ["Webcam access", "Image processing", "Real-time capture"],
      tech: ["Python", "OpenCV"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/webcam", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/webcam", icon: Github }],
      icon: Video,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop"
    },
    // 3D Website Projects (12 projects)
    {
      title: "Restaurant Website",
      description: "A modern interactive platform for restaurants to showcase menus and accept reservations.",
      highlights: ["Interactive menu display", "Online table booking", "Food gallery", "Online ordering", "Reviews section", "Map integration"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://restaurant3d.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/restaurant3d", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Food Brand Website",
      description: "A digital platform for packaged food brands with 3D product showcase.",
      highlights: ["3D product showcase", "Brand story timeline", "Product catalog", "Nutrition information", "Testimonials"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://cokeverse.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/cokeverse", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Study Partner Finder",
      description: "Platform where students find study partners based on subjects and goals.",
      highlights: ["Subject-based matching", "Study rooms", "Pomodoro timer sessions", "Chat and progress tracking"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://study-partne.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/study-partner", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Skill Swap Platform",
      description: "Users exchange skills without money - Design ↔ Coding, Coding ↔ Photography.",
      highlights: ["Skill profiles", "Request exchange system", "Collaboration rooms", "Ratings and reviews"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://skill-swaping.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/skill-swap", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Knowledge Web",
      description: "A 3D knowledge graph platform connecting topics visually with interactive connections.",
      highlights: ["3D topic nodes", "Interactive connections", "Concept explorer", "AI topic suggestions"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://boisterous-halva-d17590.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/knowledge-web", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Life Tradeoff Calculator",
      description: "Tool for comparing two life decisions visually - Job A vs Job B with interactive decision visualization graph.",
      highlights: ["Decision comparison", "Interactive visualization", "Multi-parameter analysis", "Visual graphs"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://life-tradeoff.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/life-tradeoff", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Rural Skill Marketplace",
      description: "Marketplace connecting rural artisans and workers with buyers for handmade products.",
      highlights: ["Artisan profiles", "Handmade product listings", "Service booking", "Direct buyer contact"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://rural-skill.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/Rural-Skill-Marketplace", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Rural Student Mentorship Platform",
      description: "Connects rural students with mentors and professionals for career guidance.",
      highlights: ["Mentor matching", "Career guidance sessions", "Scholarship resources", "Webinars"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://ruralstudent.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/Rural-Student-Mentorship", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Queue Management for Government Offices",
      description: "Digital queue management system for government offices with online token booking.",
      highlights: ["Online token booking", "Real-time queue tracking", "SMS alerts", "Appointment scheduling", "Priority queue for elderly"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://queue-managemen.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/queue", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Medicine Delivery for Villages",
      description: "Medicine ordering and delivery system for rural areas with prescription upload.",
      highlights: ["Prescription upload", "Medicine ordering", "Pharmacy integration", "Delivery tracking"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://medicine-village.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/medicine", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Waste to Income Startup",
      description: "Platform that converts recyclable waste into income with pickup requests and rewards.",
      highlights: ["Waste pickup requests", "Recycling rewards", "Recyclable waste marketplace", "Training resources"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://waste-to-income.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/waste-to-income", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Local Language Learning App",
      description: "Educational platform for learning digital skills in regional languages with voice lessons.",
      highlights: ["Digital literacy courses", "Spoken English", "Coding basics", "Regional language UI", "Offline access"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://learning-languag.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/language-learning", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    // New 3D Website Projects
    {
      title: "3D Coffee Brand",
      description: "An immersive 3D interactive website for a premium coffee brand showcasing products with stunning visuals.",
      highlights: ["3D coffee bean visualization", "Interactive product showcase", "Virtual coffee tasting experience", "Brand storytelling", "AR coffee brewing guide"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://coffee-3.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/coffee", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Food Brand",
      description: "A vibrant 3D website for a food brand featuring interactive menus and virtual restaurant tours.",
      highlights: ["3D food showcase", "Interactive menu exploration", "Virtual restaurant tour", "Online ordering integration", "Customer reviews"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://pizza-3dweb.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/pizza", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Brand Website",
      description: "A modern 3D brand website with immersive storytelling and interactive brand experience.",
      highlights: ["3D brand timeline", "Interactive storytelling", "Product configurator", "AR try-on features", "Social media integration"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://cake-websit.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/cake-", icon: Github }],
      icon: Code,
      type: "Standard" as const
    },
    {
      title: "Perfume Brand",
      description: "An elegant 3D website for a luxury perfume brand with immersive scent experiences.",
      highlights: ["3D perfume bottle showcase", "Scent notes visualization", "Virtual fragrance testing", "Personalized recommendations", "Gift wrapper AR"],
      tech: ["3D Website"],
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop",
      links: [{ label: "View Demo", url: "https://perfume-brand.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/perfume-brand", icon: Github }],
      icon: Code,
      type: "Standard" as const
    }
  ],
  "College Project": [
    // Python Programming Projects
    {
      title: "Contact List System",
      description: "Python-based contact management system to store and organize user contacts.",
      highlights: ["Contact management", "Data storage", "Organization"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop"
    },
    {
      title: "Currency Converter",
      description: "Simple Python tool that converts currencies using predefined exchange rates.",
      highlights: ["Currency conversion", "Exchange rates", "Rate calculation"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      title: "Dice Rolling Simulator",
      description: "Random dice roll simulator demonstrating Python's random module.",
      highlights: ["Random module", "Dice simulation", "Game logic"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&h=400&fit=crop"
    },
    {
      title: "GIF Creator",
      description: "Python program that generates animated GIFs from images.",
      highlights: ["GIF creation", "Image processing", "Animation"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
    },
    {
      title: "Google Image Downloader",
      description: "Script that downloads images from Google search automatically.",
      highlights: ["Image downloading", "Web scraping", "Automation"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
    },
    {
      title: "Number Guessing Game",
      description: "Interactive Python game where players guess a randomly generated number.",
      highlights: ["Game logic", "Random number", "Interactive gameplay"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
    },
    {
      title: "Rainbow Spiral",
      description: "Creative Python visualization that generates colorful spiral patterns.",
      highlights: ["Visualization", "Color patterns", "Creative graphics"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop"
    },
    {
      title: "Rock Paper Scissors Game",
      description: "Classic Rock-Paper-Scissors game implemented using Python logic.",
      highlights: ["Game logic", "Two-player game", "Python implementation"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1587425916406-82d14080c2a5?w=600&h=400&fit=crop"
    },
    {
      title: "Snake Game",
      description: "Classic Snake arcade game built using Python and game logic.",
      highlights: ["Classic game", "Game development", "Python graphics"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop"
    },
    {
      title: "Website Blocker",
      description: "Python script that blocks distracting websites during work hours.",
      highlights: ["Website blocking", "Productivity tool", "Automation"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop"
    },
    {
      title: "Password Generator",
      description: "Secure password generator that creates strong random passwords.",
      highlights: ["Password generation", "Security", "Random passwords"],
      tech: ["Python"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/python-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/python-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/python-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    // C Programming Projects
    {
      title: "Airport Management System",
      description: "Console-based system to manage airport flights, passengers, and schedules.",
      highlights: ["Flight management", "Passenger records", "Schedule tracking"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop"
    },
    {
      title: "Bank Management System",
      description: "Program for managing bank accounts, deposits, withdrawals, and records.",
      highlights: ["Account management", "Transaction handling", "Record keeping"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop"
    },
    {
      title: "Library Management System",
      description: "System to manage book records, issue tracking, and returns.",
      highlights: ["Book records", "Issue tracking", "Return management"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
    },
    {
      title: "Zoo Management System",
      description: "Program to store and manage animal records and zoo information.",
      highlights: ["Animal records", "Zoo data management", "Information system"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop"
    },
    {
      title: "Hospital Management System",
      description: "Console-based program for managing patient records and hospital data.",
      highlights: ["Patient records", "Hospital data", "Management system"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
    },
    {
      title: "Bus Reservation System",
      description: "Console application for booking and managing bus seat reservations.",
      highlights: ["Seat booking", "Reservation management", "Seat availability"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=400&fit=crop"
    },
    {
      title: "Calculator",
      description: "Basic calculator program performing arithmetic operations.",
      highlights: ["Arithmetic operations", "Basic math", "Console calculator"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
    },
    {
      title: "Factorial Program",
      description: "Program to calculate factorial of a number using loops.",
      highlights: ["Loop implementation", "Factorial calculation", "Math logic"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
    },
    {
      title: "Factorial using Recursion",
      description: "Recursive implementation to compute factorial of a number.",
      highlights: ["Recursion", "Factorial logic", "Function calls"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
    },
    {
      title: "Palindrome Number",
      description: "Program to check whether a number is a palindrome.",
      highlights: ["Number palindrome", "Reverse digits", "Logic implementation"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop"
    },
    {
      title: "Palindrome String",
      description: "Program to verify whether a string reads the same forwards and backwards.",
      highlights: ["String palindrome", "Character comparison", "Reverse string"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "ToDo List Program",
      description: "Simple console task manager to add, view, and remove tasks.",
      highlights: ["Task management", "Add/Remove tasks", "Console UI"],
      tech: ["C"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/c-projects", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/c-projects", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/c-projects", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
    },
    // C++ Programming Projects
    {
      title: "ATM System",
      description: "Console-based banking system for withdrawals, deposits, and balance checking.",
      highlights: ["Banking operations", "Transaction handling", "Balance checking"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Contact Management System",
      description: "Program to store, search, and manage user contacts.",
      highlights: ["Contact storage", "Search functionality", "Data management"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Currency Converter",
      description: "Simple tool to convert currencies based on predefined rates.",
      highlights: ["Currency conversion", "Exchange rates", "Rate calculation"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop"
    },
    {
      title: "Dictionary Program",
      description: "Search and retrieve word meanings from a stored dataset.",
      highlights: ["Word search", "Meaning lookup", "Data storage"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop"
    },
    {
      title: "Factorial Calculator",
      description: "Program that calculates factorial values using loops or recursion.",
      highlights: ["Factorial calculation", "Loops and recursion", "Math operations"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
    },
    {
      title: "Hospital Management System",
      description: "Console-based system for managing patient and hospital records.",
      highlights: ["Patient records", "Hospital data", "Management system"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
    },
    {
      title: "Login Form System",
      description: "Basic authentication system using username and password validation.",
      highlights: ["Authentication", "Password validation", "User login"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "Palindrome Checker",
      description: "Program that checks whether a word or number is a palindrome.",
      highlights: ["Palindrome detection", "String comparison", "Logic implementation"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop"
    },
    {
      title: "Rock Paper Scissors Game",
      description: "Interactive console game where the user plays against the computer.",
      highlights: ["Game logic", "Computer opponent", "Interactive gameplay"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&h=400&fit=crop"
    },
    {
      title: "Tic Tac Toe Game",
      description: "Two-player console-based Tic Tac Toe game with win detection.",
      highlights: ["Two-player game", "Win detection", "Board game"],
      tech: ["C++"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/cpp-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/cpp-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/cpp-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=400&fit=crop"
    },
    // Java Programming Projects
    {
      title: "Electricity Bill System",
      description: "Java-based system to calculate and manage electricity billing records.",
      highlights: ["Billing system", "Calculation logic", "Records management"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop"
    },
    {
      title: "ISP Automation System",
      description: "Automation tool for managing internet service provider operations.",
      highlights: ["Automation", "ISP management", "System operations"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop"
    },
    {
      title: "Library Management System",
      description: "Digital system to manage book records, issuing, and returns.",
      highlights: ["Book management", "Issue tracking", "Returns system"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
    },
    {
      title: "Medical Management System",
      description: "Application for managing patient records and hospital data.",
      highlights: ["Patient records", "Medical data", "Hospital management"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop"
    },
    {
      title: "Online Survey System",
      description: "Survey platform to collect and analyze user responses.",
      highlights: ["Survey collection", "Response analysis", "User feedback"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Password Generator",
      description: "Tool for generating secure and customizable passwords.",
      highlights: ["Password generation", "Security", "Customizable"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop"
    },
    {
      title: "Resume Builder",
      description: "Application that helps users create structured resumes easily.",
      highlights: ["Resume creation", "Template system", "Easy formatting"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop"
    },
    {
      title: "Seating Arrangement System",
      description: "Automates classroom or exam seating allocation.",
      highlights: ["Seating allocation", "Automation", "Exam management"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop"
    },
    {
      title: "Snake Game",
      description: "Classic snake game developed using Java.",
      highlights: ["Classic game", "Game development", "Java graphics"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop"
    },
    {
      title: "Word Count Tool",
      description: "Utility that counts words and analyzes text input.",
      highlights: ["Text analysis", "Word counting", "Utility tool"],
      tech: ["Java"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/java-project", icon: Github }, { label: "View Demo", url: "https://github.com/khwahish895/java-project", icon: Globe }, { label: "More Details", url: "https://github.com/khwahish895/java-project", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop"
    },
    // HTML & CSS Projects
    {
      title: "3D CSS Design",
      description: "Experiment with 3D transformations and perspective using pure CSS.",
      highlights: ["3D transformations", "CSS perspective", "Pure CSS"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/3d/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/3d/", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/3d/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
    },
    {
      title: "Cake Landing Page",
      description: "Sweet-themed website layout for a bakery or cake shop.",
      highlights: ["Bakery theme", "Landing page", "Responsive design"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/cake/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/cake/", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/cake/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop"
    },
    {
      title: "Card UI Design",
      description: "Modern card component layout with hover animations.",
      highlights: ["Card components", "Hover animations", "Modern UI"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/card/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/card", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/card/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      title: "Google UI Clone",
      description: "Frontend recreation of the Google search homepage.",
      highlights: ["UI clone", "Google design", "Search interface"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/google/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/google", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/google/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop"
    },
    {
      title: "Icons UI Pack",
      description: "Collection of styled icons created with HTML and CSS.",
      highlights: ["Custom icons", "SVG icons", "UI pack"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/icons-pack/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/icons-pack", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/icons-pack/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop"
    },
    {
      title: "Lamp Animation UI",
      description: "Creative lamp animation that interacts with page lighting.",
      highlights: ["Lamp animation", "Lighting effect", "Creative UI"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/lamp/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/lamp", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/lamp/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      title: "Light Effect UI",
      description: "CSS lighting and glow effects for modern UI elements.",
      highlights: ["Light effects", "Glow effects", "Modern UI"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/light/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/light", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/light/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop"
    },
    {
      title: "Loading Animation",
      description: "Animated loading indicators built with pure CSS.",
      highlights: ["Loading spinners", "Pure CSS", "Animations"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/loading/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/loading", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/loading/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop"
    },
    {
      title: "Restaurant Website",
      description: "Responsive restaurant landing page with menu layout.",
      highlights: ["Restaurant theme", "Menu layout", "Responsive"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/restaurant/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/restaurant/", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/restaurant/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
    },
    {
      title: "Text Animation",
      description: "Animated typography effects using CSS transitions.",
      highlights: ["Typography animation", "Text effects", "CSS transitions"],
      tech: ["HTML-CSS"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/text/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/text/", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/text/", icon: ExternalLink }],
      icon: Code,
      type: "Standard" as const,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop"
    }
  ],
  "Other Projects": [
    // Big Projects (Major)
    {
      title: "TrustGuard AI",
      description: "AI-based system designed to detect and prevent digital fraud and suspicious activity.",
      highlights: ["Fraud detection", "AI prevention", "Security monitoring"],
      links: [{ label: "View Demo", url: "https://elegant-longma-ecf90e.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/trust-guard", icon: Github }],
      icon: Shield,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
    },
    {
      title: "IntelliTrack AI",
      description: "Smart tracking system that analyzes user activity and generates intelligent insights.",
      highlights: ["Activity tracking", "AI insights", "User behavior"],
      links: [{ label: "View Demo", url: "https://intellitrack.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/intellitrack", icon: Github }],
      icon: Bot,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Fake Profile Detection System",
      description: "Machine learning model that identifies fake or suspicious social media profiles.",
      highlights: ["Profile analysis", "ML detection", "Social media"],
      links: [{ label: "View Demo", url: "https://khwahish11.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/focus-detect", icon: Github }],
      icon: Shield,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
    },
    {
      title: "Dropout Prediction System",
      description: "Predictive analytics model that identifies students at risk of dropping out.",
      highlights: ["Student analytics", "Risk prediction", "Education"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/dropout-prediction", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/dropout-prediction", icon: Github }],
      icon: Bot,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
    },
    {
      title: "Multi Personality AI System",
      description: "AI assistant capable of switching between multiple personalities for different tasks.",
      highlights: ["Multi personality", "Task switching", "AI assistant"],
      links: [{ label: "View Demo", url: "https://multi-personality-ai.netlify.app/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/multi-personality", icon: Github }],
      icon: Bot,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      title: "Focus Detect",
      description: "AI system that analyzes attention levels and detects focus patterns.",
      highlights: ["Attention analysis", "Focus detection", "Productivity"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/focus-detect", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/focus-detect", icon: Github }],
      icon: Zap,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=400&fit=crop"
    },
    {
      title: "LAN Chat App",
      description: "Local network messaging application for fast communication without internet.",
      highlights: ["Local network", "Fast messaging", "No internet needed"],
      links: [{ label: "View Demo", url: "https://github.com/khwahish895/lan-chat", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/lan-chat", icon: Github }],
      icon: Mic,
      type: "Major" as const,
      image: "https://images.unsplash.com/photo-1591382696684-38c427c7547a?w=600&h=400&fit=crop"
    },
    // Small Tasks (UI Experiments)
    {
      title: "Hand Particles",
      description: "Interactive particle animation that follows hand movement.",
      highlights: ["Particle animation", "Hand tracking", "Interactive"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/hand-particles/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/hand-particles", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/hand-particles/", icon: ExternalLink }],
      icon: Zap,
      tech: ["JavaScript", "Canvas"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
    },
    {
      title: "Heart Animation",
      description: "CSS animated heart effect with smooth motion.",
      highlights: ["CSS animation", "Heart effect", "Smooth motion"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/heart/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/heart", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/heart/", icon: ExternalLink }],
      icon: Heart,
      tech: ["CSS", "HTML"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop"
    },
    {
      title: "Icons Pack",
      description: "Custom UI icons designed for modern interfaces.",
      highlights: ["Custom icons", "UI design", "Modern interfaces"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/icons/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/icons", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/icons/", icon: ExternalLink }],
      icon: Eye,
      tech: ["SVG", "CSS"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
    },
    {
      title: "Lamp Login",
      description: "Creative login UI where a lamp animation lights the form.",
      highlights: ["Creative UI", "Animation", "Login form"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/lamp-login/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/lamp-login", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/lamp-login/", icon: ExternalLink }],
      icon: Zap,
      tech: ["CSS", "HTML", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      title: "Logout Interaction",
      description: "Animated logout button with smooth transition.",
      highlights: ["Button animation", "Smooth transition", "Interactive"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/log-out/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/log-out", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/log-out/", icon: ExternalLink }],
      icon: LogOut,
      tech: ["CSS", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop"
    },
    {
      title: "Login Page UI",
      description: "Clean and modern authentication page design.",
      highlights: ["Authentication", "Modern design", "Clean UI"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/login-page/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/login-page", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/login-page/", icon: ExternalLink }],
      icon: User,
      tech: ["HTML", "CSS", "React"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
    },
    {
      title: "Love Animation",
      description: "Animated visual effect using hearts and smooth motion.",
      highlights: ["Heart animation", "Visual effect", "Smooth motion"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/love-animation/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/love-animation", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/love-animation/", icon: ExternalLink }],
      icon: Heart,
      tech: ["CSS", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&h=400&fit=crop"
    },
    {
      title: "Registration Form",
      description: "Responsive user registration form with validation.",
      highlights: ["Form validation", "Responsive", "User input"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/registration-form/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/registration-form", icon: Github }, { label: "More Details", url: "", icon: ExternalLink }],
      icon: FileText,
      tech: ["HTML", "CSS", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Search Button Animation",
      description: "Expandable search button with smooth UI transition.",
      highlights: ["Expandable UI", "Search animation", "Smooth transition"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/search-button/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/search-button", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/search-button/", icon: ExternalLink }],
      icon: Search,
      tech: ["CSS", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=600&h=400&fit=crop"
    },
    {
      title: "Registration Page",
      description: "Full-page signup layout with modern form styling.",
      highlights: ["Full page layout", "Modern form", "Signup UI"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/registration-page/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/registration-page", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/registration-page/", icon: ExternalLink }],
      icon: FileText,
      tech: ["HTML", "CSS", "React"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "Python Utility Script",
      description: "Small Python script for automation or task handling.",
      highlights: ["Automation", "Python script", "Utility"],
      links: [{ label: "View Demo", url: "https://drive.google.com/file/d/1__9kIwPQ2hqpO485XPdYmfEwfI13lUr5/view?usp=drive_link", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/python-", icon: Github }, { label: "More Details", url: "https://drive.google.com/file/d/1__9kIwPQ2hqpO485XPdYmfEwfI13lUr5/view?usp=drive_link", icon: ExternalLink }],
      icon: Code,
      tech: ["Python"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop"
    },
    {
      title: "Python Animation",
      description: "Simple animation experiment created using Python.",
      highlights: ["Python animation", "Experiment", "Visual effect"],
      links: [{ label: "View Demo", url: "https://drive.google.com/file/d/1Sn1vqmFaBUo07UP6F6A8blJD6eNf7SwQ/view?usp=drive_link", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/python-animation", icon: Github }, { label: "More Details", url: "https://drive.google.com/file/d/1Sn1vqmFaBUo07UP6F6A8blJD6eNf7SwQ/view?usp=drive_link", icon: ExternalLink }],
      icon: Cpu,
      tech: ["Python", "Pygame"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop"
    },
    {
      title: "ThreeJS Hand Particles",
      description: "3D particle interaction built using Three.js.",
      highlights: ["Three.js", "3D particles", "Hand tracking"],
      links: [{ label: "View Demo", url: "https://khwahish895.github.io/threejs-hand-particles/", icon: Globe }, { label: "View Code", url: "https://github.com/khwahish895/threejs-hand-particles", icon: Github }, { label: "More Details", url: "https://khwahish895.github.io/threejs-hand-particles/", icon: ExternalLink }],
      icon: Box,
      tech: ["Three.js", "JavaScript"],
      type: "Small" as const,
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=400&fit=crop"
    }
  ],
  "Voice Assistant": [
    {
      title: "Jarvis AI",
      description: "Voice-controlled AI assistant for task automation and real-time queries.",
      highlights: ["Wake-word detection", "Task automation", "Real-time NLP"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/jarvis-ai", icon: Github }, { label: "Try Demo", url: "https://github.com/khwahish895/jarvis-ai", icon: Globe }],
      icon: Bot,
      tech: ["Python", "NLP", "AI"],
      type: "Voice" as const,
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop"
    },
    {
      title: "J.A.R.V.I.S",
      description: "Smart virtual assistant designed for command-based system control.",
      highlights: ["System command bridge", "Voice-to-action", "Context-awareness"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/J.A.R.V.I.S.", icon: Github }, { label: "Try Demo", url: "https://github.com/khwahish895/J.A.R.V.I.S", icon: Globe }],
      icon: Cpu,
      tech: ["Python", "Speech API", "AI"],
      type: "Voice" as const,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
    },
    {
      title: "AI Assistant",
      description: "General-purpose voice assistant for productivity, search, and automation.",
      highlights: ["Multi-task handling", "Search integration", "Smart automation"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/ai-assistant", icon: Github }, { label: "Try Demo", url: "https://statuesque-churros-ceca21.netlify.app/", icon: Globe }],
      icon: Mic,
      tech: ["Python", "NLP", "ML"],
      type: "Voice" as const,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      title: "Nova",
      description: "Lightweight AI voice assistant focused on fast responses and usability.",
      highlights: ["Low-latency responses", "Clean UX", "High accuracy"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/nova", icon: Github }, { label: "Try Demo", url: "https://github.com/khwahish895/nova", icon: Globe }],
      icon: Zap,
      tech: ["Python", "TTS", "AI"],
      type: "Voice" as const,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop"
    },
    {
      title: "Vox Guard",
      description: "Voice-based security and monitoring assistant with smart alerts.",
      highlights: ["Voice auth", "Threat detection", "Real-time alerts"],
      links: [{ label: "View Code", url: "https://github.com/khwahish895/vox-guard", icon: Github }, { label: "Try Demo", url: "https://voxguard-secure-voice-ai.netlify.app/", icon: Globe }],
      icon: Shield,
      tech: ["Python", "Security", "AI"],
      type: "Voice" as const,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop"
    }
  ]
};

// --- Components ---

export default function ProjectsSection() {
  const [track, setTrack] = useState<ExperienceTrack>("Professional");
  const [profCategory, setProfCategory] = useState<ProfCategory>("Presentation");
  const [acadCategory, setAcadCategory] = useState<AcadCategory>("Minor Project");
  const [activeFilter, setActiveFilter] = useState<TechFilter>("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isProfExpanded, setIsProfExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);
  const [otherTaskType, setOtherTaskType] = useState<"Big" | "Small">("Big");
  const [majorMinorType, setMajorMinorType] = useState<"Major" | "Minor">("Major");
  const [collegeFilter, setCollegeFilter] = useState<CollegeFilter>("All");
  const [experimentalFilter, setExperimentalFilter] = useState<ExperimentalFilter>("All");

  const filteredCards = useMemo(() => {
    if (track === "Professional") return professionalData[profCategory];

    let cards = academicData[acadCategory];

    // Filter by tech for Minor/Major
    if ((acadCategory === "Minor Project" || acadCategory === "Major Project") && activeFilter !== "All") {
      cards = cards.filter(c => c.tech?.includes(activeFilter));
    }

    // Filter by college language for College Project
    if (acadCategory === "College Project" && collegeFilter !== "All") {
      cards = cards.filter(c => c.tech?.includes(collegeFilter));
    }

    // Filter by tech for Experimental Project
    if (acadCategory === "Experimental Project" && experimentalFilter !== "All") {
      cards = cards.filter(c => c.tech?.includes(experimentalFilter));
    }

    // Filter by task type for Other Projects
    if (acadCategory === "Other Projects") {
      if (otherTaskType === "Big") {
        cards = cards.filter(c => c.type === majorMinorType);
      } else {
        cards = cards.filter(c => c.type === "Small");
      }
    }

    return cards;
  }, [track, profCategory, acadCategory, activeFilter, otherTaskType, majorMinorType, collegeFilter, experimentalFilter]);

  const displayCards = useMemo(() => {
    if (acadCategory === "Minor Project" || acadCategory === "Major Project" || acadCategory === "Experimental Project") {
      return filteredCards.slice(0, visibleCount);
    }
    return filteredCards;
  }, [filteredCards, visibleCount, acadCategory]);

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[#0f0518]">
      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row">

          {/* Left: Section Control */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {track === "Professional" ? "Industrial" : "My"} <span className="text-pink-400">{track === "Professional" ? "Training" : "Projects"}</span>
              </h2>
              <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
                {track === "Professional"
                  ? "Presentations and reports documenting technical growth and industrial expertise."
                  : "Comprehensive academic track covering major research and experimental projects."}
              </p>

              {/* Main Switcher */}
              <div className="mt-10 flex gap-4">
                <TrackButton
                  active={track === "Professional"}
                  onClick={() => { setTrack("Professional"); setVisibleCount(8); }}
                  label="Industrial Training"
                  color="purple"
                />
                <TrackButton
                  active={track === "Academic"}
                  onClick={() => { setTrack("Academic"); setVisibleCount(8); }}
                  label="Academic"
                  color="blue"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className={`absolute -left-20 -top-20 -z-0 h-64 w-64 rounded-full blur-[100px] ${track === "Professional" ? "bg-slate-500/20" : "bg-blue-600"}`}
            />
          </div>

          {/* Right: Interactive Content */}
          <div className="flex-1 min-h-[600px]">

            {track === "Professional" ? (
              <div className="space-y-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsProfExpanded(!isProfExpanded)}
                  className={`flex items-center gap-4 rounded-3xl ${isProfExpanded ? 'bg-pink-500/20' : 'bg-pink-500/10'} px-10 py-5 text-sm font-black text-white shadow-xl border border-pink-500/20 transition-all duration-300 hover:bg-pink-500/30`}
                >
                  <span className="uppercase tracking-widest">Training Assets</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isProfExpanded ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-wrap gap-3 p-4 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10"
                    >
                      {PROF_CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setProfCategory(cat); setIsProfExpanded(false); }}
                          className={`px-10 py-4 rounded-[2rem] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${profCategory === cat ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xl shadow-pink-500/20' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Academic Sub-nav */}
                <div className="flex flex-wrap gap-2.5 p-4 rounded-[3rem] bg-white/5 border border-white/10">
                  {ACAD_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setAcadCategory(cat); setVisibleCount(8); setActiveFilter("All"); }}
                      className={`px-6 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${acadCategory === cat ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-white hover:bg-white/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Special Filters */}
                {(acadCategory === "Minor Project" || acadCategory === "Major Project") && (
                  <div className="flex flex-wrap gap-2.5 p-4 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-xl">
                    <div className="flex items-center gap-3 px-3 mr-2 border-r border-white/10">
                      <Filter className="h-4 w-4 text-blue-400" />
                      <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-tighter">Filter by Tech</span>
                    </div>
                    {TECH_FILTERS.map(f => (
                      <button
                        key={f}
                        onClick={() => { setActiveFilter(f); setVisibleCount(8); }}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all ${activeFilter === f ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-blue-400 hover:bg-blue-500/5'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}

                {acadCategory === "Other Projects" && (
                  <div className="flex flex-col gap-3">
                    {/* Big/Small Tasks Buttons */}
                    <div className="flex gap-5">
                      {(["Big", "Small"] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => { setOtherTaskType(type); setMajorMinorType("Major"); }}
                          className={`flex-1 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all duration-500 border ${otherTaskType === type ? "bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-2xl shadow-blue-600/30 border-white/20" : "bg-white/5 text-slate-500 border-transparent hover:bg-white/10"}`}
                        >
                          {type} Tasks
                        </button>
                      ))}
                    </div>
                    {/* Major/Minor Sub-Buttons (only visible when Big is selected) */}
                    {otherTaskType === "Big" && (
                      <div className="flex gap-3">
                        {(["Major", "Minor"] as const).map(type => (
                          <button
                            key={type}
                            onClick={() => setMajorMinorType(type)}
                            className={`flex-1 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 border ${majorMinorType === type ? "bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg shadow-purple-500/30 border-white/20" : "bg-white/5 text-slate-500 border-transparent hover:bg-white/10"}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* College Project Filters */}
                {acadCategory === "College Project" && (
                  <div className="flex flex-wrap gap-3 p-4 rounded-[3rem] bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10 backdrop-blur-xl">
                    {COLLEGE_FILTERS.map(f => (
                      <button
                        key={f}
                        onClick={() => setCollegeFilter(f)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${collegeFilter === f ? 'bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-400 hover:text-emerald-400 hover:bg-white/10 border border-white/5'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}

                {/* Experimental Project Filters */}
                {acadCategory === "Experimental Project" && (
                  <div className="flex flex-wrap gap-3 p-4 rounded-[3rem] bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 backdrop-blur-xl">
                    {EXPERIMENTAL_FILTERS.map(f => (
                      <button
                        key={f}
                        onClick={() => setExperimentalFilter(f)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${experimentalFilter === f ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white/5 text-slate-400 hover:text-purple-400 hover:bg-white/10 border border-white/5'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Grid */}
            {acadCategory === "Voice Assistant" ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
                }}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {displayCards.map((p: ProjectCardData, i: number) => (
                  <VoiceProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                ))}
              </motion.div>
            ) : acadCategory === "Minor Project" ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
                }}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {displayCards.map((p: ProjectCardData, i: number) => (
                  p.type === "MinorAndroidApp" ? (
                    <AndroidAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorFlutterApp" ? (
                    <FlutterAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorML" ? (
                    <MLProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorPython" ? (
                    <PythonProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorAI" ? (
                    <AIProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorGaming" ? (
                    <GamingProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : (
                    <WebAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  )
                ))}
              </motion.div>
            ) : acadCategory === "Major Project" ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
                }}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {displayCards.map((p: ProjectCardData, i: number) => (
                  p.type === "MinorGaming" ? (
                    <GamingProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorAI" ? (
                    <AIProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorPython" ? (
                    <PythonProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorML" ? (
                    <MLProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorFlutterApp" ? (
                    <FlutterAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : p.type === "MinorAndroidApp" ? (
                    <AndroidAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : (
                    <GamingProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  )
                ))}
              </motion.div>
            ) : acadCategory === "Startup Project" ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2"
              >
                {displayCards.map((p: ProjectCardData, i: number) => (
                  <StartupProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                ))}
              </motion.div>
            ) : acadCategory === "Experimental Project" ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                animate="visible"
                className={`mt-8 grid gap-6 md:grid-cols-2 ${experimentalFilter === "Python" ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-2"}`}
              >
                {displayCards.map((p: ProjectCardData, i: number) => (
                  experimentalFilter === "Python" || p.tech?.includes("Python") ? (
                    <PythonExperimentCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  ) : (
                    <WebAppProjectCard key={p.title} project={p} index={i} onPreview={() => setSelectedProject(p)} />
                  )
                ))}
              </motion.div>
            ) : acadCategory === "Other Projects" && otherTaskType === "Big" && majorMinorType === "Minor" ? (
              <MinorProjectsSection />
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
                <AnimatePresence mode="wait">
                  {displayCards.map((p: ProjectCardData, i: number) => (
                    <ProjectCard
                      key={`${acadCategory}-${i}`}
                      project={p}
                      index={i}
                      track={track}
                      onPreview={() => setSelectedProject(p)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* See More */}
            {(acadCategory === "Minor Project" || acadCategory === "Major Project" || acadCategory === "Experimental Project") && visibleCount < filteredCards.length && (
              <div className="mt-20 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="group relative flex items-center gap-4 rounded-3xl bg-white/5 px-12 py-5 text-sm font-black text-slate-400 transition-all hover:text-white border border-white/10"
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <MoreHorizontal className="h-5 w-5 group-hover:animate-pulse" />
                  <span className="uppercase tracking-[0.2em]">Load More Masterpieces</span>
                  <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-1/2 transition-all duration-500" />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section >
  );
}

const idx = (i: number) => i;

// --- Sub Components ---

function TrackButton({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: "purple" | "blue" }) {
  const activeStyles = color === "purple"
    ? "bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/30"
    : "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.5)]";

  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden group ${active ? `${activeStyles} text-white` : "bg-white/5 text-slate-500 hover:bg-white/10"}`}
    >
      <span className="relative z-10">{label}</span>
      {active && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-colors"
        />
      )}
    </button>
  );
}

function ProjectCard({ project, index, track, onPreview }: { project: ProjectCardData; index: number; track: ExperienceTrack; onPreview: () => void; key?: string | number }) {
  const isAcademic = track === "Academic";
  const accentColor = isAcademic ? "blue" : "slate";
  const gradient = isAcademic
    ? "from-blue-600/20 via-cyan-500/10 to-transparent"
    : "from-white/10 via-slate-400/5 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: (index % 8) * 0.05
      }}
      whileHover={{ y: -15, scale: 1.03 }}
      className={`group relative flex flex-col h-full rounded-[4rem] border border-white/30 bg-white/10 p-10 backdrop-blur-[60px] transition-all duration-500 hover:border-${accentColor}-400/80 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] hover:shadow-${accentColor}-500/20`}
    >
      {/* Project Image - Shows on hover */}
      {project.image && (
<div className="absolute inset-0 opacity-100 transition-opacity duration-500 rounded-[4rem] overflow-hidden z-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Ambient Background Glow */}
      <div className={`absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-${accentColor}-500/10 blur-[100px] group-hover:bg-${accentColor}-400/30 transition-all duration-700`} />

      {/* Unique Category Glow Link */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

      {/* Side Pulse for Voice */}
      {project.type === "Voice" && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm" />
      )}

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] ${isAcademic ? 'bg-gradient-to-br from-blue-500 to-cyan-400' : 'bg-white/10 border border-white/20'} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <project.icon className="h-7 w-7" />
        </div>
        {project.type === "Voice" && (
          <div className="flex gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">AI Ready</span>
          </div>
        )}
      </div>

      <h4 className="text-2xl font-black text-white mb-3 group-hover:translate-x-1 transition-transform duration-500 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400/90 mb-8 line-clamp-3 font-medium leading-relaxed group-hover:text-slate-200 transition-colors relative z-10">
        {project.description}
      </p>

      <div className="mt-auto space-y-6 relative z-10">
        <div className="flex flex-wrap gap-2.5">
          {project.tech?.map(t => (
            <span key={t} className="text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10 group-hover:border-white/30 group-hover:text-white transition-colors">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {project.links.map((l, i) => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (l.label === "Preview" || l.label === "Try Demo" || l.label === "More Details") {
                  onPreview();
                } else if (l.url && l.url !== "#") {
                  window.open(l.url, "_blank");
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black tracking-tight transition-all shadow-lg ${l.label === "Preview" || l.label === "Try Demo" || l.label === "More Details" || l.label === "Live Demo" || l.label === "View Project" || l.label === "View Report" || l.label === "View Presentation"
                ? (isAcademic ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-600/20 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-500/20')
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
            >
              <l.icon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{l.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const startupCardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 20 }
  }
};

const STARTUP_ACCENT: Record<string, { gradient: string; glow: string; badge: string }> = {
  "SheCook": { gradient: "from-rose-500 to-pink-400", glow: "rgba(244,63,94,0.15)", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  "Sanjeevani – Rural Med": { gradient: "from-emerald-500 to-cyan-400", glow: "rgba(16,185,129,0.15)", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

function StartupProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const accent = STARTUP_ACCENT[project.title] ?? { gradient: "from-blue-500 to-cyan-400", glow: "rgba(37,99,235,0.15)", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
  const isDisabled = (url?: string) => !url || url === "#";

  return (
    <motion.div
      variants={startupCardVariants}
      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeInOut" } }}
      className="group relative"
    >
      <div
        className="relative h-full flex flex-col bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[20px] p-8 overflow-hidden transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/20"
        style={{ boxShadow: `0 0 0 0 ${accent.glow}` }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 50px -15px rgba(0,0,0,0.6), 0 0 30px ${accent.glow}`)}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
      >
        {/* Neon border on hover */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent`} />
        </div>

        {/* Ambient glow blob */}
        <div className={`absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br ${accent.gradient} opacity-[0.05] group-hover:opacity-[0.1] rounded-full blur-3xl transition-opacity duration-500`} />

        {/* Project Image - Background visible with fade effect */}
        {project.image && (
          <div className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] overflow-hidden z-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40" />
          </div>
        )}

        {/* Header row */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
            <project.icon className="h-6 w-6" />
          </div>
          {/* Stage badge */}
          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${accent.badge}`}>
            {project.stage ?? "Concept Stage"}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xl font-black text-white mb-2 tracking-tight relative z-10 group-hover:opacity-80 transition-opacity duration-300">
          {project.title}
        </h4>

        {/* Vision description */}
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4 font-medium group-hover:text-slate-300 transition-colors duration-300 relative z-10 group-hover:opacity-80">
          {project.description}
        </p>

        {/* Impact tag */}
        {project.impact && (
          <div className="flex items-center gap-2 mb-5 relative z-10 group-hover:opacity-80 transition-opacity duration-300">
            <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accent.gradient}`} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{project.impact}</span>
          </div>
        )}

        {/* Planned features */}
        <div className="mb-7 space-y-2 relative z-10 group-hover:opacity-80 transition-opacity duration-300">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Planned Features</p>
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${accent.gradient} shrink-0`} />
              <span className="text-[12px] text-slate-400 font-medium">{h}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto flex flex-col gap-4 relative z-10">
          <div className="flex gap-3">
            {/* Primary: View Demo */}
            <motion.button
              whileHover={!isDisabled(project.demoUrl) ? { scale: 1.04 } : {}}
              whileTap={!isDisabled(project.demoUrl) ? { scale: 0.96 } : {}}
              disabled={isDisabled(project.demoUrl)}
              onClick={() => !isDisabled(project.demoUrl) && window.open(project.demoUrl, "_blank")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[11px] font-black tracking-wide transition-all duration-300 ${isDisabled(project.demoUrl)
                ? "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed opacity-50"
                : `bg-gradient-to-r ${accent.gradient} text-white shadow-lg group-hover:shadow-xl`
                }`}
            >
              <Globe className="h-3.5 w-3.5" />
              View Demo
            </motion.button>

            {/* Secondary: View Code */}
            <motion.button
              whileHover={!isDisabled(project.codeUrl) ? { scale: 1.04 } : {}}
              whileTap={!isDisabled(project.codeUrl) ? { scale: 0.96 } : {}}
              disabled={isDisabled(project.codeUrl)}
              onClick={() => !isDisabled(project.codeUrl) && window.open(project.codeUrl, "_blank")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[11px] font-black tracking-wide border transition-all duration-300 ${isDisabled(project.codeUrl)
                ? "border-white/8 text-slate-600 bg-transparent cursor-not-allowed opacity-50"
                : "border-white/20 text-slate-300 hover:border-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              <Github className="h-3.5 w-3.5" />
              View Code
            </motion.button>
          </div>

          {/* View Idea Button */}
          <motion.button
            whileHover={!isDisabled(project.presentationUrl) ? { scale: 1.04 } : {}}
            whileTap={!isDisabled(project.presentationUrl) ? { scale: 0.96 } : {}}
            disabled={isDisabled(project.presentationUrl)}
            onClick={() => !isDisabled(project.presentationUrl) && window.open(project.presentationUrl, "_blank")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[11px] font-black tracking-wide border transition-all duration-300 ${isDisabled(project.presentationUrl)
              ? "border-white/8 text-slate-600 bg-transparent cursor-not-allowed opacity-50"
              : "border-cyan-500/30 text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/50"
              }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            View Idea
          </motion.button>

          {/* Revealed View Details */}
          <button
            onClick={onPreview}
            className="flex items-center self-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 cursor-pointer py-1"
          >
            View Details <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const voiceCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const VOICE_ACCENT: Record<string, string> = {
  "Jarvis AI": "from-blue-500 to-cyan-400",
  "J.A.R.V.I.S": "from-purple-600 to-blue-500",
  "AI Assistant": "from-blue-600 to-indigo-500",
  "Nova": "from-cyan-500 to-blue-400",
  "Vox Guard": "from-indigo-600 to-purple-600",
};

function VoiceProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const gradient = VOICE_ACCENT[project.title] ?? "from-blue-600 to-cyan-400";

  return (
    <motion.div
      variants={voiceCardVariants}
      whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3, ease: "easeInOut" } }}
      className="group relative"
    >
      {/* Card shell */}
      <div className="relative h-full flex flex-col bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[20px] p-7 overflow-hidden transition-all duration-300 group-hover:bg-white/[0.07] group-hover:border-blue-500/30 group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6),0_0_24px_rgba(37,99,235,0.12)]">

        {/* Neon top/bottom edge on hover */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>

        {/* Project Image - Shows on hover */}
        {project.image && (
<div className="absolute inset-0 opacity-100 transition-opacity duration-500 rounded-[20px] overflow-hidden z-0">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
          </div>
        )}

        {/* Ambient corner glow */}
        <div className={`absolute -right-6 -bottom-6 w-28 h-28 bg-gradient-to-br ${gradient} opacity-[0.04] group-hover:opacity-[0.12] rounded-full blur-2xl transition-opacity duration-500`} />

        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <project.icon className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">AI Ready</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-black text-white mb-2 tracking-tight font-sans group-hover:translate-x-0.5 transition-transform duration-300">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-[13px] text-slate-400 leading-relaxed mb-5 font-medium group-hover:text-slate-300 transition-colors duration-300">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech?.map(t => (
            <span key={t} className="text-[9px] font-bold text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 group-hover:border-blue-500/20 group-hover:text-slate-400 transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* Links + View Details */}
        <div className="mt-auto space-y-3">
          <div className="flex gap-2">
            {project.links.map(l => (
              <motion.button
                key={l.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight transition-all shadow-lg ${l.label === "Try Demo"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-blue-600/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
              >
                <l.icon className="h-3.5 w-3.5 shrink-0" />
                <span>{l.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Revealed View Details */}
          <button
            onClick={onPreview}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-400/80 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            View Details <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const webAppCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function WebAppProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  return (
    <motion.div
      variants={webAppCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[18px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-blue-500/30 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.2)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]" />

      {/* Project Image - Shows on hover */}
{project.image && (
        <div className="absolute inset-0 opacity-100 transition-opacity duration-500 rounded-[18px] overflow-hidden z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <project.icon className="h-6 w-6" />
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2 group-hover:text-slate-300">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className="text-[10px] font-semibold text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 group-hover:bg-white/10">
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "Live Demo"
                ? "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] text-white"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

const androidAppCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function AndroidAppProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  return (
    <motion.div
      variants={androidAppCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[20px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]" />

      {/* Project Image Background */}
      {project.image && (
        <div className="absolute inset-0 z-0 rounded-[20px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <project.icon className="h-6 w-6" />
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "Android App" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "Live Demo"
                ? "bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] text-white"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

const flutterAppCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function FlutterAppProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  return (
    <motion.div
      variants={flutterAppCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[20px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-sky-500/30 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.2)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]" />

      {/* Project Image Background */}
      {project.image && (
        <div className="absolute inset-0 z-0 rounded-[20px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon and Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-sky-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <project.icon className="h-6 w-6" />
        </div>

        {project.stage && (
          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${project.stage === 'Completed' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
            {project.stage}
          </span>
        )}
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "Flutter" ? "bg-sky-500/10 text-sky-400 border-sky-500/20" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "View Demo"
                ? "bg-sky-600 hover:bg-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] text-white"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// Machine Learning Project Card Component - Purple/Blue ML-themed design
const mlCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const ML_ACCENT: Record<string, string> = {
  // New ML Projects
  "AI Interview Emotion Analyzer": "from-orange-500 to-red-500",
  "Book Recommender System": "from-pink-500 to-rose-500",
  "Gaurdio": "from-green-500 to-emerald-500",
  "PredictSalesAI": "from-blue-500 to-cyan-500",
  "Text Emotion Analyzer": "from-purple-500 to-pink-500",
  // Existing Projects
  "Customer Churn Prediction": "from-violet-600 to-purple-500",
  "Email Spam Detector": "from-blue-600 to-indigo-500",
  "Fake News Detection": "from-purple-600 to-pink-500",
  "House Price Prediction": "from-cyan-500 to-blue-500",
  "Loan Eligibility Prediction": "from-emerald-500 to-teal-400",
};

function MLProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const gradient = ML_ACCENT[project.title] ?? "from-violet-600 to-purple-500";

  return (
    <motion.div
      variants={mlCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[18px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.25)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]" />

      {/* Ambient glow effect */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.06] group-hover:opacity-[0.15] rounded-full blur-3xl transition-opacity duration-500`} />

      {/* Project Image Background */}
      {project.image && (
        <div className="absolute inset-0 z-0 rounded-[18px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon and ML Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-purple-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <project.icon className="h-6 w-6" />
        </div>

        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20">
          ML Project
        </span>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "Machine Learning" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "Live Demo"
                ? `bg-gradient-to-r ${gradient} hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white`
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// AI Project Card Component - Red/Orange AI-themed design
const aiCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const AI_ACCENT: Record<string, string> = {
  "Digitalens AI": "from-red-500 to-orange-500",
  "LensLingo AI": "from-orange-500 to-yellow-500",
  "Lumina AI Chat": "from-pink-500 to-red-500",
  "VisionFace AI": "from-purple-500 to-pink-500",
  "VoxScript AI": "from-cyan-500 to-blue-500",
};

function AIProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const gradient = AI_ACCENT[project.title] ?? "from-red-500 to-orange-500";

  return (
    <motion.div
      variants={aiCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[18px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-red-500/30 hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.25)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]" />

      {/* Ambient glow effect */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.06] group-hover:opacity-[0.15] rounded-full blur-3xl transition-opacity duration-500`} />

      {/* Project Image Background */}
      {project.image && (
        <div className="absolute inset-0 z-0 rounded-[18px] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon and AI Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-red-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <project.icon className="h-6 w-6" />
        </div>

        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
          AI Project
        </span>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "AI" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "Live Demo"
                ? `bg-gradient-to-r ${gradient} hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white`
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function Waveform() {
  return (
    <div className="flex items-end gap-1.5 h-full w-full justify-center px-8">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: ["10%", "50%", "10%"] }}
          transition={{
            duration: 0.8 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1.5 bg-gradient-to-t from-blue-600/40 to-cyan-400/40 rounded-full"
        />
      ))}
    </div>
  );
}

// Python Project Card Component - Yellow/Orange Python-themed design
const pythonCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

// Python Experiment Card Component - Custom styling for Experimental → Python projects
const pythonExperimentVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15,
      staggerChildren: 0.08
    }
  }
};

function PythonExperimentCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  return (
    <motion.div
      variants={pythonExperimentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-[18px] p-5 overflow-hidden transition-all duration-300 hover:bg-slate-800/90 hover:border-purple-500/40 hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.25)] font-sans cursor-pointer"
      onClick={onPreview}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[18px]" />
      
      {/* Ambient glow effect */}
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-full blur-3xl transition-all duration-500" />

      {/* Project Image - Shows on hover */}
      {project.image && (
        <div className="absolute inset-0 opacity-100 transition-opacity duration-500 rounded-[18px] overflow-hidden z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon, Experiment Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all duration-300 shadow-lg">
          <project.icon className="h-5 w-5" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
          Experiment
        </span>
      </div>

      <h4 className="text-lg font-bold text-white mb-2 relative z-10 group-hover:text-purple-100 transition-colors">
        {project.title}
      </h4>

      <p className="text-xs text-slate-400 leading-relaxed mb-4 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:bg-purple-500/20 group-hover:text-purple-200 group-hover:border-purple-500/30 transition-all">
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 mt-auto">
        <div className="flex gap-2">
          {project.links.filter(l => l.label === "View Demo" || l.label === "View Code").map((l, idx) => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); l.url && l.url !== "#" && window.open(l.url, "_blank"); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold tracking-wide transition-all duration-300 ${idx === 0 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white" 
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              <l.icon className="h-3.5 w-3.5 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details link */}
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer w-full mt-3 group/btn"
        >
          View Details 
          <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

const PYTHON_ACCENT: Record<string, string> = {
  // New Python Projects
  "Excel Automation Tool": "from-green-500 to-emerald-400",
  "Fraud Detection System": "from-red-500 to-orange-500",
  "Multiple Disease Prediction": "from-blue-500 to-cyan-500",
  "Nova": "from-purple-500 to-pink-500",
  "Resume Screening System": "from-indigo-500 to-purple-500",
  // Existing Projects
  "Credit Card Fraud Detection": "from-yellow-500 to-amber-400",
  "Diabetes Prediction System": "from-orange-500 to-red-400",
  "File Organizer": "from-green-500 to-emerald-400",
  "Movie Recommendation System": "from-pink-500 to-rose-400",
  "Student Performance Predictor": "from-blue-500 to-cyan-400",
};

function PythonProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const gradient = PYTHON_ACCENT[project.title] ?? "from-yellow-500 to-amber-400";

  return (
    <motion.div
      variants={pythonCardVariants}
      whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[18px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-yellow-500/30 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.2)] font-sans"
    >
      {/* Soft gradient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]" />

      {/* Ambient glow effect - terminal style */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.06] group-hover:opacity-[0.15] rounded-full blur-3xl transition-opacity duration-500`} />

      {/* Project Image - Shows on hover */}
      {project.image && (
        <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px] overflow-hidden z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon and Python Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-yellow-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <Code className="h-6 w-6" />
        </div>

        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
          Python
        </span>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "Python" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "View Demo"
                ? `bg-gradient-to-r ${gradient} hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] text-white`
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// Gaming Project Card Component - Futuristic neon gaming style
const gamingCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

const GAMING_ACCENT: Record<string, string> = {
  // Gaming Projects
  "AetheFit": "from-orange-500 to-red-500",
  "Chronicles of Aetheria": "from-purple-500 to-indigo-500",
  "Chronos Weaver": "from-cyan-500 to-blue-500",
  "Nebula Arcade": "from-pink-500 via-purple-500 to-cyan-500",
  "Neuro Adjust": "from-green-500 to-emerald-400",
  // AI Projects
  "Finevise AI": "from-blue-500 to-cyan-500",
  "IntelliTraffix": "from-yellow-500 to-orange-500",
  "Nova – AI Voice Assistant": "from-purple-500 to-pink-500",
  "Rec AI": "from-indigo-500 to-purple-500",
  "SmartAttend AI": "from-cyan-500 to-blue-500",
  // Legacy
  "Gemini Sonic Voice": "from-cyan-500 to-blue-500",
  "Gemini Voice Quest": "from-purple-500 to-pink-500",
  "Neon Runner": "from-pink-500 via-purple-500 to-cyan-500",
  "QuizBlitz Battle Arena": "from-yellow-500 to-orange-500",
  "ReflexPro AI": "from-green-500 to-emerald-400",
};

function GamingProjectCard({ project, index, onPreview }: { project: ProjectCardData; index: number; onPreview: () => void; key?: string | number }) {
  const gradient = GAMING_ACCENT[project.title] ?? "from-cyan-500 to-purple-500";

  return (
    <motion.div
      variants={gamingCardVariants}
      whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.3 } }}
      className="group relative flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[18px] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan-500/40 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)] font-sans"
    >
      {/* Animated grid background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Neon glow effect */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.08] group-hover:opacity-[0.2] rounded-full blur-3xl transition-opacity duration-500`} />

      {/* Project Image - Shows on hover */}
      {project.image && (
        <div className="absolute inset-0 opacity-100 transition-opacity duration-500 rounded-[18px] overflow-hidden z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>
      )}

      {/* Header with Icon and Gaming Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner shadow-cyan-500/20">
          <Gamepad2 className="h-6 w-6" />
        </div>

        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse">
          Gaming
        </span>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-cyan-100 transition-colors">
        {project.title}
      </h4>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10 line-clamp-2 group-hover:text-slate-300 transition-colors">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6 mt-auto relative z-10">
        {project.tech?.map((t, idx) => (
          <span key={idx} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${t === "Gaming" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-slate-300 border-white/10"}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons container with slide-up effect */}
      {/* Buttons container */}
      <div className="relative z-10 overflow-hidden mt-2">
        <div className="flex gap-3 mb-3">
          {project.links.map(l => (
            <motion.button
              key={l.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => l.url && l.url !== "#" && window.open(l.url, "_blank")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 ${l.label === "View Demo"
                ? `bg-gradient-to-r ${gradient} hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] text-white`
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-cyan-500/30"
                }`}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* View Details */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer w-full mt-2"
        >
          View Details <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectCardData; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-[#0f0a1f]/80 border border-white/10 w-full max-w-3xl rounded-[3rem] p-10 overflow-hidden relative shadow-[0_0_100px_rgba(37,99,235,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative background glow */}
        <div className="absolute -right-40 -top-40 h-96 w-96 bg-blue-600/10 blur-[120px]" />

        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full border border-white/10">
          <X className="h-6 w-6" />
        </button>

        <div className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white mb-8 shadow-2xl shadow-blue-600/20`}>
          <project.icon className="h-10 w-10" />
        </div>

        <h3 className="text-4xl font-black text-white mb-6 tracking-tight">{project.title}</h3>
        <p className="text-lg text-slate-400 leading-relaxed mb-10 font-medium">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
            <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Core Implementation</h5>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
            <h5 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">Tech Stack</h5>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl font-black text-white shadow-2xl shadow-blue-600/30">
            Launch Project Demo
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-5 bg-white/5 rounded-3xl font-black text-slate-200 border border-white/10 hover:bg-white/10 transition-colors">
            Inspect Source
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

