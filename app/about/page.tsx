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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const awsServices = [
  {
    name: "Amazon Bedrock",
    icon: Cpu,
    description:
      "Powers the AI Coach feature with Claude for personalized narratives and coaching tips.",
    color: "text-rift-purple",
  },
  {
    name: "AWS Lambda",
    icon: Zap,
    description:
      "Serverless functions handle API requests, data processing, and integrations.",
    color: "text-rift-cyan",
  },
  {
    name: "AWS Step Functions",
    icon: Workflow,
    description:
      "Orchestrates the multi-step rewind generation workflow with built-in error handling.",
    color: "text-rift-gold",
  },
  {
    name: "Amazon DynamoDB",
    icon: Database,
    description:
      "Stores job status, cached results, and user data with single-digit millisecond latency.",
    color: "text-rift-emerald",
  },
  {
    name: "Amazon S3",
    icon: Cloud,
    description:
      "Stores raw match data, generated share cards, and static assets.",
    color: "text-blue-400",
  },
  {
    name: "Amazon API Gateway",
    icon: Shield,
    description:
      "Provides secure, scalable API endpoints with rate limiting and CORS support.",
    color: "text-orange-400",
  },
];

const methodologySteps = [
  {
    step: 1,
    title: "Player Resolution",
    description:
      "We use the Riot Account API to resolve your Riot ID to a unique PUUID.",
  },
  {
    step: 2,
    title: "Match Fetching",
    description:
      "The Match API retrieves your ranked games from the selected season (up to 100 matches).",
  },
  {
    step: 3,
    title: "Insights Computation",
    description:
      "We calculate win rates, KDA, streaks, champion stats, and identify highlights.",
  },
  {
    step: 4,
    title: "AI Story Generation",
    description:
      "Amazon Bedrock analyzes your stats and generates a personalized narrative with coaching tips.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <div className="container relative z-10 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-rift-purple to-rift-cyan bg-clip-text text-transparent">
                Rift Rewind
              </span>
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
            <Card>
              <CardHeader>
                <CardTitle>What is Rift Rewind?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display font-bold mb-6">
              How It Works
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {methodologySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rift-purple to-rift-cyan text-white font-bold">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="my-12" />

          {/* AWS Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display font-bold mb-2">
              Powered by AWS
            </h2>
            <p className="text-muted-foreground mb-6">
              Rift Rewind is built on a modern, serverless architecture using
              AWS services.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {awsServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="h-full hover:border-rift-cyan/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <service.icon className={`h-5 w-5 ${service.color}`} />
                        <h3 className="font-semibold text-sm">{service.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
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
            <Card className="bg-gradient-to-br from-rift-purple/10 to-rift-cyan/10 border-rift-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-rift-cyan" />
                  <h3 className="text-lg font-semibold">Documentation</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  For judges and developers: detailed technical documentation is
                  available in the /docs folder.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://github.com" target="_blank">
                      View on GitHub
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/">
                      Try It Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground mt-12">
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

