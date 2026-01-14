/**
 * POST /api/compare/start
 * 
 * Starts a new compare job for two players.
 * Returns a jobId that can be used to poll for status.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateStartCompareRequest, formatValidationErrors } from "@/lib/validations";
import { getOrchestrator, getStorage } from "@/lib/services";
import { generateJobId } from "@/lib/utils";
import { isCompareEnabled } from "@/lib/constants";
import type { StartCompareResponse, JobProgress } from "@/lib/types";

export async function POST(request: NextRequest) {
  // Check if compare feature is enabled
  if (!isCompareEnabled()) {
    return NextResponse.json(
      { error: "Compare feature is not enabled" },
      { status: 403 }
    );
  }

  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateStartCompareRequest(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: formatValidationErrors(validation.error),
        },
        { status: 400 }
      );
    }

    const { player1, player2, year } = validation.data;

    // Generate job ID
    const jobId = generateJobId();

    // Initialize job progress
    const initialProgress: JobProgress = {
      status: "PENDING",
      currentStep: 0,
      totalSteps: 4,
      message: "Starting player comparison...",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store initial progress
    const storage = getStorage();
    await storage.putJobProgress(jobId, initialProgress);

    // Start the orchestration workflow
    const orchestrator = getOrchestrator();
    await orchestrator.startCompareJob(jobId, player1, player2, year);

    // Return response
    const response: StartCompareResponse = {
      jobId,
      status: "PENDING",
      message: `Comparing ${player1.gameName}#${player1.tagLine} vs ${player2.gameName}#${player2.tagLine}...`,
    };

    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    console.error("Error starting compare job:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to start compare job",
        message,
      },
      { status: 500 }
    );
  }
}

