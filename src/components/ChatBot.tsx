import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2, Maximize2 } from "lucide-react";

interface Message {
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            content: "Hi! I'm Khwahish's AI assistant. Ask me anything about her projects, skills, or experience!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            const botMsg: Message = {
                role: "bot",
                content: botResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (query: string): string => {
        const q = query.toLowerCase();
        if (q.includes("who") || q.includes("about") || q.includes("khwahish")) {
            return "Khwahish Singh is a passionate Frontend and Mobile App Developer. She loves building smooth, human-centered interfaces!";
        }
        if (q.includes("skills") || q.includes("tech") || q.includes("stack")) {
            return "She specializes in React, React Native, TypeScript, Tailwind CSS, and Motion (Framer Motion). She's also experienced with UI/UX design.";
        }
        if (q.includes("project") || q.includes("work")) {
            return "You can check out her projects section! She has built several web and mobile apps, focusing on clean code and great UX.";
        }
        if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
            return "You can reach her at khwahishsingh2005@gmail.com or via the contact form on this site!";
        }
        if (q.includes("hello") || q.includes("hi")) {
            return "Hello! How can I help you today?";
        }
        return "That's a great question! While I'm a simple AI, I can tell you that Khwahish is always eager to learn and take on new challenges. You should definitely hire her!";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            width: isEnlarged ? (window.innerWidth > 640 ? "500px" : "100%") : "350px",
                            height: isEnlarged ? (window.innerHeight > 800 ? "700px" : "80vh") : "500px"
                        }}
                        exit={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl transition-all duration-300 ${isEnlarged && window.innerWidth <= 640 ? "fixed inset-0 z-[60] rounded-none" : "w-[350px] sm:w-[400px]"
                            }`}
                        style={{
                            maxWidth: isEnlarged ? "90vw" : "400px",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                        <Bot className="h-6 w-6" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold">Khwahish AI</h3>
                                    <p className="text-[10px] opacity-80">Always active</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsEnlarged(!isEnlarged)}
                                    className="rounded-full p-1 transition hover:bg-white/10"
                                    title={isEnlarged ? "Decrease Size" : "Enlarge Chat"}
                                >
                                    {isEnlarged ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-1 transition hover:bg-white/10"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                            : "bg-white/10 text-slate-100 backdrop-blur-md"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-slate-400 backdrop-blur-md">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-xs">Typing...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="border-t border-white/10 p-4">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 transition-focus-within:border-indigo-500"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="text-indigo-500 transition hover:scale-110 hover:text-indigo-400 disabled:opacity-50"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(99,102,241,0.6)" }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-500 ${isOpen ? "bg-slate-800 rotate-90" : "bg-gradient-to-tr from-indigo-600 to-purple-600"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <X key="close" className="h-7 w-7" />
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            className="relative"
                        >
                            <MessageSquare className="h-8 w-8" />
                            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-indigo-600 animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
