import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// --- Data ---

const CERTIFICATES = [
  // Initial certificates with URLs
  { title: "Web Development", url: "https://drive.google.com/file/d/19xG2fsxF23zxtAOiWUMHd4kPKB2PmVdO/view?usp=drive_link", image: "/certificates/web-development.jpg" },
  { title: "Android App Development", url: "https://drive.google.com/file/d/1O6uVXHJiLY2THxGProazFQzyVwSviRzP/view?usp=drive_link", image: "/certificates/android-app-development.jpg" },
  { title: "Generative AIOps-106 | Multi-Technology Track", url: "https://drive.google.com/file/d/10C4bsjdDBfgzMshAmFOiDee2h1pq6c0m/view?usp=drive_link", image: "/certificates/generative-aiops.jpg" },
  { title: "Artificial Intelligence", url: "https://drive.google.com/file/d/14VOCdQuucyZvcVNMU7TftHJzJ6ZW0Z79/view?usp=drive_link", image: "/certificates/artificial-intelligence.jpg" },
  { title: "Canva – 10 Design Milestone Badge", url: "https://drive.google.com/file/d/1czwWRIvliEUZT_f2ttNvrIJYpIvnGWT8/view?usp=drive_link", image: "/certificates/canva-design-badge.jpg" },
  { title: "Coding Ninjas", url: "https://drive.google.com/file/d/1rY0l8x-jqvSQn6bQXz2uh16pvT1Xqvzy/view?usp=drive_link", image: "/certificates/coding-ninjas.jpg" },
  { title: "Agile Project Management", url: "https://drive.google.com/file/d/1iblxFiJTbub5TDXQ_2P3JgOt4aiPKboh/view?usp=drive_link", image: "/certificates/agile-project-management.jpg" },
  { title: "Android App Development Training", url: "https://drive.google.com/file/d/1gq3jg-VRzFSRmm9jcZTZzfDtnoRW5O_Q/view?usp=drive_link", image: "/certificates/android-app-development-training.jpg" },
  { title: "Hardware Workshop", url: "https://drive.google.com/file/d/1WBd_JPTyBNCLS5D8yI3hnlBeUQR6OmOv/view?usp=drive_link", image: "/certificates/hardware-workshop.jpg" },
  { title: "DSA Course", url: "https://drive.google.com/file/d/1vUQYLyBnogtBP78wpHsWE8mPcIiCzsTS/view?usp=drive_link", image: "/certificates/dsa-course.jpg" },
  // Hidden certificates
  { title: "Effective Communication", url: "https://drive.google.com/file/d/1wwy74HYxfd7bqHfjSGcVr324QRvmoijJ/view?usp=drive_link", image: "/certificates/effective-communication.jpg" },
  { title: "Effective Presentation", url: "https://drive.google.com/file/d/1snoTlg76eECtejnDAIiiwLlqMcFC_Ayf/view?usp=drive_link", image: "/certificates/effective-presentation.jpg" },
  { title: "Effective Leadership", url: "https://drive.google.com/file/d/1HsJ_tXsEF7xLJjL5ZeDH8dVTdfJbpzK3/view?usp=drive_link", image: "/certificates/effective-leadership.jpg" },
  { title: "Excel Certification", url: "https://drive.google.com/file/d/1_mJpkGejHdM86iHmATEpK5aqsRJ0R31x/view?usp=drive_link", image: "/certificates/excel-certification.jpg" },
  { title: "HCL Gurvi", url: "https://drive.google.com/file/d/1IpmNkis4apHqCW2tftxoBF3cGOXD2fAs/view?usp=drive_link", image: "/certificates/hcl-gurvi.jpg" },
  { title: "Cloud Summit 2026", url: "https://drive.google.com/file/d/1TTyjTlCKBNt6auLj0iTi8g7SUy_zGVZZ/view?usp=drive_link", image: "/certificates/cloud-summit-2026.jpg" },
  { title: "AI Prompt Engineering", url: "https://drive.google.com/file/d/1tSDP0IyOeT38qbzesN7wl7_QIMakUA2p/view?usp=drive_link", image: "/certificates/ai-prompt-engineering.jpg" },
  { title: "Java", url: "https://drive.google.com/file/d/17wsoSgMIUsrRp3RLpfyFFCGT-OBz-B7q/view?usp=drive_link", image: "/certificates/java.jpg" },
  { title: "Python", url: "https://drive.google.com/file/d/13mjqaUxEdCiJqQwp_1SsJACdq_5yHPlS/view?usp=drive_link", image: "/certificates/python.jpg" },
  { title: "AWS", url: "https://drive.google.com/file/d/19DQmKwjKb9IofBCZuMz2tZMUqoCpMygF/view?usp=drive_link", image: "/certificates/aws.jpg" },
  { title: "Jazebaa", url: "https://drive.google.com/file/d/10ixBRsxzanGUzoIF3uggsksKmFzYsFwL/view?usp=drive_link", image: "/certificates/jazebaa.jpg" },
  { title: "Logical Reasoning", url: "https://drive.google.com/file/d/19DQmKwjKb9IofBCZuMz2tZMUqoCpMygF/view?usp=drive_link", image: "/certificates/logical-reasoning.jpg" },
  { title: "Narcotics", url: "https://drive.google.com/file/d/1lD46Ca7UmiHJDG6pKbBvct4YS-bZJ-WZ/view?usp=drive_link", image: "/certificates/narcotics.jpg" },
  { title: "LinuxWorld Informatics Pvt. Ltd. Offer Letter", url: "https://drive.google.com/file/d/1gRkagfzh_L6lM8muFSmS3s50uvmnMfsJ/view?usp=drive_link", image: "/certificates/linuxworld-offer-letter.jpg" },
  { title: "Mathematics Quiz", url: "https://drive.google.com/file/d/1tF2CV6bo0WvAKFLNHwsb394Wt_u22SpL/view?usp=drive_link", image: "/certificates/mathematics-quiz.jpg" },
  { title: "Machine Learning", url: "https://drive.google.com/file/d/1tXAGj79HAvp9Cm2b2xAjoU2LsZ_6OaBX/view?usp=drive_link", image: "/certificates/machine-learning.jpg" },
  { title: "TCS", url: "https://drive.google.com/file/d/1_4cqTdE2KuD9xf0l0sw3vjqxnd5Zd01S/view?usp=drive_link", image: "/certificates/tcs.jpg" },
  { title: "SQL", url: "https://drive.google.com/file/d/10bW1vNCft71mqjchCndnckVojTRZotNc/view?usp=drive_link", image: "/certificates/sql.jpg" },
  { title: "AI Storytelling", url: "https://drive.google.com/file/d/1J9r8tz2DqhcfbM6apgN6oWFOcE0kfq_2/view?usp=drive_link", image: "/certificates/ai-storytelling.jpg" },
  { title: "Resume Writing and Job Interview", url: "https://drive.google.com/file/d/1mluCmRvPPUvTwH2D342KrUGCSY4c0me1/view?usp=drive_link", image: "/certificates/resume-writing-job-interview.jpg" },
  { title: "Psychology", url: "https://drive.google.com/file/d/1A6MVP-kZWF98BI7bflESeL7wr2Yaqf_e/view?usp=drive_link", image: "/certificates/psychology.jpg" },
  { title: "DSA", url: "https://drive.google.com/file/d/10T7SExKzwpH5NMBYjf2SgpXmH3fgAAP5/view?usp=drive_link", image: "/certificates/dsa.jpg" },
  { title: "SIH", url: "https://drive.google.com/file/d/1h66OXdHyGFAgCMhNgGEhVxfZxn6kLd4-/view?usp=drive_link", image: "/certificates/sih.jpg" },
  { title: "INTL. Talent Search Examination", url: "https://drive.google.com/file/d/1iuKBVCjdS7fDGXzotxOyqUZsTN8Xcj2A/view?usp=drive_link", image: "/certificates/intl-talent-search.jpg" },
  { title: "Workshop on Gen AI", url: "https://drive.google.com/file/d/1csicbec0csjlr2MHz3Sju3v4pgALssO2/view?usp=drive_link", image: "/certificates/workshop-gen-ai.jpg" },
  { title: "Startup Charades", url: "https://drive.google.com/file/d/1F2SJCI4wOl9zHuufod-0P5WBUfiTR90g/view?usp=drive_link", image: "/certificates/startup-charades.jpg" },
  { title: "RS-CIT", url: "https://drive.google.com/file/d/1RcdbKKN0sSOXPSTH6nBjqjB0wJ8qQClA/view?usp=drive_link", image: "/certificates/rs-cit.jpg" },
  { title: "REN Event", url: "https://drive.google.com/file/d/1D7aaLD83J20j5V8g9LV0Sbmq65AcLUEj/view?usp=drive_link", image: "/certificates/ren-event.jpg" },
  { title: "Problem-Solving & Negotiation Challenge (REN)", url: "https://drive.google.com/file/d/1xPnCntbbA5zYaUcSjteaPlCyyEsXYe2a/view?usp=drive_link", image: "/certificates/problem-solving-negotiation-ren.jpg" },
  { title: "Team Strategy Challenge", url: "https://drive.google.com/file/d/1m6jegtkXG6EOXOH8vHiDy0t7ANNaSBtN/view?usp=drive_link", image: "/certificates/team-strategy-challenge.jpg" },
  { title: "Virtual Labs", url: "https://drive.google.com/file/d/1MjGdC68eSSgNcEQMkdyWlhAOSC_Rd-Xw/view?usp=drive_link", image: "/certificates/virtual-labs.jpg" },
  { title: "Data Science & Analytics", url: "https://drive.google.com/file/d/1r44LaC0XOvfqu3KauA75GGynq2ji8kC7/view?usp=drive_link", image: "/certificates/data-science-analytics.jpg" }
];

// --- Components ---

const CertificateCard = ({ cert, index }: any) => {
  const { title, url, image } = cert;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.05, rotate: -2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
      {/* Certificate Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <Award className="h-12 w-12" />
          </div>
        )}
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-indigo-900/0 transition-colors duration-300 group-hover:bg-indigo-900/5" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <h3 className="mb-4 font-display text-lg font-bold leading-tight text-slate-900 line-clamp-2">
          {title}
        </h3>

        {url ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-500/20"
          >
            <span>View Certificate</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-500/20">
            <span>View Details</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function CertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? CERTIFICATES : CERTIFICATES.slice(0, 10);

  return (
    <div className="w-full py-12 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9, skewY: -5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, skewY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0, ease: "easeInOut" }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl">
          My <span className="text-indigo-600">Certifications</span>
        </h2>
        <p className="text-lg text-slate-600">
          Continuous learning & professional milestones
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto max-w-7xl px-4"
      >
        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleCertificates.map((cert, index) => (
              <CertificateCard key={cert.title} cert={cert} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See More Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            layout
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                See More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
