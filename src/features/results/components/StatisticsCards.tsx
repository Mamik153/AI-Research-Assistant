import type { StatisticItem } from "../types/result.types";
import { motion } from "motion/react";

interface StatisticsCardsProps {
  statistics: StatisticItem[];
}

export const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  if (!statistics.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition shadow-sm"
          >
            <div className="text-2xl font-bold text-white/90 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            {stat.context && (
              <div className="text-xs text-gray-500 mt-1">{stat.context}</div>
            )}
            {stat.source && (
              <div className="text-xs text-gray-500 mt-0.5 italic">
                Source: {stat.source}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
