import { memo, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BarChart2, Radar as RadarIcon, Table2 } from "lucide-react";
import type { ComparisonData } from "../types/result.types";
import { motion } from "motion/react";
import { Badge } from "@/shared/components/ui/badge";

interface ComparisonRadarChartProps {
  comparisonData: ComparisonData;
  confidence?: number;
  images?: string[];
}

type ChartView = "radar" | "bar" | "table";

const QUALITY_MAP: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
  yes: 3,
  no: 0,
};
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

function quantize(value: string): number {
  const normalized = String(value).toLowerCase().trim();
  if (normalized in QUALITY_MAP) return QUALITY_MAP[normalized];
  const n = parseFloat(normalized);
  if (!Number.isNaN(n)) return Math.min(3, Math.max(0, n));
  return 2;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1117]/90 backdrop-blur-xl p-4 shadow-2xl max-w-[320px]">
      <div className="text-sm font-semibold text-white mb-3 border-b border-white/10 pb-2">
        {label}
      </div>

      <div className="space-y-3">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <div className="flex items-start gap-2.5 mt-0.5">
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                style={{
                  backgroundColor: entry.color,
                  boxShadow: `0 0 8px ${entry.color}80`,
                }}
              />
              <span className="text-gray-300 font-medium leading-snug">
                {entry.name}
              </span>
            </div>
            <span className="text-white font-semibold tabular-nums shrink-0 mt-0.5">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ComparisonRadarChart = memo(
  ({ comparisonData, confidence }: ComparisonRadarChartProps) => {
    const [view, setView] = useState<ChartView>("radar");
    const { criteria, items } = comparisonData;
    if (!criteria.length || !items.length) return null;

    const data = criteria.map((subject, i) => {
      const point: Record<string, string | number> = { subject };
      items.forEach((item) => {
        const raw = item.values[i];
        point[item.name] = quantize(raw ?? "");
      });
      return point;
    });

    const tabs: { id: ChartView; label: string; icon: React.ReactNode }[] = [
      { id: "radar", label: "Radar", icon: <RadarIcon className="w-4 h-4" /> },
      { id: "bar", label: "Bar", icon: <BarChart2 className="w-4 h-4" /> },
      { id: "table", label: "Table", icon: <Table2 className="w-4 h-4" /> },
    ];

    // Format confidence
    const confPercent =
      confidence != null ? Math.round(confidence * 100) : null;

    let badgeColor = "bg-blue-500 hover:bg-blue-600";
    if (confPercent != null) {
      if (confPercent >= 80)
        badgeColor =
          "bg-green-500/20 border border-green-500/40 text-green-500";
      else if (confPercent >= 50)
        badgeColor =
          "bg-yellow-500/20 border border-yellow-500/40 text-yellow-500";
      else badgeColor = "bg-red-500/20 border border-red-500/40 text-red-500";
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="w-full mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            Comparison
          </h3>
          <div className="section-media my-4 space-y-4">
            {confPercent != null && (
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-white shadow-sm ${badgeColor}`}>
                  Confidence: {confPercent}%
                </Badge>
              </div>
            )}
          </div>
          <div className="flex rounded-lg bg-gray-200/10 p-1.5 gap-0.5">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  view === id
                    ? "bg-white text-gray-800"
                    : "text-gray-500 hover:text-gray-400"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* <SectionMedia confidence={confidence} images={images} />*/}

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
          {view === "radar" && (
            <div className="min-h-[380px] w-full" style={{ minWidth: 280 }}>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={data}
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  >
                    <PolarGrid stroke="#9fa8b6ff" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      tickLine={{ stroke: "#4b5563" }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 3]}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      tickCount={4}
                    />
                    {items.map((item, idx) => (
                      <Radar
                        key={item.name}
                        name={item.name}
                        dataKey={item.name}
                        stroke={COLORS[idx % COLORS.length]}
                        fill={COLORS[idx % COLORS.length]}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    ))}
                    <Tooltip content={<CustomChartTooltip />} cursor={false} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {view === "bar" && (
            <div className="h-[380px] w-full min-h-0 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 16, right: 16, bottom: 16, left: 8 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    domain={[0, 3]}
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="subject"
                    width={120}
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomChartTooltip />}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  />
                  {items.map((item, idx) => (
                    <Bar
                      key={item.name}
                      dataKey={item.name}
                      fill={COLORS[idx % COLORS.length]}
                      radius={[0, 4, 4, 0]}
                      cursor="pointer"
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {view === "table" && (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-gray-300 font-semibold">
                      Criteria
                    </th>
                    {items.map((item, idx) => (
                      <th
                        key={item.name}
                        className="px-4 py-3 font-semibold"
                        style={{ color: COLORS[idx % COLORS.length] }}
                      >
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((subject, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="px-4 py-3 text-gray-300">{subject}</td>
                      {items.map((item) => (
                        <td key={item.name} className="px-4 py-3 text-gray-300">
                          {item.values[i] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view !== "table" && (
            <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
              {items.map((item, idx) => {
                const color = COLORS[idx % COLORS.length];
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10 cursor-default shadow-sm max-w-full"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}80`,
                      }}
                    />
                    <span className="text-xs font-medium text-gray-200 tracking-wide truncate">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);
