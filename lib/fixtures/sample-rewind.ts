/**
 * Sample Rewind Result Fixture
 * 
 * This data is used for demo purposes and UI development.
 * It represents a realistic player's season recap.
 */

import type { RewindResult } from "@/lib/types";

export const sampleRewindResult: RewindResult = {
  jobId: "rr_1704067200000_demo123",
  player: {
    puuid: "sample-puuid-faker-kr1",
    gameName: "Faker",
    tagLine: "KR1",
    region: "kr",
    profileIconId: 4025,
    summonerLevel: 842,
  },
  seasonFilter: {
    year: 2024,
    startDate: "2024-01-10T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
  },
  insights: {
    stats: {
      gamesPlayed: 247,
      wins: 148,
      losses: 99,
      winrate: 0.599,
      totalKills: 1976,
      totalDeaths: 988,
      totalAssists: 2223,
      avgKda: 4.25,
      avgGameDuration: 1860,
      longestWinStreak: 12,
      longestLossStreak: 5,
      mostPlayedRole: "Mid",
    },
    topChampions: [
      {
        championId: 103,
        championName: "Ahri",
        gamesPlayed: 52,
        wins: 34,
        losses: 18,
        winrate: 0.654,
        avgKda: 4.8,
        avgCs: 198,
        avgDamage: 24500,
      },
      {
        championId: 61,
        championName: "Orianna",
        gamesPlayed: 38,
        wins: 22,
        losses: 16,
        winrate: 0.579,
        avgKda: 3.9,
        avgCs: 215,
        avgDamage: 22800,
      },
      {
        championId: 134,
        championName: "Syndra",
        gamesPlayed: 31,
        wins: 19,
        losses: 12,
        winrate: 0.613,
        avgKda: 4.2,
        avgCs: 205,
        avgDamage: 26100,
      },
      {
        championId: 157,
        championName: "Yasuo",
        gamesPlayed: 24,
        wins: 15,
        losses: 9,
        winrate: 0.625,
        avgKda: 5.1,
        avgCs: 228,
        avgDamage: 28300,
      },
      {
        championId: 238,
        championName: "Zed",
        gamesPlayed: 19,
        wins: 12,
        losses: 7,
        winrate: 0.632,
        avgKda: 4.5,
        avgCs: 192,
        avgDamage: 27800,
      },
    ],
    roleDistribution: [
      { role: "Mid", games: 198, percentage: 80.2 },
      { role: "Top", games: 24, percentage: 9.7 },
      { role: "Jungle", games: 15, percentage: 6.1 },
      { role: "Bot", games: 7, percentage: 2.8 },
      { role: "Support", games: 3, percentage: 1.2 },
    ],
    winrateOverTime: [
      { period: "Jan", winrate: 0.52, games: 18 },
      { period: "Feb", winrate: 0.58, games: 22 },
      { period: "Mar", winrate: 0.61, games: 28 },
      { period: "Apr", winrate: 0.55, games: 25 },
      { period: "May", winrate: 0.63, games: 30 },
      { period: "Jun", winrate: 0.59, games: 24 },
      { period: "Jul", winrate: 0.65, games: 26 },
      { period: "Aug", winrate: 0.62, games: 28 },
      { period: "Sep", winrate: 0.58, games: 22 },
      { period: "Oct", winrate: 0.64, games: 18 },
      { period: "Nov", winrate: 0.67, games: 6 },
    ],
    highlights: [
      {
        matchId: "KR_6789012345",
        type: "best_match",
        title: "Best Performance",
        description: "An incredible 18/2/14 game on Ahri with massive carry potential",
        championName: "Ahri",
        championId: 103,
        stats: {
          kda: "18/2/14",
          duration: "28:45",
          result: "Victory",
        },
      },
      {
        matchId: "KR_6789012346",
        type: "biggest_comeback",
        title: "Clutch Comeback",
        description: "Down 10k gold at 20 minutes, turned it around with a Baron steal",
        championName: "Orianna",
        championId: 61,
        stats: {
          kda: "8/4/16",
          duration: "42:18",
          result: "Victory",
        },
      },
      {
        matchId: "KR_6789012347",
        type: "longest_game",
        title: "Marathon Match",
        description: "An epic 55-minute battle that tested endurance and decision-making",
        championName: "Syndra",
        championId: 134,
        stats: {
          kda: "12/6/18",
          duration: "55:32",
          result: "Victory",
        },
      },
      {
        matchId: "KR_6789012348",
        type: "worst_match",
        title: "Rough Game",
        description: "Everyone has off days - this was a learning experience",
        championName: "Yasuo",
        championId: 157,
        stats: {
          kda: "2/9/3",
          duration: "22:15",
          result: "Defeat",
        },
      },
    ],
    visionScore: 78,
    objectiveScore: 82,
  },
  aiCoach: {
    narrative:
      "What an incredible Season 14 for Faker! With 247 ranked games under your belt and a stellar 59.9% win rate, you've proven once again why you're a mid lane legend. Your commitment to Ahri has paid dividends with an impressive 65.4% win rate across 52 games. That 12-game win streak in the summer was a highlight reel moment! Your 4.25 average KDA demonstrates exceptional mechanical skill and game sense. The steady climb in win rate throughout the year shows consistent improvement and adaptation to the evolving meta. Keep dominating the Rift!",
    strengths: [
      {
        title: "Exceptional KDA Management",
        description:
          "Your 4.25 average KDA is well above the average for mid laners. You excel at picking the right fights and staying alive to carry.",
      },
      {
        title: "Champion Pool Mastery",
        description:
          "Your top 5 champions all have 57%+ win rates. You've found your comfort picks and execute them at a high level consistently.",
      },
      {
        title: "Clutch Factor",
        description:
          "Your ability to turn losing games around, evidenced by multiple comeback victories, shows strong mental fortitude and late-game decision making.",
      },
    ],
    weaknesses: [
      {
        title: "Role Flexibility",
        description:
          "80% of your games are mid lane. While specialization is valuable, expanding your champion pool to off-roles could make you more adaptable.",
      },
      {
        title: "Early Game Aggression",
        description:
          "Your win rate spikes in longer games. Consider practicing more aggressive early game patterns to close out games faster.",
      },
    ],
    drills: [
      {
        title: "CS Perfection Practice",
        description:
          "In Practice Tool, aim for 100 CS at 10 minutes without abilities. This builds last-hit muscle memory.",
        difficulty: "Easy",
      },
      {
        title: "Trading Stance Drills",
        description:
          "In your next 10 games, focus on trading whenever the enemy mid uses a key ability on the wave. Track your trades in a notebook.",
        difficulty: "Medium",
      },
      {
        title: "Wave State Analysis",
        description:
          "Before roaming, practice assessing wave states. Only roam when your wave is pushing or crashing, never when it's pulling toward you.",
        difficulty: "Hard",
      },
    ],
    championRecommendations: [
      {
        championId: 136,
        championName: "Aurelion Sol",
        reason:
          "Your control mage proficiency would translate well. ASol rewards the same wave manipulation and teamfight positioning you excel at.",
      },
      {
        championId: 910,
        championName: "Hwei",
        reason:
          "A new control mage that rewards creativity and game knowledge. Your experience on Orianna and Syndra provides a strong foundation.",
      },
    ],
  },
  generatedAt: "2024-11-25T12:00:00.000Z",
};

export const sampleRewindResult2: RewindResult = {
  jobId: "rr_1704067200000_demo456",
  player: {
    puuid: "sample-puuid-doublelift-na1",
    gameName: "Doublelift",
    tagLine: "NA1",
    region: "na1",
    profileIconId: 3587,
    summonerLevel: 578,
  },
  seasonFilter: {
    year: 2024,
    startDate: "2024-01-10T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
  },
  insights: {
    stats: {
      gamesPlayed: 189,
      wins: 102,
      losses: 87,
      winrate: 0.54,
      totalKills: 1512,
      totalDeaths: 756,
      totalAssists: 1323,
      avgKda: 3.75,
      avgGameDuration: 1920,
      longestWinStreak: 8,
      longestLossStreak: 6,
      mostPlayedRole: "Bot",
    },
    topChampions: [
      {
        championId: 51,
        championName: "Caitlyn",
        gamesPlayed: 45,
        wins: 27,
        losses: 18,
        winrate: 0.6,
        avgKda: 4.1,
        avgCs: 245,
        avgDamage: 28500,
      },
      {
        championId: 222,
        championName: "Jinx",
        gamesPlayed: 38,
        wins: 21,
        losses: 17,
        winrate: 0.553,
        avgKda: 3.8,
        avgCs: 232,
        avgDamage: 31200,
      },
      {
        championId: 81,
        championName: "Ezreal",
        gamesPlayed: 32,
        wins: 17,
        losses: 15,
        winrate: 0.531,
        avgKda: 3.5,
        avgCs: 218,
        avgDamage: 24800,
      },
      {
        championId: 145,
        championName: "Kai'Sa",
        gamesPlayed: 28,
        wins: 15,
        losses: 13,
        winrate: 0.536,
        avgKda: 3.9,
        avgCs: 225,
        avgDamage: 27900,
      },
      {
        championId: 67,
        championName: "Vayne",
        gamesPlayed: 22,
        wins: 13,
        losses: 9,
        winrate: 0.591,
        avgKda: 4.2,
        avgCs: 198,
        avgDamage: 32400,
      },
    ],
    roleDistribution: [
      { role: "Bot", games: 165, percentage: 87.3 },
      { role: "Mid", games: 14, percentage: 7.4 },
      { role: "Top", games: 6, percentage: 3.2 },
      { role: "Jungle", games: 3, percentage: 1.6 },
      { role: "Support", games: 1, percentage: 0.5 },
    ],
    winrateOverTime: [
      { period: "Jan", winrate: 0.48, games: 15 },
      { period: "Feb", winrate: 0.52, games: 18 },
      { period: "Mar", winrate: 0.55, games: 22 },
      { period: "Apr", winrate: 0.51, games: 20 },
      { period: "May", winrate: 0.56, games: 24 },
      { period: "Jun", winrate: 0.54, games: 19 },
      { period: "Jul", winrate: 0.58, games: 21 },
      { period: "Aug", winrate: 0.55, games: 20 },
      { period: "Sep", winrate: 0.53, games: 16 },
      { period: "Oct", winrate: 0.57, games: 10 },
      { period: "Nov", winrate: 0.60, games: 4 },
    ],
    highlights: [
      {
        matchId: "NA1_4567890123",
        type: "best_match",
        title: "Best Performance",
        description: "A dominant 15/1/12 game on Jinx with a pentakill in the final fight",
        championName: "Jinx",
        championId: 222,
        stats: {
          kda: "15/1/12",
          duration: "32:18",
          result: "Victory",
        },
      },
      {
        matchId: "NA1_4567890124",
        type: "biggest_comeback",
        title: "Clutch Comeback",
        description: "Team was tilted, but you stayed focused and carried late game",
        championName: "Vayne",
        championId: 67,
        stats: {
          kda: "11/5/8",
          duration: "45:22",
          result: "Victory",
        },
      },
      {
        matchId: "NA1_4567890125",
        type: "longest_game",
        title: "Marathon Match",
        description: "A grueling 50+ minute game that came down to one teamfight",
        championName: "Caitlyn",
        championId: 51,
        stats: {
          kda: "9/4/15",
          duration: "52:45",
          result: "Victory",
        },
      },
      {
        matchId: "NA1_4567890126",
        type: "worst_match",
        title: "Rough Game",
        description: "Jungle gap happens to the best of us",
        championName: "Ezreal",
        championId: 81,
        stats: {
          kda: "1/8/2",
          duration: "24:30",
          result: "Defeat",
        },
      },
    ],
    visionScore: 65,
    objectiveScore: 74,
  },
  aiCoach: {
    narrative:
      "Season 14 has been a solid year for Doublelift! With 189 ranked games and a 54% win rate, you've shown consistent performance in the bot lane. Your dedication to ADC is clear with 87% of games played in that role. Caitlyn has been your go-to pick with a 60% win rate - those traps really catch people off guard! Your 8-game win streak showed your carry potential when you're in the zone. Keep grinding and that 60%+ win rate is within reach!",
    strengths: [
      {
        title: "Role Dedication",
        description:
          "Your 87% bot lane focus has built deep role knowledge. You understand ADC matchups and win conditions at a high level.",
      },
      {
        title: "Late Game Carry",
        description:
          "Your win rate increases significantly in longer games. You excel at teamfight positioning and damage output.",
      },
      {
        title: "CS Fundamentals",
        description:
          "Consistently high CS numbers across all your champions show strong laning fundamentals.",
      },
    ],
    weaknesses: [
      {
        title: "Vision Control",
        description:
          "Your vision score is below average for ADCs. Better warding can prevent the ganks that lead to those rough games.",
      },
      {
        title: "Early Game Trading",
        description:
          "Your win rate tends to be lower in shorter games. Focus on winning lane more decisively.",
      },
    ],
    drills: [
      {
        title: "Ward Timer Practice",
        description:
          "Set a 90-second timer reminder to check your ward inventory. Place a control ward every back.",
        difficulty: "Easy",
      },
      {
        title: "Trading in Lane",
        description:
          "Practice auto-attacking the enemy ADC every time they go for a CS. Track how many free autos you land per game.",
        difficulty: "Medium",
      },
      {
        title: "Team Fight Positioning",
        description:
          "In your next 5 games, focus on always staying max range from the nearest threat. Review deaths after each game.",
        difficulty: "Medium",
      },
    ],
    championRecommendations: [
      {
        championId: 360,
        championName: "Samira",
        reason:
          "Your teamfight positioning is solid, and Samira rewards aggressive all-ins that you can set up.",
      },
      {
        championId: 221,
        championName: "Zeri",
        reason:
          "Mobile ADC that matches your kiting playstyle. Great for carrying teamfights when ahead.",
      },
    ],
  },
  generatedAt: "2024-11-25T12:30:00.000Z",
};

