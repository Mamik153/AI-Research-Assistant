import type { BenefitItem, RiskItem } from "../types/result.types";
import { motion } from "motion/react";

import { SectionMedia } from "./SectionMedia";

interface BenefitsRisksDisplayProps {
  benefits: BenefitItem[];
  risks: RiskItem[];
  confidence?: number;
  images?: string[];
}

const importanceBadge = (importance?: string) => {
  if (!importance) return null;
  const map: Record<string, string> = {
    low: "bg-gray-500/20 text-gray-400 border border-gray-500/20",
    medium: "bg-amber-500/20 text-amber-500 border border-amber-500/20",
    high: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20",
  };
  return (
    map[importance] ?? "bg-gray-500/20 text-gray-400 border border-gray-500/20"
  );
};

const severityBadge = (severity?: string) => {
  if (!severity) return null;
  const map: Record<string, string> = {
    low: "bg-gray-500/20 text-gray-400 border border-gray-500/20",
    medium: "bg-amber-500/20 text-amber-500 border border-amber-500/20",
    high: "bg-red-500/20 text-red-400 border border-red-500/20",
  };
  return (
    map[severity] ?? "bg-gray-500/20 text-gray-400 border border-gray-500/20"
  );
};

export const BenefitsRisksDisplay = ({
  benefits,
  risks,
  confidence,
  images,
}: BenefitsRisksDisplayProps) => {
  const hasBenefits = benefits.length > 0;
  const hasRisks = risks.length > 0;
  if (!hasBenefits && !hasRisks) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-8 min-w-0 w-full"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 break-words min-w-0">
        Benefits & Risks
      </h3>
      <SectionMedia confidence={confidence} images={images} />

      <div className="grid gap-8 min-w-0">
        {hasBenefits && (
          <div className="rounded-2xl transition group h-max min-w-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 break-words min-w-0">
              Benefits
            </h3>
            <div className="space-y-4">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-emerald-500/5 backdrop-blur-md border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition min-w-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-1 min-w-0">
                    <span className="font-medium text-white/90 text-lg break-words min-w-0">
                      {item.title}
                    </span>
                    {item.importance && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${importanceBadge(item.importance)}`}
                      >
                        {item.importance}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-emerald-100/70 break-words">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {hasRisks && (
          <div className="rounded-2xl h-max transition group min-w-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2 break-words min-w-0">
              Risks
            </h3>
            <div className="space-y-4">
              {risks.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-red-500/5 backdrop-blur-md border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30 transition min-w-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-1 min-w-0">
                    <span className="font-medium text-white/90 text-lg break-words min-w-0">
                      {item.title}
                    </span>
                    {item.severity && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${severityBadge(item.severity)}`}
                      >
                        {item.severity}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-red-100/70 break-words">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
