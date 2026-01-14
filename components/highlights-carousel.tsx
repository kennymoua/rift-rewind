"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Skull, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import { cn, getChampionIconUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MatchHighlight } from "@/lib/types";

interface HighlightsCarouselProps {
  highlights: MatchHighlight[];
}

const highlightIcons = {
  best_match: Trophy,
  worst_match: Skull,
  longest_game: Clock,
  biggest_comeback: TrendingUp,
};

const highlightColors = {
  best_match: "from-amber-500/20 to-yellow-500/20 border-amber-500/50",
  worst_match: "from-red-500/20 to-rose-500/20 border-red-500/50",
  longest_game: "from-blue-500/20 to-cyan-500/20 border-blue-500/50",
  biggest_comeback: "from-emerald-500/20 to-green-500/20 border-emerald-500/50",
};

export function HighlightsCarousel({ highlights }: HighlightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? highlights.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === highlights.length - 1 ? 0 : prev + 1
    );
  };

  if (highlights.length === 0) {
    return null;
  }

  const current = highlights[currentIndex];
  const Icon = highlightIcons[current.type];
  const colorClass = highlightColors[current.type];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Season Highlights</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
            {currentIndex + 1} / {highlights.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn("border-2 bg-gradient-to-br", colorClass)}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Champion icon */}
                  <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 border-background shadow-lg">
                    <Image
                      src={getChampionIconUrl(current.championName)}
                      alt={current.championName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="font-semibold text-lg">{current.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {current.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-mono font-semibold">
                          {current.stats.kda}
                        </span>
                        <span className="text-muted-foreground">KDA</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="font-mono font-semibold">
                          {current.stats.duration}
                        </span>
                        <span className="text-muted-foreground">Duration</span>
                      </div>
                      <div
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          current.stats.result === "Victory"
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-red-500/20 text-red-500"
                        )}
                      >
                        {current.stats.result}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-6 bg-rift-cyan"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

