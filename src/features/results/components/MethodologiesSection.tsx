import type { Methodology } from "../types/result.types";

interface MethodologiesSectionProps {
  methodologies: Methodology[];
}

export const MethodologiesSection = ({
  methodologies,
}: MethodologiesSectionProps) => {
  if (!methodologies.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Methodologies
      </h3>
      <div className="space-y-4">
        {methodologies.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/50 shadow-sm transition"
          >
            <h4 className="font-medium text-black">{item.name}</h4>
            <p className="text-sm text-gray-500 mt-1 text-lg">
              {item.description}
            </p>
            {item.use_cases && item.use_cases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.use_cases.map((uc, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/10 text-purple-600"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
