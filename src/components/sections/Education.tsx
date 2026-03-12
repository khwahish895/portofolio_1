import { motion } from "motion/react";
import { GraduationCap, School, BookOpen, Award, Calendar, Percent, BadgeCheck } from "lucide-react";

const EDUCATION_DATA = [
  {
    id: "btech",
    title: "B.Tech in Computer Science",
    institution: "JECRC FOUNDATION",
    year: "2023 – Present",
    status: "Pursuing",
    type: "Undergraduate Program",
    icon: GraduationCap,
    highlight: true,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-200"
  },
  {
    id: "senior",
    title: "Senior Secondary (12th Grade)",
    institution: "RBSE",
    year: "2023",
    score: "65.20%",
    type: "Senior Secondary",
    icon: School,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-200"
  },
  {
    id: "secondary",
    title: "Secondary (10th Grade)",
    institution: "RBSE",
    year: "2021",
    score: "93%",
    type: "Secondary School",
    icon: BookOpen,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-200"
  }
];

const EXAMS_DATA = [
  {
    name: "GATE",
    status: "Preparing",
    tag: "Currently Preparing",
    active: true
  },
  {
    name: "JEE Main",
    status: "Appeared",
    active: false
  },
  {
    name: "JEE Advanced",
    status: "Appeared",
    active: false
  }
];

const TimelineCard = ({ data, index }: any) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex w-full items-center justify-between ${isEven ? "flex-row-reverse" : "flex-row"
        } mb-8 last:mb-0`}
    >
      {/* Spacer for opposite side */}
      <div className="hidden w-5/12 lg:block" />

      {/* Timeline Dot */}
      <div className={`absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow-md lg:left-1/2 ${data.bg.replace('bg-', 'from-').replace('50', '400')} bg-gradient-to-br to-white`}>
        {data.highlight && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${data.bg.replace('50', '400')}`}></span>
        )}
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`relative ml-12 w-full rounded-2xl border bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 lg:ml-0 lg:w-5/12 ${data.highlight ? "border-pink-300 ring-2 ring-pink-100" : "border-slate-100"
          }`}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className={`rounded-xl p-3 ${data.bg} ${data.color}`}>
            <data.icon className="h-6 w-6" />
          </div>
          {data.highlight && (
            <span className="flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
              </span>
              Currently Studying
            </span>
          )}
        </div>

        <motion.h3 className="mb-1 font-display text-xl font-bold text-slate-900"
            animate={{ y:[0,-3,0,3,0] }}
            transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
          >{data.title}</motion.h3>
        <motion.p className="mb-4 text-sm font-medium text-slate-500"
            animate={{ x:[0,2,-2,0] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
          >{data.institution}</motion.p>

        <div className="flex flex-wrap gap-2">
          <motion.span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 shadow-sm"
              animate={{ y:[0,-2,0,2,0], rotate:[-5,5,-5] }}
              transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              whileHover={{ scale:1.05, rotate:0, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}
            >
            <Calendar className="h-3.5 w-3.5" />
            {data.year}
          </motion.span>
          {data.status && (
            <motion.span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 shadow-sm"
              animate={{ x:[0,2,-2,0], rotate:[-5,5,-5] }}
              transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              whileHover={{ scale:1.05, rotate:0, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              {data.status}
            </motion.span>
          )}
          {data.score && (
            <motion.span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 shadow-sm"
              animate={{ y:[0,-2,0,2,0], rotate:[-5,5,-5] }}
              transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
              whileHover={{ scale:1.05, rotate:0, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <Percent className="h-3.5 w-3.5" />
              {data.score}
            </motion.span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function EducationSection() {
  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Background Haze */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50/50 via-white to-teal-50/30" />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0, type: "spring", bounce: 0.2 }}
        className="mb-16 text-center"
      >
        <motion.h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl"
          animate={{ y:[0,-5,0,5,0], color: ['#1e293b','#ec4899','#1e293b'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          My <span className="text-pink-500">Education</span>
        </motion.h2>
        <motion.p className="text-lg text-slate-600"
          animate={{ x:[0,3,-3,0], y:[0,-3,0,3,0], color:['#475569','#ec4899','#475569'] }}
          transition={{ duration:6, repeat:Infinity, ease:'easeInOut', repeatType:'mirror' }}
        >
          Academic background & competitive preparation
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mx-auto max-w-5xl px-4"
      >
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-pink-300 via-purple-300 to-teal-300 lg:left-1/2" />

        {/* Education Cards */}
        <div className="space-y-8">
          {EDUCATION_DATA.map((item: any, index: number) => (
            <TimelineCard key={item.id} data={item} index={index} />
          ))}
        </div>

        {/* Competitive Exams Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-20 rounded-3xl border border-white/60 bg-white/60 p-8 shadow-lg backdrop-blur-md lg:p-10"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
              <Award className="h-6 w-6" />
            </div>
            <motion.h3 className="font-display text-2xl font-bold text-slate-900"
              animate={{ y:[0,-3,0,3,0], color:['#1e293b','#8b5cf6','#1e293b'] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
            >
              Competitive Exams & Preparation
            </motion.h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {EXAMS_DATA.map((exam, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`group relative flex items-center gap-3 rounded-full border px-6 py-3 transition-all duration-300 ${exam.active
                  ? "border-violet-200 bg-violet-50 text-violet-700 shadow-md shadow-violet-500/10"
                  : "border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50/50"
                  }`}
              >
                <motion.span className="font-bold"
                  animate={{ x:[0,2,-2,0], color:['#000','#8b5cf6','#000'] }}
                  transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                >{exam.name}</motion.span>
                <motion.span className={`text-xs font-medium ${exam.active ? "text-violet-600" : "text-slate-400"}`}
                  animate={{ y:[0,-2,0,2,0] }}
                  transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                >
                  • {exam.status}
                </motion.span>

                {exam.active && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-500"></span>
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
