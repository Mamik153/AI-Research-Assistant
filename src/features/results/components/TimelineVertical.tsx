import { Calendar } from "lucide-react";
import type { TimelineEvent } from "../types/result.types";

interface TimelineVerticalProps {
  events: TimelineEvent[];
}

export const TimelineVertical = ({ events }: TimelineVerticalProps) => {
  if (!events.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Timeline
      </h3>
      <div className="relative">
        {/* Full-height line through center of track (16px = center of w-8) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent rounded-full pointer-events-none"
          style={{ left: 15 }}
          aria-hidden
        />
        {events.map((evt, idx) => (
          <div key={idx} className="flex items-center gap-4 pb-8 last:pb-0">
            {/* Track: dot centered vertically with this row's card */}
            <div className="w-8 flex-shrink-0 flex items-center justify-center self-stretch">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-amber-300"></span>
              </span>
            </div>
            {/* Card */}
            <div className="flex-1 min-w-0 py-1">
              <div className="rounded-xl p-4 bg-white/50 shadow-sm transition">
                {evt.period && (
                  <div className="text-sm font-medium text-amber-500 mb-1">
                    {evt.period}
                  </div>
                )}
                <h4 className="font-medium text-black">{evt.event}</h4>
                {evt.significance && (
                  <p className="text-sm text-gray-400 mt-1">
                    {evt.significance}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
