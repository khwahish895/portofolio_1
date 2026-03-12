import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";

const content = [
  {
    text: "I build frontend and mobile experiences by breaking down complex problems, automating repetitive work, and coding in flow. My focus is on thoughtful, human-centered design that feels intuitive, performs smoothly, and serves a real purpose.",
    highlights: ["thoughtful, human-centered design", "coding in flow"]
  },
  {
    text: "I approach development with a problem-solving mindset. Before writing code, I try to understand the why behind a feature, the users it serves, and the friction it should remove. This helps me design interfaces that are simple, mobile-first, and easy to use, without sacrificing performance or clarity.",
    highlights: ["problem-solving mindset", "simple, mobile-first"]
  },
  {
    text: "Automation plays a big role in how I work. I like removing repetitive tasks and unnecessary complexity so I can spend more time on creative decisions, user experience, and clean architecture. For me, good code is not just functional, it’s readable, scalable, and intentional.",
    highlights: ["readable, scalable, and intentional", "clean architecture"]
  },
  {
    text: "I enjoy working across frontend, mobile web, and mobile apps, blending structure with creativity. Whether I’m building a new interface, refining interactions, or optimizing an existing product, my goal stays the same: create experiences that feel right, respect users, and solve real problems.",
    highlights: ["create experiences that feel right", "solve real problems"]
  }
];

// Helper to parse text into segments (normal vs highlight)
const parseSegments = (text: string, highlights: string[]) => {
  let segments: { text: string; isHighlight: boolean }[] = [{ text, isHighlight: false }];
  
  highlights.forEach(highlight => {
    const newSegments: { text: string; isHighlight: boolean }[] = [];
    segments.forEach(segment => {
      if (segment.isHighlight) {
        newSegments.push(segment);
        return;
      }
      const parts = segment.text.split(highlight);
      parts.forEach((part, i) => {
        if (part) newSegments.push({ text: part, isHighlight: false });
        if (i < parts.length - 1) newSegments.push({ text: highlight, isHighlight: true });
      });
    });
    segments = newSegments;
  });
  
  return segments;
};

const TypingParagraph = ({ 
  text, 
  highlights, 
  startTyping, 
  onComplete 
}: { 
  text: string; 
  highlights: string[]; 
  startTyping: boolean; 
  onComplete: () => void; 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const segments = useMemo(() => parseSegments(text, highlights), [text, highlights]);
  
  // Flatten segments into a single string for easy indexing, but keep track of highlight ranges
  const fullText = segments.map(s => s.text).join("");
  
  useEffect(() => {
    if (!startTyping) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete();
        return;
      }
      
      setDisplayedText(fullText.substring(0, currentIndex + 1));
      currentIndex++;
    }, 20); // Medium-slow speed

    return () => clearInterval(interval);
  }, [startTyping, fullText, onComplete]);

  // Render logic to reconstruct highlights based on displayed text length
  const renderContent = () => {
    let currentLength = 0;
    const renderedSegments = [];

    for (const segment of segments) {
      if (currentLength >= displayedText.length) break;

      const segmentLength = segment.text.length;
      const remainingLength = displayedText.length - currentLength;
      const textToRender = segment.text.substring(0, remainingLength);

      renderedSegments.push(
        <span key={currentLength} className={segment.isHighlight ? "text-indigo-600 font-medium" : ""}>
          {textToRender}
        </span>
      );

      currentLength += segmentLength;
    }

    return renderedSegments;
  };

  return (
    <p className="mb-6 text-lg leading-relaxed text-slate-600 min-h-[1.75rem]">
      {renderContent()}
      {!isComplete && startTyping && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-indigo-600 animate-pulse align-middle" />
      )}
    </p>
  );
};

export default function AboutSection() {
  const [activeParagraph, setActiveParagraph] = useState(0);

  return (
    <div className="grid min-h-[calc(100vh-140px)] w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      {/* Left Column: Text */}
      <motion.div 
        initial={{ opacity: 0, x: -30, rotateY: -30 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ perspective: 1000 }}
        className="flex flex-col justify-center order-2 lg:order-1"
      >
        <motion.h2
          className="mb-8 font-display text-4xl font-bold text-slate-900 lg:text-5xl"
          animate={{
            rotate: [0, 4, -4, 0],
            x: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
        >
          About <span className="text-indigo-600">Me</span>
        </motion.h2>
        
        <div className="space-y-2">
          {content.map((para, index) => (
            <TypingParagraph
              key={index}
              text={para.text}
              highlights={para.highlights}
              startTyping={index === 0 || index <= activeParagraph}
              onComplete={() => {
                if (index === activeParagraph && index < content.length - 1) {
                  setTimeout(() => setActiveParagraph(prev => prev + 1), 500); // Pause before next paragraph
                }
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Right Column: Image */}
      <motion.div 
        initial={{ opacity: 0, x: 30, rotateY: 30 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        style={{ perspective: 1000 }}
        className="flex items-center justify-center order-1 lg:order-2"
      >
        <motion.div className="relative group cursor-pointer"
          animate={{
            x: [0, 20, -20, 0],
            rotate: [0, 360]
          }}
          transition={{
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Rotating Gradient Border - Very Slow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-rose-400 opacity-40 blur-sm transition duration-1000 group-hover:opacity-60 animate-spin-slower" />
          
          <div className="relative h-72 w-72 lg:h-96 lg:w-96 overflow-hidden rounded-full border-[3px] border-white/80 bg-slate-100 shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
            <motion.img
              src="/about.jpg"
              alt="Khwahish Singh Profile"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              animate={{ rotateY: [0, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
