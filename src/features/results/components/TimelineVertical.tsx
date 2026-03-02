import type { TimelineEvent } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface TimelineVerticalProps {
  events: TimelineEvent[];
  confidence?: number;
  images?: string[];
}

export const TimelineVertical = ({
  events,
  confidence,
  images,
}: TimelineVerticalProps) => {
  if (!events.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 min-w-0 break-words">
        Timeline
      </h3>
      <SectionMedia confidence={confidence} images={images} />
      <div className="relative">
        {/* Full-height line through center of track (16px = center of w-8) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent rounded-full pointer-events-none"
          style={{ left: 15 }}
          aria-hidden
        />
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-4 pb-8 last:pb-0"
          >
            {/* Track: dot centered vertically with this row's card */}
            <div className="w-8 flex-shrink-0 flex items-center justify-center self-stretch">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-amber-300"></span>
              </span>
            </div>
            {/* Card */}
            <div className="flex-1 min-w-0 py-1">
              <div className="rounded-xl p-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-sm transition hover:bg-white/10">
                {evt.period && (
                  <div className="text-sm font-medium text-amber-500 mb-1">
                    {evt.period}
                  </div>
                )}
                <h4 className="font-medium text-white/90">{evt.event}</h4>
                {evt.significance && (
                  <p className="text-sm text-gray-400 mt-1">
                    {evt.significance}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
