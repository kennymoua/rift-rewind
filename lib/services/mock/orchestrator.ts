/**
 * Mock Orchestrator Implementation
 * 
 * Simulates the Step Functions workflow for local development.
 * Runs the entire rewind process in sequence with simulated delays.
 */

import type { IOrchestrator } from "../interfaces";
import type { JobProgress, RewindResult, CompareResult } from "@/lib/types";
import { MockRiotClient } from "./riot-client";
import { MockStorage } from "./storage";
import { MockAIClient } from "./ai-client";
import { StatsBuilder } from "./stats-builder";
import { sleep, generateJobId } from "@/lib/utils";

export class MockOrchestrator implements IOrchestrator {
  private riotClient: MockRiotClient;
  private storage: MockStorage;
  private aiClient: MockAIClient;
  private statsBuilder: StatsBuilder;

  constructor() {
    this.riotClient = new MockRiotClient();
    this.storage = new MockStorage();
    this.aiClient = new MockAIClient();
    this.statsBuilder = new StatsBuilder();
  }

  async startRewindJob(
    jobId: string,
    gameName: string,
    tagLine: string,
    region: string,
    year: number
  ): Promise<void> {
    // Initialize job progress
    const initialProgress: JobProgress = {
      status: "PENDING",
      currentStep: 0,
      totalSteps: 4,
      message: "Starting rewind generation...",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.storage.putJobProgress(jobId, initialProgress);

    // Run the workflow asynchronously (non-blocking)
    this.runRewindWorkflow(jobId, gameName, tagLine, region, year).catch(
      async (error) => {
        console.error(`Job ${jobId} failed:`, error);
        await this.storage.updateJobStatus(
          jobId,
          "FAILED",
          "An error occurred during processing",
          error.message
        );
      }
    );
  }

  private async runRewindWorkflow(
    jobId: string,
    gameName: string,
    tagLine: string,
    region: string,
    year: number
  ): Promise<void> {
    try {
      // Step 1: Resolve player
      await this.storage.updateJobStatus(
        jobId,
        "RESOLVING_PLAYER",
        "Looking up your Riot ID..."
      );
      const player = await this.riotClient.getPuuid(gameName, tagLine, region);

      // Step 2: Fetch matches
      await this.storage.updateJobStatus(
        jobId,
        "FETCHING_MATCHES",
        "Retrieving your match history..."
      );
      
      const yearStart = new Date(year, 0, 1).getTime() / 1000;
      const yearEnd = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;
      
      const matchIds = await this.riotClient.listMatchIds(
        player.puuid,
        region,
        yearStart,
        yearEnd,
        100
      );

      // Fetch match details (batch with some delay to simulate API calls)
      const matches = [];
      for (const matchId of matchIds.slice(0, 50)) {
        const match = await this.riotClient.getMatch(matchId, region);
        matches.push(match);
      }

      // Step 3: Build insights
      await this.storage.updateJobStatus(
        jobId,
        "BUILDING_INSIGHTS",
        "Analyzing your performance..."
      );
      await sleep(1000); // Simulate processing time
      const insights = this.statsBuilder.buildInsights(matches, year);

      // Step 4: Generate AI content
      await this.storage.updateJobStatus(
        jobId,
        "GENERATING_STORY",
        "Crafting your personalized recap..."
      );
      const aiCoach = await this.aiClient.generateNarrativeAndTips(
        player,
        insights
      );

      // Build final result
      const result: RewindResult = {
        jobId,
        player,
        seasonFilter: {
          year,
          startDate: new Date(year, 0, 1).toISOString(),
          endDate: new Date(year, 11, 31).toISOString(),
        },
        insights,
        aiCoach,
        generatedAt: new Date().toISOString(),
      };

      // Save result and mark complete
      await this.storage.putRewindResult(jobId, result);
      await this.storage.updateJobStatus(jobId, "DONE", "Your rewind is ready!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await this.storage.updateJobStatus(
        jobId,
        "FAILED",
        "Failed to generate rewind",
        message
      );
      throw error;
    }
  }

  async startCompareJob(
    jobId: string,
    player1: { gameName: string; tagLine: string; region: string },
    player2: { gameName: string; tagLine: string; region: string },
    year: number
  ): Promise<void> {
    // Initialize job progress
    const initialProgress: JobProgress = {
      status: "PENDING",
      currentStep: 0,
      totalSteps: 4,
      message: "Starting comparison...",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.storage.putJobProgress(jobId, initialProgress);

    // Run the workflow asynchronously
    this.runCompareWorkflow(jobId, player1, player2, year).catch(
      async (error) => {
        console.error(`Compare job ${jobId} failed:`, error);
        await this.storage.updateJobStatus(
          jobId,
          "FAILED",
          "An error occurred during comparison",
          error.message
        );
      }
    );
  }

  private async runCompareWorkflow(
    jobId: string,
    player1Input: { gameName: string; tagLine: string; region: string },
    player2Input: { gameName: string; tagLine: string; region: string },
    year: number
  ): Promise<void> {
    try {
      // Step 1: Resolve both players
      await this.storage.updateJobStatus(
        jobId,
        "RESOLVING_PLAYER",
        "Looking up both players..."
      );
      
      const [player1, player2] = await Promise.all([
        this.riotClient.getPuuid(
          player1Input.gameName,
          player1Input.tagLine,
          player1Input.region
        ),
        this.riotClient.getPuuid(
          player2Input.gameName,
          player2Input.tagLine,
          player2Input.region
        ),
      ]);

      // Step 2: Fetch matches for both
      await this.storage.updateJobStatus(
        jobId,
        "FETCHING_MATCHES",
        "Retrieving match history..."
      );

      const yearStart = new Date(year, 0, 1).getTime() / 1000;
      const yearEnd = new Date(year, 11, 31, 23, 59, 59).getTime() / 1000;

      const [matchIds1, matchIds2] = await Promise.all([
        this.riotClient.listMatchIds(player1.puuid, player1.region, yearStart, yearEnd, 50),
        this.riotClient.listMatchIds(player2.puuid, player2.region, yearStart, yearEnd, 50),
      ]);

      // Fetch match details
      const fetchMatches = async (ids: string[], region: string) => {
        const matches = [];
        for (const id of ids.slice(0, 30)) {
          matches.push(await this.riotClient.getMatch(id, region));
        }
        return matches;
      };

      const [matches1, matches2] = await Promise.all([
        fetchMatches(matchIds1, player1.region),
        fetchMatches(matchIds2, player2.region),
      ]);

      // Step 3: Build insights
      await this.storage.updateJobStatus(
        jobId,
        "BUILDING_INSIGHTS",
        "Analyzing both players..."
      );
      await sleep(1000);

      const insights1 = this.statsBuilder.buildInsights(matches1, year);
      const insights2 = this.statsBuilder.buildInsights(matches2, year);

      // Step 4: Generate comparison
      await this.storage.updateJobStatus(
        jobId,
        "GENERATING_STORY",
        "Generating comparison..."
      );
      await sleep(500);

      // Find common champions
      const champs1 = new Set(insights1.topChampions.map((c) => c.championName));
      const commonChampions = insights2.topChampions
        .filter((c) => champs1.has(c.championName))
        .map((c) => c.championName);

      const result: CompareResult = {
        jobId,
        player1: { info: player1, insights: insights1 },
        player2: { info: player2, insights: insights2 },
        comparison: {
          winrateAdvantage:
            insights1.stats.winrate > insights2.stats.winrate
              ? "player1"
              : insights1.stats.winrate < insights2.stats.winrate
                ? "player2"
                : "tie",
          kdaAdvantage:
            insights1.stats.avgKda > insights2.stats.avgKda
              ? "player1"
              : insights1.stats.avgKda < insights2.stats.avgKda
                ? "player2"
                : "tie",
          gamesPlayedAdvantage:
            insights1.stats.gamesPlayed > insights2.stats.gamesPlayed
              ? "player1"
              : insights1.stats.gamesPlayed < insights2.stats.gamesPlayed
                ? "player2"
                : "tie",
          commonChampions,
        },
        generatedAt: new Date().toISOString(),
      };

      await this.storage.putCompareResult(jobId, result);
      await this.storage.updateJobStatus(
        jobId,
        "DONE",
        "Comparison complete!"
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await this.storage.updateJobStatus(
        jobId,
        "FAILED",
        "Failed to compare players",
        message
      );
      throw error;
    }
  }

  async getJobStatus(jobId: string): Promise<JobProgress | null> {
    return this.storage.getJobProgress(jobId);
  }
}

// Singleton instance for the mock orchestrator
let mockOrchestratorInstance: MockOrchestrator | null = null;

export function getMockOrchestrator(): MockOrchestrator {
  if (!mockOrchestratorInstance) {
    mockOrchestratorInstance = new MockOrchestrator();
  }
  return mockOrchestratorInstance;
}

