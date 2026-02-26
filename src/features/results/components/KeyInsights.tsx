import { motion } from "motion/react";

interface KeyInsightsProps {
  insights: string[];
}

export const KeyInsights = ({ insights }: KeyInsightsProps) => {
  if (!insights || insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Key Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight: string, idx: number) => (
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
            className="group p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-300 relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-colors"></div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-sm border border-yellow-500/20">
                {idx + 1}
              </span>
              <p className="text-white/90 transition-colors leading-relaxed text-lg">
                {insight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
