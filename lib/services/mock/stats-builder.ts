/**
 * Stats Builder Implementation
 * 
 * Computes insights from match data.
 * This is the same for both mock and production.
 */

import type { IStatsBuilder } from "../interfaces";
import type {
  MatchSummary,
  RewindInsights,
  RewindStats,
  ChampionStats,
  RoleDistribution,
  WinrateDataPoint,
  MatchHighlight,
} from "@/lib/types";
import { ROLE_LABELS } from "@/lib/constants";

export class StatsBuilder implements IStatsBuilder {
  buildInsights(matches: MatchSummary[], year: number): RewindInsights {
    // Filter matches for the specified year
    const yearStart = new Date(year, 0, 1).getTime();
    const yearEnd = new Date(year, 11, 31, 23, 59, 59).getTime();
    
    const filteredMatches = matches.filter(
      (m) => m.gameCreation >= yearStart && m.gameCreation <= yearEnd
    );

    if (filteredMatches.length === 0) {
      return this.getEmptyInsights();
    }

    const stats = this.computeStats(filteredMatches);
    const topChampions = this.computeTopChampions(filteredMatches);
    const roleDistribution = this.computeRoleDistribution(filteredMatches);
    const winrateOverTime = this.computeWinrateOverTime(filteredMatches);
    const highlights = this.computeHighlights(filteredMatches);
    const visionScore = this.computeVisionScore(filteredMatches);
    const objectiveScore = this.computeObjectiveScore(filteredMatches);

    return {
      stats,
      topChampions,
      roleDistribution,
      winrateOverTime,
      highlights,
      visionScore,
      objectiveScore,
    };
  }

  private computeStats(matches: MatchSummary[]): RewindStats {
    const wins = matches.filter((m) => m.win).length;
    const losses = matches.length - wins;

    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let totalDuration = 0;

    matches.forEach((m) => {
      totalKills += m.kills;
      totalDeaths += m.deaths;
      totalAssists += m.assists;
      totalDuration += m.gameDuration;
    });

    // Calculate win/loss streaks
    const { longestWinStreak, longestLossStreak } = this.calculateStreaks(matches);

    // Find most played role
    const roleCounts = this.countRoles(matches);
    const mostPlayedRole = Object.entries(roleCounts).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0] || "NONE";

    return {
      gamesPlayed: matches.length,
      wins,
      losses,
      winrate: matches.length > 0 ? wins / matches.length : 0,
      totalKills,
      totalDeaths,
      totalAssists,
      avgKda: totalDeaths > 0 ? (totalKills + totalAssists) / totalDeaths : totalKills + totalAssists,
      avgGameDuration: matches.length > 0 ? totalDuration / matches.length : 0,
      longestWinStreak,
      longestLossStreak,
      mostPlayedRole: ROLE_LABELS[mostPlayedRole] || mostPlayedRole,
    };
  }

  private calculateStreaks(matches: MatchSummary[]): {
    longestWinStreak: number;
    longestLossStreak: number;
  } {
    // Sort by game creation time
    const sorted = [...matches].sort((a, b) => a.gameCreation - b.gameCreation);

    let longestWinStreak = 0;
    let longestLossStreak = 0;
    let currentWinStreak = 0;
    let currentLossStreak = 0;

    sorted.forEach((match) => {
      if (match.win) {
        currentWinStreak++;
        currentLossStreak = 0;
        longestWinStreak = Math.max(longestWinStreak, currentWinStreak);
      } else {
        currentLossStreak++;
        currentWinStreak = 0;
        longestLossStreak = Math.max(longestLossStreak, currentLossStreak);
      }
    });

    return { longestWinStreak, longestLossStreak };
  }

  private countRoles(matches: MatchSummary[]): Record<string, number> {
    const counts: Record<string, number> = {};
    matches.forEach((m) => {
      const role = m.teamPosition || m.role || "NONE";
      counts[role] = (counts[role] || 0) + 1;
    });
    return counts;
  }

  private computeTopChampions(matches: MatchSummary[]): ChampionStats[] {
    const champStats: Record<number, {
      id: number;
      name: string;
      games: number;
      wins: number;
      kills: number;
      deaths: number;
      assists: number;
      cs: number;
      damage: number;
    }> = {};

    matches.forEach((m) => {
      if (!champStats[m.championId]) {
        champStats[m.championId] = {
          id: m.championId,
          name: m.championName,
          games: 0,
          wins: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          cs: 0,
          damage: 0,
        };
      }

      const stat = champStats[m.championId];
      stat.games++;
      if (m.win) stat.wins++;
      stat.kills += m.kills;
      stat.deaths += m.deaths;
      stat.assists += m.assists;
      stat.cs += m.cs;
      stat.damage += m.damageDealt;
    });

    return Object.values(champStats)
      .map((s) => ({
        championId: s.id,
        championName: s.name,
        gamesPlayed: s.games,
        wins: s.wins,
        losses: s.games - s.wins,
        winrate: s.games > 0 ? s.wins / s.games : 0,
        avgKda: s.deaths > 0 ? (s.kills + s.assists) / s.deaths : s.kills + s.assists,
        avgCs: s.games > 0 ? s.cs / s.games : 0,
        avgDamage: s.games > 0 ? s.damage / s.games : 0,
      }))
      .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
      .slice(0, 10);
  }

  private computeRoleDistribution(matches: MatchSummary[]): RoleDistribution[] {
    const roleCounts = this.countRoles(matches);
    const total = matches.length;

    return Object.entries(roleCounts)
      .map(([role, games]) => ({
        role: ROLE_LABELS[role] || role,
        games,
        percentage: total > 0 ? (games / total) * 100 : 0,
      }))
      .sort((a, b) => b.games - a.games);
  }

  private computeWinrateOverTime(matches: MatchSummary[]): WinrateDataPoint[] {
    // Group matches by month
    const monthlyStats: Record<string, { wins: number; total: number }> = {};

    matches.forEach((m) => {
      const date = new Date(m.gameCreation);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { wins: 0, total: 0 };
      }

      monthlyStats[monthKey].total++;
      if (m.win) monthlyStats[monthKey].wins++;
    });

    return Object.entries(monthlyStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, { wins, total }]) => ({
        period: this.formatMonth(period),
        winrate: total > 0 ? wins / total : 0,
        games: total,
      }));
  }

  private formatMonth(monthKey: string): string {
    const [year, month] = monthKey.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString("en-US", { month: "short" });
  }

  private computeHighlights(matches: MatchSummary[]): MatchHighlight[] {
    if (matches.length === 0) return [];

    const highlights: MatchHighlight[] = [];

    // Best match (highest KDA with a win)
    const winningMatches = matches.filter((m) => m.win);
    if (winningMatches.length > 0) {
      const bestMatch = winningMatches.reduce((best, m) =>
        m.kda > best.kda ? m : best
      );
      highlights.push({
        matchId: bestMatch.matchId,
        type: "best_match",
        title: "Best Performance",
        description: `An incredible ${bestMatch.kills}/${bestMatch.deaths}/${bestMatch.assists} game on ${bestMatch.championName}`,
        championName: bestMatch.championName,
        championId: bestMatch.championId,
        stats: {
          kda: `${bestMatch.kills}/${bestMatch.deaths}/${bestMatch.assists}`,
          duration: this.formatDuration(bestMatch.gameDuration),
          result: "Victory",
        },
      });
    }

    // Worst match (lowest KDA)
    const worstMatch = matches.reduce((worst, m) =>
      m.kda < worst.kda ? m : worst
    );
    highlights.push({
      matchId: worstMatch.matchId,
      type: "worst_match",
      title: "Rough Game",
      description: `A tough ${worstMatch.kills}/${worstMatch.deaths}/${worstMatch.assists} game, but every loss is a lesson`,
      championName: worstMatch.championName,
      championId: worstMatch.championId,
      stats: {
        kda: `${worstMatch.kills}/${worstMatch.deaths}/${worstMatch.assists}`,
        duration: this.formatDuration(worstMatch.gameDuration),
        result: worstMatch.win ? "Victory" : "Defeat",
      },
    });

    // Longest game
    const longestGame = matches.reduce((longest, m) =>
      m.gameDuration > longest.gameDuration ? m : longest
    );
    highlights.push({
      matchId: longestGame.matchId,
      type: "longest_game",
      title: "Marathon Match",
      description: `A ${this.formatDuration(longestGame.gameDuration)} epic battle as ${longestGame.championName}`,
      championName: longestGame.championName,
      championId: longestGame.championId,
      stats: {
        kda: `${longestGame.kills}/${longestGame.deaths}/${longestGame.assists}`,
        duration: this.formatDuration(longestGame.gameDuration),
        result: longestGame.win ? "Victory" : "Defeat",
      },
    });

    // Find a comeback (high kills + deaths + win = likely intense game)
    const comebckCandidates = matches
      .filter((m) => m.win && m.deaths >= 3)
      .sort((a, b) => (b.kills + b.assists) - (a.kills + a.assists));
    
    if (comebckCandidates.length > 0) {
      const comeback = comebckCandidates[0];
      highlights.push({
        matchId: comeback.matchId,
        type: "biggest_comeback",
        title: "Clutch Comeback",
        description: `Fought through adversity to secure victory as ${comeback.championName}`,
        championName: comeback.championName,
        championId: comeback.championId,
        stats: {
          kda: `${comeback.kills}/${comeback.deaths}/${comeback.assists}`,
          duration: this.formatDuration(comeback.gameDuration),
          result: "Victory",
        },
      });
    }

    return highlights.slice(0, 4);
  }

  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  private computeVisionScore(matches: MatchSummary[]): number {
    if (matches.length === 0) return 0;

    // Calculate average vision score per minute
    let totalVisionPerMin = 0;
    matches.forEach((m) => {
      const mins = m.gameDuration / 60;
      totalVisionPerMin += m.visionScore / mins;
    });

    const avgVisionPerMin = totalVisionPerMin / matches.length;

    // Convert to a 0-100 score (1.0 vision/min = 100 score)
    return Math.min(100, Math.round(avgVisionPerMin * 100));
  }

  private computeObjectiveScore(matches: MatchSummary[]): number {
    // This is a simplified proxy - in real implementation,
    // we'd use objective participation data from the API
    if (matches.length === 0) return 0;

    // Use win rate as a proxy for objective control
    const wins = matches.filter((m) => m.win).length;
    const baseScore = (wins / matches.length) * 100;

    // Add bonus for high damage games (usually means objective fighting)
    const avgDamage = matches.reduce((sum, m) => sum + m.damageDealt, 0) / matches.length;
    const damageBonus = Math.min(20, avgDamage / 2000);

    return Math.min(100, Math.round(baseScore + damageBonus));
  }

  private getEmptyInsights(): RewindInsights {
    return {
      stats: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        winrate: 0,
        totalKills: 0,
        totalDeaths: 0,
        totalAssists: 0,
        avgKda: 0,
        avgGameDuration: 0,
        longestWinStreak: 0,
        longestLossStreak: 0,
        mostPlayedRole: "None",
      },
      topChampions: [],
      roleDistribution: [],
      winrateOverTime: [],
      highlights: [],
      visionScore: 0,
      objectiveScore: 0,
    };
  }
}

