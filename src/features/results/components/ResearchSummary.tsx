import { motion } from "motion/react";

interface ResearchSummaryProps {
  summary: string;
}

export const ResearchSummary = ({ summary }: ResearchSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Executive Summary
      </h3>
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-lg text-gray-300 leading-relaxed shadow-sm">
        <p>{summary}</p>
      </div>
    </motion.div>
  );
};
