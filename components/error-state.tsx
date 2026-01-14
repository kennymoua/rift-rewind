"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Swords } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="lol-card rounded-lg border-red-500/30 w-full max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-red-500/50 bg-red-500/10 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-red-400 mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{message}</p>
          <div className="flex gap-3">
            {showRetry && onRetry && (
              <Button 
                onClick={onRetry} 
                variant="outline"
                className="border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            {showHome && (
              <Link href="/">
                <Button 
                  variant="ghost"
                  className="hover:bg-lol-gold/10 hover:text-lol-gold"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[400px] items-center justify-center p-4"
    >
      <div className="lol-card rounded-lg w-full max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-lol-gold/30 bg-lol-darker mb-4">
            <Swords className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-lol-gold mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{message}</p>
          <Link href="/">
            <Button className="lol-button">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
