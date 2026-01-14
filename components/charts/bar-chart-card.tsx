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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChampionStats } from "@/lib/types";

interface BarChartCardProps {
  title: string;
  data: ChampionStats[];
  delay?: number;
}

const COLORS = [
  "hsl(var(--rift-cyan))",
  "hsl(var(--rift-purple))",
  "hsl(var(--rift-gold))",
  "hsl(var(--rift-emerald))",
  "hsl(var(--muted-foreground))",
];

export function BarChartCard({ title, data, delay = 0 }: BarChartCardProps) {
  // Transform data for the chart
  const chartData = data.slice(0, 5).map((d) => ({
    name: d.championName.length > 10 ? d.championName.slice(0, 8) + "..." : d.championName,
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "games" ? `${value} games` : `${value}%`,
                    name === "games" ? "Games Played" : "Win Rate",
                  ]}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullName || label;
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
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
        </CardContent>
      </Card>
    </motion.div>
  );
}

