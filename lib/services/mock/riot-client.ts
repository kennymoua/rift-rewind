/**
 * Mock Riot Client Implementation
 * 
 * Returns realistic mock data for local development and demos.
 */

import type { IRiotClient } from "../interfaces";
import type { PlayerInfo, MatchSummary } from "@/lib/types";
import { CHAMPION_MAP, ROLE_LABELS } from "@/lib/constants";
import { sleep } from "@/lib/utils";

export class MockRiotClient implements IRiotClient {
  private simulateDelay = true;

  async getPuuid(
    gameName: string,
    tagLine: string,
    region: string
  ): Promise<PlayerInfo> {
    if (this.simulateDelay) {
      await sleep(500 + Math.random() * 500);
    }

    // Generate a fake PUUID based on the input
    const puuid = `mock-puuid-${gameName.toLowerCase()}-${tagLine.toLowerCase()}-${region}`;

    return {
      puuid,
      gameName,
      tagLine,
      region,
      profileIconId: Math.floor(Math.random() * 50) + 1,
      summonerLevel: Math.floor(Math.random() * 400) + 100,
    };
  }

  async listMatchIds(
    puuid: string,
    region: string,
    _startTime?: number,
    _endTime?: number,
    count = 100
  ): Promise<string[]> {
    if (this.simulateDelay) {
      await sleep(800 + Math.random() * 700);
    }

    // Generate fake match IDs
    const matches: string[] = [];
    for (let i = 0; i < count; i++) {
      const matchRegion = region.toUpperCase().replace(/\d/g, "");
      matches.push(`${matchRegion}_${Date.now() - i * 3600000}_${Math.random().toString(36).substring(7)}`);
    }

    return matches;
  }

  async getMatch(matchId: string, _region: string): Promise<MatchSummary> {
    if (this.simulateDelay) {
      await sleep(100 + Math.random() * 200);
    }

    // Generate realistic mock match data
    const win = Math.random() > 0.48; // Slightly above 50% winrate
    const kills = Math.floor(Math.random() * 15) + (win ? 3 : 1);
    const deaths = Math.floor(Math.random() * 10) + (win ? 1 : 3);
    const assists = Math.floor(Math.random() * 20) + 2;
    const gameDuration = Math.floor(Math.random() * 20 * 60) + 15 * 60; // 15-35 minutes
    const cs = Math.floor(gameDuration / 60 * (6 + Math.random() * 4)); // 6-10 CS/min
    
    const championIds = Object.keys(CHAMPION_MAP).map(Number);
    const championId = championIds[Math.floor(Math.random() * championIds.length)];
    
    const roles = Object.keys(ROLE_LABELS);
    const role = roles[Math.floor(Math.random() * roles.length)];

    // Parse timestamp from matchId if possible, otherwise use random past time
    const gameCreation = Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);

    return {
      matchId,
      gameCreation,
      gameDuration,
      gameMode: "CLASSIC",
      championId,
      championName: CHAMPION_MAP[championId] || "Unknown",
      win,
      kills,
      deaths,
      assists,
      kda: deaths === 0 ? kills + assists : (kills + assists) / deaths,
      cs,
      csPerMin: cs / (gameDuration / 60),
      visionScore: Math.floor(gameDuration / 60 * (0.5 + Math.random() * 1.5)),
      goldEarned: Math.floor(10000 + Math.random() * 8000),
      damageDealt: Math.floor(15000 + Math.random() * 30000),
      role,
      lane: role,
      teamPosition: role,
    };
  }
}

