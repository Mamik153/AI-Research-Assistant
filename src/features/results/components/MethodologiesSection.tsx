import type { Methodology } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface MethodologiesSectionProps {
  methodologies: Methodology[];
  confidence?: number;
  images?: string[];
}

export const MethodologiesSection = ({
  methodologies,
  confidence,
  images,
}: MethodologiesSectionProps) => {
  if (!methodologies.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 min-w-0 break-words">
        Methodologies
      </h3>
      <SectionMedia confidence={confidence} images={images} />
      <div className="space-y-4">
        {methodologies.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:bg-white/10 transition"
          >
            <h4 className="font-medium text-white/90">{item.name}</h4>
            <p className="text-sm text-gray-400 mt-1 text-lg">
              {item.description}
            </p>
            {item.use_cases && item.use_cases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.use_cases.map((uc, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
