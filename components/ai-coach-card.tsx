"use client";

import { motion } from "framer-motion";
import { Hammer, TrendingUp, TrendingDown, Target, Sparkles, Flame, Mountain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AICoachContent } from "@/lib/types";

interface AICoachCardProps {
  coachOutput: AICoachContent;
}

export function AICoachCard({ coachOutput }: AICoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="forge-card relative rounded-lg p-6 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-forge-ember/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-frost-blue/5 rounded-full blur-2xl" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
            <Hammer className="h-6 w-6 text-forge-ember" />
          </div>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-forge-flame animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-forge-ember">Ornn's Wisdom</h3>
          <p className="text-xs text-frost-blue/70 uppercase tracking-wider flex items-center gap-1">
            <Mountain className="h-3 w-3" />
            Forged Insights
          </p>
        </div>
      </div>

      {/* Narrative */}
      <div className="mb-6 relative z-10">
        <div className="rounded-lg border border-frost-dark/50 bg-mountain-dark/50 p-4">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "{coachOutput.narrative}"
          </p>
          <p className="text-xs text-forge-ember/70 mt-2">— The Fire Below the Mountain</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="strengths" className="relative z-10">
        <TabsList className="w-full bg-mountain-dark border border-frost-dark/30">
          <TabsTrigger 
            value="strengths" 
            className="flex-1 data-[state=active]:bg-frost-blue/20 data-[state=active]:text-frost-light"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
            Strengths
          </TabsTrigger>
          <TabsTrigger 
            value="weaknesses" 
            className="flex-1 data-[state=active]:bg-forge-ember/20 data-[state=active]:text-forge-ember"
          >
            <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
            Areas to Forge
          </TabsTrigger>
          <TabsTrigger 
            value="drills" 
            className="flex-1 data-[state=active]:bg-frost-blue/20 data-[state=active]:text-frost-light"
          >
            <Target className="h-3.5 w-3.5 mr-1.5" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strengths" className="mt-4 space-y-2">
          {coachOutput.strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-frost-blue/30 bg-frost-blue/5 p-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-frost-blue/20 border border-frost-blue/50">
                <TrendingUp className="h-3 w-3 text-frost-light" />
              </div>
              <div>
                <p className="text-sm font-medium text-frost-light">{strength.title}</p>
                <p className="text-xs text-muted-foreground">{strength.description}</p>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="weaknesses" className="mt-4 space-y-2">
          {coachOutput.weaknesses.map((weakness, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-forge-ember/30 bg-forge-ember/5 p-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-forge-ember/20 border border-forge-ember/50">
                <Flame className="h-3 w-3 text-forge-ember" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{weakness.title}</p>
                <p className="text-xs text-muted-foreground">{weakness.description}</p>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="drills" className="mt-4 space-y-2">
          {coachOutput.drills.map((drill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-frost-dark/50 bg-mountain-dark/50 p-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-frost-blue/10 border border-frost-dark text-frost-blue font-bold text-xs">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{drill.title}</p>
                <p className="text-xs text-muted-foreground">{drill.description}</p>
              </div>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Recommended champions */}
      {coachOutput.championRecommendations.length > 0 && (
        <div className="mt-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-forge-gold" />
            <h4 className="text-sm font-semibold text-frost-light">
              Champions to Forge Next
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {coachOutput.championRecommendations.map((champ, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-lg border border-forge-ember/40 bg-forge-ember/10 px-3 py-1.5 text-sm font-medium text-forge-ember hover:bg-forge-ember/20 transition-colors"
                title={champ.reason}
              >
                <Hammer className="h-3 w-3" />
                {champ.championName}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
