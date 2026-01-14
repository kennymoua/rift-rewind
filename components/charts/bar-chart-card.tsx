"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Flame } from "lucide-react";

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xAxisKey: string;
}

// Freljord/Forge color palette
const BAR_COLORS = [
  "hsl(25 95% 55%)",   // forge-ember
  "hsl(195 100% 50%)", // frost-blue
  "hsl(38 90% 50%)",   // forge-gold
  "hsl(195 100% 70%)", // frost-light
  "hsl(15 100% 60%)",  // forge-flame
];

export function BarChartCard({
  title,
  subtitle,
  data,
  dataKey,
  xAxisKey,
}: BarChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="forge-card rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-forge-ember/50 bg-forge-ember/10">
          <Flame className="h-5 w-5 text-forge-ember" />
        </div>
        <div>
          <h3 className="font-semibold text-frost-light">{title}</h3>
          {subtitle && (
            <p className="text-xs text-frost-blue/60">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(210 30% 22%)" 
              vertical={false}
            />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 11, fill: "hsl(210 20% 55%)" }}
              axisLine={{ stroke: "hsl(210 30% 22%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(210 20% 55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(210 35% 12%)",
                border: "1px solid hsl(25 95% 55% / 0.3)",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "hsl(25 95% 55%)", fontWeight: 600 }}
              itemStyle={{ color: "hsl(195 30% 90%)" }}
              cursor={{ fill: "hsl(25 95% 55% / 0.1)" }}
            />
            <Bar 
              dataKey={dataKey} 
              radius={[4, 4, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
