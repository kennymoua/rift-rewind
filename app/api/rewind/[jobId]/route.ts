/**
 * GET /api/rewind/[jobId]
 * 
 * Returns the status and result of a rewind job.
 * Clients should poll this endpoint until status is DONE or FAILED.
 */

import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "@/lib/services";
import type { GetRewindStatusResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const storage = getStorage();

    // Get job progress
    const progress = await storage.getJobProgress(jobId);

    if (!progress) {
      return NextResponse.json(
        { error: "Job not found", jobId },
        { status: 404 }
      );
    }

    // Build response
    const response: GetRewindStatusResponse = {
      jobId,
      progress,
    };

    // If job is done, include the result
    if (progress.status === "DONE") {
      const result = await storage.getRewindResult(jobId);
      if (result) {
        response.result = result;
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting rewind status:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to get rewind status",
        message,
      },
      { status: 500 }
    );
  }
}

