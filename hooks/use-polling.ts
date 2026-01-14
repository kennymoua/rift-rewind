"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getBackoffDelay } from "@/lib/utils";
import { POLL_INTERVAL_MS, MAX_POLL_ATTEMPTS } from "@/lib/constants";

interface UsePollingOptions<T> {
  enabled?: boolean;
  interval?: number;
  maxAttempts?: number;
  useBackoff?: boolean;
  shouldStop?: (data: T) => boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UsePollingResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isPolling: boolean;
  attempts: number;
  refetch: () => Promise<void>;
  stop: () => void;
}

export function usePolling<T>(
  fetcher: () => Promise<T>,
  options: UsePollingOptions<T> = {}
): UsePollingResult<T> {
  const {
    enabled = true,
    interval = POLL_INTERVAL_MS,
    maxAttempts = MAX_POLL_ATTEMPTS,
    useBackoff = false,
    shouldStop,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  const stoppedRef = useRef(false);

  const clearPollTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    setIsPolling(false);
    clearPollTimeout();
  }, [clearPollTimeout]);

  const fetchData = useCallback(async () => {
    if (!mountedRef.current || stoppedRef.current) return;

    try {
      setIsLoading(attempts === 0);
      setIsPolling(true);

      const result = await fetcher();

      if (!mountedRef.current || stoppedRef.current) return;

      setData(result);
      setError(null);
      setAttempts((prev) => prev + 1);
      onSuccess?.(result);

      // Check if we should stop polling
      if (shouldStop?.(result)) {
        stop();
        return;
      }

      // Schedule next poll
      if (attempts < maxAttempts - 1) {
        const delay = useBackoff
          ? getBackoffDelay(attempts, interval)
          : interval;
        timeoutRef.current = setTimeout(fetchData, delay);
      } else {
        // Max attempts reached
        stop();
        setError(new Error("Max polling attempts reached"));
      }
    } catch (err) {
      if (!mountedRef.current || stoppedRef.current) return;

      const error = err instanceof Error ? err : new Error("Polling failed");
      setError(error);
      onError?.(error);

      // Retry with backoff on error
      if (attempts < maxAttempts - 1 && useBackoff) {
        const delay = getBackoffDelay(attempts, interval);
        timeoutRef.current = setTimeout(fetchData, delay);
        setAttempts((prev) => prev + 1);
      } else {
        stop();
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [
    fetcher,
    attempts,
    maxAttempts,
    interval,
    useBackoff,
    shouldStop,
    onSuccess,
    onError,
    stop,
  ]);

  const refetch = useCallback(async () => {
    stoppedRef.current = false;
    setAttempts(0);
    clearPollTimeout();
    await fetchData();
  }, [fetchData, clearPollTimeout]);

  useEffect(() => {
    mountedRef.current = true;
    stoppedRef.current = false;

    if (enabled) {
      fetchData();
    }

    return () => {
      mountedRef.current = false;
      clearPollTimeout();
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    error,
    isLoading,
    isPolling,
    attempts,
    refetch,
    stop,
  };
}

