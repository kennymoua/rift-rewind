"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Hammer, TrendingUp, Trophy, Target, Loader2, Shield, Flame } from "lucide-react";
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
    title: "Temper Your Skills",
    description: "Ornn analyzes your matches to reveal the metal of your gameplay",
  },
  {
    icon: Trophy,
    title: "Forge Highlights",
    description: "Your greatest victories, heated in the fires of competition",
  },
  {
    icon: Target,
    title: "Master's Wisdom",
    description: "Receive guidance from the forge to improve your craft",
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
      {/* Freljord mountain background */}
      <div className="absolute inset-0 bg-freljord" />
      <div className="absolute inset-0 bg-mountains" />
      <div className="absolute inset-0 bg-ice opacity-50" />
      
      {/* Decorative elements - aurora and ember glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-frost-blue/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-forge-ember/15 rounded-full blur-[80px]" />
      <div className="absolute top-40 right-1/4 w-48 h-48 bg-frost-light/5 rounded-full blur-[60px]" />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {/* Ornn's Anvil Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-forge-ember/30 blur-2xl rounded-full animate-ember-glow" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark anvil-icon">
                  <Hammer className="h-12 w-12 text-forge-ember" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              <span className="text-forge-ember">THE</span>{" "}
              <span className="text-frost-light">FORGE</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              Where Champions Are Tempered
            </p>
            <p className="text-sm text-frost-blue/80 uppercase tracking-widest flex items-center justify-center gap-2">
              <Flame className="h-4 w-4 text-forge-ember" />
              Ornn's Workshop • Freljord
              <Flame className="h-4 w-4 text-forge-ember" />
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Card glow effect - ember and frost */}
            <div className="absolute -inset-1 bg-gradient-to-r from-forge-ember/20 via-frost-blue/10 to-forge-ember/20 rounded-lg blur-lg" />
            
            <div className="relative forge-card rounded-lg p-6 md:p-8">
              {/* Corner decorations - ice crystal style */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-frost-blue/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-frost-blue/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-forge-ember/40 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-forge-ember/40 rounded-br-lg" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-frost-light uppercase tracking-wide">
                    Present Your Work to the Forge
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your summoner details and let Ornn judge your craft
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Riot ID */}
                  <div className="space-y-2">
                    <Label htmlFor="gameName" className="text-frost-light text-xs uppercase tracking-wide">
                      Summoner Name
                    </Label>
                    <Input
                      id="gameName"
                      placeholder="Faker"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="bg-mountain-dark border-frost-dark/50 focus:border-frost-blue text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Tag */}
                  <div className="space-y-2">
                    <Label htmlFor="tagLine" className="text-frost-light text-xs uppercase tracking-wide">
                      Tagline
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-frost-blue">
                        #
                      </span>
                      <Input
                        id="tagLine"
                        placeholder="KR1"
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        className="pl-7 bg-mountain-dark border-frost-dark/50 focus:border-frost-blue text-foreground placeholder:text-muted-foreground"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Region */}
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-frost-light text-xs uppercase tracking-wide">
                      Region
                    </Label>
                    <Select
                      value={region}
                      onValueChange={(v) => setRegion(v as RiotRegion)}
                      disabled={isLoading}
                    >
                      <SelectTrigger 
                        id="region"
                        className="bg-mountain-dark border-frost-dark/50 focus:border-frost-blue"
                      >
                        <SelectValue placeholder="Select region" />
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

                  {/* Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-frost-light text-xs uppercase tracking-wide">
                      Season
                    </Label>
                    <Select
                      value={year.toString()}
                      onValueChange={(v) => setYear(parseInt(v))}
                      disabled={isLoading}
                    >
                      <SelectTrigger 
                        id="year"
                        className="bg-mountain-dark border-frost-dark/50 focus:border-frost-blue"
                      >
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent className="bg-mountain-dark border-frost-dark/50">
                        {yearOptions.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value.toString()}
                            className="focus:bg-frost-blue/20 focus:text-frost-light"
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
                  className="w-full forge-button h-14 text-base"
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
                      BEGIN FORGING
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
                <div className="forge-card rounded-lg p-5 h-full group hover:border-forge-ember/50 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-frost-dark bg-mountain-dark mb-4 group-hover:border-forge-ember/50 group-hover:bg-forge-ember/10 transition-colors">
                    <feature.icon className="h-6 w-6 text-frost-blue group-hover:text-forge-ember transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2 text-frost-light">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ornn quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-10"
          >
            <p className="text-sm text-muted-foreground italic">
              "I have done well. This forge... and the things I've made here. That is the only legacy I need."
            </p>
            <p className="text-xs text-forge-ember mt-1">— Ornn, The Fire Below the Mountain</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground/60"
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
