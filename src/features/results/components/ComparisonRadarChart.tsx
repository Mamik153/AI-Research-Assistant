import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
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

interface ComparisonRadarChartProps {
  comparisonData: ComparisonData;
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

const tooltipStyle = {
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "8px",
  padding: "10px 14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
};

function quantize(value: string): number {
  const normalized = String(value).toLowerCase().trim();
  if (normalized in QUALITY_MAP) return QUALITY_MAP[normalized];
  const n = parseFloat(normalized);
  if (!Number.isNaN(n)) return Math.min(3, Math.max(0, n));
  return 2;
}

interface BarTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function BarChartTooltip({ active, payload, label }: BarTooltipProps) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="rounded-lg bg-gray-200/80 backdrop-blur-lg px-3 py-2.5 shadow-xl">
      <div className="text-sm font-medium text-gray-900 mb-2">{label}</div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span style={{ color: entry.color }}>{entry.name}</span>
            <span className="text-gray-400 tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ComparisonRadarChart = ({
  comparisonData,
}: ComparisonRadarChartProps) => {
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

  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-2xl font-semibold text-black flex items-center gap-2">
          Comparison
        </h3>
        <div className="flex rounded-lg bg-gray-200 p-1 gap-0.5">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === id
                  ? "bg-white text-gray-800"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/50 p-6 rounded-2xl shadow-sm">
        {view === "radar" && (
          <div className="h-[380px] w-full min-h-0" style={{ minWidth: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={data}
                margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#d9dadde3",
                    borderRadius: "9px",
                  }}
                  labelStyle={{ color: "#303030ff" }}
                />
                <Legend
                  wrapperStyle={{ color: "#ddddddff" }}
                  formatter={(value) => (
                    <span className="text-gray-500">{value}</span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {view === "bar" && (
          <div className="h-[360px] w-full min-h-0 overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 16, right: 16, bottom: 32, left: 8 }}
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
                <Tooltip content={<BarChartTooltip />} cursor={false} />
                <Legend
                  formatter={(value) => (
                    <span className="text-gray-300">{value}</span>
                  )}
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
          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                  <th className="px-4 py-3 text-gray-600 font-semibold">
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
                    className="border-b border-gray-300 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3 text-gray-600">{subject}</td>
                    {items.map((item) => (
                      <td key={item.name} className="px-4 py-3 text-gray-600">
                        {item.values[i] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
