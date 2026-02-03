import { Calendar } from 'lucide-react';
import type { TimelineEvent } from '../types/research';

interface TimelineVerticalProps {
  events: TimelineEvent[];
}

export const TimelineVertical = ({ events }: TimelineVerticalProps) => {
  if (!events.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-amber-400" />
        Timeline
      </h3>
      <div className="relative">
        {/* Full-height line through center of track (16px = center of w-8) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-500/40 rounded-full pointer-events-none"
          style={{ left: 15 }}
          aria-hidden
        />
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 pb-8 last:pb-0"
          >
            {/* Track: dot centered vertically with this row's card */}
            <div className="w-8 flex-shrink-0 flex items-center justify-center self-stretch">
              <div className="w-6 h-6 rounded-full bg-amber-500/30 border-2 border-amber-500 flex items-center justify-center z-10 shrink-0">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
            {/* Card */}
            <div className="flex-1 min-w-0 py-1">
              <div className="rounded-xl p-4 bg-gray-800/50 border border-gray-700 hover:border-amber-500/30 transition">
                {evt.period && (
                  <div className="text-sm font-medium text-amber-400/90 mb-1">{evt.period}</div>
                )}
                <h4 className="font-medium text-white">{evt.event}</h4>
                {evt.significance && (
                  <p className="text-sm text-gray-400 mt-1">{evt.significance}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
