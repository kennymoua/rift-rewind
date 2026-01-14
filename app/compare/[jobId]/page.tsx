"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Gamepad2 } from "lucide-react";
import { useCompareJob } from "@/hooks/use-compare-job";
import { Stepper } from "@/components/stepper";
import { StatCard } from "@/components/stat-card";
import { ErrorState, NotFoundState } from "@/components/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <NotFoundState
        title="Feature Disabled"
        message="The compare feature is currently disabled."
      />
    );
  }

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

  if (error && !progress) {
    return (
      <ErrorState
        title="Failed to load comparison"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (!progress) {
    return (
      <NotFoundState message="This comparison doesn't exist or has expired." />
    );
  }

  if (isFailed) {
    return (
      <ErrorState
        title="Comparison Failed"
        message={progress.error || "Something went wrong."}
        onRetry={refetch}
      />
    );
  }

  if (!isDone) {
    return (
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl font-display font-bold mb-4">
            Comparing Players
          </h1>
          <p className="text-muted-foreground">
            Analyzing both players' performance...
          </p>
        </motion.div>
        <Stepper status={progress.status} currentStep={progress.currentStep} />
      </div>
    );
  }

  if (!result) {
    return (
      <ErrorState
        title="Result Not Found"
        message="The comparison completed but we couldn't load the results."
        onRetry={refetch}
      />
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
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div
        className={cn(
          "text-lg font-semibold",
          advantage === "player1" && "text-rift-cyan"
        )}
      >
        {format(value1)}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div
        className={cn(
          "text-lg font-semibold",
          advantage === "player2" && "text-rift-purple"
        )}
      >
        {format(value2)}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <div className="container relative z-10 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-4 text-2xl md:text-4xl font-display font-bold mb-4">
            <span className="text-rift-cyan">
              {player1.info.gameName}
              <span className="text-muted-foreground text-lg">
                #{player1.info.tagLine}
              </span>
            </span>
            <span className="text-muted-foreground">vs</span>
            <span className="text-rift-purple">
              {player2.info.gameName}
              <span className="text-muted-foreground text-lg">
                #{player2.info.tagLine}
              </span>
            </span>
          </div>
          <p className="text-muted-foreground">
            Season {new Date(result.generatedAt).getFullYear()} Comparison
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
            <Card className="border-2 border-rift-cyan/30">
              <CardHeader className="bg-rift-cyan/10 pb-2">
                <CardTitle className="text-lg text-rift-cyan">
                  {player1.info.gameName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <StatCard
                  title="Games"
                  value={player1.insights.stats.gamesPlayed}
                  icon={Gamepad2}
                />
                <StatCard
                  title="Win Rate"
                  value={formatPercent(player1.insights.stats.winrate)}
                  icon={Trophy}
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
            <Card className="border-2 border-rift-purple/30">
              <CardHeader className="bg-rift-purple/10 pb-2">
                <CardTitle className="text-lg text-rift-purple">
                  {player2.info.gameName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <StatCard
                  title="Games"
                  value={player2.insights.stats.gamesPlayed}
                  icon={Gamepad2}
                />
                <StatCard
                  title="Win Rate"
                  value={formatPercent(player2.insights.stats.winrate)}
                  icon={Trophy}
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
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
            <Card>
              <CardHeader>
                <CardTitle>Common Champions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {comparison.commonChampions.map((champ) => (
                    <div
                      key={champ}
                      className="px-3 py-1.5 rounded-full bg-muted text-sm"
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
  );
}

