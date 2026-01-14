"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "The Forge Has Cooled",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16"
    >
      {/* Error icon with frost effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-frost-blue/20 blur-2xl rounded-full" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border-2 border-frost-blue/50 bg-gradient-to-b from-frost-dark to-mountain-dark">
          <Snowflake className="h-10 w-10 text-frost-light" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/20 border border-destructive/50">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
      </div>

      <h3 className="text-xl font-display font-semibold text-frost-light mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="forge-button"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Rekindle the Flames
        </Button>
      )}

      <p className="text-xs text-muted-foreground/60 mt-6 text-center italic">
        "Even the greatest forge masters face setbacks."
      </p>
    </motion.div>
  );
}
