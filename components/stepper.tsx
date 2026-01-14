"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RewindJobStatus } from "@/lib/types";
import { REWIND_STEPS } from "@/lib/constants";

interface StepperProps {
  status: RewindJobStatus;
  currentStep: number;
}

export function Stepper({ status, currentStep }: StepperProps) {
  const isFailed = status === "FAILED";
  const isDone = status === "DONE";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Decorative header */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-lol-gold/30" />
        <div className="px-4">
          <Swords className="h-6 w-6 text-lol-gold" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-lol-gold/30" />
      </div>

      <div className="relative">
        {/* Progress line background */}
        <div className="absolute left-6 top-6 h-[calc(100%-48px)] w-0.5 bg-lol-gold/20" />
        
        {/* Progress line filled */}
        <motion.div
          className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-lol-gold to-lol-gold-dark"
          initial={{ height: 0 }}
          animate={{
            height: isDone
              ? "calc(100% - 48px)"
              : `${((currentStep - 1) / (REWIND_STEPS.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Steps */}
        <div className="relative space-y-8">
          {REWIND_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep || isDone;
            const isCurrent = isActive && !isDone;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded border-2 transition-all duration-300",
                    isCompleted &&
                      "border-lol-gold bg-lol-gold text-lol-darker",
                    isCurrent &&
                      "border-lol-gold bg-lol-darker animate-border-glow",
                    !isCompleted &&
                      !isCurrent &&
                      "border-lol-gold/30 bg-lol-darker text-muted-foreground",
                    isFailed && isActive && "border-red-500 bg-red-500/10"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin text-lol-gold" />
                  ) : (
                    <span className="text-sm font-bold">{stepNumber}</span>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-2">
                  <h3
                    className={cn(
                      "font-semibold uppercase tracking-wide text-sm transition-colors",
                      isCompleted && "text-lol-gold",
                      isCurrent && "text-lol-gold",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {isCurrent ? step.description : isCompleted ? "Complete" : "Waiting..."}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
