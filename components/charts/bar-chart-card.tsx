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
import type { ChampionStats } from "@/lib/types";

interface BarChartCardProps {
  title: string;
  data: ChampionStats[];
  delay?: number;
}

// LoL-themed colors
const COLORS = [
  "#c8aa6e", // Gold
  "#0ac8b9", // Hextech cyan
  "#c89b3c", // Bronze gold
  "#5b5a56", // Silver
  "#785a28", // Bronze
];

export function BarChartCard({ title, data, delay = 0 }: BarChartCardProps) {
  // Transform data for the chart
  const chartData = data.slice(0, 5).map((d) => ({
    name: d.championName.length > 8 ? d.championName.slice(0, 7) + "…" : d.championName,
    fullName: d.championName,
    games: d.gamesPlayed,
    winrate: Math.round(d.winrate * 100),
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
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(200, 170, 110, 0.1)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "rgba(200, 170, 110, 0.6)" }}
                  axisLine={{ stroke: "rgba(200, 170, 110, 0.2)" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "rgba(200, 170, 110, 0.8)" }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 40% 8%)",
                    border: "1px solid rgba(200, 170, 110, 0.3)",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "games" ? `${value} games` : `${value}%`,
                    name === "games" ? "Games" : "Win Rate",
                  ]}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullName || label;
                  }}
                  labelStyle={{ color: "#c8aa6e", fontWeight: 600 }}
                />
                <Bar dataKey="games" radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
