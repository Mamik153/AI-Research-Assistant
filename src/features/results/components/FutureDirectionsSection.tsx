import { Compass } from 'lucide-react';
import type { FutureDirection } from '../types/result.types';

interface FutureDirectionsSectionProps {
  futureDirections: FutureDirection[];
}

export const FutureDirectionsSection = ({ futureDirections }: FutureDirectionsSectionProps) => {
  if (!futureDirections.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Compass className="w-5 h-5 text-indigo-400" />
        Future Directions
      </h3>
      <div className="space-y-4">
        {futureDirections.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-indigo-500/30 transition"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h4 className="font-medium text-white">{item.title}</h4>
              {item.timeframe && (
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                  {item.timeframe}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
