import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RiotRegion, RiotRoutingRegion, RegionOption } from "./types";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a KDA value
 */
export function formatKDA(kills: number, deaths: number, assists: number): string {
  if (deaths === 0) return "Perfect";
  const kda = (kills + assists) / deaths;
  return kda.toFixed(2);
}

/**
 * Format game duration from seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Get the Data Dragon CDN URL for a champion icon
 */
export function getChampionIconUrl(championName: string, version = "14.1.1"): string {
  // Normalize champion name for URL (handle special cases)
  const normalized = normalizeChampionName(championName);
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalized}.png`;
}

/**
 * Normalize champion name for Data Dragon URLs
 */
function normalizeChampionName(name: string): string {
  // Handle special cases
  const specialCases: Record<string, string> = {
    "Wukong": "MonkeyKing",
    "Cho'Gath": "Chogath",
    "Kai'Sa": "Kaisa",
    "Kha'Zix": "Khazix",
    "LeBlanc": "Leblanc",
    "Rek'Sai": "RekSai",
    "Vel'Koz": "Velkoz",
    "Kog'Maw": "KogMaw",
  };
  
  if (specialCases[name]) {
    return specialCases[name];
  }
  
  // Remove spaces and apostrophes
  return name.replace(/[' ]/g, "");
}

/**
 * Get profile icon URL
 */
export function getProfileIconUrl(iconId: number, version = "14.1.1"): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;
}

/**
 * Map platform region to routing region
 */
export function getRoutingRegion(region: RiotRegion): RiotRoutingRegion {
  const mapping: Record<RiotRegion, RiotRoutingRegion> = {
    na1: "americas",
    br1: "americas",
    la1: "americas",
    la2: "americas",
    euw1: "europe",
    eun1: "europe",
    tr1: "europe",
    ru: "europe",
    kr: "asia",
    jp1: "asia",
    oc1: "sea",
    ph2: "sea",
    sg2: "sea",
    th2: "sea",
    tw2: "sea",
    vn2: "sea",
  };
  return mapping[region];
}

/**
 * Region options for the select dropdown
 */
export const REGION_OPTIONS: RegionOption[] = [
  { value: "na1", label: "North America", routing: "americas" },
  { value: "euw1", label: "Europe West", routing: "europe" },
  { value: "eun1", label: "Europe Nordic & East", routing: "europe" },
  { value: "kr", label: "Korea", routing: "asia" },
  { value: "jp1", label: "Japan", routing: "asia" },
  { value: "br1", label: "Brazil", routing: "americas" },
  { value: "la1", label: "Latin America North", routing: "americas" },
  { value: "la2", label: "Latin America South", routing: "americas" },
  { value: "oc1", label: "Oceania", routing: "sea" },
  { value: "tr1", label: "Turkey", routing: "europe" },
  { value: "ru", label: "Russia", routing: "europe" },
  { value: "ph2", label: "Philippines", routing: "sea" },
  { value: "sg2", label: "Singapore", routing: "sea" },
  { value: "th2", label: "Thailand", routing: "sea" },
  { value: "tw2", label: "Taiwan", routing: "sea" },
  { value: "vn2", label: "Vietnam", routing: "sea" },
];

/**
 * Get year options for the select dropdown
 */
export function getYearOptions(): { value: number; label: string }[] {
  const currentYear = new Date().getFullYear();
  const years: { value: number; label: string }[] = [];
  
  for (let year = currentYear; year >= 2021; year--) {
    years.push({
      value: year,
      label: `Season ${year}`,
    });
  }
  
  return years;
}

/**
 * Calculate season date range
 */
export function getSeasonDateRange(year: number): { start: Date; end: Date } {
  // League seasons typically run January to November
  const start = new Date(year, 0, 10); // January 10th (after pre-season)
  const end = new Date(year, 10, 20); // November 20th (before pre-season)
  
  // If current year, use today as end
  const today = new Date();
  if (year === today.getFullYear() && today < end) {
    return { start, end: today };
  }
  
  return { start, end };
}

/**
 * Generate a unique job ID
 */
export function generateJobId(): string {
  return `rr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Sleep utility for simulating delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate exponential backoff delay
 */
export function getBackoffDelay(
  attempt: number,
  baseDelay = 1000,
  maxDelay = 30000
): number {
  const delay = baseDelay * Math.pow(2, attempt);
  return Math.min(delay, maxDelay);
}

