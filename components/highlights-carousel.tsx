"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Skull, Timer, Flame, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDuration } from "@/lib/utils";
import type { MatchSummary } from "@/lib/types";

interface HighlightsCarouselProps {
  highlights: Array<{
    type: "best" | "worst";
    title: string;
    match: MatchSummary;
  }>;
}

const highlightIcons = {
  best: Trophy,
  worst: Skull,
};

const highlightColors = {
  best: "frost",
  worst: "ember",
};

export function HighlightsCarousel({ highlights }: HighlightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? highlights.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === highlights.length - 1 ? 0 : prev + 1
    );
  };

  if (!highlights.length) return null;

  const current = highlights[currentIndex];
  const Icon = highlightIcons[current.type] || Trophy;
  const colorTheme = highlightColors[current.type] || "frost";

  return (
    <div className="forge-card relative rounded-lg p-6 overflow-hidden">
      {/* Background glow based on highlight type */}
      <div className={cn(
        "absolute inset-0 opacity-10",
        colorTheme === "frost" 
          ? "bg-gradient-to-br from-frost-blue/20 to-transparent" 
          : "bg-gradient-to-br from-forge-ember/20 to-transparent"
      )} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border",
            colorTheme === "frost" 
              ? "border-frost-blue/50 bg-frost-blue/10" 
              : "border-forge-ember/50 bg-forge-ember/10"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              colorTheme === "frost" ? "text-frost-light" : "text-forge-ember"
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-frost-light">Battle Memories</h3>
            <p className="text-xs text-frost-blue/60 uppercase tracking-wider">
              Forged in {highlights.length} Moments
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-frost-dark bg-mountain-dark hover:bg-frost-blue/20 hover:border-frost-blue"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {currentIndex + 1} / {highlights.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-frost-dark bg-mountain-dark hover:bg-frost-blue/20 hover:border-frost-blue"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel content */}
      <div className="relative min-h-[180px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className={cn(
              "text-lg font-semibold",
              colorTheme === "frost" ? "text-frost-light" : "text-forge-ember"
            )}>
              {current.title}
            </h4>

            <div className="rounded-lg border border-frost-dark/50 bg-mountain-dark/50 p-4">
              <div className="flex flex-wrap gap-4">
                {/* Champion */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-14 w-14 rounded-lg border-2 bg-mountain-stone flex items-center justify-center",
                    current.match.win ? "border-frost-blue/50" : "border-forge-ember/50"
                  )}>
                    <span className="text-lg font-bold text-frost-light">
                      {current.match.championName.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {current.match.championName}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        current.match.win ? "victory" : "defeat"
                      )}
                    >
                      {current.match.win ? "Victory" : "Defeat"}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 ml-auto">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">
                      {current.match.kills}/{current.match.deaths}/
                      {current.match.assists}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">KDA</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-frost-light">
                      {current.match.cs}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">CS</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Timer className="h-3 w-3 text-frost-blue" />
                      <p className="text-lg font-bold text-foreground">
                        {formatDuration(current.match.gameDuration)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-4 relative z-10">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              index === currentIndex
                ? colorTheme === "frost" 
                  ? "w-6 bg-frost-blue" 
                  : "w-6 bg-forge-ember"
                : "w-1.5 bg-frost-dark hover:bg-frost-blue/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
