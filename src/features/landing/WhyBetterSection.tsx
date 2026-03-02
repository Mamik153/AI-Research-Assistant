import { motion } from "motion/react";
import { CheckCircle2, Search, Network, FileDown } from "lucide-react";

const differentiators = [
  {
    icon: CheckCircle2,
    title: "Verifiable & traceable answers",
    description:
      "Get answers you can trust. SlickResearch is built for precision and traceability, not just chat-style replies.",
  },
  {
    icon: Search,
    title: "Built for deep research",
    description:
      "Designed for comprehensive research and reports, not one-off Q&A. Go from topic to full analysis in one flow.",
  },
  {
    icon: Network,
    title: "Visual Knowledge Mapping",
    description:
      "Automatically break down complex topics into visual charts, mind maps, and interactive data visualizations.",
  },
  {
    icon: FileDown,
    title: "Instant Export & Archiving",
    description:
      "Export your AI-generated research reports directly to PDF or Markdown text for easy sharing and archiving.",
  },
];

export function WhyBetterSection() {
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
          Why SlickResearch
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Better than generic AI: built for research, built for teams, built for trust.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 flex gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <item.icon className="w-8 h-8 text-white/90 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
