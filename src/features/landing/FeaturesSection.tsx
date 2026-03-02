import { motion } from "motion/react";
import {
  MessageSquare,
  BarChart3,
  FileText,
  Download,
  Zap,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Automated Research Chat",
    description:
      "Natural research interactions with an intuitive chat UI. Ask in plain language and get comprehensive AI report generation.",
  },
  {
    icon: BarChart3,
    title: "Interactive Data Visualizations",
    description:
      "Automatically generate Mermaid mind maps and Recharts data visualizations to break down complex research topics visually.",
  },
  {
    icon: FileText,
    title: "Structured Markdown Reports",
    description:
      "Receive clean, readable markdown reports with syntax highlighting, comparison charts, and timelines for deep analysis.",
  },
  {
    icon: Download,
    title: "Instant Export & Archiving",
    description:
      "Download your automated research as PDF or text. Share and archive your AI-generated insights with one click.",
  },
  {
    icon: Zap,
    title: "Real-time AI Generation",
    description:
      "Live status and streaming so you see the AI report generation progress in real-time as the research runs.",
  },
  {
    icon: Smartphone,
    title: "Responsive & Accessible",
    description:
      "Your AI research assistant works seamlessly on desktop, tablet, and mobile with full keyboard navigation support.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Everything you need for deep research
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          From asking a question to exporting a report, SlickResearch keeps the workflow simple and powerful.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <feature.icon className="w-8 h-8 text-white/90 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
