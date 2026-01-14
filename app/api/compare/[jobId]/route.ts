/**
 * GET /api/compare/[jobId]
 * 
 * Returns the status and result of a compare job.
 * Clients should poll this endpoint until status is DONE or FAILED.
 */

import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "@/lib/services";
import { isCompareEnabled } from "@/lib/constants";
import type { GetCompareStatusResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  // Check if compare feature is enabled
  if (!isCompareEnabled()) {
    return NextResponse.json(
      { error: "Compare feature is not enabled" },
      { status: 403 }
    );
  }

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
    const response: GetCompareStatusResponse = {
      jobId,
      progress,
    };

    // If job is done, include the result
    if (progress.status === "DONE") {
      const result = await storage.getCompareResult(jobId);
      if (result) {
        response.result = result;
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting compare status:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to get compare status",
        message,
      },
      { status: 500 }
    );
  }
}

