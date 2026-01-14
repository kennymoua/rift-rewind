/**
 * Mock Storage Implementation
 * 
 * Uses in-memory storage for local development.
 * In production, this would be replaced with DynamoDB + S3.
 */

import type { IStorage } from "../interfaces";
import type {
  RewindResult,
  CompareResult,
  JobProgress,
  RewindJobStatus,
} from "@/lib/types";

// In-memory storage
const rawMatches = new Map<string, unknown>();
const rewindResults = new Map<string, RewindResult>();
const compareResults = new Map<string, CompareResult>();
const jobProgress = new Map<string, JobProgress>();

export class MockStorage implements IStorage {
  async putRawMatch(matchId: string, data: unknown): Promise<void> {
    rawMatches.set(matchId, data);
  }

  async getRawMatch(matchId: string): Promise<unknown | null> {
    return rawMatches.get(matchId) || null;
  }

  async putRewindResult(jobId: string, result: RewindResult): Promise<void> {
    rewindResults.set(jobId, result);
  }

  async getRewindResult(jobId: string): Promise<RewindResult | null> {
    return rewindResults.get(jobId) || null;
  }

  async putCompareResult(jobId: string, result: CompareResult): Promise<void> {
    compareResults.set(jobId, result);
  }

  async getCompareResult(jobId: string): Promise<CompareResult | null> {
    return compareResults.get(jobId) || null;
  }

  async putJobProgress(jobId: string, progress: JobProgress): Promise<void> {
    jobProgress.set(jobId, progress);
  }

  async getJobProgress(jobId: string): Promise<JobProgress | null> {
    return jobProgress.get(jobId) || null;
  }

  async updateJobStatus(
    jobId: string,
    status: RewindJobStatus,
    message?: string,
    error?: string
  ): Promise<void> {
    const existing = jobProgress.get(jobId);
    if (!existing) {
      throw new Error(`Job ${jobId} not found`);
    }

    const stepMap: Record<RewindJobStatus, number> = {
      PENDING: 0,
      RESOLVING_PLAYER: 1,
      FETCHING_MATCHES: 2,
      BUILDING_INSIGHTS: 3,
      GENERATING_STORY: 4,
      DONE: 5,
      FAILED: -1,
    };

    const updated: JobProgress = {
      ...existing,
      status,
      currentStep: stepMap[status] >= 0 ? stepMap[status] : existing.currentStep,
      message: message || existing.message,
      updatedAt: new Date().toISOString(),
      ...(status === "DONE" && { completedAt: new Date().toISOString() }),
      ...(error && { error }),
    };

    jobProgress.set(jobId, updated);
  }
}

// Export for testing purposes
export function clearMockStorage() {
  rawMatches.clear();
  rewindResults.clear();
  compareResults.clear();
  jobProgress.clear();
}

export function getMockStorageStats() {
  return {
    rawMatches: rawMatches.size,
    rewindResults: rewindResults.size,
    compareResults: compareResults.size,
    jobProgress: jobProgress.size,
  };
}

