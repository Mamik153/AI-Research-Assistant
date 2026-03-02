import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "lucide-react";

const AGENTS = [
  {
    id: "ollama",
    iconUrl: "https://cdn.simpleicons.org/ollama/white",
    name: "Ollama",
    color: "text-white",
  },
  {
    id: "gemini",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    name: "Gemini",
    color: "",
  },
  {
    id: "openai",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    name: "OpenAI",
    color: "text-emerald-400",
  },
  {
    id: "claude",
    iconUrl: "https://cdn.simpleicons.org/anthropic/D97757",
    name: "Claude",
    color: "text-orange-400",
  },
];

const FASTAPI_LABELS = ["FastAPI Service", "Rest API", "SSE", "GraphQL"];

export function ArchitectureIllustration() {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentFastApiIndex, setCurrentFastApiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgentIndex((prev) => (prev + 1) % AGENTS.length);
      setCurrentFastApiIndex((prev) => (prev + 1) % FASTAPI_LABELS.length);
    }, 3000); // Swap every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const currentAgent = AGENTS[currentAgentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] sm:h-[500px] lg:h-[600px] perspective-[2000px] select-none flex items-center justify-center -mt-10 md:mt-10 mb-20 pointer-events-none overflow-visible">
      <motion.div
        className="relative w-full aspect-[4/3] max-w-[800px]"
        style={{
          transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg) scale(0.9)",
          transformStyle: "preserve-3d",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Connection Lines (SVG) using percentages relative to viewBox */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ transform: "translateZ(-1px)" }}
        >
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00e5ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Paths (Coordinates are scaled roughly based on original 800x600 size to 100x100 space) */}
          {[
            // Client <-> React
            { d: "M 20.25 69.3 L 45.8 69.5" },
            { d: "M 45.8 71.3 L 20.25 71.5" },
            // React <-> FastAPI
            { d: "M 45.1 70.3 L 45.2 45.3" },
            { d: "M 46.6 45.3 L 46.5 70.3" },
            // FastAPI <-> DB (small diff avoids 0-height SVG bug)
            { d: "M 45.8 44.3 L 72.1 44.5" },
            { d: "M 72.1 46.3 L 45.8 46.5" },
            // FastAPI <-> Agent
            // Inside (Left/Bottom):
            { d: "M 45.1 45.3 L 45.2 24.3 L 26.2 24.5" },
            // Outside (Right/Top):
            { d: "M 26.2 22.3 L 46.6 22.5 L 46.5 45.3" },
            // FastAPI <-> Page Index
            { d: "M 45.8 44.3 L 56.2 44.4 L 56.2 69.3 L 72.1 69.3" },
            { d: "M 72.1 71.3 L 57.7 71.3 L 57.7 46.4 L 45.8 46.5" },
          ].map(({ d }, i) => (
            <g key={`path-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="0.4"
                strokeDasharray="1 1"
                strokeLinecap="round"
              />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#pulse-grad)"
                strokeWidth="0.6"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            </g>
          ))}
        </svg>

        {/* 1. User/Client Node */}
        <motion.div
          className="absolute left-[20.25%] top-[65%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8"
          style={{ transform: "translateZ(20px)" }}
          animate={{ z: [20, 25, 20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
          </div>
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-[10px] sm:text-xs font-semibold text-white/90">
              Client
            </span>
          </div>
        </motion.div>

        {/* 2. React UI Node */}
        <motion.div
          className="absolute left-[45.8%] top-[65%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8"
          style={{ transform: "translateZ(30px)" }}
          animate={{ z: [30, 40, 30] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(97,218,251,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#61DAFB]/10 to-transparent opacity-50" />
            <img
              src="https://cdn.simpleicons.org/react/61DAFB"
              alt="React"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-[10px] sm:text-xs font-semibold text-white/90">
              React
            </span>
          </div>
        </motion.div>

        {/* 3. FastAPI Backend Node */}
        <motion.div
          className="absolute left-[45.8%] top-[40%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8"
          style={{ transform: "translateZ(50px)" }}
          animate={{ z: [50, 65, 50] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,150,136,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#009688]/10 to-transparent opacity-50" />
            <img
              src="https://cdn.simpleicons.org/fastapi/009688"
              alt="FastAPI"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <div className="h-[24px] sm:h-[28px] w-[110px] sm:w-[130px] bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={FASTAPI_LABELS[currentFastApiIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "backOut" }}
                className="text-[10px] sm:text-xs font-semibold text-white/90 absolute whitespace-nowrap"
              >
                {FASTAPI_LABELS[currentFastApiIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4. Agent Framework Node (CrewAI & Dynamic Agent) */}
        <motion.div
          className="absolute left-[26.2%] top-[15.8%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-32 sm:w-auto -ml-16 sm:ml-0 sm:-translate-x-1/2"
          style={{ transform: "translateZ(80px)" }}
          animate={{ z: [80, 100, 80] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="flex gap-2 sm:gap-4 p-2 sm:p-3 bg-[#0A0A0B] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-50" />

            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 w-12 sm:w-16">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center shadow-inner">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                  alt="Python"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <span className="text-[8px] sm:text-[9px] font-medium text-slate-400">
                Python
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10 w-12 sm:w-16">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentAgent.id}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={currentAgent.iconUrl}
                      alt={currentAgent.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="h-[12px] sm:h-[14px] overflow-hidden flex items-center justify-center relative w-full">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentAgent.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="text-[8px] sm:text-[9px] font-medium text-slate-400 absolute"
                  >
                    {currentAgent.name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-white/90">
              Agents Framework
            </span>
          </div>
        </motion.div>

        {/* Message Queue Layer */}
        <motion.div
          className="absolute left-[58.9%] top-[40%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8 hidden"
          style={{ transform: "translateZ(45px)" }}
          animate={{ z: [45, 55, 45] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,68,56,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4438]/10 to-transparent opacity-50" />
            <img
              src="https://cdn.simpleicons.org/redis/FF4438"
              alt="Redis"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-semibold text-white/90">
              For Message Queues
            </span>
          </div>
        </motion.div>

        {/* 5. Supabase Vector DB */}
        <motion.div
          className="absolute left-[72.1%] top-[40%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8"
          style={{ transform: "translateZ(40px)" }}
          animate={{ z: [40, 50, 40] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(62,207,142,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/10 to-transparent opacity-50" />
            <img
              src="https://cdn.simpleicons.org/supabase/3ECF8E"
              alt="Supabase"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-semibold text-white/90">
              Supabase DB
            </span>
          </div>
        </motion.div>

        {/* 6. Page Index Vectorless RAG */}
        <motion.div
          className="absolute left-[72.1%] top-[63.5%] flex flex-col items-center gap-2 sm:gap-3 transform-gpu w-12 sm:w-16 -ml-6 sm:-ml-8"
          style={{ transform: "translateZ(30px)" }}
          animate={{ z: [30, 40, 30] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            <img
              src="https://pageindex.ai/static/images/logo.png"
              alt="Page Index"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl whitespace-nowrap">
              <span className="text-[10px] sm:text-xs font-semibold text-white/90">
                Page Index
              </span>
            </div>
            <div className="px-1.5 sm:px-2 py-0.5 bg-[#0A0A0B] border border-dashed border-white/30 rounded-md hidden">
              <span className="text-[8px] sm:text-[10px] font-medium text-white/60">
                Optional
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
