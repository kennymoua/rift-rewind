# The Forge 🔨❄️

> *"I have done well. This forge... and the things I've made here. That is the only legacy I need."* — Ornn

**The Forge** is a League of Legends year-in-review application where Ornn, the Fire Below the Mountain, helps you understand and improve your gameplay. Enter Ornn's workshop in the Freljord mountains and let the master craftsman forge insights from your match data.

Built with Next.js, TypeScript, and designed to deploy on AWS.

![The Forge Screenshot](./docs/screenshot.png)

## ✨ Features

- **Personalized Season Recap** - Enter your Riot ID to generate a comprehensive analysis of your ranked/normal games
- **Ornn's Wisdom (AI Coach)** - Powered by AWS Bedrock (Claude), receive personalized insights, strengths analysis, and training recommendations
- **Beautiful Freljord-themed UI** - Ice-blue and ember-orange colors, mountain backgrounds, and forge-inspired design
- **Champion Comparison** - Compare stats between two players in the "Trial by Combat" mode
- **Interactive Charts** - Visualize winrate trends, champion pools, and role distribution
- **Shareable Results** - Download or share your forge report

## 🏔️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         The Forge                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐     ┌───────────┐     ┌──────────────────────┐   │
│  │  Next.js │────▶│ API       │────▶│   AWS Backend        │   │
│  │  Frontend│     │ Routes    │     │                      │   │
│  └──────────┘     └───────────┘     │  ┌─────────────────┐ │   │
│                                     │  │  Step Functions │ │   │
│                                     │  │  (Orchestrator) │ │   │
│  Features:                          │  └────────┬────────┘ │   │
│  • Freljord Theme                   │           │          │   │
│  • Dark/Light Mode                  │  ┌───────▼────────┐ │   │
│  • Responsive Design                │  │ Lambda Workers │ │   │
│  • Motion Animations                │  │ • Fetch Matches│ │   │
│                                     │  │ • Build Stats  │ │   │
│                                     │  │ • AI Analysis  │ │   │
│                                     │  └───────┬────────┘ │   │
│                                     │          │          │   │
│                                     │  ┌───────▼────────┐ │   │
│                                     │  │   DynamoDB     │ │   │
│                                     │  │   + S3 Cache   │ │   │
│                                     │  └────────────────┘ │   │
│                                     └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ (20+ recommended for AWS SDK)
- npm or yarn
- Riot Games API Key (for production)

### Local Development (Mock Mode)

```bash
# Clone the repository
git clone https://github.com/kennymoua/rift-rewind.git
cd rift-rewind

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The app runs in **mock mode** by default, returning sample data instantly—no API keys needed!

### Environment Variables

```env
# Feature flags
NEXT_PUBLIC_MOCK_MODE=true          # Enable mock data (default: true)

# Riot API (required for production)
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# AWS (required for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DYNAMODB_TABLE_JOBS=forge-jobs
S3_BUCKET_RESULTS=forge-results
STEP_FUNCTION_ARN=arn:aws:states:...
```

## 🛠️ Project Structure

```
rift-rewind/
├── app/                        # Next.js App Router
│   ├── api/                    # API Route Handlers
│   │   ├── rewind/             # Forge report endpoints
│   │   └── compare/            # Comparison endpoints
│   ├── rewind/[jobId]/         # Results dashboard
│   ├── compare/                # Comparison pages
│   └── about/                  # Methodology page
├── components/
│   ├── layout/                 # Navbar, Footer, Theme
│   ├── charts/                 # Recharts visualizations
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── services/               # Backend service layer
│   │   ├── interfaces.ts       # Service contracts
│   │   ├── mock/               # Mock implementations
│   │   └── aws/                # AWS implementations
│   ├── types/                  # TypeScript definitions
│   └── validations/            # Zod schemas
├── hooks/                      # Custom React hooks
└── docs/                       # Documentation
```

## 🎨 Theme - Freljord Design System

The UI draws inspiration from Ornn and the Freljord region:

| Color | Variable | Usage |
|-------|----------|-------|
| Ember Orange | `--forge-ember` | Primary actions, Ornn's fire |
| Frost Blue | `--frost-blue` | Accents, victories, ice |
| Mountain Dark | `--mountain-dark` | Backgrounds |
| Forge Gold | `--forge-gold` | Highlights, achievements |
| Snow White | `--snow-white` | Text, light mode |

## 📊 Stats Computed

The Forge calculates these insights from your match data:

- **Core Stats**: Games played, wins/losses, winrate
- **Performance**: KDA, CS/min, vision score trends
- **Champion Pool**: Top 10 most-played, winrates per champion
- **Role Distribution**: Games and winrate by position
- **Highlights**: Best match, worst match, biggest comeback
- **Streaks**: Longest winning/losing streak
- **Habits**: Vision score rating, objective participation

## 🤖 AI Coach (Ornn's Wisdom)

Using AWS Bedrock (Claude), The Forge generates:

- **Narrative Summary** - Your season in Ornn's words
- **3 Strengths** - What you've forged well
- **2 Areas to Improve** - Where to apply more heat
- **3 Training Drills** - Specific exercises to improve
- **Champion Recommendations** - New champions to try

## 🔧 AWS Integration

See [docs/aws-integration.md](./docs/aws-integration.md) for detailed setup:

1. **DynamoDB** - Job status tracking
2. **S3** - Result caching
3. **Step Functions** - Pipeline orchestration
4. **Lambda** - Serverless compute
5. **Bedrock** - AI analysis
6. **Secrets Manager** - API key storage

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

## 🧪 Testing

```bash
# Run type checks
npm run typecheck

# Run linter
npm run lint

# Test mock mode locally
# 1. Start dev server
# 2. Enter any Riot ID
# 3. Verify mock data loads
```

## 🔐 Security

- No account credentials required—only public match data via Riot API
- API keys stored in AWS Secrets Manager (production)
- Environment variables never committed
- Results cached temporarily and auto-expire

See [docs/security.md](./docs/security.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE)

## ⚠️ Disclaimer

The Forge isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

---

<p align="center">
  <em>Forged in the mountains of Freljord</em><br/>
  <strong>🔨 THE FORGE ❄️</strong>
</p>
