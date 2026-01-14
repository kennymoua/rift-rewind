"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check, ExternalLink, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isShareCardsEnabled } from "@/lib/constants";
import type { RewindResult } from "@/lib/types";

interface ShareCardPreviewProps {
  result: RewindResult;
  delay?: number;
}

export function ShareCardPreview({ result, delay = 0 }: ShareCardPreviewProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/rewind/${result.jobId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${result.player.gameName}'s Rift Rewind ${result.seasonFilter.year}`,
          text: `Check out my League of Legends season recap!`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="lol-card rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-lol-gold/20">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-lol-gold" />
            <h3 className="font-semibold text-lol-gold uppercase tracking-wide">
              Share Your Rewind
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Preview card */}
          <div className="relative aspect-[1200/630] w-full rounded border-2 border-lol-gold/30 overflow-hidden bg-gradient-to-br from-lol-dark via-lol-darker to-lol-dark">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-hextech opacity-50" />
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-lol-gold/50" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-lol-gold/50" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-lol-gold/50" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-lol-gold/50" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-3">
                <Swords className="h-5 w-5 text-lol-gold" />
                <span className="text-xs uppercase tracking-widest text-lol-gold/70">
                  Rift Rewind
                </span>
              </div>
              
              {/* Player name */}
              <div className="text-xl font-bold mb-1">
                <span className="text-lol-gold">{result.player.gameName}</span>
                <span className="text-muted-foreground">#{result.player.tagLine}</span>
              </div>
              
              {/* Season */}
              <div className="text-3xl font-bold text-lol-gold mb-4">
                Season {result.seasonFilter.year}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {result.insights.stats.gamesPlayed}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Games
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {(result.insights.stats.winrate * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Win Rate
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {result.insights.stats.avgKda.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Avg KDA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-1 border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
              onClick={handleShare}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Share
            </Button>

            {isShareCardsEnabled() && (
              <Button
                className="w-full mt-2 lol-button"
                onClick={() => {
                  alert("Share card generation coming soon!");
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Share Card
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Share your legendary season with friends!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
