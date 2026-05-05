import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Trash2,
    Mail,
    User,
    Calendar,
    ChevronDown,
    ChevronUp,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { db } from "../../firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    status: 'read' | 'unread';
    createdAt: any;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Simple password protection - change this!
    const ADMIN_PASSWORD = "khwahish_singh_2005";

    useEffect(() => {
        // Check if user was already authenticated in this session
        const authStatus = sessionStorage.getItem("admin_auth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs: Message[] = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(msgs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching messages:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
        } else {
            alert("Invalid Password");
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await deleteDoc(doc(db, "messages", id));
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    };

    const toggleRead = async (id: string, currentStatus: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await updateDoc(doc(db, "messages", id), {
                status: currentStatus === 'unread' ? 'read' : 'unread'
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl"
                >
                    <div className="mb-6 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                            <Lock className="h-8 w-8" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white">Admin Access</h2>
                        <p className="mt-2 text-sm text-slate-400">Enter password to view messages</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Admin Password"
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white outline-none focus:border-indigo-500/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="font-display text-3xl font-bold text-white">Messages</h2>
                    <p className="text-slate-400">Manage your contact form inquiries</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setIsAuthenticated(false);
                            sessionStorage.removeItem("admin_auth");
                        }}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                    >
                        Logout
                    </button>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="text-indigo-500"
                    >
                        <AlertCircle className="h-8 w-8" />
                    </motion.div>
                </div>
            ) : messages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
                    <Mail className="mx-auto h-12 w-12 text-slate-600" />
                    <p className="mt-4 text-slate-400">No messages found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${expandedId === msg.id
                                    ? "border-indigo-500/30 bg-indigo-500/5"
                                    : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
                                    }`}
                                onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                            >
                                <div className="flex cursor-pointer items-center justify-between p-4 sm:p-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${msg.status === 'unread' ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-300"
                                            }`}>
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{msg.name}</h3>
                                            <p className="text-sm text-slate-400">{msg.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="hidden text-right sm:block">
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Calendar className="h-3 w-3" />
                                                {msg.createdAt?.toDate().toLocaleDateString() || "Recent"}
                                            </div>
                                            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${msg.status === 'unread' ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-500"
                                                }`}>
                                                {msg.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => toggleRead(msg.id, msg.status, e)}
                                                className="rounded-lg bg-white/5 p-2 text-slate-400 transition hover:bg-indigo-500/20 hover:text-indigo-400"
                                                title={msg.status === 'unread' ? "Mark as Read" : "Mark as Unread"}
                                            >
                                                {msg.status === 'unread' ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(msg.id, e)}
                                                className="rounded-lg bg-white/5 p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            {expandedId === msg.id ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedId === msg.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/10 p-6 pt-0"
                                        >
                                            <div className="rounded-xl bg-black/20 p-4">
                                                <p className="whitespace-pre-wrap text-slate-300">{msg.message}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
