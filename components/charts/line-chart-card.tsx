"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xAxisKey: string;
}

export function LineChartCard({
  title,
  subtitle,
  data,
  dataKey,
  xAxisKey,
}: LineChartCardProps) {
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
          <TrendingUp className="h-5 w-5 text-frost-light" />
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
          <LineChart
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
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(210 35% 12%)",
                border: "1px solid hsl(195 100% 50% / 0.3)",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "hsl(195 100% 70%)", fontWeight: 600 }}
              itemStyle={{ color: "hsl(195 30% 90%)" }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(195 100% 50%)"
              strokeWidth={3}
              dot={{
                fill: "hsl(210 40% 8%)",
                stroke: "hsl(195 100% 50%)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: "hsl(195 100% 70%)",
                stroke: "hsl(195 100% 50%)",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
