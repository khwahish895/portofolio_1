import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Phone, MessageSquare, Mail, Send, Loader2 } from "lucide-react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- Components ---

const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  isTextArea = false
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  isTextArea?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <motion.div
        animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {isTextArea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`peer min-h-[120px] w-full rounded-xl border-2 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder-shown:border-slate-200 focus:border-indigo-400 focus:bg-white focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] ${error ? "border-red-200 bg-red-50/10" : "border-slate-200"
              }`}
            placeholder=" "
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`peer w-full rounded-xl border-2 bg-white/50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder-shown:border-slate-200 focus:border-indigo-400 focus:bg-white focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] ${error ? "border-red-200 bg-red-50/10" : "border-slate-200"
              }`}
            placeholder=" "
          />
        )}

        <label
          htmlFor={id}
          className={`absolute left-4 top-3 z-10 origin-[0] -translate-y-6 scale-75 cursor-text text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-500 ${isTextArea ? "peer-placeholder-shown:top-3" : ""
            }`}
        >
          {label}
        </label>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -bottom-5 left-1 text-xs font-medium text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfo = () => {
  const [copied, setCopied] = useState(false);
  const email = "khwahishsingh@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Email Copy */}
      <div className="relative">
        <motion.button
          onClick={handleCopy}
          whileHover={{ rotate: 360, boxShadow: '0 0 22px rgba(99,102,241,0.45)' }}
          transition={{ rotate: { duration: 1.2, ease: 'easeOut' }, boxShadow: { duration: 0.35 } }}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-transform duration-300 hover:bg-slate-50 hover:text-indigo-600 active:scale-95"
          aria-label="Copy Email"
        >
{copied ? <Check className="h-6 w-6" /> : <Mail className="h-6 w-6" />}
        </motion.button>
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white"
            >
              Copied
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone */}
      <motion.a
        href="tel:+917424988589"
        whileHover={{ rotate: 360, boxShadow: '0 0 22px rgba(99,102,241,0.45)' }}
        transition={{ rotate: { duration: 1.2, ease: 'easeOut' }, boxShadow: { duration: 0.35 } }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-transform duration-300 hover:bg-slate-50 hover:text-indigo-600 hover:shadow-lg"
        aria-label="Call"
      >
        <Phone className="h-6 w-6" />
      </motion.a>

      {/* Chat Bot Trigger */}
      <motion.button
        onClick={() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
        whileHover={{ rotate: 360, boxShadow: '0 0 22px rgba(99,102,241,0.45)' }}
        transition={{ rotate: { duration: 1.2, ease: 'easeOut' }, boxShadow: { duration: 0.35 } }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-transform duration-300 hover:bg-slate-50 hover:text-indigo-600 hover:shadow-lg"
        aria-label="AI Chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formState.email.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      await addDoc(collection(db, "messages"), {
        ...formState,
        status: 'unread',
        createdAt: serverTimestamp()
      });

      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("idle");
      alert("Failed to send message. Please check your Firebase configuration in src/firebase.ts");
    }
  };

  return (
    <div className="relative w-full py-12">
      {/* Background Haze */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -25, skewY: 5 }}
        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0, ease: "backOut" }}
        className="mb-12 text-center"
      >
        <motion.h2 className="mb-4 font-display text-4xl font-bold text-slate-900 lg:text-5xl"
          animate={{ y: [0, -4, 0, 4, 0], color: ['#1e293b', '#6366f1', '#1e293b'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          Get in <span className="text-indigo-600 drop-shadow-[0_6px_18px_rgba(99,102,241,0.18)]">Touch</span>
        </motion.h2>
        <motion.p className="text-lg text-slate-600 drop-shadow-sm"
          animate={{ y: [0, -3, 0, 3, 0], x: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        >
          Have an idea? Let's build something amazing.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-2"
      >
        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 30px 60px -20px rgba(99,102,241,0.18)' }}
            className="relative w-full overflow-hidden rounded-3xl border border-slate-100 bg-white/60 p-8 shadow-md backdrop-blur-sm transition-all duration-500"
          >
            <div className="mb-6 flex items-center justify-between">
              <motion.h3 className="font-display text-xl font-bold text-slate-900"
                animate={{ x: [0, 3, -3, 0], y: [0, -2, 0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >Send a Message</motion.h3>
            </div>

            <div className="mb-6">
              <ContactInfo />
            </div>

            <form onSubmit={handleSubmit} className={`transition-all duration-1000 ${status === "success" ? "blur-sm grayscale" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <FloatingLabelInput
                  id="name"
                  label="Name"
                  value={formState.name}
                  onChange={(val) => setFormState({ ...formState, name: val })}
                  error={errors.name}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <FloatingLabelInput
                  id="email"
                  label="Email"
                  type="email"
                  value={formState.email}
                  onChange={(val) => setFormState({ ...formState, email: val })}
                  error={errors.email}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <FloatingLabelInput
                  id="message"
                  label="Message"
                  value={formState.message}
                  onChange={(val) => setFormState({ ...formState, message: val })}
                  error={errors.message}
                  isTextArea
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.4 }}
                type="submit"
                disabled={status !== "idle"}
                className={`group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-full py-3.5 text-sm font-bold text-white transition-all duration-300 ${status === "success"
                  ? "bg-green-500"
                  : "bg-slate-900 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Send Message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                  {status === "submitting" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      Message Sent <Check className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Right Column: "Let's Work Together" Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 30px 60px -20px rgba(99,102,241,0.22)",
              borderColor: 'rgba(99,102,241,0.35)'
            }}
            style={{ perspective: 1000 }}
            className="relative w-full overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/40 p-8 shadow-md backdrop-blur-sm transition-all duration-500"
          >
            {/* Soft Glow Background */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

            <div className="relative z-10">
              <motion.h3 className="mb-6 font-display text-2xl font-bold text-blue-300 drop-shadow-[0_8px_24px_rgba(99,102,241,0.12)]"
                animate={{ y: [0, -4, 0, 4, 0], color: ['#ffffff', '#6366f1', '#ffffff'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Let’s Work Together
              </motion.h3>
              <p className="mb-6 text-blue-300">
                I’m always excited to hear new ideas and collaborate with people.
                Whether you’re looking for assistance with:
              </p>

              <ul className="space-y-3">
                {[
                  "Frontend development – clean, responsive, mobile-first interfaces",
                  "Mobile web development with fast, intuitive experiences",
                  "UI/UX implementation – from design to code",
                  "Android / mobile application development",
                  "Problem-solving for real-world product challenges",
                  "Creative coding and experimental ideas"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -2, 0, 2, 0] }}
                    transition={{ duration: 4, delay: 0.8 + (idx * 0.1), repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.25)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

