import type { ApplicationItem } from "../types/result.types";

interface ApplicationsSectionProps {
  applications: ApplicationItem[];
}

export const ApplicationsSection = ({
  applications,
}: ApplicationsSectionProps) => {
  if (!applications.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        Applications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/50 transition group shadow-sm"
          >
            <h4 className="font-medium text-black transition text-lg">
              {item.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            {item.industry && (
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600">
                {item.industry}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
