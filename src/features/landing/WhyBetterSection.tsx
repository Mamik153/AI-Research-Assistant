import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Network,
  FileDown,
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
      <line
        key={`h-${i}`}
        x1="0"
        y1={`${i * 12.5}%`}
        x2="100%"
        y2={`${i * 12.5}%`}
      />
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <line
        key={`v-${i}`}
        x1={`${i * 12.5}%`}
        y1="0"
        x2={`${i * 12.5}%`}
        y2="100%"
      />
    ))}
  </g>
);

// Container for isometric illustrations with fixed perspective
function IllusContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full aspect-square max-w-[400px] perspective-[2000px] flex items-center justify-center transform-gpu pointer-events-none">
      <motion.div
        className="relative w-full h-full"
        style={{
          transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
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
      <line
        x1="10%"
        y1="10%"
        x2="50%"
        y2="50%"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="80%"
        y1="20%"
        x2="50%"
        y2="50%"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="20%"
        y1="80%"
        x2="50%"
        y2="50%"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="70%"
        y1="70%"
        x2="50%"
        y2="50%"
        stroke="rgba(0,229,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
    <motion.div
      className="absolute left-[50%] top-[50%] w-[40%] h-[40%] bg-[#0A0A0B] border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.2)] flex items-center justify-center overflow-hidden"
      style={{ transform: "translate(-50%, -50%) translateZ(40px)" }}
      animate={{ z: [40, 50, 40] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/10 to-transparent opacity-50" />
      <CheckCircle2 className="w-[40%] h-[40%] text-[#00e5ff]" />
    </motion.div>
    {[
      { top: "10%", left: "10%", delay: 0 },
      { top: "20%", left: "80%", delay: 0.5 },
      { top: "80%", left: "20%", delay: 1 },
      { top: "70%", left: "70%", delay: 1.5 },
    ].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-[12%] h-[12%] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md"
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
        <div className="w-[15%] h-[15%] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
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
        className="absolute left-[50%] top-[50%] w-[65%] h-[65%] bg-[#0A0A0B]/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.1)] flex items-center justify-center"
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
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
            <Search className="w-[25%] h-[25%] text-purple-400 relative z-10" />
          </div>
        )}
        {layer !== 3 && (
          <div className="w-full h-full flex flex-col justify-center items-center gap-[15%] px-[15%] opacity-40">
            <div className="min-h-[6%] w-[75%] bg-purple-400/50 rounded-full" />
            <div className="min-h-[6%] w-full bg-purple-400/50 rounded-full" />
            <div className="min-h-[6%] w-[85%] bg-purple-400/50 rounded-full" />
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
        d="M 20% 20% L 50% 50% L 80% 30% M 50% 50% L 60% 80% M 50% 50% L 20% 70%"
        fill="none"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="20%"
        y1="20%"
        x2="50%"
        y2="50%"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="80%"
        y1="30%"
        x2="50%"
        y2="50%"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="60%"
        y1="80%"
        x2="50%"
        y2="50%"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="20%"
        y1="70%"
        x2="50%"
        y2="50%"
        stroke="rgba(56,189,248,0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
    {[
      { top: "20%", left: "20%", color: "from-sky-500", delay: 0, z: 40 },
      {
        top: "50%",
        left: "50%",
        color: "from-blue-500",
        delay: 0.2,
        z: 60,
        icon: <Network className="w-[50%] h-[50%] text-white relative z-10" />,
        glow: "shadow-[0_0_40px_rgba(59,130,246,0.4)]",
      },
      {
        top: "30%",
        left: "80%",
        color: "from-indigo-500",
        delay: 0.4,
        z: 50,
      },
      {
        top: "80%",
        left: "60%",
        color: "from-cyan-500",
        delay: 0.6,
        z: 30,
      },
      { top: "70%", left: "20%", color: "from-teal-500", delay: 0.8, z: 40 },
    ].map((node, i) => (
      <motion.div
        key={i}
        className={`absolute w-[16%] h-[16%] bg-gradient-to-br ${
          node.color
        } to-transparent border border-white/20 rounded-2xl flex items-center justify-center ${
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
          <div className="w-[25%] h-[25%] rounded-full bg-white/80 relative z-10" />
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
      <line
        x1="50%"
        y1="50%"
        x2="20%"
        y2="20%"
        stroke="rgba(16,185,129,0.3)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <line
        x1="50%"
        y1="50%"
        x2="80%"
        y2="80%"
        stroke="rgba(16,185,129,0.3)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </svg>
    <motion.div
      className="absolute left-[50%] top-[50%] w-[48%] h-[48%] bg-[#0A0A0B]/90 border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ transform: "translate(-50%, -50%) translateZ(20px)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 rounded-3xl" />
      <Database className="w-[33%] h-[33%] text-emerald-400" />
    </motion.div>

    <motion.div
      className="absolute left-[20%] top-[20%] w-[24%] h-[32%] bg-[#0A0A0B] border border-red-500/40 backdrop-blur-md rounded-xl shadow-2xl flex flex-col items-center justify-center gap-[10%]"
      style={{ transform: "translate(-50%, -50%) translateZ(60px)" }}
      animate={{ x: [0, -10, 0], y: [0, -10, 0], z: [60, 80, 60] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-red-500/10 rounded-xl" />
      <FileDown className="w-[33%] h-[33%] text-red-400 relative z-10" />
      <span className="font-bold text-red-400 text-xs sm:text-sm relative z-10">
        PDF
      </span>
    </motion.div>

    <motion.div
      className="absolute left-[80%] top-[80%] w-[24%] h-[32%] bg-[#0A0A0B] border border-blue-500/40 backdrop-blur-md rounded-xl shadow-2xl flex flex-col items-center justify-center gap-[10%]"
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
      <FileText className="w-[33%] h-[33%] text-blue-400 relative z-10" />
      <span className="font-bold text-blue-400 text-xs sm:text-sm relative z-10">
        MD
      </span>
    </motion.div>
  </IllusContainer>
);

export function WhyBetterSection() {
  const illustrations = [
    VerifiableIllus,
    DeepResearchIllus,
    KnowledgeMapIllus,
    ExportIllus,
  ];

  return (
    <section className="relative w-full bg-[#0A0A0B] pb-32">
      {/* Background Gradients - fixed position while scrolling content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none sticky top-0 h-full">
        <div className="absolute top-[10%] left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="w-full text-center pb-8 pt-24 lg:sticky lg:top-0 z-30 pointer-events-none bg-gradient-to-b from-[#0A0A0B] via-[#0A0A0B] to-transparent">
          <motion.h2
            className="text-sm font-bold tracking-[0.2em] text-[#00e5ff] uppercase inline-block bg-[#0A0A0B]/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why SlickResearch
          </motion.h2>
        </div>

        {/* Scrollable Content Stacks */}
        <div className="flex flex-col">
          {differentiators.map((diff, index) => {
            const ActiveIllustration = illustrations[index];

            return (
              <motion.div
                key={index}
                className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center lg:min-h-[80vh] py-16 lg:sticky lg:top-[120px] bg-[#0A0A0B]/95 backdrop-blur-md rounded-3xl mb-32 lg:mb-0 border border-white/5 shadow-2xl"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Left/Right Column: Text Content */}
                <div
                  className={`w-full flex justify-center text-center lg:text-left z-20 px-8 ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="max-w-md flex flex-col items-center lg:items-start gap-6 lg:gap-8">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {diff.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                      {diff.description}
                    </p>
                    <button className="flex items-center gap-2 text-white font-medium hover:text-[#00e5ff] transition-colors group px-6 lg:px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 w-fit backdrop-blur-md shadow-xl">
                      {diff.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Left/Right Column: Illustration */}
                <div
                  className={`w-full flex items-center justify-center p-8 lg:p-0 z-10 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <ActiveIllustration />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
