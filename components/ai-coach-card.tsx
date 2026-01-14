"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, AlertTriangle, Dumbbell, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, getChampionIconUrl } from "@/lib/utils";
import type { AICoachContent } from "@/lib/types";

interface AICoachCardProps {
  content: AICoachContent;
  delay?: number;
}

export function AICoachCard({ content, delay = 0 }: AICoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="overflow-hidden border-2 border-rift-purple/30">
        <CardHeader className="bg-gradient-to-r from-rift-purple/10 to-rift-cyan/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rift-purple to-rift-cyan">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Coach Insights</CardTitle>
              <p className="text-xs text-muted-foreground">
                Powered by Amazon Bedrock
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Narrative */}
          <div className="mb-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.narrative}
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Tabs for different sections */}
          <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="strengths" className="text-xs">
                <Target className="h-3 w-3 mr-1.5" />
                Strengths
              </TabsTrigger>
              <TabsTrigger value="weaknesses" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1.5" />
                Improve
              </TabsTrigger>
              <TabsTrigger value="drills" className="text-xs">
                <Dumbbell className="h-3 w-3 mr-1.5" />
                Drills
              </TabsTrigger>
              <TabsTrigger value="champs" className="text-xs">
                <Users className="h-3 w-3 mr-1.5" />
                Try Next
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="space-y-3">
              {content.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-emerald-500/5 border-emerald-500/20 p-3"
                >
                  <h4 className="font-medium text-sm text-emerald-500 mb-1">
                    {strength.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {strength.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="weaknesses" className="space-y-3">
              {content.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-amber-500/5 border-amber-500/20 p-3"
                >
                  <h4 className="font-medium text-sm text-amber-500 mb-1">
                    {weakness.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {weakness.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="drills" className="space-y-3">
              {content.drills.map((drill, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-rift-cyan/5 border-rift-cyan/20 p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{drill.title}</h4>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        drill.difficulty === "Easy" &&
                          "bg-emerald-500/20 text-emerald-500",
                        drill.difficulty === "Medium" &&
                          "bg-amber-500/20 text-amber-500",
                        drill.difficulty === "Hard" &&
                          "bg-red-500/20 text-red-500"
                      )}
                    >
                      {drill.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {drill.description}
                  </p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="champs" className="space-y-3">
              {content.championRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={getChampionIconUrl(rec.championName)}
                      alt={rec.championName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{rec.championName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

