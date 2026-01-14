"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  error?: boolean;
}

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  error,
}: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPending = index > currentIndex;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all duration-300",
                    isCompleted &&
                      "bg-frost-blue/20 border-frost-blue text-frost-light",
                    isCurrent &&
                      !error &&
                      "border-forge-ember bg-forge-ember/20 text-forge-ember animate-ember-glow",
                    isCurrent &&
                      error &&
                      "border-destructive bg-destructive/20 text-destructive",
                    isPending &&
                      "border-frost-dark bg-mountain-dark text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : isCurrent && !error ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <Flame className="absolute -top-1 -right-1 h-3 w-3 text-forge-flame" />
                    </>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </motion.div>
                
                {/* Step label */}
                <div className="mt-2 text-center max-w-[100px]">
                  <p
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isCompleted && "text-frost-light",
                      isCurrent && !error && "text-forge-ember",
                      isCurrent && error && "text-destructive",
                      isPending && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 hidden md:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line - skip for last item */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 mb-8">
                  <div className="h-0.5 w-full bg-frost-dark/30 relative overflow-hidden rounded">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-full rounded",
                        isCompleted ? "bg-frost-blue" : "bg-forge-ember"
                      )}
                    />
                    {/* Ember glow on active connector */}
                    {isCurrent && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-forge-ember/50 to-transparent"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
