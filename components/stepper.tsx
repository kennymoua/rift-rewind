"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
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
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-6 top-6 h-[calc(100%-48px)] w-0.5 bg-muted" />
        <motion.div
          className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-rift-purple to-rift-cyan"
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
                    "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted &&
                      "border-rift-cyan bg-rift-cyan text-white",
                    isCurrent &&
                      "border-rift-purple bg-background animate-pulse",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted bg-background text-muted-foreground",
                    isFailed && isActive && "border-destructive bg-destructive/10"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin text-rift-purple" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-2">
                  <h3
                    className={cn(
                      "font-semibold transition-colors",
                      isCompleted && "text-foreground",
                      isCurrent && "text-rift-purple",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isCurrent ? step.description : isCompleted ? "Completed" : "Waiting..."}
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

