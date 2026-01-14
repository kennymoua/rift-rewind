"use client";

import { usePolling } from "./use-polling";
import type { GetRewindStatusResponse } from "@/lib/types";

interface UseRewindJobOptions {
  enabled?: boolean;
}

export function useRewindJob(jobId: string, options: UseRewindJobOptions = {}) {
  const { enabled = true } = options;

  const fetcher = async (): Promise<GetRewindStatusResponse> => {
    const response = await fetch(`/api/rewind/${jobId}`);
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
  } = usePolling<GetRewindStatusResponse>(fetcher, {
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

