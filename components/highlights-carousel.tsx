"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Skull, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import { cn, getChampionIconUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  best_match: "border-lol-gold bg-lol-gold/10",
  worst_match: "border-red-500/50 bg-red-500/10",
  longest_game: "border-lol-blue/50 bg-lol-blue/10",
  biggest_comeback: "border-emerald-500/50 bg-emerald-500/10",
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-lol-gold to-transparent" />
          <h3 className="text-lg font-semibold text-lol-gold uppercase tracking-wide">
            Season Highlights
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
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
            className="h-8 w-8 border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
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
            <div className={cn("lol-card rounded-lg border-2 p-6", colorClass)}>
              <div className="flex items-start gap-4">
                {/* Champion icon */}
                <div className="relative h-20 w-20 shrink-0 rounded border-2 border-lol-gold/50 overflow-hidden champion-frame">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-lol-gold/30 bg-lol-darker">
                      <Icon className="h-4 w-4 text-lol-gold" />
                    </div>
                    <h4 className="font-semibold text-lg text-lol-gold">
                      {current.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-mono font-bold text-foreground">
                        {current.stats.kda}
                      </span>
                      <span className="text-muted-foreground text-xs uppercase">KDA</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-mono font-bold text-foreground">
                        {current.stats.duration}
                      </span>
                      <span className="text-muted-foreground text-xs uppercase">Duration</span>
                    </div>
                    <div
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide",
                        current.stats.result === "Victory"
                          ? "bg-lol-gold/20 text-lol-gold"
                          : "bg-red-500/20 text-red-400"
                      )}
                    >
                      {current.stats.result}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                ? "w-6 bg-lol-gold"
                : "w-2 bg-lol-gold/30 hover:bg-lol-gold/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
