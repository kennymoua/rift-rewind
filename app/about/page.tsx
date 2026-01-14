"use client";

import { motion } from "framer-motion";
import {
  Mountain,
  Server,
  Shield,
  Zap,
  Database,
  Bot,
  Lock,
  Hammer,
  Flame,
  Snowflake,
} from "lucide-react";
import { Layout } from "@/components/layout";

const methodologySteps = [
  {
    icon: Database,
    title: "Data Mining",
    description:
      "We retrieve your match history from Riot's API, collecting data on all ranked and normal games for your selected season. The ore of your achievements.",
  },
  {
    icon: Zap,
    title: "Smelting Process",
    description:
      "Raw match data is refined into meaningful statistics. We calculate KDA, CS/min, vision score trends, and identify patterns—heating the metal for shaping.",
  },
  {
    icon: Bot,
    title: "Ornn's Wisdom",
    description:
      "Using AWS Bedrock (Claude), we generate personalized insights. The AI identifies your strengths, areas to forge, and recommends training paths.",
  },
  {
    icon: Shield,
    title: "Quality Tempering",
    description:
      "Results are validated and cross-referenced to ensure accuracy. Only masterwork-quality insights reach your forge report.",
  },
];

const awsServices = [
  {
    name: "API Gateway",
    description: "Gateway to the forge - handles all incoming requests",
    icon: Server,
  },
  {
    name: "Lambda",
    description: "Serverless forge workers that process your data",
    icon: Zap,
  },
  {
    name: "Step Functions",
    description: "Orchestrates the forging pipeline with precision",
    icon: Mountain,
  },
  {
    name: "DynamoDB",
    description: "Stores job status and cached forge reports",
    icon: Database,
  },
  {
    name: "Bedrock (Claude)",
    description: "Powers Ornn's AI wisdom and insights",
    icon: Bot,
  },
  {
    name: "Secrets Manager",
    description: "Securely guards your Riot API key",
    icon: Lock,
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Freljord background */}
        <div className="absolute inset-0 bg-freljord" />
        <div className="absolute inset-0 bg-mountains opacity-50" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-frost-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-forge-ember/10 rounded-full blur-[80px]" />

        <div className="container relative z-10 py-12 md:py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-forge-ember/20 blur-2xl rounded-full" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border-2 border-forge-ember/60 bg-gradient-to-b from-mountain-stone to-mountain-dark">
                  <Hammer className="h-8 w-8 text-forge-ember" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">
              <span className="text-frost-light">The Forge's</span>{" "}
              <span className="text-forge-ember">Secrets</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how Ornn's ancient craft transforms your match data into
              legendary insights. Every masterwork has a process.
            </p>
          </motion.div>

          {/* Ornn's Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="forge-card rounded-lg p-6 border-l-4 border-forge-ember">
              <div className="flex items-start gap-4">
                <Flame className="h-6 w-6 text-forge-ember shrink-0 mt-1" />
                <div>
                  <p className="text-lg text-frost-light italic mb-2">
                    "Masterwork. This'll be masterwork."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — Ornn, upon beginning his craft
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Snowflake className="h-5 w-5 text-frost-blue" />
              <h2 className="text-2xl font-display font-bold text-frost-light">
                The Forging Process
              </h2>
              <Snowflake className="h-5 w-5 text-frost-blue" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {methodologySteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="forge-card rounded-lg p-6 group hover:border-forge-ember/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-frost-dark bg-mountain-dark group-hover:border-forge-ember/50 group-hover:bg-forge-ember/10 transition-colors">
                      <step.icon className="h-6 w-6 text-frost-blue group-hover:text-forge-ember transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-forge-ember/20 text-xs font-bold text-forge-ember">
                          {index + 1}
                        </span>
                        <h3 className="font-semibold text-frost-light">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AWS Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Mountain className="h-5 w-5 text-frost-blue" />
              <h2 className="text-2xl font-display font-bold text-frost-light">
                Forge Infrastructure
              </h2>
              <Mountain className="h-5 w-5 text-frost-blue" />
            </div>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Built on the mountains of AWS—serverless, scalable, and as
              reliable as Freljord's eternal ice.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {awsServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="forge-card rounded-lg p-5 group hover:border-frost-blue/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-frost-dark bg-mountain-dark mb-3 group-hover:border-frost-blue/50 transition-colors">
                    <service.icon className="h-5 w-5 text-frost-blue" />
                  </div>
                  <h4 className="font-semibold text-frost-light mb-1">
                    {service.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="forge-card rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-frost-blue/50 bg-frost-blue/10">
                  <Shield className="h-6 w-6 text-frost-light" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-frost-light mb-3">
                Your Secrets Are Safe
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We only access publicly available match data through Riot's
                official API. No personal information is stored. Forge reports
                are cached temporarily and automatically expire like ice in
                spring.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-frost-blue/70">
                <Lock className="h-3 w-3" />
                <span>Riot API compliant • No account access required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
