"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, AlertTriangle, Dumbbell, Users } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, getChampionIconUrl } from "@/lib/utils";
import type { AICoachContent } from "@/lib/types";

interface AICoachCardProps {
  content: AICoachContent;
  delay?: number;
}

export function AICoachCard({ content, delay = 0 }: AICoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="lol-card rounded-lg overflow-hidden border-2 border-lol-blue/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-lol-blue/20 via-lol-magic/10 to-lol-blue/20 p-4 border-b border-lol-blue/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-lol-blue/50 bg-lol-darker">
              <Sparkles className="h-5 w-5 text-lol-blue-glow" />
            </div>
            <div>
              <h3 className="font-semibold text-lol-blue-glow uppercase tracking-wide">
                AI Coach Insights
              </h3>
              <p className="text-xs text-muted-foreground">
                Powered by Amazon Bedrock
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Narrative */}
          <div className="mb-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.narrative}
            </p>
          </div>

          <Separator className="mb-5 bg-lol-gold/20" />

          {/* Tabs */}
          <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 bg-lol-darker border border-lol-gold/20">
              <TabsTrigger 
                value="strengths" 
                className="text-xs data-[state=active]:bg-lol-gold/20 data-[state=active]:text-lol-gold"
              >
                <Target className="h-3 w-3 mr-1" />
                Strengths
              </TabsTrigger>
              <TabsTrigger 
                value="weaknesses" 
                className="text-xs data-[state=active]:bg-lol-gold/20 data-[state=active]:text-lol-gold"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Improve
              </TabsTrigger>
              <TabsTrigger 
                value="drills" 
                className="text-xs data-[state=active]:bg-lol-gold/20 data-[state=active]:text-lol-gold"
              >
                <Dumbbell className="h-3 w-3 mr-1" />
                Drills
              </TabsTrigger>
              <TabsTrigger 
                value="champs" 
                className="text-xs data-[state=active]:bg-lol-gold/20 data-[state=active]:text-lol-gold"
              >
                <Users className="h-3 w-3 mr-1" />
                Try Next
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="space-y-3">
              {content.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="rounded border border-emerald-500/30 bg-emerald-500/5 p-3"
                >
                  <h4 className="font-medium text-sm text-emerald-400 mb-1">
                    {strength.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {strength.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="weaknesses" className="space-y-3">
              {content.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="rounded border border-amber-500/30 bg-amber-500/5 p-3"
                >
                  <h4 className="font-medium text-sm text-amber-400 mb-1">
                    {weakness.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {weakness.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="drills" className="space-y-3">
              {content.drills.map((drill, index) => (
                <div
                  key={index}
                  className="rounded border border-lol-blue/30 bg-lol-blue/5 p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm text-lol-blue-glow">
                      {drill.title}
                    </h4>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded font-medium",
                        drill.difficulty === "Easy" &&
                          "bg-emerald-500/20 text-emerald-400",
                        drill.difficulty === "Medium" &&
                          "bg-amber-500/20 text-amber-400",
                        drill.difficulty === "Hard" &&
                          "bg-red-500/20 text-red-400"
                      )}
                    >
                      {drill.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {drill.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="champs" className="space-y-3">
              {content.championRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded border border-lol-gold/20 bg-lol-darker p-3"
                >
                  <div className="relative h-12 w-12 shrink-0 rounded border border-lol-gold/50 overflow-hidden">
                    <Image
                      src={getChampionIconUrl(rec.championName)}
                      alt={rec.championName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-lol-gold">
                      {rec.championName}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}
