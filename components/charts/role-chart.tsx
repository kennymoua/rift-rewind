"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { RoleDistribution } from "@/lib/types";

interface RoleChartProps {
  title: string;
  data: RoleDistribution[];
  delay?: number;
}

// LoL-themed colors for roles
const COLORS = [
  "#c8aa6e", // Gold - Primary
  "#0ac8b9", // Hextech cyan
  "#c89b3c", // Bronze gold
  "#0397ab", // Teal
  "#5b5a56", // Silver/gray
];

export function RoleChart({ title, data, delay = 0 }: RoleChartProps) {
  const chartData = data.map((d) => ({
    name: d.role,
    value: d.games,
    percentage: d.percentage,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="lol-card rounded-lg overflow-hidden">
        <div className="p-4 border-b border-lol-gold/20">
          <h3 className="text-sm font-semibold text-lol-gold uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <div className="p-4">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="hsl(220 40% 8%)"
                  strokeWidth={2}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 40% 8%)",
                    border: "1px solid rgba(200, 170, 110, 0.3)",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string, props: unknown) => {
                    const entry = props as { payload: { percentage: number } };
                    return [
                      `${value} games (${entry.payload.percentage.toFixed(1)}%)`,
                      name,
                    ];
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: "rgba(200, 170, 110, 0.8)", fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
