"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  Swords,
  Target,
  Eye,
  TrendingUp,
  Clock,
  Shield,
  Loader2,
  Hammer,
  Mountain,
  Flame,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { StatCard } from "@/components/stat-card";
import { Stepper } from "@/components/stepper";
import { ErrorState } from "@/components/error-state";
import { LineChartCard, BarChartCard, RoleChart } from "@/components/charts";
import { HighlightsCarousel } from "@/components/highlights-carousel";
import { AICoachCard } from "@/components/ai-coach-card";
import { ShareCardPreview } from "@/components/share-card-preview";
import { useRewindJob } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import type { RewindJobStatus } from "@/lib/types";

const steps: Array<{ id: RewindJobStatus; label: string; description: string }> = [
  { id: "FETCHING_MATCHES", label: "Gathering", description: "Mining your match history" },
  { id: "BUILDING_INSIGHTS", label: "Smelting", description: "Refining raw data" },
  { id: "GENERATING_STORY", label: "Forging", description: "Tempering insights" },
  { id: "DONE", label: "Complete", description: "Masterwork ready" },
];

export default function RewindPage() {
  const params = useParams();
  const jobId = typeof params?.jobId === "string" ? params.jobId : "";

  const { progress, result, error, refetch, isFailed, isDone } = useRewindJob(jobId);

  // Loading state
  if (!progress) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-freljord">
          <div className="text-center">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-forge-ember/20 blur-xl rounded-full" />
              <Loader2 className="h-12 w-12 animate-spin text-forge-ember relative z-10" />
            </div>
            <p className="text-muted-foreground mt-4">Heating the forge...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (isFailed || error) {
    return (
      <Layout>
        <div className="container py-12 bg-freljord min-h-[60vh]">
          <ErrorState
            title="Forge Malfunction"
            message={error?.message || progress?.error || "The forge fire went out unexpectedly. Please try again."}
            onRetry={refetch}
          />
        </div>
      </Layout>
    );
  }

  // Processing state
  if (!isDone || !result) {
    const completedSteps = steps
      .slice(0, steps.findIndex((s) => s.id === progress.status))
      .map((s) => s.id);

    return (
      <Layout>
        <div className="min-h-[60vh] relative overflow-hidden">
          {/* Freljord background */}
          <div className="absolute inset-0 bg-freljord" />
          <div className="absolute inset-0 bg-mountains" />
          
          {/* Ember glow effect */}
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-forge-ember/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-forge-ember/30 blur-2xl rounded-full animate-pulse" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                      <Hammer className="h-10 w-10 text-forge-ember animate-pulse" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-display font-bold text-frost-light mb-2">
                  Ornn is Forging Your Stats
                </h1>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                  <Mountain className="h-4 w-4 text-frost-blue" />
                  The master craftsman works with precision
                </p>
              </div>

              {/* Stepper */}
              <div className="forge-card rounded-lg p-6 md:p-8">
                <Stepper
                  steps={steps}
                  currentStep={progress.status}
                  completedSteps={completedSteps}
                />

                {/* Progress message */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    {progress.message || "Processing your data..."}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Flame className="h-4 w-4 text-forge-ember animate-pulse" />
                    <span className="text-xs text-forge-ember/70 uppercase tracking-wider">
                      Forge temperature optimal
                    </span>
                    <Flame className="h-4 w-4 text-forge-ember animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  // Results state
  const { insights, aiCoach, player, seasonFilter } = result;

  // Prepare chart data
  const winrateData = insights.winrateOverTime.map((item) => ({
    name: item.period,
    value: item.winrate,
    games: item.games,
  }));

  const champData = insights.topChampions.slice(0, 5).map((c) => ({
    name: c.championName,
    games: c.gamesPlayed,
    winrate: c.winrate,
  }));

  const highlights = insights.highlights.map((h) => ({
    type: h.type === "best_match" ? "best" as const : h.type === "worst_match" ? "worst" as const : "best" as const,
    title: h.title,
    match: {
      matchId: h.matchId,
      gameCreation: 0,
      gameDuration: 0,
      gameMode: "",
      championId: h.championId,
      championName: h.championName,
      win: h.stats.result === "Victory",
      kills: 0,
      deaths: 0,
      assists: 0,
      kda: 0,
      cs: 0,
      csPerMin: 0,
      visionScore: 0,
      goldEarned: 0,
      damageDealt: 0,
      role: "",
      lane: "",
      teamPosition: "",
    },
  }));

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-freljord" />
        <div className="absolute inset-0 bg-mountains opacity-50" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-frost-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-forge-ember/10 rounded-full blur-[100px]" />

        <div className="container relative z-10 py-8 md:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                <Hammer className="h-7 w-7 text-forge-ember" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <span className="text-frost-light">{player.gameName}</span>
              <span className="text-muted-foreground">'s</span>{" "}
              <span className="text-forge-ember">Forged Legacy</span>
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Mountain className="h-4 w-4 text-frost-blue" />
              Season {seasonFilter.year} • {player.region.toUpperCase()}
              <Flame className="h-4 w-4 text-forge-ember" />
            </p>
          </motion.div>

          {/* Hero stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <StatCard
              title="Battles Fought"
              value={insights.stats.gamesPlayed}
              subtitle={`${insights.stats.wins}W / ${insights.stats.losses}L`}
              icon={Swords}
              delay={0.1}
              variant="frost"
            />
            <StatCard
              title="Victory Rate"
              value={`${insights.stats.winrate}%`}
              icon={Trophy}
              trend={insights.stats.winrate >= 50 ? "up" : "down"}
              delay={0.2}
              variant={insights.stats.winrate >= 50 ? "frost" : "ember"}
            />
            <StatCard
              title="Win Streak"
              value={insights.stats.longestWinStreak}
              subtitle="Consecutive victories"
              icon={TrendingUp}
              delay={0.3}
              variant="ember"
            />
            <StatCard
              title="Vision Craft"
              value={insights.visionScore}
              subtitle="out of 100"
              icon={Eye}
              delay={0.4}
            />
          </div>

          {/* Secondary stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <StatCard
              title="Objective Mastery"
              value={insights.objectiveScore}
              subtitle="Team objective participation"
              icon={Target}
              delay={0.5}
            />
            <StatCard
              title="Avg Game Duration"
              value={`${Math.floor(insights.stats.avgGameDuration / 60)}m`}
              icon={Clock}
              delay={0.6}
            />
            <StatCard
              title="Avg KDA"
              value={insights.stats.avgKda.toFixed(2)}
              icon={Shield}
              delay={0.7}
              variant="frost"
            />
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <LineChartCard
              title="Victory Rate Over Time"
              subtitle="Monthly winrate progression through the forge"
              data={winrateData}
              dataKey="value"
              xAxisKey="name"
            />
            <BarChartCard
              title="Champion Arsenal"
              subtitle="Your most-forged champions"
              data={champData}
              dataKey="games"
              xAxisKey="name"
            />
          </div>

          {/* Role distribution */}
          <div className="mb-8">
            <RoleChart data={insights.roleDistribution} />
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-8">
              <HighlightsCarousel highlights={highlights} />
            </div>
          )}

          {/* AI Coach & Share */}
          <div className="grid gap-6 md:grid-cols-2">
            <AICoachCard coachOutput={aiCoach} />
            <ShareCardPreview result={result} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
