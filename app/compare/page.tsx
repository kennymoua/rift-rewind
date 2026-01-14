"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GitCompare, Loader2, Swords } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { REGION_OPTIONS, getYearOptions } from "@/lib/utils";
import { isCompareEnabled } from "@/lib/constants";
import type { StartCompareResponse, RiotRegion } from "@/lib/types";

export default function ComparePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Player 1
  const [gameName1, setGameName1] = useState("");
  const [tagLine1, setTagLine1] = useState("");
  const [region1, setRegion1] = useState<RiotRegion>("na1");

  // Player 2
  const [gameName2, setGameName2] = useState("");
  const [tagLine2, setTagLine2] = useState("");
  const [region2, setRegion2] = useState<RiotRegion>("na1");

  // Shared
  const [year, setYear] = useState(new Date().getFullYear());

  const yearOptions = getYearOptions();

  if (!isCompareEnabled()) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <GitCompare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Compare Feature Coming Soon</h1>
          <p className="text-muted-foreground">
            This feature is currently disabled. Check back later!
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/compare/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player1: { gameName: gameName1, tagLine: tagLine1, region: region1 },
          player2: { gameName: gameName2, tagLine: tagLine2, region: region2 },
          year,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to start comparison");
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
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-rift-purple/20 to-rift-cyan/20 mb-4">
            <Swords className="h-8 w-8 text-rift-cyan" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Compare Players
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            See how two summoners stack up against each other with a side-by-side
            comparison of their season stats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="max-w-4xl mx-auto border-2 border-rift-purple/20">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Player 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rift-cyan">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rift-cyan/20 text-sm font-bold">
                        1
                      </div>
                      <span className="font-semibold">Player One</span>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Game Name</Label>
                        <Input
                          placeholder="Faker"
                          value={gameName1}
                          onChange={(e) => setGameName1(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tag</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            #
                          </span>
                          <Input
                            placeholder="KR1"
                            value={tagLine1}
                            onChange={(e) => setTagLine1(e.target.value)}
                            className="pl-7"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select
                          value={region1}
                          onValueChange={(v) => setRegion1(v as RiotRegion)}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {REGION_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* VS Separator (mobile) */}
                  <div className="flex items-center justify-center md:hidden">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
                      VS
                    </div>
                  </div>

                  {/* Player 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rift-purple">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rift-purple/20 text-sm font-bold">
                        2
                      </div>
                      <span className="font-semibold">Player Two</span>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Game Name</Label>
                        <Input
                          placeholder="Doublelift"
                          value={gameName2}
                          onChange={(e) => setGameName2(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tag</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            #
                          </span>
                          <Input
                            placeholder="NA1"
                            value={tagLine2}
                            onChange={(e) => setTagLine2(e.target.value)}
                            className="pl-7"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select
                          value={region2}
                          onValueChange={(v) => setRegion2(v as RiotRegion)}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {REGION_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Season selector */}
                <div className="max-w-xs mx-auto space-y-2">
                  <Label>Season to Compare</Label>
                  <Select
                    value={year.toString()}
                    onValueChange={(v) => setYear(parseInt(v))}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="xl"
                  variant="glow"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Comparing Players...
                    </>
                  ) : (
                    <>
                      <GitCompare className="mr-2 h-5 w-5" />
                      Compare Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

