import type { FutureDirection } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface FutureDirectionsSectionProps {
  futureDirections: FutureDirection[];
  confidence?: number;
  images?: string[];
}

export const FutureDirectionsSection = ({
  futureDirections,
  confidence,
  images,
}: FutureDirectionsSectionProps) => {
  if (!futureDirections.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 min-w-0 break-words">
        Future Directions
      </h3>
      <SectionMedia confidence={confidence} images={images} />
      <div className="space-y-4">
        {futureDirections.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:bg-white/10 transition"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h4 className="font-medium text-white/90 text-lg">
                {item.title}
              </h4>
              {item.timeframe && (
                <span className="text-xs px-2 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  {item.timeframe}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1 text-lg">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
