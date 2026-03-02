import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Network,
  FileDown,
  Layers,
  FileText,
  Database,
} from "lucide-react";

// Differentiators array
const differentiators = [
  {
    icon: CheckCircle2,
    title: "Verifiable & traceable answers",
    description:
      "Get answers you can trust. SlickResearch is built for precision and traceability, not just chat-style replies.",
    cta: "See How It Works",
  },
  {
    icon: Search,
    title: "Built for deep research",
    description:
      "Designed for comprehensive research and reports, not one-off Q&A. Go from topic to full analysis in one flow.",
    cta: "Explore Capabilities",
  },
  {
    icon: Network,
    title: "Visual Knowledge Mapping",
    description:
      "Automatically break down complex topics into visual charts, mind maps, and interactive data visualizations.",
    cta: "View Graph Features",
  },
  {
    icon: FileDown,
    title: "Instant Export & Archiving",
    description:
      "Export your AI-generated research reports directly to PDF or Markdown text for easy sharing and archiving.",
    cta: "Try Exporting Now",
  },
];

// Reusable SVG Background Grid
const Grid = () => (
  <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
    ))}
  </g>
);

// Container for isometric illustrations with fixed perspective
function IllusContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full perspective-[2000px] flex items-center justify-center transform-gpu pointer-events-none">
      <motion.div
        className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]"
        style={{
          transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 1. Verifiable Illustration
const VerifiableIllus = () => (
  <IllusContainer>
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ transform: "translateZ(0px)" }}
    >
      <Grid />
      <path
        d="M 40 40 L 200 200 M 320 80 L 200 200 M 80 320 L 200 200 M 280 280 L 200 200"
        fill="none"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
    <motion.div
      className="absolute left-[200px] top-[200px] w-40 h-40 bg-[#0A0A0B] border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.2)] flex items-center justify-center overflow-hidden"
      style={{ transform: "translate(-50%, -50%) translateZ(40px)" }}
      animate={{ z: [40, 50, 40] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/10 to-transparent opacity-50" />
      <CheckCircle2 className="w-16 h-16 text-[#00e5ff]" />
    </motion.div>
    {[
      { top: "40px", left: "40px", delay: 0 },
      { top: "80px", left: "320px", delay: 0.5 },
      { top: "320px", left: "80px", delay: 1 },
      { top: "280px", left: "280px", delay: 1.5 },
    ].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md"
        style={{
          top: pos.top,
          left: pos.left,
          transform: "translate(-50%, -50%) translateZ(20px)",
        }}
        animate={{ z: [20, 30, 20] }}
        transition={{
          duration: 3,
          delay: pos.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
      </motion.div>
    ))}
  </IllusContainer>
);

// 2. Deep Research Illustration
const DeepResearchIllus = () => (
  <IllusContainer>
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ transform: "translateZ(0px)" }}
    >
      <Grid />
    </svg>
    {[0, 1, 2, 3].map((layer) => (
      <motion.div
        key={layer}
        className="absolute left-1/2 top-1/2 w-64 h-64 bg-[#0A0A0B]/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.1)] flex items-center justify-center"
        style={{
          transform: `translate(-50%, -50%) translateZ(${layer * 40 + 20}px)`,
        }}
        animate={{ z: layer * 30 + 20 + (layer === 3 ? 10 : 0) }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      >
        {layer === 3 && (
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
            <Search className="w-16 h-16 text-purple-400 relative z-10" />
          </div>
        )}
        {layer !== 3 && (
          <div className="w-full flex flex-col gap-6 px-10 opacity-40">
            <div className="h-3 w-3/4 bg-purple-400/50 rounded-full" />
            <div className="h-3 w-full bg-purple-400/50 rounded-full" />
            <div className="h-3 w-5/6 bg-purple-400/50 rounded-full" />
          </div>
        )}
      </motion.div>
    ))}
  </IllusContainer>
);

// 3. Knowledge Mapping Illustration
const KnowledgeMapIllus = () => (
  <IllusContainer>
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ transform: "translateZ(0px)" }}
    >
      <Grid />
      <path
        d="M 80 80 L 200 200 L 320 120 M 200 200 L 240 320 M 200 200 L 80 280"
        fill="none"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
    {[
      { top: "80px", left: "80px", color: "from-sky-500", delay: 0, z: 40 },
      {
        top: "200px",
        left: "200px",
        color: "from-blue-500",
        delay: 0.2,
        z: 60,
        icon: <Network className="w-8 h-8 text-white relative z-10" />,
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.4)]",
      },
      {
        top: "120px",
        left: "320px",
        color: "from-indigo-500",
        delay: 0.4,
        z: 50,
      },
      {
        top: "320px",
        left: "240px",
        color: "from-cyan-500",
        delay: 0.6,
        z: 30,
      },
      { top: "280px", left: "80px", color: "from-teal-500", delay: 0.8, z: 40 },
    ].map((node, i) => (
      <motion.div
        key={i}
        className={`absolute w-16 h-16 bg-gradient-to-br ${node.color} to-transparent border border-white/20 rounded-2xl flex items-center justify-center ${
          node.glow ? node.glow : "shadow-xl"
        } backdrop-blur-xl`}
        style={{
          top: node.top,
          left: node.left,
          transform: `translate(-50%, -50%) translateZ(${node.z}px)`,
        }}
        animate={{ z: [node.z, node.z + 15, node.z] }}
        transition={{
          duration: 4,
          delay: node.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-[#0A0A0B]/40 rounded-2xl" />
        {node.icon || (
          <div className="w-4 h-4 rounded-full bg-white/80 relative z-10" />
        )}
      </motion.div>
    ))}
  </IllusContainer>
);

// 4. Instant Export Illustration
const ExportIllus = () => (
  <IllusContainer>
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ transform: "translateZ(0px)" }}
    >
      <Grid />
      <path
        d="M 200 200 L 80 80 M 200 200 L 320 320"
        fill="none"
        stroke="rgba(16,185,129,0.3)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </svg>
    <motion.div
      className="absolute left-[200px] top-[200px] w-48 h-48 bg-[#0A0A0B]/90 border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ transform: "translate(-50%, -50%) translateZ(20px)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 rounded-3xl" />
      <Database className="w-16 h-16 text-emerald-400" />
    </motion.div>

    <motion.div
      className="absolute left-[80px] top-[80px] w-24 h-32 bg-[#0A0A0B] border border-red-500/40 backdrop-blur-md rounded-xl shadow-2xl flex flex-col items-center justify-center gap-3"
      style={{ transform: "translate(-50%, -50%) translateZ(60px)" }}
      animate={{ x: [0, -10, 0], y: [0, -10, 0], z: [60, 80, 60] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-red-500/10 rounded-xl" />
      <FileDown className="w-8 h-8 text-red-400 relative z-10" />
      <span className="font-bold text-red-400 text-sm relative z-10">PDF</span>
    </motion.div>

    <motion.div
      className="absolute left-[320px] top-[320px] w-24 h-32 bg-[#0A0A0B] border border-blue-500/40 backdrop-blur-md rounded-xl shadow-2xl flex flex-col items-center justify-center gap-3"
      style={{ transform: "translate(-50%, -50%) translateZ(80px)" }}
      animate={{ x: [0, 10, 0], y: [0, 10, 0], z: [80, 100, 80] }}
      transition={{
        duration: 5,
        delay: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-0 bg-blue-500/10 rounded-xl" />
      <FileText className="w-8 h-8 text-blue-400 relative z-10" />
      <span className="font-bold text-blue-400 text-sm relative z-10">MD</span>
    </motion.div>
  </IllusContainer>
);

export function WhyBetterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 items = sections from 0 to 0.25, 0.25 to 0.5, etc.
    const sections = differentiators.length;
    const index = Math.min(Math.floor(latest * sections), sections - 1);
    setActiveIndex(index);
  });

  const illustrations = [
    VerifiableIllus,
    DeepResearchIllus,
    KnowledgeMapIllus,
    ExportIllus,
  ];

  const ActiveIllustration = illustrations[activeIndex];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0A0A0B]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Heading */}
        <div className="absolute top-16 w-full text-center z-30">
          <motion.h2
            className="text-sm font-bold tracking-[0.2em] text-[#00e5ff] uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why SlickResearch
          </motion.h2>
        </div>

        {/* Dynamic Content Grid */}
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col lg:grid lg:grid-cols-3 gap-8 items-center h-[calc(100vh-160px)] relative z-20 mt-16">
          {/* Left Column: Title */}
          <div className="w-full h-auto lg:h-full flex flex-col justify-end lg:justify-center order-1 lg:order-1 items-center lg:items-start text-center lg:text-left z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-md"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {differentiators[activeIndex].title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Middle Column: Illustration */}
          <div className="w-full h-[350px] sm:h-[450px] lg:h-full flex items-center justify-center order-2 lg:order-2 z-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`illus-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ActiveIllustration />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Description & CTA */}
          <div className="w-full h-auto lg:h-full flex flex-col justify-start lg:justify-center order-3 lg:order-3 items-center lg:items-start text-center lg:text-left z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-md flex flex-col items-center lg:items-start gap-8"
              >
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                  {differentiators[activeIndex].description}
                </p>
                <button className="flex items-center gap-2 text-white font-medium hover:text-[#00e5ff] transition-colors group px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 w-fit backdrop-blur-md shadow-xl">
                  {differentiators[activeIndex].cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30 hidden">
          {differentiators.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#00e5ff]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
