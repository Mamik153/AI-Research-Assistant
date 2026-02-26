import { BarChart3 } from "lucide-react";
import type { StatisticItem } from "../types/result.types";

interface StatisticsCardsProps {
  statistics: StatisticItem[];
}

export const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  if (!statistics.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/50 transition shadow-sm"
          >
            <div className="text-2xl font-bold text-black mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            {stat.context && (
              <div className="text-xs text-gray-600 mt-1">{stat.context}</div>
            )}
            {stat.source && (
              <div className="text-xs text-gray-600 mt-0.5 italic">
                Source: {stat.source}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
