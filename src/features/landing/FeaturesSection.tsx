import { motion } from "motion/react";
import { Download } from "lucide-react";
import { type ReactNode } from "react";

const base3D = {
  rotateX: "60deg",
  rotateZ: "-45deg",
  transformStyle: "preserve-3d" as const,
};

const ChatGraphic = () => {
  return (
    <motion.div style={base3D} className="relative w-72 h-96">
      <motion.div
        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm"
        variants={{ hover: { z: -10, scale: 0.95 } }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute top-6 right-6 w-2/3 h-14 bg-cyan-500/20 border border-cyan-400/30 rounded-xl rounded-tr-sm backdrop-blur-md"
        variants={{ hover: { z: 40, x: 10, y: -10 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-4 ml-4 w-1/2 h-2.5 bg-cyan-200/50 rounded" />
        <div className="mt-2.5 ml-4 w-3/4 h-2.5 bg-cyan-200/30 rounded" />
      </motion.div>

      <motion.div
        className="absolute top-28 left-6 w-4/5 h-20 bg-white/10 border border-white/20 rounded-xl rounded-tl-sm backdrop-blur-md"
        variants={{ hover: { z: 60, x: -10, y: -10 } }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="mt-4 ml-4 w-1/3 h-2.5 bg-white/40 rounded" />
        <div className="mt-3 ml-4 w-5/6 h-2 bg-white/20 rounded" />
        <div className="mt-2.5 ml-4 w-2/3 h-2 bg-white/20 rounded" />
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-6 w-3/4 h-14 bg-cyan-500/20 border border-cyan-400/30 rounded-xl rounded-tr-sm backdrop-blur-md"
        variants={{ hover: { z: 80, x: 15, y: -15 } }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mt-5 ml-4 w-1/3 h-2.5 bg-cyan-200/50 rounded" />
        <div className="mt-2.5 ml-4 w-2/3 h-2 bg-cyan-200/30 rounded" />
      </motion.div>
    </motion.div>
  );
};

const VisualizationsGraphic = () => {
  return (
    <motion.div style={base3D} className="relative w-48 h-48">
      <motion.div
        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-2xl"
        variants={{ hover: { z: -5 } }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-5 flex flex-col justify-between opacity-20">
        <div className="w-full h-[1px] bg-white" />
        <div className="w-full h-[1px] bg-white" />
        <div className="w-full h-[1px] bg-white" />
        <div className="w-full h-[1px] bg-white" />
      </div>

      <motion.div
        className="absolute bottom-5 left-5 w-8 rounded-t border border-cyan-300 shadow-[0_10px_30px_rgba(6,182,212,0.3)] bg-cyan-400"
        style={{ height: "40%" }}
        variants={{ hover: { z: 40, y: -10 } }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute bottom-5 left-[4.5rem] w-8 rounded-t border border-purple-300 shadow-[0_10px_30px_rgba(168,85,247,0.3)] bg-purple-400"
        style={{ height: "70%" }}
        variants={{ hover: { z: 70, y: -20 } }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-5 left-[7.5rem] w-8 rounded-t border border-blue-300 shadow-[0_10px_30px_rgba(59,130,246,0.3)] bg-blue-400"
        style={{ height: "50%" }}
        variants={{ hover: { z: 50, y: -15 } }}
        transition={{ duration: 0.45 }}
      />
    </motion.div>
  );
};

const MarkdownGraphic = () => {
  return (
    <motion.div style={base3D} className="relative w-48 h-60">
      <motion.div
        className="absolute inset-0 bg-white/5 border border-white/20 rounded-xl overflow-hidden flex flex-col shadow-2xl"
        variants={{ hover: { z: 10 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-400/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
          <div className="w-2 h-2 rounded-full bg-green-400/80" />
        </div>
        <div className="p-5 space-y-4">
          <div className="w-1/2 h-3 bg-white/30 rounded" />
          <div className="w-full h-2 bg-white/10 rounded" />
          <div className="w-5/6 h-2 bg-white/10 rounded" />
          <div className="w-2/3 h-2 bg-white/10 rounded" />
          <div className="w-full h-2 bg-white/10 rounded" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-24 -right-8 w-40 h-24 bg-purple-500/20 border border-purple-400/50 rounded-lg backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.2)]"
        variants={{ hover: { z: 50, x: 15, y: -15 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 space-y-3">
          <div className="w-1/3 h-2.5 bg-purple-300/80 rounded" />
          <div className="w-4/5 h-2 bg-purple-300/50 rounded" />
          <div className="w-1/2 h-2 bg-purple-300/50 rounded" />
          <div className="w-3/4 h-2 bg-purple-300/50 rounded" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExportGraphic = () => {
  return (
    <motion.div style={base3D} className="relative w-48 h-48">
      <motion.div
        className="absolute inset-4 bg-white/5 border border-white/10 rounded-xl shadow-xl"
        variants={{ hover: { z: 15, x: -5, y: -5 } }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-4 bg-white/10 border border-white/20 rounded-xl shadow-2xl backdrop-blur-sm"
        variants={{ hover: { z: 40, x: 10, y: 10 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-5 space-y-3">
          <div className="w-1/2 h-3 bg-cyan-400/50 rounded" />
          <div className="w-full h-2 bg-white/30 rounded" />
          <div className="w-3/4 h-2 bg-white/30 rounded" />
          <div className="w-5/6 h-2 bg-white/30 rounded" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        variants={{ hover: { z: 80, y: -20 } }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.8)] border border-cyan-300 relative z-50">
          <Download className="w-6 h-6 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const RealtimeGraphic = () => {
  return (
    <motion.div
      style={base3D}
      className="relative w-48 h-48 bg-zinc-900/80 border border-zinc-700/50 rounded-xl overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_100%)]" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{ hover: { z: 25 } }}
      >
        <div className="w-14 h-14 border-[4px] border-zinc-700 border-t-cyan-400 border-r-cyan-400 rounded-full group-hover:animate-spin shadow-[0_0_20px_rgba(6,182,212,0.2)]" />
      </motion.div>

      <motion.div
        className="absolute top-6 left-6 w-1/2 h-5 bg-white/10 rounded"
        variants={{ hover: { z: 50, y: -10 } }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute bottom-14 left-6 w-3/4 h-3 bg-white/10 rounded"
        variants={{ hover: { z: 60, y: 10 } }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-5/6 h-3 bg-white/10 rounded"
        variants={{ hover: { z: 80, y: 15 } }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
    </motion.div>
  );
};

const ResponsiveGraphic = () => {
  return (
    <motion.div style={base3D} className="relative w-56 h-48">
      {/* Desktop */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-28 bg-white/5 border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-md"
        variants={{ hover: { z: 20, x: -5, y: -5 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-4 bg-white/10" />
        <div className="flex-1 p-3 space-y-2">
          <div className="w-1/2 h-2 bg-white/30 rounded" />
          <div className="w-3/4 h-1.5 bg-white/20 rounded" />
          <div className="w-full h-1.5 bg-white/20 rounded" />
        </div>
      </motion.div>

      {/* Tablet */}
      <motion.div
        className="absolute bottom-4 left-14 w-20 h-32 bg-white/10 border border-white/20 rounded-lg overflow-hidden shadow-2xl backdrop-blur-md"
        variants={{ hover: { z: 45, x: 10, y: -10 } }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="w-full h-3 bg-white/20" />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="w-2/3 h-1.5 bg-white/40 rounded" />
          <div className="w-full h-1 bg-white/20 rounded" />
          <div className="w-4/5 h-1 bg-white/20 rounded" />
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="absolute bottom-0 left-0 w-12 h-20 bg-cyan-950 border border-cyan-400/50 rounded-md overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-md"
        variants={{ hover: { z: 70, x: 15, y: 10 } }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="w-full h-2 bg-cyan-500/50" />
        <div className="flex-1 p-1.5 space-y-1">
          <div className="w-full h-0.5 bg-white/60 rounded" />
          <div className="w-5/6 h-0.5 bg-white/40 rounded" />
          <div className="w-full h-0.5 bg-white/40 rounded" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const featuresData = [
  {
    title: "Automated Research Chat",
    description:
      "Natural research interactions with an intuitive chat UI. Ask in plain language and get comprehensive AI report generation.",
    className: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2",
    Graphic: ChatGraphic,
  },
  {
    title: "Interactive Data Visualizations",
    description:
      "Automatically generate Mermaid mind maps and Recharts data visualizations to break down complex research topics visually.",
    className: "col-span-1 md:col-span-1 lg:col-span-1",
    Graphic: VisualizationsGraphic,
  },
  {
    title: "Structured Markdown Reports",
    description:
      "Receive clean, readable markdown reports with syntax highlighting, charts, and timelines for deep analysis.",
    className: "col-span-1 md:col-span-1 lg:col-span-1",
    Graphic: MarkdownGraphic,
  },
  {
    title: "Instant Export & Archiving",
    description:
      "Download your automated research as PDF or text. Share and archive your AI-generated insights with one click.",
    className: "col-span-1 md:col-span-1 lg:col-span-1",
    Graphic: ExportGraphic,
  },
  {
    title: "Real-time AI Generation",
    description:
      "Live status and streaming so you see the AI report generation progress in real-time as the research runs.",
    className: "col-span-1 md:col-span-1 lg:col-span-1",
    Graphic: RealtimeGraphic,
  },
  {
    title: "Responsive & Accessible",
    description:
      "Your AI research assistant works seamlessly on desktop, tablet, and mobile with full keyboard navigation support.",
    className: "col-span-1 md:col-span-2 lg:col-span-1",
    Graphic: ResponsiveGraphic,
  },
];

function BentoCard({
  title,
  description,
  className,
  children,
  index,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
  index: number;
}) {
  const numberStr = (index + 1).toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      className={`relative overflow-hidden group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.08] transition-colors duration-500 w-full h-full flex flex-col ${className}`}
    >
      <div className="absolute top-6 left-6 text-sm font-mono text-cyan-400 font-bold z-20">
        {numberStr}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div
          style={{ perspective: "1000px" }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-20 pointer-events-none">
        <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 pointer-events-auto shrink-0">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed font-light pointer-events-auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#09090b]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-6 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Everything you need for deep research
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg text-center max-w-2xl mx-auto mb-20 font-light"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          From asking a question to exporting a fully automated report,
          SlickResearch keeps the workflow simple, scalable, and incredibly
          powerful.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[22rem]">
          {featuresData.map((feature, i) => (
            <BentoCard
              key={feature.title}
              index={i}
              title={feature.title}
              description={feature.description}
              className={feature.className}
            >
              <feature.Graphic />
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
