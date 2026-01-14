/**
 * Service Factory
 * 
 * Creates and returns the appropriate service implementations
 * based on the current environment (mock vs AWS).
 */

import type {
  IServiceFactory,
  IRiotClient,
  IStorage,
  IOrchestrator,
  IAIClient,
  IStatsBuilder,
} from "./interfaces";
import { isMockMode } from "@/lib/constants";

// Mock implementations
import { MockRiotClient } from "./mock/riot-client";
import { MockStorage } from "./mock/storage";
import { MockAIClient } from "./mock/ai-client";
import { MockOrchestrator, getMockOrchestrator } from "./mock/orchestrator";
import { StatsBuilder } from "./mock/stats-builder";

// AWS implementations
import { AWSRiotClient } from "./aws/riot-client";
import { AWSStorage } from "./aws/storage";
import { AWSOrchestrator } from "./aws/orchestrator";
import { AWSAIClient } from "./aws/ai-client";

// Re-export interfaces
export type {
  IRiotClient,
  IStorage,
  IOrchestrator,
  IAIClient,
  IStatsBuilder,
} from "./interfaces";

class MockServiceFactory implements IServiceFactory {
  private riotClient: MockRiotClient | null = null;
  private storage: MockStorage | null = null;
  private aiClient: MockAIClient | null = null;
  private statsBuilder: StatsBuilder | null = null;

  getRiotClient(): IRiotClient {
    if (!this.riotClient) {
      this.riotClient = new MockRiotClient();
    }
    return this.riotClient;
  }

  getStorage(): IStorage {
    if (!this.storage) {
      this.storage = new MockStorage();
    }
    return this.storage;
  }

  getOrchestrator(): IOrchestrator {
    return getMockOrchestrator();
  }

  getAIClient(): IAIClient {
    if (!this.aiClient) {
      this.aiClient = new MockAIClient();
    }
    return this.aiClient;
  }

  getStatsBuilder(): IStatsBuilder {
    if (!this.statsBuilder) {
      this.statsBuilder = new StatsBuilder();
    }
    return this.statsBuilder;
  }
}

class AWSServiceFactory implements IServiceFactory {
  private riotClient: AWSRiotClient | null = null;
  private storage: AWSStorage | null = null;
  private orchestrator: AWSOrchestrator | null = null;
  private aiClient: AWSAIClient | null = null;
  private statsBuilder: StatsBuilder | null = null;

  getRiotClient(): IRiotClient {
    if (!this.riotClient) {
      this.riotClient = new AWSRiotClient();
    }
    return this.riotClient;
  }

  getStorage(): IStorage {
    if (!this.storage) {
      this.storage = new AWSStorage();
    }
    return this.storage;
  }

  getOrchestrator(): IOrchestrator {
    if (!this.orchestrator) {
      this.orchestrator = new AWSOrchestrator();
    }
    return this.orchestrator;
  }

  getAIClient(): IAIClient {
    if (!this.aiClient) {
      this.aiClient = new AWSAIClient();
    }
    return this.aiClient;
  }

  getStatsBuilder(): IStatsBuilder {
    if (!this.statsBuilder) {
      this.statsBuilder = new StatsBuilder();
    }
    return this.statsBuilder;
  }
}

// Singleton factory instance
let factoryInstance: IServiceFactory | null = null;

/**
 * Get the service factory for the current environment
 */
export function getServiceFactory(): IServiceFactory {
  if (!factoryInstance) {
    if (isMockMode()) {
      console.log("[Services] Using mock implementations");
      factoryInstance = new MockServiceFactory();
    } else {
      console.log("[Services] Using AWS implementations");
      factoryInstance = new AWSServiceFactory();
    }
  }
  return factoryInstance;
}

/**
 * Get individual services (convenience methods)
 */
export function getRiotClient(): IRiotClient {
  return getServiceFactory().getRiotClient();
}

export function getStorage(): IStorage {
  return getServiceFactory().getStorage();
}

export function getOrchestrator(): IOrchestrator {
  return getServiceFactory().getOrchestrator();
}

export function getAIClient(): IAIClient {
  return getServiceFactory().getAIClient();
}

export function getStatsBuilder(): IStatsBuilder {
  return getServiceFactory().getStatsBuilder();
}

