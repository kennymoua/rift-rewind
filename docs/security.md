# Security Considerations

This document outlines security practices and considerations for Rift Rewind.

## Secrets Management

### API Keys

**Riot API Key:**
- ✅ Stored as server-only environment variable
- ✅ Never exposed to client-side code
- ✅ In production: stored in AWS SSM Parameter Store (SecureString)
- ❌ Never committed to version control

```typescript
// ✅ Correct: Server-side only
// In /app/api/rewind/route.ts
const apiKey = process.env.RIOT_API_KEY;

// ❌ Wrong: Would expose to client
// In /app/page.tsx
const apiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY; // DON'T DO THIS
```

### Environment Variables

```env
# Server-only (safe for secrets)
RIOT_API_KEY=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Client-exposed (NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_MOCK_MODE=true      # OK: not sensitive
NEXT_PUBLIC_SITE_URL=xxx        # OK: public URL
```

## Input Validation

### Request Validation

All API endpoints use Zod schemas for validation:

```typescript
import { z } from "zod";

const StartRewindRequestSchema = z.object({
  gameName: z.string()
    .min(3, "Game name must be at least 3 characters")
    .max(16, "Game name must be at most 16 characters")
    .regex(/^[a-zA-Z0-9 ]+$/, "Invalid characters"),
  tagLine: z.string()
    .min(3)
    .max(5)
    .regex(/^[a-zA-Z0-9]+$/),
  region: z.enum(["na1", "euw1", "eun1", ...]),
  year: z.number().int().min(2021).max(2025),
});
```

### URL Parameters

Job IDs are validated before database lookups:

```typescript
if (!jobId || typeof jobId !== "string" || jobId.length > 50) {
  return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
}
```

## Rate Limiting

### Client-Side

The polling hook implements exponential backoff:

```typescript
function getBackoffDelay(attempt: number, baseDelay = 1000, maxDelay = 30000) {
  return Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
}
```

### Server-Side (Production)

API Gateway can be configured with:

```yaml
# API Gateway throttling
ThrottleSettings:
  BurstLimit: 100
  RateLimit: 50  # requests per second
```

### Riot API

The Riot API has built-in rate limits:
- Development: 20 requests/second, 100 requests/2 minutes
- Production: Higher limits after approval

Our service handles rate limit responses:

```typescript
if (response.status === 429) {
  const retryAfter = response.headers.get("Retry-After");
  throw new RateLimitError(`Rate limited. Retry after ${retryAfter}s`);
}
```

## CORS Configuration

### Development

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};
```

### Production (API Gateway)

```json
{
  "AllowOrigins": ["https://riftrewind.gg"],
  "AllowMethods": ["GET", "POST", "OPTIONS"],
  "AllowHeaders": ["Content-Type", "Authorization"],
  "AllowCredentials": false,
  "MaxAge": 86400
}
```

## Data Privacy

### Player Data

- We only access publicly available match data through the Riot API
- No personal information (email, name) is collected or stored
- Match data is cached temporarily (7-day TTL) for performance
- Users can request deletion of their cached data

### Storage

- DynamoDB: Encrypted at rest (AWS default)
- S3: Encrypted at rest (AES-256)
- No data is stored permanently without user consent

## Authentication (Future)

For features requiring user authentication (e.g., save rewind history):

1. **Option 1: Riot Sign-On (RSO)**
   - Official OAuth2 flow from Riot
   - Users authenticate with their Riot account
   - App receives limited profile info

2. **Option 2: AWS Cognito**
   - Custom user pools
   - Social sign-in (Google, Discord)
   - JWT tokens for API authorization

## Error Handling

### Information Disclosure

Errors returned to clients are sanitized:

```typescript
// ✅ Safe: Generic error message
return NextResponse.json(
  { error: "Failed to fetch player data" },
  { status: 500 }
);

// ❌ Unsafe: Exposes internal details
return NextResponse.json(
  { error: `DynamoDB error: ${error.message}` },
  { status: 500 }
);
```

### Logging

Detailed errors are logged server-side but not exposed:

```typescript
try {
  // operation
} catch (error) {
  console.error("[RewindAPI]", error); // Full error for debugging
  return NextResponse.json(
    { error: "An error occurred" }, // Safe for client
    { status: 500 }
  );
}
```

## AWS Security Best Practices

### IAM Policies

Lambda functions use least-privilege IAM roles:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/rift-rewind-jobs"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::rift-rewind-data/*"
    },
    {
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel"],
      "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-*"
    }
  ]
}
```

### VPC (Optional)

For enhanced security, Lambda functions can run in a VPC with:
- Private subnets for compute
- NAT Gateway for internet access
- Security groups for network isolation

## Security Checklist

- [x] No secrets in client-side code
- [x] Environment variables for configuration
- [x] Input validation on all endpoints
- [x] Sanitized error messages
- [x] CORS properly configured
- [x] Rate limiting approach defined
- [ ] WAF rules (production)
- [ ] VPC isolation (production)
- [ ] Security audit (before launch)

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. Do NOT open a public GitHub issue
2. Email security@riftrewind.gg (placeholder)
3. Include steps to reproduce
4. Allow 90 days for fix before disclosure

