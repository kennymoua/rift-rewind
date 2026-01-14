"use client";

import { motion } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  TrendingUp,
  Target,
  Flame,
} from "lucide-react";
import { useRewindJob } from "@/hooks/use-rewind-job";
import { Stepper } from "@/components/stepper";
import { StatCard, StatCardSkeleton } from "@/components/stat-card";
import { LineChartCard, BarChartCard, RoleChart } from "@/components/charts";
import { HighlightsCarousel } from "@/components/highlights-carousel";
import { AICoachCard } from "@/components/ai-coach-card";
import { ShareCardPreview } from "@/components/share-card-preview";
import { ErrorState, NotFoundState } from "@/components/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPercent } from "@/lib/utils";

interface PageProps {
  params: { jobId: string };
}

export default function RewindPage({ params }: PageProps) {
  const { jobId } = params;
  const { progress, result, error, isLoading, isDone, isFailed, refetch } =
    useRewindJob(jobId);

  // Loading state
  if (isLoading && !progress) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-full bg-muted animate-pulse" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !progress) {
    return (
      <ErrorState
        title="Failed to load rewind"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  // Not found
  if (!progress) {
    return <NotFoundState message="This rewind doesn't exist or has expired." />;
  }

  // Failed job
  if (isFailed) {
    return (
      <ErrorState
        title="Generation Failed"
        message={progress.error || "Something went wrong while generating your rewind."}
        onRetry={refetch}
      />
    );
  }

  // In progress - show stepper
  if (!isDone) {
    return (
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-display font-bold mb-4">
            Generating Your Rewind
          </h1>
          <p className="text-muted-foreground">
            We're crunching the numbers and crafting your personalized recap...
          </p>
        </motion.div>

        <Stepper
          status={progress.status}
          currentStep={progress.currentStep}
        />
      </div>
    );
  }

  // Done - show results
  if (!result) {
    return (
      <ErrorState
        title="Result Not Found"
        message="The rewind completed but we couldn't load the results."
        onRetry={refetch}
      />
    );
  }

  const { player, insights, aiCoach, seasonFilter } = result;
  const { stats, topChampions, roleDistribution, winrateOverTime, highlights } =
    insights;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <div className="container relative z-10 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-rift-cyan/30 bg-rift-cyan/10 px-4 py-1.5 text-sm text-rift-cyan mb-4">
            Season {seasonFilter.year} Recap
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
            {player.gameName}
            <span className="text-muted-foreground">#{player.tagLine}</span>
          </h1>
          <p className="text-muted-foreground">
            {player.region.toUpperCase()} • Level {player.summonerLevel || "??"}
          </p>
        </motion.div>

        {/* Hero stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Games Played"
            value={stats.gamesPlayed}
            subtitle={`${stats.wins}W ${stats.losses}L`}
            icon={Gamepad2}
            delay={0}
          />
          <StatCard
            title="Win Rate"
            value={formatPercent(stats.winrate, 1)}
            subtitle={stats.winrate >= 0.5 ? "Above average!" : "Room to grow"}
            icon={Trophy}
            trend={stats.winrate >= 0.5 ? "up" : "down"}
            delay={0.1}
          />
          <StatCard
            title="Average KDA"
            value={stats.avgKda.toFixed(2)}
            subtitle={`${(stats.totalKills / stats.gamesPlayed).toFixed(1)} / ${(stats.totalDeaths / stats.gamesPlayed).toFixed(1)} / ${(stats.totalAssists / stats.gamesPlayed).toFixed(1)}`}
            icon={Target}
            delay={0.2}
          />
          <StatCard
            title="Win Streak"
            value={stats.longestWinStreak}
            subtitle={stats.longestWinStreak >= 5 ? "Impressive!" : "Best streak"}
            icon={Flame}
            delay={0.3}
          />
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <LineChartCard
            title="Win Rate Over Time"
            data={winrateOverTime}
            delay={0.4}
          />
          <BarChartCard
            title="Top Champions"
            data={topChampions}
            delay={0.5}
          />
          <RoleChart
            title="Role Distribution"
            data={roleDistribution}
            delay={0.6}
          />
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <HighlightsCarousel highlights={highlights} />
        </div>

        {/* AI Coach + Share */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AICoachCard content={aiCoach} delay={0.7} />
          <ShareCardPreview result={result} delay={0.8} />
        </div>
      </div>
    </div>
  );
}

