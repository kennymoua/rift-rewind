/**
 * Mock AI Client Implementation
 * 
 * Generates realistic AI coaching content for demos.
 * In production, this would use Amazon Bedrock.
 */

import type { IAIClient } from "../interfaces";
import type { PlayerInfo, RewindInsights, AICoachContent } from "@/lib/types";
import { sleep } from "@/lib/utils";

export class MockAIClient implements IAIClient {
  private simulateDelay = true;

  async generateNarrativeAndTips(
    player: PlayerInfo,
    insights: RewindInsights
  ): Promise<AICoachContent> {
    if (this.simulateDelay) {
      await sleep(1500 + Math.random() * 1000);
    }

    const { stats, topChampions, roleDistribution } = insights;
    const mainRole = roleDistribution[0]?.role || "versatile player";
    const mainChamp = topChampions[0]?.championName || "various champions";
    const winrateStr = (stats.winrate * 100).toFixed(1);

    // Generate a contextual narrative
    const narrative = this.generateNarrative(player, stats, mainChamp, mainRole, winrateStr);
    
    // Generate strengths based on stats
    const strengths = this.generateStrengths(stats, topChampions, insights);
    
    // Generate weaknesses
    const weaknesses = this.generateWeaknesses(stats, insights);
    
    // Generate drills
    const drills = this.generateDrills(stats, insights);
    
    // Generate champion recommendations
    const championRecommendations = this.generateChampionRecommendations(
      topChampions,
      mainRole
    );

    return {
      narrative,
      strengths,
      weaknesses,
      drills,
      championRecommendations,
    };
  }

  private generateNarrative(
    player: PlayerInfo,
    stats: RewindInsights["stats"],
    mainChamp: string,
    mainRole: string,
    winrateStr: string
  ): string {
    const gamesText = stats.gamesPlayed === 1 ? "game" : "games";
    const streakText = stats.longestWinStreak > 5 ? "impressive" : "notable";
    
    let narrative = `What a season for ${player.gameName}! `;
    narrative += `You've battled through ${stats.gamesPlayed} ${gamesText} with a ${winrateStr}% win rate, `;
    narrative += `proving yourself as a dedicated ${mainRole.toLowerCase()} main. `;
    narrative += `Your commitment to ${mainChamp} has been unwavering, `;
    narrative += `and it shows in your consistent performance. `;
    
    if (stats.longestWinStreak >= 5) {
      narrative += `That ${streakText} ${stats.longestWinStreak}-game win streak was a highlight of your season! `;
    }
    
    narrative += `With an average KDA of ${stats.avgKda.toFixed(2)}, you've demonstrated solid fundamentals. `;
    
    if (stats.winrate >= 0.55) {
      narrative += `Your above-average win rate shows you're climbing effectively. Keep up the momentum!`;
    } else if (stats.winrate >= 0.50) {
      narrative += `You're holding steady above the curve. A few adjustments could push you to the next level.`;
    } else {
      narrative += `Every loss is a lesson. Focus on the improvement areas below, and you'll see results.`;
    }

    return narrative;
  }

  private generateStrengths(
    stats: RewindInsights["stats"],
    topChampions: RewindInsights["topChampions"],
    insights: RewindInsights
  ): AICoachContent["strengths"] {
    const strengths: AICoachContent["strengths"] = [];

    if (stats.avgKda >= 3.0) {
      strengths.push({
        title: "Exceptional KDA",
        description: `Your ${stats.avgKda.toFixed(2)} KDA shows excellent decision-making in fights. You know when to engage and when to back off.`,
      });
    } else if (stats.avgKda >= 2.5) {
      strengths.push({
        title: "Solid Fighting",
        description: `With a ${stats.avgKda.toFixed(2)} KDA, you're contributing positively to team fights while staying alive.`,
      });
    }

    if (topChampions[0]?.winrate >= 0.55) {
      strengths.push({
        title: `${topChampions[0].championName} Mastery`,
        description: `Your ${(topChampions[0].winrate * 100).toFixed(0)}% win rate on ${topChampions[0].championName} shows deep champion knowledge. This is your comfort pick.`,
      });
    }

    if (stats.longestWinStreak >= 5) {
      strengths.push({
        title: "Streak Potential",
        description: `A ${stats.longestWinStreak}-game win streak proves you can maintain focus and momentum. Mental fortitude is a real skill.`,
      });
    }

    if (insights.visionScore >= 70) {
      strengths.push({
        title: "Vision Control",
        description: "Your warding habits are above average. Map awareness gives you and your team crucial information advantages.",
      });
    }

    // Ensure we have at least 3 strengths
    if (strengths.length < 3) {
      strengths.push({
        title: "Consistent Play Time",
        description: `${stats.gamesPlayed} games shows dedication. Consistent practice is the foundation of improvement.`,
      });
    }

    if (strengths.length < 3) {
      strengths.push({
        title: "Champion Pool Depth",
        description: `You've shown proficiency across ${topChampions.length} champions, giving you flexibility in draft.`,
      });
    }

    return strengths.slice(0, 3);
  }

  private generateWeaknesses(
    stats: RewindInsights["stats"],
    insights: RewindInsights
  ): AICoachContent["weaknesses"] {
    const weaknesses: AICoachContent["weaknesses"] = [];

    if (stats.avgKda < 2.5) {
      weaknesses.push({
        title: "Survival Instincts",
        description: "Your KDA suggests you might be dying too often. Focus on identifying dangerous situations earlier.",
      });
    }

    if (stats.winrate < 0.50) {
      weaknesses.push({
        title: "Closing Out Games",
        description: "A sub-50% win rate often means struggling to convert leads. Work on objective control and team coordination.",
      });
    }

    if (insights.visionScore < 50) {
      weaknesses.push({
        title: "Vision Game",
        description: "Improved warding could prevent deaths and create picks. Aim to place 1 ward per minute of game time.",
      });
    }

    if (insights.objectiveScore < 50) {
      weaknesses.push({
        title: "Objective Focus",
        description: "Prioritize dragons, barons, and towers over chasing kills. Objectives win games.",
      });
    }

    // Ensure we have at least 2 weaknesses
    if (weaknesses.length < 2) {
      weaknesses.push({
        title: "Champion Pool Optimization",
        description: "Consider focusing on fewer champions to increase mastery depth rather than breadth.",
      });
    }

    return weaknesses.slice(0, 2);
  }

  private generateDrills(
    stats: RewindInsights["stats"],
    insights: RewindInsights
  ): AICoachContent["drills"] {
    const drills: AICoachContent["drills"] = [];

    drills.push({
      title: "CS Improvement",
      description: "In practice tool, aim for 80 CS by 10 minutes. Focus on last-hitting under tower.",
      difficulty: "Easy",
    });

    if (stats.avgKda < 3.0) {
      drills.push({
        title: "Death Review",
        description: "After each game, review your deaths. Identify which were preventable and what you could have done differently.",
        difficulty: "Medium",
      });
    }

    if (insights.visionScore < 60) {
      drills.push({
        title: "Ward Timing",
        description: "Set a timer for every 90 seconds to remind yourself to check ward inventory and place vision.",
        difficulty: "Easy",
      });
    }

    drills.push({
      title: "Trading Patterns",
      description: "In your next 5 games, focus on trading when the enemy uses an ability on minions. Punish cooldowns.",
      difficulty: "Medium",
    });

    drills.push({
      title: "Map Awareness",
      description: "Every time you CS, glance at the minimap. Build this habit until it's automatic.",
      difficulty: "Medium",
    });

    if (stats.longestWinStreak < 4) {
      drills.push({
        title: "Mental Reset",
        description: "After a loss, take a 5-minute break. Do some stretches, get water. Never queue tilted.",
        difficulty: "Easy",
      });
    }

    return drills.slice(0, 3);
  }

  private generateChampionRecommendations(
    topChampions: RewindInsights["topChampions"],
    mainRole: string
  ): AICoachContent["championRecommendations"] {
    // Champion recommendations based on role
    const roleRecommendations: Record<string, Array<{ id: number; name: string; reason: string }>> = {
      TOP: [
        { id: 86, name: "Garen", reason: "Simple kit lets you focus on macro decisions" },
        { id: 122, name: "Darius", reason: "Strong lane bully to practice trading patterns" },
        { id: 58, name: "Renekton", reason: "Teaches wave management and diving" },
      ],
      JUNGLE: [
        { id: 254, name: "Vi", reason: "Straightforward ganks and clear patterns" },
        { id: 19, name: "Warwick", reason: "Built-in sustain and beginner-friendly clear" },
        { id: 64, name: "Lee Sin", reason: "High skill ceiling to master over time" },
      ],
      MIDDLE: [
        { id: 103, name: "Ahri", reason: "Safe laning with playmaking potential" },
        { id: 99, name: "Lux", reason: "Learn skillshots and positioning" },
        { id: 61, name: "Orianna", reason: "Teaches zone control and teamfighting" },
      ],
      BOTTOM: [
        { id: 21, name: "Miss Fortune", reason: "Strong teamfight ultimate and easy CS" },
        { id: 51, name: "Caitlyn", reason: "Safe range to learn ADC fundamentals" },
        { id: 222, name: "Jinx", reason: "Hypercarry potential when ahead" },
      ],
      UTILITY: [
        { id: 89, name: "Leona", reason: "Teaches engage timing and target selection" },
        { id: 111, name: "Nautilus", reason: "Tanky with strong CC for picks" },
        { id: 117, name: "Lulu", reason: "Versatile enchanter for team protection" },
      ],
    };

    const role = mainRole.toUpperCase();
    const recommendations = roleRecommendations[role] || roleRecommendations.MIDDLE;
    
    // Filter out champions already in top played
    const playedChampIds = new Set(topChampions.map((c) => c.championId));
    const filtered = recommendations.filter((r) => !playedChampIds.has(r.id));

    return filtered.slice(0, 2).map((r) => ({
      championId: r.id,
      championName: r.name,
      reason: r.reason,
    }));
  }
}

