"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | null;
  className?: string;
  delay?: number;
  variant?: "default" | "highlight" | "ember" | "frost";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
  variant = "default",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "forge-card relative rounded-lg p-5 group overflow-hidden",
        variant === "highlight" && "border-frost-blue/50 hover:border-frost-blue",
        variant === "ember" && "border-forge-ember/50 hover:border-forge-ember hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]",
        variant === "frost" && "border-frost-blue/30 hover:border-frost-light",
        className
      )}
    >
      {/* Subtle background glow */}
      {variant === "ember" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-forge-ember/5 blur-2xl rounded-full" />
      )}
      {variant === "frost" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-frost-blue/5 blur-2xl rounded-full" />
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-medium text-frost-blue uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className={cn(
              "text-2xl font-bold tracking-tight",
              variant === "ember" ? "text-forge-ember" : "text-foreground"
            )}>
              {value}
            </p>
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs",
                  trend === "up" ? "text-frost-light" : "text-forge-ember"
                )}
              >
                {trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded border transition-colors",
            variant === "ember" 
              ? "border-forge-ember/40 bg-forge-ember/10 group-hover:bg-forge-ember/20" 
              : "border-frost-dark bg-mountain-dark group-hover:border-frost-blue/50"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              variant === "ember" ? "text-forge-ember" : "text-frost-blue"
            )} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
