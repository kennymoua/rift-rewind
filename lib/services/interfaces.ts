/**
 * Service Layer Interfaces
 * 
 * These interfaces define the contracts for all external integrations.
 * Implementations can be swapped between mock (local) and AWS (production).
 */

import type {
  PlayerInfo,
  MatchSummary,
  RewindResult,
  CompareResult,
  JobProgress,
  RewindJobStatus,
  AICoachContent,
  RewindInsights,
} from "@/lib/types";

// ============================================
// Riot API Client Interface
// ============================================

export interface IRiotClient {
  /**
   * Get PUUID from Riot ID (gameName#tagLine)
   */
  getPuuid(
    gameName: string,
    tagLine: string,
    region: string
  ): Promise<PlayerInfo>;

  /**
   * Get list of match IDs for a player
   */
  listMatchIds(
    puuid: string,
    region: string,
    startTime?: number,
    endTime?: number,
    count?: number
  ): Promise<string[]>;

  /**
   * Get match details
   */
  getMatch(matchId: string, region: string): Promise<MatchSummary>;
}

// ============================================
// Storage Interface (DynamoDB + S3)
// ============================================

export interface IStorage {
  /**
   * Store raw match data
   */
  putRawMatch(matchId: string, data: unknown): Promise<void>;

  /**
   * Get raw match data
   */
  getRawMatch(matchId: string): Promise<unknown | null>;

  /**
   * Store rewind result
   */
  putRewindResult(jobId: string, result: RewindResult): Promise<void>;

  /**
   * Get rewind result
   */
  getRewindResult(jobId: string): Promise<RewindResult | null>;

  /**
   * Store compare result
   */
  putCompareResult(jobId: string, result: CompareResult): Promise<void>;

  /**
   * Get compare result
   */
  getCompareResult(jobId: string): Promise<CompareResult | null>;

  /**
   * Store job progress
   */
  putJobProgress(jobId: string, progress: JobProgress): Promise<void>;

  /**
   * Get job progress
   */
  getJobProgress(jobId: string): Promise<JobProgress | null>;

  /**
   * Update job status
   */
  updateJobStatus(
    jobId: string,
    status: RewindJobStatus,
    message?: string,
    error?: string
  ): Promise<void>;
}

// ============================================
// Orchestrator Interface (Step Functions)
// ============================================

export interface IOrchestrator {
  /**
   * Start a rewind job
   */
  startRewindJob(
    jobId: string,
    gameName: string,
    tagLine: string,
    region: string,
    year: number
  ): Promise<void>;

  /**
   * Start a compare job
   */
  startCompareJob(
    jobId: string,
    player1: { gameName: string; tagLine: string; region: string },
    player2: { gameName: string; tagLine: string; region: string },
    year: number
  ): Promise<void>;

  /**
   * Get job status
   */
  getJobStatus(jobId: string): Promise<JobProgress | null>;
}

// ============================================
// AI Client Interface (Bedrock)
// ============================================

export interface IAIClient {
  /**
   * Generate narrative and coaching tips from insights
   */
  generateNarrativeAndTips(
    player: PlayerInfo,
    insights: RewindInsights
  ): Promise<AICoachContent>;
}

// ============================================
// Stats Builder Interface
// ============================================

export interface IStatsBuilder {
  /**
   * Build insights from match summaries
   */
  buildInsights(
    matches: MatchSummary[],
    year: number
  ): RewindInsights;
}

// ============================================
// Service Factory Interface
// ============================================

export interface IServiceFactory {
  getRiotClient(): IRiotClient;
  getStorage(): IStorage;
  getOrchestrator(): IOrchestrator;
  getAIClient(): IAIClient;
  getStatsBuilder(): IStatsBuilder;
}

