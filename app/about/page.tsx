"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cloud,
  Database,
  Cpu,
  Workflow,
  Shield,
  Zap,
  ChevronRight,
  BookOpen,
  Swords,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const awsServices = [
  {
    name: "Amazon Bedrock",
    icon: Cpu,
    description: "Powers the AI Coach with Claude for personalized narratives and coaching tips.",
  },
  {
    name: "AWS Lambda",
    icon: Zap,
    description: "Serverless functions handle API requests and data processing.",
  },
  {
    name: "Step Functions",
    icon: Workflow,
    description: "Orchestrates the multi-step rewind generation workflow.",
  },
  {
    name: "DynamoDB",
    icon: Database,
    description: "Stores job status and cached results with low latency.",
  },
  {
    name: "Amazon S3",
    icon: Cloud,
    description: "Stores raw match data and generated share cards.",
  },
  {
    name: "API Gateway",
    icon: Shield,
    description: "Secure, scalable API endpoints with rate limiting.",
  },
];

const methodologySteps = [
  {
    step: 1,
    title: "Player Resolution",
    description: "Resolve your Riot ID to a unique PUUID via the Riot Account API.",
  },
  {
    step: 2,
    title: "Match Fetching",
    description: "Retrieve your ranked games from the selected season (up to 100 matches).",
  },
  {
    step: 3,
    title: "Insights Computation",
    description: "Calculate win rates, KDA, streaks, and identify highlights.",
  },
  {
    step: 4,
    title: "AI Story Generation",
    description: "Amazon Bedrock generates your personalized narrative and tips.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-rift" />
      <div className="absolute inset-0 bg-hextech opacity-30" />

      <div className="container relative z-10 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-lol-gold bg-lol-darker">
                <Swords className="h-8 w-8 text-lol-gold" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-foreground">ABOUT</span>{" "}
              <span className="text-lol-gold">RIFT REWIND</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A year-end recap experience for League of Legends players, built
              for the AWS Game Builder Challenge.
            </p>
          </motion.div>

          {/* What is Rift Rewind */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="lol-card rounded-lg p-6">
              <h2 className="text-lg font-semibold text-lol-gold uppercase tracking-wide mb-4">
                What is Rift Rewind?
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Rift Rewind transforms your League of Legends match history
                  into a beautiful, personalized year-end recap. Inspired by
                  Spotify Wrapped, it analyzes your gameplay to reveal insights
                  about your journey through the Rift.
                </p>
                <p>
                  Enter your Riot ID, select your region and season, and
                  we'll generate a comprehensive recap featuring your stats,
                  highlights, and AI-powered coaching tips—all in seconds.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-lol-gold to-transparent" />
              <h2 className="text-lg font-semibold text-lol-gold uppercase tracking-wide">
                How It Works
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {methodologySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="lol-card rounded-lg p-5 h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-lol-gold bg-lol-darker font-bold text-lol-gold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="my-12 bg-lol-gold/20" />

          {/* AWS Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-lol-blue to-transparent" />
              <h2 className="text-lg font-semibold text-lol-blue-glow uppercase tracking-wide">
                Powered by AWS
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-11">
              Built on a modern, serverless architecture.
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {awsServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="lol-card rounded-lg p-4 h-full hover:border-lol-blue/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <service.icon className="h-4 w-4 text-lol-blue-glow" />
                      <h3 className="font-semibold text-sm text-lol-blue-glow">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Documentation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="lol-card rounded-lg p-6 border-lol-gold/50">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-lol-gold" />
                <h3 className="text-lg font-semibold text-lol-gold uppercase tracking-wide">
                  Documentation
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                For judges and developers: detailed technical documentation is
                available in the /docs folder.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-lol-gold/30 hover:border-lol-gold hover:bg-lol-gold/10"
                >
                  <Link href="https://github.com/kennymoua/rift-rewind" target="_blank">
                    View on GitHub
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="hover:bg-lol-gold/10 hover:text-lol-gold"
                >
                  <Link href="/">
                    Try It Now
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground/60 mt-12 max-w-2xl mx-auto">
            Rift Rewind isn't endorsed by Riot Games and doesn't reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing Riot Games properties. Riot Games, and all
            associated properties are trademarks or registered trademarks of
            Riot Games, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
