import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Calendar, Bookmark, Tag, ArrowRight } from "lucide-react";

// --- Types ---

type BlogCategory = 
  | "All"
  | "Frontend & Mobile"
  | "Problem Solving"
  | "Automation & Workflow"
  | "Learning & Growth"
  | "Vibe Coder Energy";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: number; // minutes
  date: string;
  content: string;
  featured?: boolean;
};

// --- Data ---

const BLOG_POSTS: BlogPost[] = [
  // Featured
  {
    id: "featured-1",
    title: "Mobile-first design that actually works",
    excerpt: "Designing for mobile isn't just about shrinking screens. It's about prioritizing content, touch targets, and performance from day one. Here is how I approach it.",
    content: `Mobile-first is not about taking your desktop layout, making it smaller, and calling it a day. It’s about working with true constraints, designing for the way people actually use the screen, thumbs, one-handed usage, screen size, network speed, attention span, etc.

I start with the smallest screen, the most basic requirement, the thing that matters most, that’s on top. The rest follows, earning its place, so the layout is built using grids, typography, and other elements that work naturally on small screens, as well as on bigger ones like the tablet or desktop screen.

Performance is part of the design, too. Lighter files, smart image usage, clean CSS, smart loading, etc., so the interface is fast, smooth, and always ready for the user’s interaction.

Touch is the first interaction, so the interface is easy to tap, gestures are intuitive, buttons are accessible, the form is simple, readable, and forgiving, etc.

Accessibility is not an afterthought, either, so the contrast, font size, spacing, etc., all work comfortably for the user.

Each card, section, interaction, etc., is tested on the screen, not rescaled in the browser, so the result is an interface that is calm, simple, and easy to use.

What mobile-first design that actually works looks like is when the user does not think about the design at all. They can just move forward smoothly and confidently.`,
    category: "Frontend & Mobile",
    readTime: 6,
    date: "Feb 28, 2026",
    featured: true
  },
  // Frontend & Mobile
  {
    id: "fm-2",
    title: "Common frontend mistakes and how I fixed them",
    excerpt: "From layout shifts to prop drilling, here are the lessons I learned the hard way.",
    content: `In my early days as a frontend developer, I was overly concerned with how things looked and did not pay enough attention to how they worked. One of my common mistakes was designing desktop first. When I tried to make it work on mobile, it was cramped and awkward. I fixed it by designing from the smallest screen upwards.

Another common mistake was using too many animations. I added animations everywhere because they looked cool, but they were actually harming the application and confusing users. I fixed it by using animations only when they are actually helpful.

I was also guilty of not considering performance initially. I was using large images, unoptimized fonts, and heavy libraries everywhere. I learned how to minimize images, lazy-load content, and remove anything I did not need. It made a huge difference.

Another common pain point was CSS. It was causing problems because of nesting and naming conventions. I fixed it by using a better structure and naming conventions.

Lastly, I did not realize accessibility. Lack of contrast as well as small touch targets made for a bad user experience. Correcting this taught me that good frontend work is not just about aesthetics. Good frontend work is about creating an interface that is not only good-looking but also usable, fast, and comfortable.`,
    category: "Frontend & Mobile",
    readTime: 5,
    date: "Feb 20, 2026"
  },
  {
    id: "fm-3",
    title: "Making interfaces feel fast, not just look fast",
    excerpt: "Perceived performance matters. Using skeletons, optimistic updates, and smooth transitions.",
    content: `Speed is not only actual; it is also perceived. An application may be fast; however, it may still be perceived to be slow if there is no feedback provided to the user. I have learned to appreciate the importance of perceived speed.

I have reduced the number of blocking operations. Instead of making the user wait until all operations have been completed, I have implemented progressive operations. The buttons have immediate feedback, although the operations may be executed after a while. Transitions have also been used to create the illusion of smooth operations. When users sense that something is happening, they trust the application more. Having a UI that feels fast keeps users engaged, even on slow networks.`,
    category: "Frontend & Mobile",
    readTime: 4,
    date: "Feb 15, 2026"
  },
  {
    id: "fm-4",
    title: "Small UI changes that improved usability",
    excerpt: "Micro-interactions and spacing tweaks that made a huge difference in user engagement.",
    content: `The smallest UI changes often have the biggest impact. Increasing the button padding made it easier to tap on the buttons. Improving the spacing between sections reduced the amount of visual stress on the user. Improving the labels eliminated the confusion without adding extra information to the UI.

I also made the feedback better. Making the hover states, focus styles, and success messages helped the user understand what was happening on the screen. Making the icons align with the text and maintaining consistency in the patterns helped reduce the amount of learning time. These changes were not complicated; they were simple and eliminated the friction in the UI. Good usability is often achieved through subtraction, not addition.`,
    category: "Frontend & Mobile",
    readTime: 3,
    date: "Feb 10, 2026"
  },
  {
    id: "fm-5",
    title: "Why responsiveness is more than breakpoints",
    excerpt: "Fluid typography, container queries, and adapting layouts for foldables.",
    content: `Responsiveness, as a word, means responding to things, but it’s not as simple as responding to screen sizes. A menu designed for a desktop screen won’t magically work on a mobile screen, even if the screen size allows it.

I build components, not layouts. I don’t build layouts, which means I don’t build fixed layouts that scale up or down. I build components that change smoothly, like typography, images, or interactions depending on the input device, whether it’s a mouse or a touch screen.

I test on devices, not browsers. I test on actual devices, not browsers resized to pretend to be a different device.`,
    category: "Frontend & Mobile",
    readTime: 5,
    date: "Feb 05, 2026"
  },

  // Problem Solving
  {
    id: "ps-1",
    title: "How I break down UI problems before coding",
    excerpt: "Sketching, component mapping, and state planning before writing a single line of code.",
    content: `I don’t start coding right away. First, I make sure I get the problem from the user's perspective. I think about what the user wants to do, why they want to do it, and what might cause them to get stuck. Then I think about the UI in terms of flows, states, and decisions. Empty states, loading states, and error states are part of this process.

I also make sure to create rough layouts or wireframes to get the hierarchy and spacing right. I think this helps to identify what is important and what is noise. Only after I’m satisfied with the structure do I think about the individual components and styles.`,
    category: "Problem Solving",
    readTime: 4,
    date: "Jan 30, 2026"
  },
  {
    id: "ps-2",
    title: "Debugging frontend issues step by step",
    excerpt: "A systematic approach to finding and fixing bugs without console.log spam.",
    content: `When something is not working, I don’t make arbitrary changes to fix the problem. Instead, I make sure the problem is reproducible, then check things step by step: data and API calls, state and logic, layout, and finally styles.

My best friend when debugging frontend problems is browser developer tools: I check the DOM, network requests, and state changes, and make small changes to test the problem rather than making many changes at the same time, which could introduce new bugs.`,
    category: "Problem Solving",
    readTime: 5,
    date: "Jan 25, 2026"
  },
  {
    id: "ps-3",
    title: "Thinking in components, not pages",
    excerpt: "Building reusable, atomic UI elements for scalable applications.",
    content: `Instead of designing UI, I think in components, not pages. I do not try to create a whole page, but instead, I try to create components like buttons, cards, input fields, etc., which have only one single responsibility.

This approach has many benefits, like if I need to change the UI, I need to change only one component, not the whole page. Also, it’s much better to collaborate, as components are much more understandable, testable, etc.`,
    category: "Problem Solving",
    readTime: 4,
    date: "Jan 20, 2026"
  },
  {
    id: "ps-4",
    title: "Turning complex requirements into simple UI",
    excerpt: "Simplifying user flows and reducing cognitive load in complex forms.",
    content: `When dealing with complex requirements, it feels like there are too many ideas jostling to be considered. I simplify this by prioritizing the requirements. What is the absolute must-have? What can be put on hold? What can be cut?

Simplifying the user flow also helps to make the UI simpler. Too many steps and too many things to do make the user flow complicated. Labels, spacing, and hierarchy help to simplify the UI. I don’t add more UI; I simplify the UI by reducing the barriers to using it. Simple UI is not the absence of features; it is the absence of confusion and barriers.`,
    category: "Problem Solving",
    readTime: 6,
    date: "Jan 15, 2026"
  },
  // Automation & Workflow
  {
    id: "aw-1",
    title: "Automating repetitive frontend tasks",
    excerpt: "Using scripts and tools to handle formatting, linting, and asset optimization.",
    content: `As the size of the project increases, small repetitive tasks begin to introduce friction into the development process. I like to automate tasks such as code formatting, linting, testing, asset optimization, and build processes so that these repetitive tasks can be done programmatically rather than manually checking them.

This ensures consistency in the quality of the code throughout the project and minimizes the chances of errors creeping in due to manual effort. Automation also provides me with the reassurance that every time the code is run, it is doing the same thing. This frees me up to worry about design, logic, and user experience rather than repetitive tasks.`,
    category: "Automation & Workflow",
    readTime: 4,
    date: "Jan 10, 2026"
  },
  {
    id: "aw-2",
    title: "My frontend workflow for faster builds",
    excerpt: "From setup to deployment: tools and habits that speed up my development cycle.",
    content: `To have a quick workflow, it begins with structure. I keep all files organized by features and components because it makes it easy to locate them. I am building in watch mode because it gives instant feedback on changes made to the UI and logic. I build in small pieces and not large blocks because it makes it easy to catch bugs and ensures steady progress. Lastly, I do not use unnecessary dependencies because it helps keep builds quick and makes it easy to maintain my project.`,
    category: "Automation & Workflow",
    readTime: 5,
    date: "Jan 05, 2026"
  },
  {
    id: "aw-3",
    title: "Tools that saved me hours of manual work",
    excerpt: "VS Code extensions, CLI tools, and browser plugins I can't live without.",
    content: `There are tools that remove pain from our daily work without us ever noticing them. There are code formatters that format our code without needing to talk about it. There are linters that help us catch errors early, before they become bugs. There are component-driven tools that allow us to test our UI in isolation, which speeds up development and minimizes bugs. There is version control with clear commit history that lets me feel free to experiment without worrying about going back to where I started.`,
    category: "Automation & Workflow",
    readTime: 3,
    date: "Dec 30, 2025"
  },
  {
    id: "aw-4",
    title: "Why clean code improves speed and focus",
    excerpt: "How maintainable codebases reduce mental overhead and bug hunting time.",
    content: `Clean code decreases the thinking cost. When the code is clean and the functions are small, I do not have to think much to comprehend what is going on. Clean code also helps during debugging. When the code is clean and the functions are small, I can get back to the code after a break and start moving forward immediately. Clean code keeps the focus and momentum going very well.`,
    category: "Automation & Workflow",
    readTime: 4,
    date: "Dec 25, 2025"
  },
  // Learning & Growth
  {
    id: "lg-1",
    title: "What my first internship taught me about web dev",
    excerpt: "Real-world lessons on collaboration, git conflicts, and production code.",
    content: `My first internship was a learning experience that changed my perspective on web development. I used to think that good frontend development was all about how it looked and how it was arranged. But working in a real team setting taught me that it was just as important to be consistent and reliable and communicate well as it was to make it look nice. I worked with existing codebases and learned that it was more important to follow existing conventions than to do things my own way. I learned how important it was to understand other people’s code before touching it and how important it was to communicate well and not just fix problems when they were broken.`,
    category: "Learning & Growth",
    readTime: 5,
    date: "Dec 20, 2025"
  },
  {
    id: "lg-2",
    title: "Lessons from building my first mobile app",
    excerpt: "The challenges of native development and what I learned about mobile UX.",
    content: `Developing my first mobile app was a learning experience that helped me understand the importance of discipline. When developing a mobile app, there is no room to make mistakes or hide behind them. I had to be very strategic with the app’s navigation, spacing, and interaction with the touch screen. Performance-related issues were also very visible, which helped me understand the importance of optimizing images, reducing unnecessary code, and handling loading scenarios properly. I also realized the importance of testing the app, as a minor issue could cripple the overall experience on a mobile phone.`,
    category: "Learning & Growth",
    readTime: 6,
    date: "Dec 15, 2025"
  },
  {
    id: "lg-3",
    title: "How I balance learning and building projects",
    excerpt: "Strategies for avoiding tutorial hell and learning by doing.",
    content: `I used to watch a lot of tutorials but never really apply what I learned from them. Eventually, I learned that the only way to really learn is to have something break. Currently, I learn through building projects. I pick a concept and implement it on a project, and then I push it to the point where it breaks. That tells me what I need to learn next. I also go back to my old projects and refactor them, which shows that I have improved and that I understand the fundamentals.`,
    category: "Learning & Growth",
    readTime: 4,
    date: "Dec 10, 2025"
  },
  {
    id: "lg-4",
    title: "Mistakes I made as a beginner developer",
    excerpt: "Reflecting on early coding habits and how I've improved since then.",
    content: `As a beginner, I was a trend follower, not a trendsetter. I was using too many libraries, not paying attention to performance, and implementing complex solutions to be considered a better developer. I was scared to refactor the code, as I had put a lot of effort into it, and I was not planning well, jumping directly into coding. These are the lessons I learned as a beginner, which taught me the value of patience. Simple solutions, a clear structure, and constant improvement are much more important than speed.`,
    category: "Learning & Growth",
    readTime: 5,
    date: "Dec 05, 2025"
  },
  // Vibe Coder Energy
  {
    id: "vc-1",
    title: "Coding in flow and staying consistent",
    excerpt: "Creating the right environment and mindset for deep work sessions.",
    content: `Flow is not about getting motivated. It is more like setting the right conditions to code. For me, this means that my coding space is clean and distraction-free, and I have a goal before I even begin to write my code. It may seem simple, but getting something done, whether it is a component, fixing a bug, or making something more efficient, helps build momentum.

Consistency is built through habit rather than through bursts of energy. I make sure to code regularly, even if it is only for a short time each day. Some days may be spent on building, others on refining or learning, but all of them contribute to my overall progress. I also make sure to measure my progress to be able to see the improvements that I have made.

I also make sure to pace myself properly. When my flow is broken, I make sure to take a break rather than forcing myself to be productive. Coming back to my work with a clear head helps me save time and be more efficient with my work. Being in flow is all about balance: calm, focused, and enjoying the experience while still delivering professional, reliable work.`,
    category: "Vibe Coder Energy",
    readTime: 4,
    date: "Nov 30, 2025"
  },
  {
    id: "vc-2",
    title: "Why good UI feels invisible",
    excerpt: "Great design gets out of the way and lets users accomplish their goals.",
    content: `Good UI isn't intrusive. If the UI has been designed well, the focus of the user isn't on the UI itself, but on the task at hand. There's nothing to cause confusion, nothing to slow down the user, so there's nothing to interrupt the flow.

If the UI has been successful in its invisibility, the user doesn't have to think. They don't wonder where to click, or what to expect next. They're aided by the UI, but without the UI, there's no sense of its presence.

This isn't an easy thing to accomplish, though. It means stripping the UI down to the bare minimum, using patterns consistently, and prioritizing simplicity over aesthetics. The best UI is the one the user never even thinks about, the one that works exactly as expected.`,
    category: "Vibe Coder Energy",
    readTime: 3,
    date: "Nov 25, 2025"
  },
  {
    id: "vc-3",
    title: "Creativity matters in frontend development",
    excerpt: "Why coding is a creative pursuit and how to bring personality to your work.",
    content: `Front-end development is not just about implementation; it is about problem solving. Problem solving is a creative process. Every problem is accompanied by a set of constraints. Creativity is about transforming the constraints into a solution. Selecting a suitable layout, interaction, or animation can simplify a complicated problem.

Another aspect of creativity is knowing when not to do something. Sometimes, not doing something is as important as doing something. A micro interaction, a transition, or a visual hierarchy can change the way a product works. Creativity in front-end development is about creating an experience that is not only practical but also professional.`,
    category: "Vibe Coder Energy",
    readTime: 4,
    date: "Nov 20, 2025"
  }
];

const CATEGORIES: BlogCategory[] = [
  "All",
  "Frontend & Mobile",
  "Problem Solving",
  "Automation & Workflow",
  "Learning & Growth",
  "Vibe Coder Energy"
];

// --- Components ---

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onOpen: (p: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, onOpen }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPeek, setShowPeek] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, rotateX: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring" as any, bounce: 0.3 }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.2)", rotate: 1 }}
      style={{ perspective: 1000 }}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-slate-100 p-6 shadow-sm transition-all duration-300 ${
        post.featured 
          ? "col-span-1 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 md:col-span-2 lg:col-span-2" 
          : "border-slate-200 hover:border-indigo-200"
      }`}
      onClick={() => onOpen(post)}
    >
      {post.featured && (
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {post.featured && (
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              Featured
            </span>
          )}
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
            {post.category}
          </span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className="text-slate-400 transition-colors hover:text-indigo-600"
        >
          <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`} />
        </button>
      </div>

      <div className="mb-4">
        <h3 className={`font-display font-bold text-slate-900 group-hover:text-indigo-700 transition-colors ${post.featured ? "text-2xl mb-3" : "text-lg mb-2"}`}>
          {post.title}
        </h3>
        <p className={`text-slate-600 ${post.featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="relative flex h-3.5 w-3.5 items-center justify-center">
              <Clock className="h-3.5 w-3.5" />
              <svg className="absolute -inset-1 h-5.5 w-5.5 -rotate-90 text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="60" strokeDashoffset={60 - (60 * (post.readTime / 10))} strokeLinecap="round" />
              </svg>
            </div>
            {post.readTime} min read
          </span>
        </div>
        
        <div
          onMouseEnter={(e) => { e.stopPropagation(); setShowPeek(true); }}
          onMouseLeave={(e) => { e.stopPropagation(); setShowPeek(false); }}
          className="hidden items-center gap-1 text-indigo-600 sm:flex"
        >
          <motion.div 
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: 2 }}
            className="flex items-center gap-1"
          >
            Read <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>

          <AnimatePresence>
            {showPeek && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute right-0 top-0 z-20 w-64 rounded-lg border border-slate-100 bg-slate-100 p-3 text-xs text-slate-700 shadow-lg"
                onClick={(e) => { e.stopPropagation(); onOpen(post); }}
              >
                <div className="font-medium">{post.title}</div>
                <div className="mt-1 text-sm text-slate-600 line-clamp-3">{post.excerpt}</div>
                <div className="mt-2 text-indigo-600 font-semibold">Click to read more →</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function BlogsSection() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full py-12 bg-slate-100/50">
      <motion.div
        initial={{ opacity: 0, y: -20, rotateZ: -2 }}
        whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0, type: "spring" as any, damping: 12 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl">
          My <span className="text-indigo-600">Blogs</span>
        </h2>
        <p className="text-lg text-slate-600">
          Thoughts on frontend, design, and problem solving
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto max-w-7xl px-4"
      >
        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} onOpen={(p) => setSelectedPost(p)} />
            ))}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl rounded-2xl bg-slate-100 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">{selectedPost.title}</h3>
                  <div className="mt-2 text-sm text-slate-500">{selectedPost.date} • {selectedPost.readTime} min read</div>
                </div>
                <button onClick={() => setSelectedPost(null)} className="text-slate-500 hover:text-slate-900">Close</button>
              </div>

              <div className="mt-6 text-slate-700">
                {(
                  (selectedPost as any).content
                    ? (selectedPost as any).content.split('\n\n')
                    : [selectedPost.excerpt, selectedPost.excerpt + ' More details: this expands on the topic with concrete examples and step-by-step explanation.', 'Final thoughts and next steps to try.']
                ).map((para, i) => (
                  <p key={i} className="leading-relaxed mb-4">{para}</p>
                ))}
                <p className="mt-2 text-sm text-slate-600">(This is a preview. Replace with full post content.)</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
