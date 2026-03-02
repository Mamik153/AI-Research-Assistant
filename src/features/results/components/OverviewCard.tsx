import type { OverviewSection } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface OverviewCardProps {
  overview: OverviewSection;
  confidence?: number;
  images?: string[];
}

export const OverviewCard = ({
  overview,
  confidence,
  images,
}: OverviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mb-8 min-w-0"
    >
      {overview.title && (
        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 break-words min-w-0">
          {overview.title}
        </h3>
      )}
      <SectionMedia confidence={confidence} images={images} />
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-lg text-gray-300 leading-relaxed shadow-sm min-w-0 break-words">
        <p className="min-w-0 break-words">{overview.content}</p>
      </div>
    </motion.div>
  );
};
