"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swords, TrendingUp, Trophy, Target, Loader2, Shield } from "lucide-react";
import Image from "next/image";
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
import type { StartRewindResponse, RiotRegion } from "@/lib/types";

const features = [
  {
    icon: TrendingUp,
    title: "Performance Analysis",
    description: "Track your winrate, KDA, and climb through the ranks over time",
  },
  {
    icon: Trophy,
    title: "Season Highlights",
    description: "Relive your pentakills, comebacks, and legendary moments",
  },
  {
    icon: Target,
    title: "AI Coach",
    description: "Get personalized tips to improve your gameplay",
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
      {/* LoL-themed background */}
      <div className="absolute inset-0 bg-rift" />
      <div className="absolute inset-0 bg-hextech" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-lol-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-lol-gold/5 rounded-full blur-3xl" />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-lol-gold/20 blur-2xl rounded-full" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-lol-gold bg-gradient-to-b from-lol-dark to-lol-darker">
                  <Swords className="h-10 w-10 text-lol-gold" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <span className="text-lol-gold">RIFT</span>{" "}
              <span className="text-foreground">REWIND</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              Your Season in Review
            </p>
            <p className="text-sm text-lol-blue-glow uppercase tracking-widest">
              Powered by AWS • Built for Summoners
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lol-gold/20 via-lol-blue/10 to-lol-gold/20 rounded-lg blur-lg" />
            
            <div className="relative lol-card rounded-lg p-6 md:p-8">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lol-gold/60 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lol-gold/60 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lol-gold/60 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lol-gold/60 rounded-br-lg" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-lol-gold uppercase tracking-wide">
                    Enter Your Summoner Info
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Riot ID */}
                  <div className="space-y-2">
                    <Label htmlFor="gameName" className="text-lol-gold-light text-xs uppercase tracking-wide">
                      Summoner Name
                    </Label>
                    <Input
                      id="gameName"
                      placeholder="Faker"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Tag */}
                  <div className="space-y-2">
                    <Label htmlFor="tagLine" className="text-lol-gold-light text-xs uppercase tracking-wide">
                      Tagline
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lol-gold">
                        #
                      </span>
                      <Input
                        id="tagLine"
                        placeholder="KR1"
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        className="pl-7 bg-lol-darker border-lol-gold/30 focus:border-lol-gold text-foreground placeholder:text-muted-foreground"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Region */}
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-lol-gold-light text-xs uppercase tracking-wide">
                      Region
                    </Label>
                    <Select
                      value={region}
                      onValueChange={(v) => setRegion(v as RiotRegion)}
                      disabled={isLoading}
                    >
                      <SelectTrigger 
                        id="region"
                        className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                      >
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent className="bg-lol-dark border-lol-gold/30">
                        {REGION_OPTIONS.map((opt) => (
                          <SelectItem 
                            key={opt.value} 
                            value={opt.value}
                            className="focus:bg-lol-gold/20 focus:text-lol-gold"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-lol-gold-light text-xs uppercase tracking-wide">
                      Season
                    </Label>
                    <Select
                      value={year.toString()}
                      onValueChange={(v) => setYear(parseInt(v))}
                      disabled={isLoading}
                    >
                      <SelectTrigger 
                        id="year"
                        className="bg-lol-darker border-lol-gold/30 focus:border-lol-gold"
                      >
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent className="bg-lol-dark border-lol-gold/30">
                        {yearOptions.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value.toString()}
                            className="focus:bg-lol-gold/20 focus:text-lol-gold"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
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
                      GENERATING REWIND...
                    </>
                  ) : (
                    <>
                      <Swords className="mr-2 h-5 w-5" />
                      GENERATE MY REWIND
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-4 md:grid-cols-3 mt-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <div className="lol-card rounded-lg p-5 h-full group hover:border-lol-gold/60 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-lol-gold/30 bg-lol-darker mb-4 group-hover:border-lol-gold/60 group-hover:bg-lol-gold/10 transition-colors">
                    <feature.icon className="h-6 w-6 text-lol-gold" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lol-gold-light">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-10 text-xs text-muted-foreground"
          >
            <Shield className="h-3 w-3" />
            <span>
              Not affiliated with or endorsed by Riot Games, Inc.
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
