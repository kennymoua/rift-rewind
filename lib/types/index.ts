/**
 * Core type definitions for Rift Rewind
 * These types define the data structures used throughout the application
 */

// ============================================
// Job Status Types
// ============================================

export type RewindJobStatus =
  | "PENDING"
  | "RESOLVING_PLAYER"
  | "FETCHING_MATCHES"
  | "BUILDING_INSIGHTS"
  | "GENERATING_STORY"
  | "DONE"
  | "FAILED";

export type CompareJobStatus = RewindJobStatus;

export interface JobProgress {
  status: RewindJobStatus;
  currentStep: number;
  totalSteps: number;
  message: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  error?: string;
}

// ============================================
// Player & Match Types
// ============================================

export interface PlayerInfo {
  puuid: string;
  gameName: string;
  tagLine: string;
  region: string;
  profileIconId?: number;
  summonerLevel?: number;
}

export interface MatchSummary {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  championId: number;
  championName: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  csPerMin: number;
  visionScore: number;
  goldEarned: number;
  damageDealt: number;
  role: string;
  lane: string;
  teamPosition: string;
}

export interface MatchHighlight {
  matchId: string;
  type: "best_match" | "worst_match" | "biggest_comeback" | "longest_game";
  title: string;
  description: string;
  championName: string;
  championId: number;
  stats: {
    kda: string;
    duration: string;
    result: "Victory" | "Defeat";
  };
}

// ============================================
// Stats & Insights Types
// ============================================

export interface ChampionStats {
  championId: number;
  championName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winrate: number;
  avgKda: number;
  avgCs: number;
  avgDamage: number;
}

export interface RoleDistribution {
  role: string;
  games: number;
  percentage: number;
}

export interface WinrateDataPoint {
  period: string;
  winrate: number;
  games: number;
}

export interface RewindStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  winrate: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  avgKda: number;
  avgGameDuration: number;
  longestWinStreak: number;
  longestLossStreak: number;
  peakRank?: string;
  mostPlayedRole: string;
}

export interface RewindInsights {
  stats: RewindStats;
  topChampions: ChampionStats[];
  roleDistribution: RoleDistribution[];
  winrateOverTime: WinrateDataPoint[];
  highlights: MatchHighlight[];
  visionScore: number;
  objectiveScore: number;
}

// ============================================
// AI-Generated Content Types
// ============================================

export interface AIStrength {
  title: string;
  description: string;
}

export interface AIWeakness {
  title: string;
  description: string;
}

export interface AIDrill {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface ChampionRecommendation {
  championId: number;
  championName: string;
  reason: string;
}

export interface AICoachContent {
  narrative: string;
  strengths: AIStrength[];
  weaknesses: AIWeakness[];
  drills: AIDrill[];
  championRecommendations: ChampionRecommendation[];
}

// ============================================
// Rewind Result Types
// ============================================

export interface RewindResult {
  jobId: string;
  player: PlayerInfo;
  seasonFilter: {
    year: number;
    startDate: string;
    endDate: string;
  };
  insights: RewindInsights;
  aiCoach: AICoachContent;
  generatedAt: string;
}

// ============================================
// Compare Types
// ============================================

export interface CompareResult {
  jobId: string;
  player1: {
    info: PlayerInfo;
    insights: RewindInsights;
  };
  player2: {
    info: PlayerInfo;
    insights: RewindInsights;
  };
  comparison: {
    winrateAdvantage: "player1" | "player2" | "tie";
    kdaAdvantage: "player1" | "player2" | "tie";
    gamesPlayedAdvantage: "player1" | "player2" | "tie";
    commonChampions: string[];
    headToHead?: {
      player1Wins: number;
      player2Wins: number;
    };
  };
  generatedAt: string;
}

// ============================================
// API Request/Response Types
// ============================================

export interface StartRewindRequest {
  gameName: string;
  tagLine: string;
  region: string;
  year: number;
}

export interface StartRewindResponse {
  jobId: string;
  status: RewindJobStatus;
  message: string;
}

export interface GetRewindStatusResponse {
  jobId: string;
  progress: JobProgress;
  result?: RewindResult;
}

export interface StartCompareRequest {
  player1: {
    gameName: string;
    tagLine: string;
    region: string;
  };
  player2: {
    gameName: string;
    tagLine: string;
    region: string;
  };
  year: number;
}

export interface StartCompareResponse {
  jobId: string;
  status: CompareJobStatus;
  message: string;
}

export interface GetCompareStatusResponse {
  jobId: string;
  progress: JobProgress;
  result?: CompareResult;
}

// ============================================
// Region Types
// ============================================

export type RiotRegion =
  | "na1"
  | "euw1"
  | "eun1"
  | "kr"
  | "jp1"
  | "br1"
  | "la1"
  | "la2"
  | "oc1"
  | "tr1"
  | "ru"
  | "ph2"
  | "sg2"
  | "th2"
  | "tw2"
  | "vn2";

export type RiotRoutingRegion = "americas" | "europe" | "asia" | "sea";

export interface RegionOption {
  value: RiotRegion;
  label: string;
  routing: RiotRoutingRegion;
}

// ============================================
// Error Types
// ============================================

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

