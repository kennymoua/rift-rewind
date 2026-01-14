"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Shield } from "lucide-react";
import type { RoleDistribution } from "@/lib/types";

interface RoleChartProps {
  data: RoleDistribution[];
}

// Freljord color palette for roles
const ROLE_COLORS: Record<string, string> = {
  TOP: "hsl(25 95% 55%)",      // forge-ember
  JUNGLE: "hsl(120 50% 40%)",  // forest green
  MID: "hsl(38 90% 50%)",      // forge-gold
  ADC: "hsl(195 100% 50%)",    // frost-blue
  SUPPORT: "hsl(195 100% 70%)", // frost-light
};

export function RoleChart({ data }: RoleChartProps) {
  const chartData = data.map((item) => ({
    name: item.role,
    value: item.games,
    percentage: item.percentage,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; percentage: number } }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="forge-card rounded-lg p-3 border border-frost-dark">
          <p className="font-semibold text-frost-light mb-1">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            Games: <span className="text-foreground">{item.value}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="text-frost-blue">{item.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="forge-card rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-frost-blue/50 bg-frost-blue/10">
          <Shield className="h-5 w-5 text-frost-light" />
        </div>
        <div>
          <h3 className="font-semibold text-frost-light">Role Specialization</h3>
          <p className="text-xs text-frost-blue/60">
            Where you've been forging your skills
          </p>
        </div>
      </div>

      {/* Chart and legend container */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Pie chart */}
        <div className="h-[200px] w-full md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(210 40% 8%)"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ROLE_COLORS[entry.name] || "hsl(210 20% 55%)"}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom legend with stats */}
        <div className="flex-1 space-y-2">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-frost-dark/50 bg-mountain-dark/50 p-3 hover:border-frost-blue/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor:
                      ROLE_COLORS[item.name] || "hsl(210 20% 55%)",
                  }}
                />
                <span className="text-sm font-medium text-frost-light">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  {item.value} <span className="text-xs">games</span>
                </span>
                <span className="text-frost-blue font-medium">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
