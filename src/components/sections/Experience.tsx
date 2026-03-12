import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Code2, Calendar, MapPin, Sparkles } from "lucide-react";

const FILTERS = [
  "All",
  "Work",
  "Internship",
];

const EXPERIENCE: any[] = [];

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredExperience = activeFilter === "All"
    ? EXPERIENCE
    : EXPERIENCE.filter(experience => experience.category.includes(activeFilter));

  return (
    <section className="relative z-10 w-full px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400"
          >
            My professional journey and work experience
          </motion.p>
        </div>

        {/* Filters */}
        {FILTERS.length > 1 && (
          <div className="mb-16 flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${activeFilter === filter
                  ? "text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-indigo-600 shadow-lg shadow-indigo-500/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Experience Grid */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperience.length > 0 ? (
              filteredExperience.map((experience) => (
                <motion.div
                  layout
                  key={experience.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02, rotate: -1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500/30 dark:hover:shadow-indigo-500/20"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    {/* Hover Bullet Box (Desktop) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <ul className="space-y-2 px-6 text-sm text-slate-300">
                        {experience.bullets.map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        {experience.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {experience.company}
                      </p>
                    </div>

                    {/* Date and Location */}
                    <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {experience.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experience.location}
                      </span>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {experience.problem}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {experience.tags.map((tag: string) => {
                        const tagColors: Record<string, string> = {
                          "React": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          "Next.js": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                          "Tailwind": "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
                          "Firebase": "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                          "Node.js": "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                          "TypeScript": "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
                          "JavaScript": "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                          "CSS": "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                        };
                        const colorClass = tagColors[tag] || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
                        return (
                          <span
                            key={tag}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* CTAs */}
                    <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={experience.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                      >
                        <Code2 className="h-4 w-4" />
                        <span>View Details</span>
                      </a>
                      <a
                        href={experience.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Learn More</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-slate-800/50 p-4">
                  <Sparkles className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-200">Experience Coming Soon</h3>
                <p className="mt-2 text-slate-400">I'm currently working on some exciting opportunities.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
