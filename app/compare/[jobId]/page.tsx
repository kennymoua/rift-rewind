"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Gamepad2, Hammer, Mountain, Flame, Snowflake, Loader2 } from "lucide-react";
import { useCompareJob } from "@/hooks/use-compare-job";
import { StatCard } from "@/components/stat-card";
import { ErrorState } from "@/components/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { cn, formatPercent } from "@/lib/utils";
import { isCompareEnabled } from "@/lib/constants";

interface PageProps {
  params: { jobId: string };
}

export default function CompareResultPage({ params }: PageProps) {
  const { jobId } = params;
  const { progress, result, error, isLoading, isDone, isFailed, refetch } =
    useCompareJob(jobId);

  if (!isCompareEnabled()) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-freljord">
          <ErrorState
            title="Forge Sealed"
            message="The compare feature is currently disabled."
          />
        </div>
      </Layout>
    );
  }

  if (isLoading && !progress) {
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

  if (error && !progress) {
    return (
      <Layout>
        <div className="container py-12 bg-freljord min-h-[60vh]">
          <ErrorState
            title="Forge Malfunction"
            message={error.message}
            onRetry={refetch}
          />
        </div>
      </Layout>
    );
  }

  if (!progress) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-freljord">
          <ErrorState
            title="Not Found"
            message="This comparison doesn't exist or has expired."
          />
        </div>
      </Layout>
    );
  }

  if (isFailed) {
    return (
      <Layout>
        <div className="container py-12 bg-freljord min-h-[60vh]">
          <ErrorState
            title="Comparison Failed"
            message={progress.error || "Something went wrong."}
            onRetry={refetch}
          />
        </div>
      </Layout>
    );
  }

  if (!isDone) {
    return (
      <Layout>
        <div className="min-h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-freljord" />
          <div className="absolute inset-0 bg-mountains" />
          
          <div className="container relative z-10 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-forge-ember/30 blur-2xl rounded-full animate-pulse" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                    <Hammer className="h-10 w-10 text-forge-ember animate-pulse" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-display font-bold text-frost-light mb-4">
                Ornn Judges Both Champions
              </h1>
              <p className="text-muted-foreground mb-4">
                {progress.message || "Analyzing both players' performance..."}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Flame className="h-4 w-4 text-forge-ember animate-pulse" />
                <span className="text-xs text-forge-ember/70 uppercase tracking-wider">
                  Step {progress.currentStep} of {progress.totalSteps}
                </span>
                <Flame className="h-4 w-4 text-forge-ember animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!result) {
    return (
      <Layout>
        <div className="container py-12 bg-freljord min-h-[60vh]">
          <ErrorState
            title="Result Not Found"
            message="The comparison completed but we couldn't load the results."
            onRetry={refetch}
          />
        </div>
      </Layout>
    );
  }

  const { player1, player2, comparison } = result;

  const ComparisonStat = ({
    label,
    value1,
    value2,
    advantage,
    format = (v: number) => v.toString(),
  }: {
    label: string;
    value1: number;
    value2: number;
    advantage: "player1" | "player2" | "tie";
    format?: (v: number) => string;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-frost-dark/30 last:border-0">
      <div
        className={cn(
          "text-lg font-semibold",
          advantage === "player1" && "text-frost-light"
        )}
      >
        {format(value1)}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div
        className={cn(
          "text-lg font-semibold",
          advantage === "player2" && "text-forge-ember"
        )}
      >
        {format(value2)}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-freljord" />
        <div className="absolute inset-0 bg-mountains opacity-50" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-frost-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-forge-ember/10 rounded-full blur-[100px]" />

        <div className="container relative z-10 py-8 md:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                <Hammer className="h-7 w-7 text-forge-ember" />
              </div>
            </div>
            <div className="inline-flex items-center gap-4 text-2xl md:text-4xl font-display font-bold mb-4 flex-wrap justify-center">
              <span className="text-frost-light flex items-center gap-2">
                <Snowflake className="h-6 w-6 text-frost-blue" />
                {player1.info.gameName}
                <span className="text-muted-foreground text-lg">
                  #{player1.info.tagLine}
                </span>
              </span>
              <span className="text-muted-foreground">vs</span>
              <span className="text-forge-ember flex items-center gap-2">
                {player2.info.gameName}
                <span className="text-muted-foreground text-lg">
                  #{player2.info.tagLine}
                </span>
                <Flame className="h-6 w-6 text-forge-ember" />
              </span>
            </div>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Mountain className="h-4 w-4 text-frost-blue" />
              Trial by Combat • Forged Results
            </p>
          </motion.div>

          {/* Stats comparison */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Player 1 stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="forge-card border-l-4 border-frost-blue">
                <CardHeader className="bg-frost-blue/10 pb-2">
                  <CardTitle className="text-lg text-frost-light flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-frost-blue" />
                    {player1.info.gameName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-4">
                  <StatCard
                    title="Games"
                    value={player1.insights.stats.gamesPlayed}
                    icon={Gamepad2}
                    variant="frost"
                  />
                  <StatCard
                    title="Win Rate"
                    value={formatPercent(player1.insights.stats.winrate)}
                    icon={Trophy}
                    variant="frost"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Player 2 stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="forge-card border-r-4 border-forge-ember">
                <CardHeader className="bg-forge-ember/10 pb-2">
                  <CardTitle className="text-lg text-forge-ember flex items-center gap-2">
                    <Flame className="h-5 w-5 text-forge-ember" />
                    {player2.info.gameName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-4">
                  <StatCard
                    title="Games"
                    value={player2.insights.stats.gamesPlayed}
                    icon={Gamepad2}
                    variant="ember"
                  />
                  <StatCard
                    title="Win Rate"
                    value={formatPercent(player2.insights.stats.winrate)}
                    icon={Trophy}
                    variant="ember"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Head to head */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="forge-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-frost-light">
                  <TrendingUp className="h-5 w-5 text-frost-blue" />
                  Head to Head
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ComparisonStat
                  label="Win Rate"
                  value1={player1.insights.stats.winrate}
                  value2={player2.insights.stats.winrate}
                  advantage={comparison.winrateAdvantage}
                  format={(v) => formatPercent(v)}
                />
                <ComparisonStat
                  label="Average KDA"
                  value1={player1.insights.stats.avgKda}
                  value2={player2.insights.stats.avgKda}
                  advantage={comparison.kdaAdvantage}
                  format={(v) => v.toFixed(2)}
                />
                <ComparisonStat
                  label="Games Played"
                  value1={player1.insights.stats.gamesPlayed}
                  value2={player2.insights.stats.gamesPlayed}
                  advantage={comparison.gamesPlayedAdvantage}
                />
                <ComparisonStat
                  label="Win Streak"
                  value1={player1.insights.stats.longestWinStreak}
                  value2={player2.insights.stats.longestWinStreak}
                  advantage={
                    player1.insights.stats.longestWinStreak >
                    player2.insights.stats.longestWinStreak
                      ? "player1"
                      : player1.insights.stats.longestWinStreak <
                          player2.insights.stats.longestWinStreak
                        ? "player2"
                        : "tie"
                  }
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Common champions */}
          {comparison.commonChampions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Card className="forge-card">
                <CardHeader>
                  <CardTitle className="text-frost-light">Common Champions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {comparison.commonChampions.map((champ) => (
                      <div
                        key={champ}
                        className="px-3 py-1.5 rounded-lg border border-frost-dark bg-mountain-dark text-sm text-frost-light"
                      >
                        {champ}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
