# Methodology

This document explains how Rift Rewind computes insights and generates AI content.

## Data Pipeline

### 1. Player Resolution

```
Input: Riot ID (GameName#TagLine) + Region
Output: PUUID (globally unique player identifier)
API: /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
```

The Riot Account API returns the PUUID, which is used for all subsequent API calls. The Account API uses routing regions (americas, europe, asia, sea) rather than platform regions.

### 2. Match Fetching

```
Input: PUUID, Season dates, Match count
Output: Array of match IDs
API: /lol/match/v5/matches/by-puuid/{puuid}/ids
```

We fetch up to 100 ranked matches from the specified season. The Match API also uses routing regions.

**Rate Limiting Considerations:**
- Riot API has rate limits (20 requests/second, 100 requests/2 minutes for development keys)
- Production apps need to apply for higher rate limits
- We batch requests and implement exponential backoff

### 3. Match Detail Retrieval

```
Input: Match ID
Output: Full match data including all 10 players
API: /lol/match/v5/matches/{matchId}
```

For each match ID, we fetch the full match details. We extract the player's participant data using their PUUID.

**Data Extracted:**
- Champion played
- Win/loss
- Kills, deaths, assists
- CS (creep score)
- Vision score
- Gold earned
- Damage dealt
- Game duration
- Role/position

## Insights Computation

### Basic Stats

```typescript
gamesPlayed = matches.length
wins = matches.filter(m => m.win).length
losses = gamesPlayed - wins
winrate = wins / gamesPlayed
avgKda = totalKDA / gamesPlayed
```

### Streak Calculation

We sort matches by timestamp and iterate to find the longest consecutive win/loss sequences:

```typescript
function calculateStreaks(matches: MatchSummary[]) {
  const sorted = matches.sort((a, b) => a.gameCreation - b.gameCreation);
  
  let currentWinStreak = 0;
  let longestWinStreak = 0;
  
  for (const match of sorted) {
    if (match.win) {
      currentWinStreak++;
      longestWinStreak = Math.max(longestWinStreak, currentWinStreak);
    } else {
      currentWinStreak = 0;
    }
  }
  
  return longestWinStreak;
}
```

### Champion Stats

We aggregate stats per champion:

```typescript
const champStats = {};

for (const match of matches) {
  if (!champStats[match.championId]) {
    champStats[match.championId] = { games: 0, wins: 0, kills: 0, ... };
  }
  
  const stat = champStats[match.championId];
  stat.games++;
  if (match.win) stat.wins++;
  stat.kills += match.kills;
  // ... aggregate other stats
}

// Calculate averages
for (const stat of Object.values(champStats)) {
  stat.winrate = stat.wins / stat.games;
  stat.avgKda = (stat.kills + stat.assists) / stat.deaths;
}
```

### Win Rate Over Time

We group matches by month and calculate win rate per period:

```typescript
const monthlyStats = {};

for (const match of matches) {
  const date = new Date(match.gameCreation);
  const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
  if (!monthlyStats[key]) {
    monthlyStats[key] = { wins: 0, total: 0 };
  }
  
  monthlyStats[key].total++;
  if (match.win) monthlyStats[key].wins++;
}

const winrateOverTime = Object.entries(monthlyStats).map(([period, stats]) => ({
  period: formatMonth(period),
  winrate: stats.wins / stats.total,
  games: stats.total,
}));
```

### Highlights Detection

**Best Match:**
- Filter for wins
- Sort by KDA descending
- Return highest KDA winning game

**Worst Match:**
- Sort all games by KDA ascending
- Return lowest KDA game

**Longest Game:**
- Sort by gameDuration descending
- Return longest game

**Biggest Comeback:**
- Filter for wins with deaths >= 3 (indicates adversity)
- Sort by (kills + assists) descending
- Return game with highest participation despite deaths

### Score Calculations

**Vision Score (0-100):**
```typescript
// Average vision score per minute
const avgVisionPerMin = matches.reduce((sum, m) => {
  return sum + m.visionScore / (m.gameDuration / 60);
}, 0) / matches.length;

// 1.0 vision/min = 100 score (calibrated against average players)
const visionScore = Math.min(100, avgVisionPerMin * 100);
```

**Objective Score (0-100):**
This is a proxy since we don't have direct objective participation data:
```typescript
// Base score from win rate (winning teams get objectives)
const baseScore = winrate * 100;

// Bonus for high damage (usually means objective fights)
const damageBonus = Math.min(20, avgDamage / 2000);

const objectiveScore = Math.min(100, baseScore + damageBonus);
```

## AI Content Generation

### Prompt Construction

We build a concise prompt with summarized stats:

```
You are an expert League of Legends coach creating a personalized season recap.

Player: {gameName}#{tagLine} ({region})
Season Stats:
- Games: {gamesPlayed}
- Win Rate: {winrate}%
- Average KDA: {avgKda}
- Longest Win Streak: {longestWinStreak}
- Main Role: {mostPlayedRole}

Top Champions: {champSummary}
Role Distribution: {roleSummary}
Vision Score: {visionScore}/100
Objective Score: {objectiveScore}/100

Generate a JSON response with:
1. "narrative": 6-10 sentence personalized story
2. "strengths": Array of 3 {title, description}
3. "weaknesses": Array of 2 {title, description}
4. "drills": Array of 3 {title, description, difficulty}
5. "championRecommendations": Array of 2 {championId, championName, reason}
```

### Response Parsing

The AI response is parsed as JSON:

```typescript
function parseAIResponse(response: string): AICoachContent {
  // Handle potential markdown code blocks
  let jsonStr = response;
  const match = response.match(/```json\s*([\s\S]*?)\s*```/);
  if (match) jsonStr = match[1];
  
  const parsed = JSON.parse(jsonStr);
  
  return {
    narrative: parsed.narrative || "",
    strengths: parsed.strengths || [],
    weaknesses: parsed.weaknesses || [],
    drills: parsed.drills || [],
    championRecommendations: parsed.championRecommendations || [],
  };
}
```

### Token Efficiency

- **Input:** ~500 tokens (summarized stats)
- **Output:** ~1000 tokens (narrative + structured data)
- **Total:** ~1500 tokens per generation
- **Cost:** ~$0.01 per generation with Claude 3 Sonnet

### Caching Strategy

Results are cached in DynamoDB with a composite key:
```
PK: PLAYER#{puuid}
SK: REWIND#{year}
TTL: 7 days
```

If a user requests the same rewind within the TTL, we return the cached result instead of regenerating.

## Quality Considerations

### Data Quality
- Only ranked games are analyzed (more competitive, consistent data)
- Minimum game count check (need enough data for meaningful insights)
- Outlier filtering for stats (remove games with clearly bugged data)

### AI Output Quality
- Validation of JSON structure
- Fallback content if parsing fails
- Length limits on generated text
- Toxicity filters (Bedrock built-in)

### User Experience
- Progress updates during long operations
- Clear error messages for failures
- Graceful degradation if AI fails (show stats without narrative)

