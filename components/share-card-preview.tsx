"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        // User cancelled or error
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Rewind
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview card mock */}
          <div className="relative aspect-[1200/630] w-full rounded-lg border bg-gradient-to-br from-rift-purple/20 via-background to-rift-cyan/20 overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="text-2xl font-bold mb-2">
                {result.player.gameName}
                <span className="text-muted-foreground">
                  #{result.player.tagLine}
                </span>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-rift-purple to-rift-cyan bg-clip-text text-transparent mb-4">
                Season {result.seasonFilter.year}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">
                    {result.insights.stats.gamesPlayed}
                  </div>
                  <div className="text-muted-foreground">Games</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {(result.insights.stats.winrate * 100).toFixed(0)}%
                  </div>
                  <div className="text-muted-foreground">Win Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {result.insights.stats.avgKda.toFixed(1)}
                  </div>
                  <div className="text-muted-foreground">Avg KDA</div>
                </div>
              </div>
              <div className="absolute bottom-4 text-xs text-muted-foreground">
                riftrewind.gg
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>

            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Share
            </Button>

            {isShareCardsEnabled() && (
              <Button
                variant="glow"
                className="w-full mt-2"
                onClick={() => {
                  // TODO: Implement share card generation
                  alert("Share card generation coming soon!");
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Share Card
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Share your season highlights with friends!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

