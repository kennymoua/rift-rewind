"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Hammer, Loader2, Flame, Snowflake, Swords } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGION_OPTIONS, getYearOptions } from "@/lib/utils";
import type { RiotRegion, StartCompareResponse } from "@/lib/types";

interface PlayerInputs {
  gameName: string;
  tagLine: string;
  region: RiotRegion;
}

export default function ComparePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const [player1, setPlayer1] = useState<PlayerInputs>({
    gameName: "",
    tagLine: "",
    region: "na1",
  });

  const [player2, setPlayer2] = useState<PlayerInputs>({
    gameName: "",
    tagLine: "",
    region: "na1",
  });

  const yearOptions = getYearOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/compare/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player1: {
            gameName: player1.gameName,
            tagLine: player1.tagLine,
            region: player1.region,
          },
          player2: {
            gameName: player2.gameName,
            tagLine: player2.tagLine,
            region: player2.region,
          },
          year,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to start comparison"
        );
      }

      const result = data as StartCompareResponse;
      router.push(`/compare/${result.jobId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
        {/* Freljord background */}
        <div className="absolute inset-0 bg-freljord" />
        <div className="absolute inset-0 bg-mountains" />
        <div className="absolute inset-0 bg-ice opacity-30" />
        
        {/* Decorative glows */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-frost-blue/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-forge-ember/10 rounded-full blur-[100px]" />

        <div className="container relative z-10 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-forge-ember/20 blur-2xl rounded-full" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                    <Swords className="h-8 w-8 text-forge-ember" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-display font-bold mb-3">
                <span className="text-forge-ember">Trial by</span>{" "}
                <span className="text-frost-light">Combat</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Pit two champions against each other in Ornn's forge. Let the
                flames reveal who has been tempered stronger.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Player 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="forge-card rounded-lg p-6 h-full border-l-4 border-frost-blue">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-frost-blue/50 bg-frost-blue/10">
                        <Snowflake className="h-5 w-5 text-frost-light" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-frost-light">
                          First Champion
                        </h3>
                        <p className="text-xs text-frost-blue/60 uppercase tracking-wider">
                          The Challenger
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Summoner Name
                        </Label>
                        <Input
                          placeholder="Faker"
                          value={player1.gameName}
                          onChange={(e) =>
                            setPlayer1({ ...player1, gameName: e.target.value })
                          }
                          required
                          disabled={isLoading}
                          className="bg-mountain-dark border-frost-dark/50 focus:border-frost-blue"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Tagline
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-frost-blue">
                            #
                          </span>
                          <Input
                            placeholder="KR1"
                            value={player1.tagLine}
                            onChange={(e) =>
                              setPlayer1({
                                ...player1,
                                tagLine: e.target.value,
                              })
                            }
                            className="pl-7 bg-mountain-dark border-frost-dark/50 focus:border-frost-blue"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Region
                        </Label>
                        <Select
                          value={player1.region}
                          onValueChange={(v) =>
                            setPlayer1({ ...player1, region: v as RiotRegion })
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-mountain-dark border-frost-dark/50 focus:border-frost-blue">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-mountain-dark border-frost-dark/50">
                            {REGION_OPTIONS.map((opt) => (
                              <SelectItem 
                                key={opt.value} 
                                value={opt.value}
                                className="focus:bg-frost-blue/20 focus:text-frost-light"
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Player 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="forge-card rounded-lg p-6 h-full border-r-4 border-forge-ember">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-forge-ember/50 bg-forge-ember/10">
                        <Flame className="h-5 w-5 text-forge-ember" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-frost-light">
                          Second Champion
                        </h3>
                        <p className="text-xs text-forge-ember/60 uppercase tracking-wider">
                          The Defender
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Summoner Name
                        </Label>
                        <Input
                          placeholder="Caps"
                          value={player2.gameName}
                          onChange={(e) =>
                            setPlayer2({ ...player2, gameName: e.target.value })
                          }
                          required
                          disabled={isLoading}
                          className="bg-mountain-dark border-frost-dark/50 focus:border-forge-ember"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Tagline
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forge-ember">
                            #
                          </span>
                          <Input
                            placeholder="EU1"
                            value={player2.tagLine}
                            onChange={(e) =>
                              setPlayer2({
                                ...player2,
                                tagLine: e.target.value,
                              })
                            }
                            className="pl-7 bg-mountain-dark border-frost-dark/50 focus:border-forge-ember"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-frost-light text-xs uppercase tracking-wide">
                          Region
                        </Label>
                        <Select
                          value={player2.region}
                          onValueChange={(v) =>
                            setPlayer2({ ...player2, region: v as RiotRegion })
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-mountain-dark border-frost-dark/50 focus:border-forge-ember">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-mountain-dark border-frost-dark/50">
                            {REGION_OPTIONS.map((opt) => (
                              <SelectItem 
                                key={opt.value} 
                                value={opt.value}
                                className="focus:bg-forge-ember/20 focus:text-forge-ember"
                              >
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* VS Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center -my-4 relative z-10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-forge-ember bg-mountain-dark shadow-lg glow-ember">
                  <span className="font-display text-xl font-bold text-forge-ember">
                    VS
                  </span>
                </div>
              </motion.div>

              {/* Year selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center"
              >
                <div className="forge-card rounded-lg p-4 inline-flex items-center gap-4">
                  <Label className="text-frost-light text-xs uppercase tracking-wide">
                    Season
                  </Label>
                  <Select
                    value={year.toString()}
                    onValueChange={(v) => setYear(parseInt(v))}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[150px] bg-mountain-dark border-frost-dark/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-mountain-dark border-frost-dark/50">
                      {yearOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value.toString()}
                          className="focus:bg-frost-blue/20"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 text-center"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="forge-button px-12 h-14 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      HEATING THE FORGE...
                    </>
                  ) : (
                    <>
                      <Hammer className="mr-2 h-5 w-5" />
                      BEGIN THE TRIAL
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
