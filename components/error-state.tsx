"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  showHome?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while processing your request. Please try again.",
  showRetry = true,
  onRetry,
  showHome = true,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[400px] items-center justify-center p-4"
    >
      <Card className="w-full max-w-md border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3 pb-6">
          {showRetry && onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHome && (
            <Link href="/">
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function NotFoundState({
  title = "Not Found",
  message = "The resource you're looking for doesn't exist or has expired.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <ErrorState
      title={title}
      message={message}
      showRetry={false}
      showHome={true}
    />
  );
}

