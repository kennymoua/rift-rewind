"use client";

import { usePolling } from "./use-polling";
import type { GetCompareStatusResponse } from "@/lib/types";

interface UseCompareJobOptions {
  enabled?: boolean;
}

export function useCompareJob(jobId: string, options: UseCompareJobOptions = {}) {
  const { enabled = true } = options;

  const fetcher = async (): Promise<GetCompareStatusResponse> => {
    const response = await fetch(`/api/compare/${jobId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch job status");
    }
    return response.json();
  };

  const {
    data,
    error,
    isLoading,
    isPolling,
    attempts,
    refetch,
    stop,
  } = usePolling<GetCompareStatusResponse>(fetcher, {
    enabled: enabled && !!jobId,
    shouldStop: (data) => {
      const status = data.progress.status;
      return status === "DONE" || status === "FAILED";
    },
    useBackoff: false,
  });

  return {
    jobId,
    progress: data?.progress ?? null,
    result: data?.result ?? null,
    error,
    isLoading,
    isPolling,
    isDone: data?.progress.status === "DONE",
    isFailed: data?.progress.status === "FAILED",
    attempts,
    refetch,
    stop,
  };
}

