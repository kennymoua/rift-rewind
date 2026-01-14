"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div
        className={cn(
          "relative lol-card rounded-lg p-5 transition-all hover:border-lol-gold/60",
          className
        )}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-lol-gold/40 rounded-tl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-lol-gold/40 rounded-tr" />
        
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-lol-gold/70 uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {value}
              </span>
              {trend && trendValue && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend === "up" && "text-emerald-400",
                    trend === "down" && "text-red-400",
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
            <div className="flex h-10 w-10 items-center justify-center rounded border border-lol-gold/30 bg-lol-darker">
              <Icon className="h-5 w-5 text-lol-gold" />
            </div>
          )}
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute inset-x-4 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-lol-gold/30 to-transparent" />
      </div>
    </motion.div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="lol-card rounded-lg p-5">
      <div className="space-y-3">
        <div className="h-3 w-20 animate-pulse rounded bg-lol-gold/10" />
        <div className="h-8 w-28 animate-pulse rounded bg-lol-gold/10" />
        <div className="h-3 w-16 animate-pulse rounded bg-lol-gold/10" />
      </div>
    </div>
  );
}
