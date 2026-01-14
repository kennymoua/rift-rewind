"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all hover:shadow-lg hover:shadow-rift-cyan/10",
          className
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">
                  {value}
                </span>
                {trend && trendValue && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      trend === "up" && "text-emerald-500",
                      trend === "down" && "text-red-500",
                      trend === "neutral" && "text-muted-foreground"
                    )}
                  >
                    {trendValue}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {Icon && (
              <div className="rounded-lg bg-gradient-to-br from-rift-purple/20 to-rift-cyan/20 p-2.5">
                <Icon className="h-5 w-5 text-rift-cyan" />
              </div>
            )}
          </div>
        </CardContent>
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-rift-purple via-rift-cyan to-rift-gold opacity-50" />
      </Card>
    </motion.div>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}

