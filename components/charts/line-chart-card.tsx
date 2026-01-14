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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWinrate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--rift-cyan))"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--rift-cyan))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === "winrate" ? "Win Rate" : name,
                  ]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="winrate"
                  stroke="hsl(var(--rift-cyan))"
                  strokeWidth={2}
                  dot={{
                    fill: "hsl(var(--rift-cyan))",
                    strokeWidth: 0,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--rift-cyan))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                  fill="url(#colorWinrate)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

