import { Compass } from "lucide-react";
import type { FutureDirection } from "../types/result.types";

interface FutureDirectionsSectionProps {
  futureDirections: FutureDirection[];
}

export const FutureDirectionsSection = ({
  futureDirections,
}: FutureDirectionsSectionProps) => {
  if (!futureDirections.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Future Directions
      </h3>
      <div className="space-y-4">
        {futureDirections.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/50 shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h4 className="font-medium text-black text-lg">{item.title}</h4>
              {item.timeframe && (
                <span className="text-xs px-2 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600">
                  {item.timeframe}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 text-lg">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
