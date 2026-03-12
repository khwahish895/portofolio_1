import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    GraduationCap,
    Trophy,
    BookOpen,
    ChevronDown,
    ChevronUp,
    TrendingUp,
    BarChart2,
    Calendar,
    Award,
    CheckCircle2,
    ExternalLink
} from "lucide-react";

interface ResultCardProps {
    title: string;
    subtitle?: string;
    value: string;
    year: string;
    subjects?: string[];
    isDetailed: boolean;
    delay?: number;
    key?: string | number;
    link?: string;
    links?: { label: string; url: string }[];
}

const SchoolCard = ({ title, subtitle, value, year, isDetailed, delay = 0, link }: ResultCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
    >
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between"
        >
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{subtitle}</p>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <div className="text-right">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{value}</span>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">{year}</p>
            </div>
        </motion.div>

        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            {isDetailed && (
                <p className="mb-3 text-xs text-slate-500 italic uppercase tracking-wider">Major focus: PCM with Computer Science</p>
            )}
            {link && (
                <motion.a
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                >
                    <ExternalLink className="h-3 w-3" />
                    View Result
                </motion.a>
            )}
        </div>
    </motion.div>
);

const SemesterCard = ({ title, value, year, subjects, isDetailed, delay = 0, link, links }: Omit<ResultCardProps, 'subtitle'>) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.3 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="group rounded-xl border border-slate-100 bg-white p-4 text-center transition-all hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40"
    >
        <motion.h5
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.1 }}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-500"
        >
            {title}
        </motion.h5>
        <div className="my-2">
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2 }}
                className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            >
                {value}
            </motion.span>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 }}
                className="text-[10px] text-slate-400"
            >
                {year}
            </motion.p>
        </div>

        <div className="mt-3 flex flex-col items-center gap-2 border-t border-slate-50 pt-3 dark:border-slate-800/50">
            {isDetailed && subjects && (
                <div className="mb-3 flex flex-wrap justify-center gap-1">
                    {subjects.slice(0, 3).map((s, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + (i * 0.1) }}
                            className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[8px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        >
                            {s}
                        </motion.span>
                    ))}
                </div>
            )}

            {link && !links && (
                <motion.a
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                >
                    <ExternalLink className="h-2.5 w-2.5" />
                    View
                </motion.a>
            )}

            {links && (
                <div className="flex flex-wrap justify-center gap-2">
                    {links.map((l, i) => (
                        <motion.a
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                        >
                            <ExternalLink className="h-2.5 w-2.5" />
                            {l.label}
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    </motion.div>
);

export default function AcademicResults() {
    const [isDetailed, setIsDetailed] = useState(false);
    const [openSections, setOpenSections] = useState({
        school: true,
        competitive: true,
        btech: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const schoolData = [
        { title: "Class 10", board: "RBSE Board", value: "93%", year: "2021", link: "https://drive.google.com/file/d/16Yi9bfwcXGO7Zvl2zmM-PiKoqR6omT4Y/view?usp=drive_link" },
        { title: "Class 12", board: "RBSE Board", value: "65.20%", year: "2023", link: "https://drive.google.com/file/d/1xoXHK2vdGKRkyVVpkdOf-yzBLQS3qHAE/view?usp=drive_link" }
    ];

    const competitiveData = [
        { name: "JEE Main SESSION 1", year: "2023", status: "Qualified", percentile: "60", link: "https://drive.google.com/file/d/1PZ6c_j-w6ApKFXGtMAMmta1S1Zy9Q41X/view?usp=drive_link" },
        { name: "JEE Main SESSION 2", year: "2023", status: "Appeared", percentile: "", link: "https://drive.google.com/file/d/1Z2AEAGsgTcoYnzLkXGkpPw-Ne7TVXJ4T/view?usp=drive_link" },
        { name: "JEE Advanced", year: "2023", status: "Appeared", percentile: "-", link: "https://drive.google.com/file/d/1Pg99PMliE64YR_9mvjZikaHo8i1kI1Jr/view?usp=drive_link" },
        { name: "GATE", year: "2026", status: "Preparing", percentile: "-" }
    ];

    const semesterData = [
        { sem: "Sem 1", sgpa: "8.63", year: "2023-24", subjects: ["C Programming", "Calculus", "Physics"], link: "https://drive.google.com/file/d/1_Qt0mG3FR9XLZJcEHLXpjxgyLXELp1I4/view?usp=drive_link" },
        {
            sem: "Sem 2",
            sgpa: "7.17",
            year: "2023-24",
            subjects: ["Data Structures", "Electronics", "Chemistry"],
            links: [
                { label: "View Result", url: "https://drive.google.com/file/d/14Zc1deL3th_OpNIYaxybih27SCnckL0q/view?usp=drive_link" },
                { label: "View Extra 1", url: "https://drive.google.com/file/d/1Ph0z5e61qHEoHmiGGPUg5LkaQ3yBUmqm/view?usp=drive_link" },
                { label: "View Extra 2", url: "" }
            ]
        },
        { sem: "Sem 3", sgpa: "7.61", year: "2024-25", subjects: ["Java", "Discrete Math", "Digital Logic"], link: "https://drive.google.com/file/d/1pDbKiaF2qWIFnWqkaWdAp_A_CKZdL1ap/view?usp=drive_link" },
        { sem: "Sem 4", sgpa: "8.28", year: "2024-25", subjects: ["OS", "Algorithms", "DBMS"], link: "https://drive.google.com/file/d/1RrDzT95S610csz7AqKOdfloh1yozogyx/view?usp=drive_link" },
        { sem: "Sem 5", sgpa: "-", year: "2025-26", subjects: ["Computer Networks", "TOC", "Web Tech"] },
        { sem: "Sem 6", sgpa: "-", year: "2025-26", subjects: ["Software Eng", "Compiler", "Cloud"] },
        { sem: "Sem 7", sgpa: "-", year: "2026-27", subjects: ["Machine Learning", "IoT", "Cyber Security"] },
        { sem: "Sem 8", sgpa: "-", year: "2026-27", subjects: ["Project", "Professional Ethics", "Elective"] }
    ];

    return (
        <section className="py-20 px-4">
            <div className="mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                    <div className="text-center md:text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl"
                        >
                            Academic <span className="text-indigo-600 dark:text-indigo-400">Results</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-2 text-slate-500 dark:text-slate-400"
                        >
                            Complete academic record across school, competitive exams, and university
                        </motion.p>
                    </div>
                    {/* Toggle Switch */}
                    <div className="flex items-center gap-3 rounded-full bg-slate-100 p-1 dark:bg-slate-800/50">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setIsDetailed(false)}
                            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${!isDetailed ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500"
                                }`}
                        >
                            <BarChart2 className="h-3.5 w-3.5" />
                            <motion.span>Summary</motion.span>
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setIsDetailed(true)}
                            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${isDetailed ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500"
                                }`}
                        >
                            <TrendingUp className="h-3.5 w-3.5" />
                            <motion.span>Detailed</motion.span>
                        </motion.button>
                    </div>
                </div>

                {/* Global Summary Stats (When Summary view or always) */}
                {!isDetailed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                        {[
                            { label: "Avg CGPA", value: "7.92", icon: CheckCircle2, color: "text-emerald-500" },
                            { label: "Best Semester", value: "Sem 1 (8.63)", icon: Award, color: "text-amber-500" },
                            { label: "Academic Trend", value: "Consistent Growth", icon: TrendingUp, color: "text-indigo-500" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/30"
                            >
                                <div className={`rounded-xl bg-slate-50 p-3 dark:bg-slate-800 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (i * 0.1) + 0.2 }}
                                        className="text-xs font-medium text-slate-400 uppercase tracking-wider"
                                    >
                                        {stat.label}
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (i * 0.1) + 0.3 }}
                                        className="text-lg font-bold text-slate-900 dark:text-white"
                                    >
                                        {stat.value}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Collapsible Groups */}
                <div className="space-y-8">

                    {/* 1. School Results */}
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20">
                        <button
                            onClick={() => toggleSection('school')}
                            className="flex w-full items-center justify-between p-6 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <motion.h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    School Results
                                </motion.h3>
                            </motion.div>
                            {openSections.school ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                        </button>
                        <AnimatePresence>
                            {openSections.school && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-8"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {schoolData.map((data, i) => (
                                            <SchoolCard
                                                key={i}
                                                title={data.title}
                                                subtitle={data.board}
                                                value={data.value}
                                                year={data.year}
                                                isDetailed={isDetailed}
                                                delay={i * 0.1}
                                                link={data.link}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 2. Competitive Exams */}
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20">
                        <button
                            onClick={() => toggleSection('competitive')}
                            className="flex w-full items-center justify-between p-6 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <motion.h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Competitive Exams
                                </motion.h3>
                            </motion.div>
                            {openSections.competitive ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                        </button>
                        <AnimatePresence>
                            {openSections.competitive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-8"
                                >
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        {competitiveData.map((exam, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                                            >
                                                <motion.h4
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: (i * 0.1) + 0.2 }}
                                                    className="font-bold text-slate-900 dark:text-white"
                                                >
                                                    {exam.name}
                                                </motion.h4>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        whileInView={{ opacity: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: (i * 0.1) + 0.3 }}
                                                        className="text-xs text-slate-400"
                                                    >
                                                        {exam.year}
                                                    </motion.span>
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: (i * 0.1) + 0.4 }}
                                                        className={`text-[10px] font-bold uppercase tracking-wider ${exam.status === 'Qualified' ? 'text-emerald-500' : 'text-indigo-500'
                                                            }`}
                                                    >
                                                        {exam.status}
                                                    </motion.span>
                                                </div>
                                                <div className="mt-4 border-t border-slate-50 pt-3 dark:border-slate-800/50">
                                                    {isDetailed && exam.percentile !== "-" && (
                                                        <div className="mb-3 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                            {exam.percentile} Percentile
                                                        </div>
                                                    )}
                                                    {exam.link ? (
                                                        <motion.a
                                                            href={exam.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            View Result
                                                        </motion.a>
                                                    ) : (
                                                        <motion.button
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            View Result
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. B.Tech Semester Results */}
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20">
                        <button
                            onClick={() => toggleSection('btech')}
                            className="flex w-full items-center justify-between p-6 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <motion.h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    B.Tech Results
                                </motion.h3>
                            </motion.div>
                            {openSections.btech ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                        </button>
                        <AnimatePresence>
                            {openSections.btech && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-8"
                                >
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        {semesterData.map((data, i) => (
                                            <SemesterCard
                                                key={i}
                                                title={data.sem}
                                                value={data.sgpa}
                                                year={data.year}
                                                subjects={data.subjects}
                                                isDetailed={isDetailed}
                                                delay={i * 0.05}
                                                link={data.link}
                                                links={data.links}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Why this matters? (Transparency/Consistency) */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-center text-slate-400">
                    {["Transparency", "Consistency", "Discipline", "Growth"].map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-medium uppercase tracking-widest">{val}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
