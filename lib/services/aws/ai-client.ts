/**
 * AWS AI Client Implementation
 * 
 * Uses Amazon Bedrock to generate AI coaching content.
 * 
 * TODO: Complete implementation with actual Bedrock calls.
 */

import type { IAIClient } from "../interfaces";
import type { PlayerInfo, RewindInsights, AICoachContent } from "@/lib/types";

// AWS SDK imports (uncomment when implementing)
// import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export class AWSAIClient implements IAIClient {
  // private bedrockClient: BedrockRuntimeClient;
  private modelId: string;

  constructor() {
    // TODO: Initialize Bedrock client
    // this.bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION });
    
    this.modelId = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-sonnet-20240229-v1:0";
  }

  async generateNarrativeAndTips(
    player: PlayerInfo,
    insights: RewindInsights
  ): Promise<AICoachContent> {
    // TODO: Implement Bedrock call
    
    const prompt = this.buildPrompt(player, insights);
    
    // const command = new InvokeModelCommand({
    //   modelId: this.modelId,
    //   contentType: "application/json",
    //   accept: "application/json",
    //   body: JSON.stringify({
    //     anthropic_version: "bedrock-2023-05-31",
    //     max_tokens: 2000,
    //     messages: [
    //       {
    //         role: "user",
    //         content: prompt,
    //       },
    //     ],
    //   }),
    // });
    // 
    // const response = await this.bedrockClient.send(command);
    // const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    // const content = responseBody.content[0].text;
    // 
    // return this.parseAIResponse(content);
    
    console.log(`[AWS AI Client] Would call Bedrock with model ${this.modelId}`);
    console.log(`Prompt preview (first 200 chars): ${prompt.substring(0, 200)}...`);
    throw new Error("AWS AI Client not implemented - use mock mode");
  }

  private buildPrompt(player: PlayerInfo, insights: RewindInsights): string {
    // Build a concise prompt to minimize token usage and cost
    const { stats, topChampions, roleDistribution } = insights;
    
    const topChampsStr = topChampions
      .slice(0, 5)
      .map((c) => `${c.championName}: ${c.gamesPlayed} games, ${(c.winrate * 100).toFixed(0)}% WR`)
      .join("; ");
    
    const rolesStr = roleDistribution
      .map((r) => `${r.role}: ${r.percentage.toFixed(0)}%`)
      .join(", ");

    return `You are an expert League of Legends coach creating a personalized season recap.

Player: ${player.gameName}#${player.tagLine} (${player.region})
Season Stats:
- Games: ${stats.gamesPlayed}
- Win Rate: ${(stats.winrate * 100).toFixed(1)}%
- Average KDA: ${stats.avgKda.toFixed(2)}
- Longest Win Streak: ${stats.longestWinStreak}
- Main Role: ${stats.mostPlayedRole}

Top Champions: ${topChampsStr}
Role Distribution: ${rolesStr}
Vision Score: ${insights.visionScore}/100
Objective Score: ${insights.objectiveScore}/100

Generate a JSON response with:
1. "narrative": A 6-10 sentence personalized story about their season
2. "strengths": Array of 3 objects with "title" and "description" for their strengths
3. "weaknesses": Array of 2 objects with "title" and "description" for areas to improve
4. "drills": Array of 3 objects with "title", "description", and "difficulty" (Easy/Medium/Hard)
5. "championRecommendations": Array of 2 objects with "championId", "championName", and "reason"

Be encouraging but honest. Focus on actionable insights. Keep descriptions concise (1-2 sentences each).

Respond ONLY with valid JSON, no other text.`;
  }

  private parseAIResponse(response: string): AICoachContent {
    try {
      // Extract JSON from response (handle potential markdown code blocks)
      let jsonStr = response;
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      
      const parsed = JSON.parse(jsonStr);
      
      // Validate and return
      return {
        narrative: parsed.narrative || "",
        strengths: parsed.strengths || [],
        weaknesses: parsed.weaknesses || [],
        drills: parsed.drills || [],
        championRecommendations: parsed.championRecommendations || [],
      };
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      // Return fallback content
      return {
        narrative: "Unable to generate personalized narrative. Please try again.",
        strengths: [],
        weaknesses: [],
        drills: [],
        championRecommendations: [],
      };
    }
  }
}

/**
 * Cost optimization notes:
 * 
 * 1. Prompt efficiency:
 *    - Use summarized stats instead of raw match data
 *    - Limit top champions to 5
 *    - Use JSON output for easier parsing
 * 
 * 2. Model selection:
 *    - Claude 3 Sonnet is a good balance of quality and cost
 *    - For higher volume, consider Claude 3 Haiku
 * 
 * 3. Caching:
 *    - Cache results in DynamoDB with TTL
 *    - Same player + year = same result (no need to regenerate)
 * 
 * 4. Token limits:
 *    - Set max_tokens to 2000 to prevent runaway costs
 *    - Prompt is ~500 tokens, response ~1000 tokens
 *    - Estimated cost: ~$0.01 per generation
 */

