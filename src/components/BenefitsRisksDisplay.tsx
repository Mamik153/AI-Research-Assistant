import { TrendingUp, AlertTriangle } from 'lucide-react';
import type { BenefitItem, RiskItem } from '../types/research';

interface BenefitsRisksDisplayProps {
  benefits: BenefitItem[];
  risks: RiskItem[];
}

const importanceBadge = (importance?: string) => {
  if (!importance) return null;
  const map: Record<string, string> = {
    low: 'bg-gray-600/30 text-gray-400',
    medium: 'bg-amber-500/20 text-amber-400',
    high: 'bg-emerald-500/20 text-emerald-400',
  };
  return map[importance] ?? 'bg-gray-600/30 text-gray-400';
};

const severityBadge = (severity?: string) => {
  if (!severity) return null;
  const map: Record<string, string> = {
    low: 'bg-gray-600/30 text-gray-400',
    medium: 'bg-amber-500/20 text-amber-400',
    high: 'bg-red-500/20 text-red-400',
  };
  return map[severity] ?? 'bg-gray-600/30 text-gray-400';
};

export const BenefitsRisksDisplay = ({ benefits, risks }: BenefitsRisksDisplayProps) => {
  const hasBenefits = benefits.length > 0;
  const hasRisks = risks.length > 0;
  if (!hasBenefits && !hasRisks) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hasBenefits && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Benefits
          </h3>
          <div className="space-y-4">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/30 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-white">{item.title}</span>
                  {item.importance && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${importanceBadge(item.importance)}`}
                    >
                      {item.importance}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {hasRisks && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Risks
          </h3>
          <div className="space-y-4">
            {risks.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/30 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-white">{item.title}</span>
                  {item.severity && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${severityBadge(item.severity)}`}
                    >
                      {item.severity}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
