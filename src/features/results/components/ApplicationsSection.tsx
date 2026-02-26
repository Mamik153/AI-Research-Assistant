import type { ApplicationItem } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface ApplicationsSectionProps {
  applications: ApplicationItem[];
  confidence?: number;
  images?: string[];
}

export const ApplicationsSection = ({
  applications,
  confidence,
  images,
}: ApplicationsSectionProps) => {
  if (!applications.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Applications
      </h3>
      <SectionMedia confidence={confidence} images={images} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition group shadow-sm hover:bg-white/10"
          >
            <h4 className="font-medium text-white/90 transition text-lg">
              {item.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            {item.industry && (
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
                {item.industry}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
