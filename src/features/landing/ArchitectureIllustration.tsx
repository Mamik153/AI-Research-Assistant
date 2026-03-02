import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "lucide-react";
import {
  SiReact,
  SiFastapi,
  SiSupabase,
  SiPython,
  SiOllama,
  SiOpenai,
  SiGooglegemini,
  SiClaude,
} from "react-icons/si";

const AGENTS = [
  { id: "ollama", icon: SiOllama, name: "Ollama", color: "text-white" },
  {
    id: "gemini",
    icon: SiGooglegemini,
    name: "Gemini",
    color: "text-blue-400",
  },
  { id: "openai", icon: SiOpenai, name: "OpenAI", color: "text-emerald-400" },
  { id: "claude", icon: SiClaude, name: "Claude", color: "text-orange-400" },
];

export function ArchitectureIllustration() {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgentIndex((prev) => (prev + 1) % AGENTS.length);
    }, 3000); // Swap every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const CurrentAgentIcon = AGENTS[currentAgentIndex].icon;
  const currentAgent = AGENTS[currentAgentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] sm:h-[500px] lg:h-[600px] perspective-[2000px] select-none flex items-center justify-center -mt-10 md:mt-10 mb-20 pointer-events-none overflow-hidden sm:overflow-visible">
      <motion.div
        className="relative w-[800px] h-[600px]"
        style={{
          transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg) scale(0.9)",
          transformStyle: "preserve-3d",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Connection Lines (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
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
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid base */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="600" />
            ))}
          </g>

          {/* Paths */}
          {[
            // Client <-> React
            { d: "M 162 416 L 367 417" },
            { d: "M 367 428 L 162 429" },
            // React <-> FastAPI
            { d: "M 361 422 L 362 272" },
            { d: "M 373 272 L 372 422" },
            // FastAPI <-> DB (1px diff avoids SVG 0-height gradient bug)
            { d: "M 367 266 L 577 267" },
            { d: "M 577 278 L 367 279" },
            // FastAPI <-> Agent
            // Inside (Left/Bottom):
            { d: "M 361 272 L 362 146 L 210 147" },
            // Outside (Right/Top):
            { d: "M 210 134 L 373 135 L 372 272" },
          ].map(({ d }, i) => (
            <g key={`path-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#pulse-grad)"
                strokeWidth="3"
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
          className="absolute left-[130px] top-[390px] flex flex-col items-center gap-3 transform-gpu"
          style={{ transform: "translateZ(20px)" }}
          animate={{ z: [20, 25, 20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <User className="w-8 h-8 text-white/80" />
          </div>
          <div className="px-4 py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-xs font-semibold text-white/90">Client</span>
          </div>
        </motion.div>

        {/* 2. React UI Node */}
        <motion.div
          className="absolute left-[330px] top-[390px] flex flex-col items-center gap-3 transform-gpu"
          style={{ transform: "translateZ(30px)" }}
          animate={{ z: [30, 40, 30] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <div className="w-16 h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(97,218,251,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#61DAFB]/10 to-transparent opacity-50" />
            <SiReact className="w-8 h-8 text-[#61DAFB]" />
          </div>
          <div className="px-4 py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-xs font-semibold text-white/90">React</span>
          </div>
        </motion.div>

        {/* 3. FastAPI Backend Node */}
        <motion.div
          className="absolute left-[310px] top-[240px] flex flex-col items-center gap-3 transform-gpu"
          style={{ transform: "translateZ(50px)" }}
          animate={{ z: [50, 65, 50] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <div className="w-16 h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,150,136,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#009688]/10 to-transparent opacity-50" />
            <SiFastapi className="w-8 h-8 text-[#009688]" />
          </div>
          <div className="px-4 py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-xs font-semibold text-white/90">
              FastAPI Service
            </span>
          </div>
        </motion.div>

        {/* 4. Agent Framework Node (CrewAI & Dynamic Agent) */}
        <motion.div
          className="absolute left-[135px] top-[95px] flex flex-col items-center gap-3 transform-gpu"
          style={{ transform: "translateZ(80px)" }}
          animate={{ z: [80, 100, 80] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="flex gap-4 p-3 bg-[#0A0A0B] border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-50" />

            <div className="flex flex-col items-center gap-2 relative z-10 w-16">
              <div className="w-12 h-12 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center shadow-inner">
                <SiPython className="w-6 h-6 text-[#3776AB]" />
              </div>
              <span className="text-[9px] font-medium text-slate-400">
                Python
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10 w-16">
              <div className="w-12 h-12 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentAgent.id}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CurrentAgentIcon
                      className={`w-6 h-6 ${currentAgent.color}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="h-[14px] overflow-hidden flex items-center justify-center relative w-full">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentAgent.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="text-[9px] font-medium text-slate-400 absolute"
                  >
                    {currentAgent.name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-white/90">
              Agents Framework
            </span>
          </div>
        </motion.div>

        {/* 5. Supabase Vector DB */}
        <motion.div
          className="absolute left-[545px] top-[240px] flex flex-col items-center gap-3 transform-gpu"
          style={{ transform: "translateZ(40px)" }}
          animate={{ z: [40, 50, 40] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <div className="w-16 h-16 bg-[#0A0A0B] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(62,207,142,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/10 to-transparent opacity-50" />
            <SiSupabase className="w-8 h-8 text-[#3ECF8E]" />
          </div>
          <div className="px-4 py-1.5 bg-[#0A0A0B] border border-white/10 rounded-full shadow-xl">
            <span className="text-xs font-semibold text-white/90">
              Supabase DB
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
