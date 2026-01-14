/**
 * AWS Riot Client Implementation
 * 
 * Real implementation that calls the Riot API.
 * Uses environment variables for configuration.
 * 
 * TODO: Implement actual API calls when deploying to AWS.
 */

import type { IRiotClient } from "../interfaces";
import type { PlayerInfo, MatchSummary } from "@/lib/types";
import { getRoutingRegion } from "@/lib/utils";
import type { RiotRegion } from "@/lib/types";

export class AWSRiotClient implements IRiotClient {
  private apiKey: string;

  constructor() {
    const apiKey = process.env.RIOT_API_KEY;
    if (!apiKey) {
      throw new Error("RIOT_API_KEY environment variable is not set");
    }
    this.apiKey = apiKey;
  }

  async getPuuid(
    gameName: string,
    tagLine: string,
    region: string
  ): Promise<PlayerInfo> {
    // Map platform region to routing region for account-v1 API
    const routingRegion = getRoutingRegion(region as RiotRegion);
    
    // TODO: Implement actual API call
    // Account API endpoint: https://{routingRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
    
    const accountUrl = `https://${routingRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    
    const response = await fetch(accountUrl, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Player ${gameName}#${tagLine} not found`);
      }
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`Riot API error: ${response.status}`);
    }

    const data = await response.json();

    // TODO: Get summoner data for profile icon and level
    // Summoner API: https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}

    return {
      puuid: data.puuid,
      gameName: data.gameName,
      tagLine: data.tagLine,
      region,
      // profileIconId and summonerLevel would come from summoner API
    };
  }

  async listMatchIds(
    puuid: string,
    region: string,
    startTime?: number,
    endTime?: number,
    count = 100
  ): Promise<string[]> {
    const routingRegion = getRoutingRegion(region as RiotRegion);
    
    // TODO: Implement pagination for > 100 matches
    // Match API: https://{routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids

    const params = new URLSearchParams({
      type: "ranked",
      count: Math.min(count, 100).toString(),
    });

    if (startTime) params.append("startTime", startTime.toString());
    if (endTime) params.append("endTime", endTime.toString());

    const url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?${params}`;

    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`Riot API error: ${response.status}`);
    }

    return response.json();
  }

  async getMatch(matchId: string, region: string): Promise<MatchSummary> {
    const routingRegion = getRoutingRegion(region as RiotRegion);
    
    // Match API: https://{routingRegion}.api.riotgames.com/lol/match/v5/matches/{matchId}
    const url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;

    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`Riot API error: ${response.status}`);
    }

    const data = await response.json();
    
    // TODO: Extract player's participant data from match
    // The response contains all 10 players - need to find the one matching our PUUID
    
    // Placeholder transformation - actual implementation needs to:
    // 1. Find participant by PUUID
    // 2. Extract relevant stats
    // 3. Map champion IDs to names
    
    const participant = data.info.participants[0]; // Placeholder
    
    return {
      matchId: data.metadata.matchId,
      gameCreation: data.info.gameCreation,
      gameDuration: data.info.gameDuration,
      gameMode: data.info.gameMode,
      championId: participant.championId,
      championName: participant.championName,
      win: participant.win,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      kda: participant.deaths > 0 
        ? (participant.kills + participant.assists) / participant.deaths 
        : participant.kills + participant.assists,
      cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
      csPerMin: (participant.totalMinionsKilled + participant.neutralMinionsKilled) / (data.info.gameDuration / 60),
      visionScore: participant.visionScore,
      goldEarned: participant.goldEarned,
      damageDealt: participant.totalDamageDealtToChampions,
      role: participant.role,
      lane: participant.lane,
      teamPosition: participant.teamPosition,
    };
  }
}

