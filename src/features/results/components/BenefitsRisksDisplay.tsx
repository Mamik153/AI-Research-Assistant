import type { BenefitItem, RiskItem } from "../types/result.types";

interface BenefitsRisksDisplayProps {
  benefits: BenefitItem[];
  risks: RiskItem[];
}

const importanceBadge = (importance?: string) => {
  if (!importance) return null;
  const map: Record<string, string> = {
    low: "bg-gray-600/20 text-gray-600",
    medium: "bg-amber-500/20 text-amber-600",
    high: "bg-emerald-500/20 text-emerald-600",
  };
  return map[importance] ?? "bg-gray-600/30 text-gray-600";
};

const severityBadge = (severity?: string) => {
  if (!severity) return null;
  const map: Record<string, string> = {
    low: "bg-gray-600/30 text-gray-600",
    medium: "bg-amber-500/20 text-amber-600",
    high: "bg-red-500/20 text-red-600",
  };
  return map[severity] ?? "bg-gray-600/30 text-gray-600";
};

export const BenefitsRisksDisplay = ({
  benefits,
  risks,
}: BenefitsRisksDisplayProps) => {
  const hasBenefits = benefits.length > 0;
  const hasRisks = risks.length > 0;
  if (!hasBenefits && !hasRisks) return null;

  return (
    <div className="grid grid-cols-1 gap-8 mb-8">
      {hasBenefits && (
        <div className="rounded-2xl transition group h-max">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            Benefits
          </h3>
          <div className="space-y-4">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/30 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-black text-xl">
                    {item.title}
                  </span>
                  {item.importance && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${importanceBadge(item.importance)}`}
                    >
                      {item.importance}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {hasRisks && (
        <div className="rounded-2xl h-max transition group">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            Risks
          </h3>
          <div className="space-y-4">
            {risks.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/30 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-black text-xl">
                    {item.title}
                  </span>
                  {item.severity && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${severityBadge(item.severity)}`}
                    >
                      {item.severity}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
