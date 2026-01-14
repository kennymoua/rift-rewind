/**
 * Zod schemas for API validation
 */

import { z } from "zod";

// ============================================
// Common Schemas
// ============================================

export const RiotRegionSchema = z.enum([
  "na1",
  "euw1",
  "eun1",
  "kr",
  "jp1",
  "br1",
  "la1",
  "la2",
  "oc1",
  "tr1",
  "ru",
  "ph2",
  "sg2",
  "th2",
  "tw2",
  "vn2",
]);

export const YearSchema = z
  .number()
  .int()
  .min(2021)
  .max(new Date().getFullYear());

export const GameNameSchema = z
  .string()
  .min(3, "Game name must be at least 3 characters")
  .max(16, "Game name must be at most 16 characters")
  .regex(/^[a-zA-Z0-9 ]+$/, "Game name can only contain letters, numbers, and spaces");

export const TagLineSchema = z
  .string()
  .min(3, "Tag must be at least 3 characters")
  .max(5, "Tag must be at most 5 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Tag can only contain letters and numbers");

// ============================================
// Rewind Request Schemas
// ============================================

export const StartRewindRequestSchema = z.object({
  gameName: GameNameSchema,
  tagLine: TagLineSchema,
  region: RiotRegionSchema,
  year: YearSchema,
});

export type StartRewindRequestInput = z.infer<typeof StartRewindRequestSchema>;

// ============================================
// Compare Request Schemas
// ============================================

export const PlayerInputSchema = z.object({
  gameName: GameNameSchema,
  tagLine: TagLineSchema,
  region: RiotRegionSchema,
});

export const StartCompareRequestSchema = z.object({
  player1: PlayerInputSchema,
  player2: PlayerInputSchema,
  year: YearSchema,
});

export type StartCompareRequestInput = z.infer<typeof StartCompareRequestSchema>;

// ============================================
// Response Schemas (for runtime validation)
// ============================================

export const RewindJobStatusSchema = z.enum([
  "PENDING",
  "RESOLVING_PLAYER",
  "FETCHING_MATCHES",
  "BUILDING_INSIGHTS",
  "GENERATING_STORY",
  "DONE",
  "FAILED",
]);

export const JobProgressSchema = z.object({
  status: RewindJobStatusSchema,
  currentStep: z.number(),
  totalSteps: z.number(),
  message: z.string(),
  startedAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().optional(),
  error: z.string().optional(),
});

export const PlayerInfoSchema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
  region: z.string(),
  profileIconId: z.number().optional(),
  summonerLevel: z.number().optional(),
});

export const ChampionStatsSchema = z.object({
  championId: z.number(),
  championName: z.string(),
  gamesPlayed: z.number(),
  wins: z.number(),
  losses: z.number(),
  winrate: z.number(),
  avgKda: z.number(),
  avgCs: z.number(),
  avgDamage: z.number(),
});

export const MatchHighlightSchema = z.object({
  matchId: z.string(),
  type: z.enum(["best_match", "worst_match", "biggest_comeback", "longest_game"]),
  title: z.string(),
  description: z.string(),
  championName: z.string(),
  championId: z.number(),
  stats: z.object({
    kda: z.string(),
    duration: z.string(),
    result: z.enum(["Victory", "Defeat"]),
  }),
});

// ============================================
// Helper Functions
// ============================================

export function validateStartRewindRequest(data: unknown) {
  return StartRewindRequestSchema.safeParse(data);
}

export function validateStartCompareRequest(data: unknown) {
  return StartCompareRequestSchema.safeParse(data);
}

export function formatValidationErrors(
  errors: z.ZodError
): Record<string, string> {
  const formatted: Record<string, string> = {};
  errors.errors.forEach((err) => {
    const path = err.path.join(".");
    formatted[path] = err.message;
  });
  return formatted;
}

