import { BarChart3 } from 'lucide-react';
import type { StatisticItem } from '../types/result.types';

interface StatisticsCardsProps {
  statistics: StatisticItem[];
}

export const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  if (!statistics.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-emerald-400" />
        Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-emerald-500/30 transition"
          >
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            {stat.context && (
              <div className="text-xs text-gray-500 mt-1">{stat.context}</div>
            )}
            {stat.source && (
              <div className="text-xs text-gray-500 mt-0.5 italic">Source: {stat.source}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
