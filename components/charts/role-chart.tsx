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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoleDistribution } from "@/lib/types";

interface RoleChartProps {
  title: string;
  data: RoleDistribution[];
  delay?: number;
}

const COLORS = [
  "hsl(var(--rift-cyan))",
  "hsl(var(--rift-purple))",
  "hsl(var(--rift-gold))",
  "hsl(var(--rift-emerald))",
  "hsl(var(--muted-foreground))",
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[250px] w-full">
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
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
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
                    <span style={{ color: "hsl(var(--foreground))", fontSize: 12 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

