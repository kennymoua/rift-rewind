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
  Area,
} from "recharts";
import type { WinrateDataPoint } from "@/lib/types";

interface LineChartCardProps {
  title: string;
  data: WinrateDataPoint[];
  delay?: number;
}

export function LineChartCard({ title, data, delay = 0 }: LineChartCardProps) {
  // Transform data for the chart
  const chartData = data.map((d) => ({
    name: d.period,
    winrate: Math.round(d.winrate * 100),
    games: d.games,
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
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWinrate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#c8aa6e"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#c8aa6e"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(200, 170, 110, 0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "rgba(200, 170, 110, 0.6)" }}
                  axisLine={{ stroke: "rgba(200, 170, 110, 0.2)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "rgba(200, 170, 110, 0.6)" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 40% 8%)",
                    border: "1px solid rgba(200, 170, 110, 0.3)",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [
                    `${value}%`,
                    "Win Rate",
                  ]}
                  labelStyle={{ color: "#c8aa6e" }}
                />
                <Area
                  type="monotone"
                  dataKey="winrate"
                  stroke="#c8aa6e"
                  fill="url(#colorWinrate)"
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="winrate"
                  stroke="#c8aa6e"
                  strokeWidth={2}
                  dot={{
                    fill: "#c8aa6e",
                    strokeWidth: 0,
                    r: 3,
                  }}
                  activeDot={{
                    r: 5,
                    fill: "#c8aa6e",
                    stroke: "hsl(220 40% 8%)",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
