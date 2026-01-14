"use client";

import { motion } from "framer-motion";
import { Share2, Download, Trophy, Target, Flame, Hammer, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RewindResult } from "@/lib/types";

interface ShareCardPreviewProps {
  result: RewindResult;
}

export function ShareCardPreview({ result }: ShareCardPreviewProps) {
  const handleShare = () => {
    // TODO: Implement share functionality
    // Could generate an image or copy a link
    if (navigator.share) {
      navigator.share({
        title: "My Forge Report",
        text: `I played ${result.insights.stats.gamesPlayed} games this season with ${result.insights.stats.winrate}% winrate! Forged in The Forge.`,
        url: window.location.href,
      });
    }
  };

  const handleDownload = () => {
    // TODO: Implement download as image
    // Would use html2canvas or similar
    alert("Image download coming soon from Ornn's workshop!");
  };

  const topChampion = result.insights.topChampions[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="forge-card relative rounded-lg p-6 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-frost-blue/5 via-transparent to-forge-ember/5" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-frost-blue/50 bg-frost-blue/10">
          <Share2 className="h-5 w-5 text-frost-light" />
        </div>
        <div>
          <h3 className="font-semibold text-frost-light">Share Your Journey</h3>
          <p className="text-xs text-frost-blue/60 uppercase tracking-wider">
            Display your forged achievements
          </p>
        </div>
      </div>

      {/* Preview card */}
      <div className="relative z-10 rounded-lg border-2 border-frost-dark bg-gradient-to-b from-mountain-stone/50 to-mountain-dark p-5 mb-4 overflow-hidden">
        {/* Mountain pattern background */}
        <div className="absolute inset-0 bg-mountains opacity-30" />
        
        {/* Inner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-forge-ember/10 blur-3xl rounded-full" />
        
        {/* Card content */}
        <div className="relative z-10">
          {/* Header with logo */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-forge-ember/50 bg-mountain-dark">
                <Hammer className="h-4 w-4 text-forge-ember" />
              </div>
              <div>
                <span className="font-display text-sm font-bold">
                  <span className="text-forge-ember">THE</span>{" "}
                  <span className="text-frost-light">FORGE</span>
                </span>
                <div className="text-[8px] text-frost-blue/60 tracking-widest uppercase flex items-center gap-1">
                  <Mountain className="h-2 w-2" />
                  Season {result.seasonFilter.year}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-frost-light font-medium">{result.player.gameName}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {result.player.region.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center rounded border border-frost-dark/50 bg-mountain-dark/50 p-2">
              <p className="text-xl font-bold text-frost-light">
                {result.insights.stats.gamesPlayed}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Battles
              </p>
            </div>
            <div className="text-center rounded border border-frost-blue/40 bg-frost-blue/10 p-2">
              <p className="text-xl font-bold text-frost-light">
                {result.insights.stats.winrate}%
              </p>
              <p className="text-[10px] text-frost-blue uppercase tracking-wider">
                Winrate
              </p>
            </div>
            <div className="text-center rounded border border-forge-ember/40 bg-forge-ember/10 p-2">
              <p className="text-xl font-bold text-forge-ember">
                {result.insights.stats.longestWinStreak}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Win Streak
              </p>
            </div>
          </div>

          {/* Top champion */}
          {topChampion && (
            <div className="flex items-center gap-3 rounded border border-forge-gold/40 bg-forge-gold/5 p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded border border-forge-gold/50 bg-mountain-dark">
                <Trophy className="h-5 w-5 text-forge-gold" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {topChampion.championName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {topChampion.gamesPlayed} games • {topChampion.winrate}% WR
                </p>
              </div>
              <Flame className="h-5 w-5 text-forge-ember" />
            </div>
          )}

          {/* Footer quote */}
          <p className="text-[9px] text-center text-muted-foreground/60 mt-3 italic">
            "Forged in the fires of Freljord"
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 relative z-10">
        <Button
          variant="outline"
          className="flex-1 border-frost-dark bg-mountain-dark hover:bg-frost-blue/20 hover:border-frost-blue"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button 
          className="flex-1 forge-button" 
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </motion.div>
  );
}
