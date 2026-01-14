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
      <div className="min-h-screen bg-rift">
        <div className="absolute inset-0 bg-hextech opacity-30" />
        <div className="container relative py-12">
          <div className="text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded border-2 border-lol-gold/30 bg-lol-darker mb-4">
              <GitCompare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-lol-gold mb-2">Coming Soon</h1>
            <p className="text-muted-foreground">
              The compare feature is currently disabled. Check back later!
            </p>
          </div>
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
      <div className="absolute inset-0 bg-rift" />
      <div className="absolute inset-0 bg-hextech opacity-30" />

      <div className="container relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-lol-gold bg-lol-darker">
              <Swords className="h-8 w-8 text-lol-gold" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <span className="text-lol-gold">COMPARE</span>{" "}
            <span className="text-foreground">SUMMONERS</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            See how two players stack up with a side-by-side comparison
            of their season stats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lol-blue/20 via-lol-gold/10 to-lol-blue/20 rounded-lg blur-lg" />
            
            <div className="relative lol-card rounded-lg p-6 md:p-8">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lol-gold/60 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lol-gold/60 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lol-gold/60 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lol-gold/60 rounded-br-lg" />

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Player 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded border border-lol-blue bg-lol-darker text-sm font-bold text-lol-blue-glow">
                        1
                      </div>
                      <span className="font-semibold text-lol-blue-glow uppercase tracking-wide">
                        Player One
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Summoner Name
                        </Label>
                        <Input
                          placeholder="Faker"
                          value={gameName1}
                          onChange={(e) => setGameName1(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Tagline
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lol-gold">
                            #
                          </span>
                          <Input
                            placeholder="KR1"
                            value={tagLine1}
                            onChange={(e) => setTagLine1(e.target.value)}
                            className="pl-7 bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Region
                        </Label>
                        <Select
                          value={region1}
                          onValueChange={(v) => setRegion1(v as RiotRegion)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-lol-dark border-lol-gold/30">
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-lol-gold bg-lol-darker font-bold text-lol-gold">
                      VS
                    </div>
                  </div>

                  {/* Player 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded border border-red-500/50 bg-lol-darker text-sm font-bold text-red-400">
                        2
                      </div>
                      <span className="font-semibold text-red-400 uppercase tracking-wide">
                        Player Two
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Summoner Name
                        </Label>
                        <Input
                          placeholder="Doublelift"
                          value={gameName2}
                          onChange={(e) => setGameName2(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Tagline
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lol-gold">
                            #
                          </span>
                          <Input
                            placeholder="NA1"
                            value={tagLine2}
                            onChange={(e) => setTagLine2(e.target.value)}
                            className="pl-7 bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                          Region
                        </Label>
                        <Select
                          value={region2}
                          onValueChange={(v) => setRegion2(v as RiotRegion)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-lol-dark border-lol-gold/30">
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

                <Separator className="bg-lol-gold/20" />

                {/* Season selector */}
                <div className="max-w-xs mx-auto space-y-2">
                  <Label className="text-lol-gold-light text-xs uppercase tracking-wide">
                    Season to Compare
                  </Label>
                  <Select
                    value={year.toString()}
                    onValueChange={(v) => setYear(parseInt(v))}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-lol-dark border-lol-gold/30">
                      {yearOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400 text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full lol-button h-14 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      COMPARING SUMMONERS...
                    </>
                  ) : (
                    <>
                      <GitCompare className="mr-2 h-5 w-5" />
                      COMPARE NOW
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
