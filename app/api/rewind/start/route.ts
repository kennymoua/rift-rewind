/**
 * POST /api/rewind/start
 * 
 * Starts a new rewind job for a player.
 * Returns a jobId that can be used to poll for status.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateStartRewindRequest, formatValidationErrors } from "@/lib/validations";
import { getOrchestrator, getStorage } from "@/lib/services";
import { generateJobId } from "@/lib/utils";
import type { StartRewindResponse, JobProgress } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateStartRewindRequest(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: formatValidationErrors(validation.error),
        },
        { status: 400 }
      );
    }

    const { gameName, tagLine, region, year } = validation.data;

    // Generate job ID
    const jobId = generateJobId();

    // Initialize job progress
    const initialProgress: JobProgress = {
      status: "PENDING",
      currentStep: 0,
      totalSteps: 4,
      message: "Starting rewind generation...",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store initial progress
    const storage = getStorage();
    await storage.putJobProgress(jobId, initialProgress);

    // Start the orchestration workflow
    const orchestrator = getOrchestrator();
    await orchestrator.startRewindJob(jobId, gameName, tagLine, region, year);

    // Return response
    const response: StartRewindResponse = {
      jobId,
      status: "PENDING",
      message: `Generating rewind for ${gameName}#${tagLine}...`,
    };

    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    console.error("Error starting rewind job:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to start rewind job",
        message,
      },
      { status: 500 }
    );
  }
}

