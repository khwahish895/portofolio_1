import { motion } from "motion/react";
import { Briefcase, Code, Smartphone, Brain, BarChart, Calendar } from "lucide-react";

const INTERNSHIPS = [
  {
    id: "web-dev",
    role: "Web Development Trainee",
    company: "CEG (Center for Emerging Technologies)",
    year: "2024",
    subtext: "2nd Semester",
    icon: Code,
    color: "text-blue-500",
    bg: "bg-blue-50",
    points: [
      "Gained hands-on experience in frontend web development",
      "Built responsive web pages using HTML, CSS, and JavaScript",
      "Learned basic project structure and best practices for clean UI"
    ]
  },
  {
    id: "android",
    role: "Android App Development Trainee",
    company: "Internshala Trainings",
    year: "2024",
    subtext: null,
    icon: Smartphone,
    color: "text-green-500",
    bg: "bg-green-50",
    points: [
      "Developed Android applications with focus on UI and functionality",
      "Worked with activities, layouts, and basic app architecture",
      "Strengthened understanding of mobile app development workflows"
    ]
  },
  {
    id: "gen-ai",
    role: "Generative AI & DevOps Trainee",
    company: "LinuxWorld Informatics Pvt. Ltd.",
    year: "2025",
    subtext: "Generative AIOps-106 | Multi-Technology Track",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-50",
    points: [
      "Explored Generative AI concepts and real-world use cases",
      "Hands-on exposure to multi-technology stacks and automation",
      "Learned how AI integrates with modern DevOps workflows"
    ]
  },
  {
    id: "data-story",
    role: "Data Storytelling with AI",
    company: "IIT Mandi",
    year: "2025",
    subtext: "Conducted at JECRC",
    icon: BarChart,
    color: "text-orange-500",
    bg: "bg-orange-50",
    points: [
      "Learned data storytelling principles using AI tools",
      "Focused on presenting data insights clearly and effectively",
      "Improved analytical thinking and communication through visuals"
    ]
  }
];

const TimelineItem = ({ data, index }: { data: typeof INTERNSHIPS[0]; index: number }) => {
  return (
    <div className="relative flex gap-8 pl-4 lg:pl-0">
      {/* Timeline Line & Dot (Desktop: Center, Mobile: Left) */}
      <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-pink-200 to-indigo-200 opacity-30 lg:left-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="absolute left-4 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm lg:left-1/2"
      >
        <div className={`flex h-full w-full items-center justify-center rounded-full ${data.bg} ${data.color}`}>
          <data.icon className="h-5 w-5" />
        </div>
      </motion.div>

      {/* Content Card */}
      <div className={`flex w-full flex-col lg:flex-row ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
        {/* Spacer for alternating layout */}
        <div className="hidden w-1/2 lg:block" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.02, rotateY: 180 }}
          animate={{ x:[0,5,-5,0], rotateY:[0,360] }}
          transition={{ x:{duration:12, repeat:Infinity, ease:'easeInOut'}, rotateY:{duration:20, repeat:Infinity, ease:'linear'} }}
          className={`relative ml-12 w-[calc(100%-3rem)] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-pink-100 hover:shadow-lg hover:shadow-pink-500/5 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
            index % 2 === 0 ? "lg:mr-10" : "lg:ml-10"
          }`}
        >
          <div className="mb-3">
            <motion.h3 className="font-display text-xl font-bold text-slate-900"
                animate={{ x:[0,5,-5,0] }}
                transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
              >{data.role}</motion.h3>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
              <motion.span className="flex items-center gap-1"
                  animate={{ y:[0,-3,0,3,0] }}
                  transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                >
                <Briefcase className="h-3.5 w-3.5" />
                {data.company}
              </motion.span>
              <span>•</span>
              <motion.span className="flex items-center gap-1 text-slate-400"
                  animate={{ x:[0,3,-3,0] }}
                  transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                >
                <Calendar className="h-3.5 w-3.5" />
                {data.year}
              </motion.span>
            </div>
            {data.subtext && (
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ y:[0,-2,0,2,0] }}
                transition={{ delay: 0.5 + (index * 0.1), duration:5, repeat:Infinity, ease:'easeInOut' }}
                className="mt-1 text-xs font-medium text-indigo-500"
              >
                {data.subtext}
              </motion.p>
            )}
          </div>

          <ul className="space-y-2">
            {data.points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y:[0,-2,0,2,0] }}
                transition={{ delay: 0.3 + (i * 0.1), duration:4, repeat:Infinity, ease:'easeInOut' }}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-300" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default function InternshipsSection() {
  return (
    <div className="w-full py-12">
      <motion.div
        initial={{ opacity: 0, y: -20, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0, type: "spring" }}
        style={{ perspective: 1200 }}
        className="mb-16 text-center"
      >
        <motion.h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl"
          animate={{ y:[0,-5,0,5,0], color:['#1e293b','#ec4899','#1e293b'] }}
          transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
        >
          My <span className="text-pink-500">Internships</span>
        </motion.h2>
        <motion.p className="text-lg text-slate-600"
          animate={{ y:[0,-3,0,3,0], color:['#475569','#ec4899','#475569'] }}
          transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
        >
          Professional experience & training
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mx-auto max-w-6xl px-4 space-y-12"
      >
        {INTERNSHIPS.map((item, index) => (
          <TimelineItem key={item.id} data={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
