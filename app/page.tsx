"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Trophy, Target, Loader2 } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { REGION_OPTIONS, getYearOptions } from "@/lib/utils";
import type { StartRewindResponse, RiotRegion } from "@/lib/types";

const features = [
  {
    icon: TrendingUp,
    title: "Performance Trends",
    description: "Track your winrate, KDA, and improvement over time",
  },
  {
    icon: Trophy,
    title: "Season Highlights",
    description: "Relive your best plays and memorable moments",
  },
  {
    icon: Target,
    title: "AI Coach Insights",
    description: "Get personalized tips powered by Amazon Bedrock",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState<RiotRegion>("na1");
  const [year, setYear] = useState(new Date().getFullYear());

  const yearOptions = getYearOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/rewind/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameName, tagLine, region, year }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to start rewind");
      }

      const result = data as StartRewindResponse;
      router.push(`/rewind/${result.jobId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container relative z-10 py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rift-purple/30 bg-rift-purple/10 px-4 py-1.5 text-sm text-rift-purple mb-6">
              <Sparkles className="h-4 w-4" />
              AWS Game Builder Challenge
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-rift-purple via-rift-cyan to-rift-gold bg-clip-text text-transparent">
                League Season
              </span>
              <br />
              Wrapped
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover your unique journey through the Rift. Stats, highlights, and
              AI-powered insights—all in one beautiful recap.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-2 border-rift-purple/20 shadow-xl shadow-rift-purple/5">
              <div className="absolute inset-0 bg-gradient-to-br from-rift-purple/5 via-transparent to-rift-cyan/5" />
              <CardContent className="relative p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Riot ID */}
                    <div className="space-y-2">
                      <Label htmlFor="gameName">Game Name</Label>
                      <Input
                        id="gameName"
                        placeholder="Faker"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {/* Tag */}
                    <div className="space-y-2">
                      <Label htmlFor="tagLine">Tag</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          #
                        </span>
                        <Input
                          id="tagLine"
                          placeholder="KR1"
                          value={tagLine}
                          onChange={(e) => setTagLine(e.target.value)}
                          className="pl-7"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Region */}
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select
                        value={region}
                        onValueChange={(v) => setRegion(v as RiotRegion)}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Select region" />
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

                    {/* Year */}
                    <div className="space-y-2">
                      <Label htmlFor="year">Season</Label>
                      <Select
                        value={year.toString()}
                        onValueChange={(v) => setYear(parseInt(v))}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
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
                        Generating Your Rewind...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate My Rewind
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-6 md:grid-cols-3 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-muted hover:border-rift-cyan/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-rift-purple/20 to-rift-cyan/20 mb-4">
                      <feature.icon className="h-6 w-6 text-rift-cyan" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground mt-12">
            This app uses the Riot Games API but is not affiliated with or endorsed by Riot Games.
          </p>
        </div>
      </div>
    </div>
  );
}

