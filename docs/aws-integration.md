# AWS Integration Guide

This document explains how to configure AWS services for production deployment.

## Overview

Rift Rewind uses a serverless architecture with the following AWS services:

1. **Amazon API Gateway** — HTTP API for frontend
2. **AWS Lambda** — Compute for handlers
3. **AWS Step Functions** — Workflow orchestration
4. **Amazon DynamoDB** — Data persistence
5. **Amazon S3** — Object storage
6. **Amazon Bedrock** — AI generation

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured locally
- Riot API key (from developer.riotgames.com)

## DynamoDB Tables

### Jobs Table

```
Table Name: rift-rewind-jobs
Partition Key: PK (String)
Sort Key: SK (String)

Attributes:
- PK: "JOB#{jobId}" or "PLAYER#{puuid}"
- SK: "PROGRESS" | "RESULT" | "REWIND#{year}"
- status: String (PENDING, RUNNING, DONE, FAILED)
- data: Map (job-specific data)
- ttl: Number (Unix timestamp for TTL)

GSI (optional):
- GSI1PK: status
- GSI1SK: createdAt
- (For admin queries by status)
```

**Create with CLI:**
```bash
aws dynamodb create-table \
  --table-name rift-rewind-jobs \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --tags Key=Project,Value=RiftRewind
```

### Matches Cache Table (Optional)

```
Table Name: rift-rewind-matches
Partition Key: matchId (String)

Attributes:
- matchId: String
- data: Map (full match data)
- ttl: Number
```

## S3 Bucket

```
Bucket Name: rift-rewind-data-{account-id}

Structure:
- /matches/{region}/{matchId}.json     # Raw match data
- /share-cards/{jobId}.png             # Generated share images
- /static/                             # Static assets
```

**Create with CLI:**
```bash
aws s3 mb s3://rift-rewind-data-123456789012

# Set lifecycle rule for cost control
aws s3api put-bucket-lifecycle-configuration \
  --bucket rift-rewind-data-123456789012 \
  --lifecycle-configuration '{
    "Rules": [
      {
        "ID": "DeleteOldMatches",
        "Filter": {"Prefix": "matches/"},
        "Status": "Enabled",
        "Expiration": {"Days": 30}
      }
    ]
  }'
```

## Lambda Functions

### 1. ResolvePlayer

```yaml
Name: rift-rewind-resolve-player
Runtime: nodejs20.x
Memory: 256MB
Timeout: 30s
Environment:
  RIOT_API_KEY: ${ssm:/rift-rewind/riot-api-key}
```

### 2. FetchMatches

```yaml
Name: rift-rewind-fetch-matches
Runtime: nodejs20.x
Memory: 512MB
Timeout: 120s
Environment:
  RIOT_API_KEY: ${ssm:/rift-rewind/riot-api-key}
  S3_BUCKET: rift-rewind-data-123456789012
```

### 3. BuildInsights

```yaml
Name: rift-rewind-build-insights
Runtime: nodejs20.x
Memory: 512MB
Timeout: 60s
Environment:
  DDB_TABLE: rift-rewind-jobs
```

### 4. GenerateStory

```yaml
Name: rift-rewind-generate-story
Runtime: nodejs20.x
Memory: 1024MB
Timeout: 60s
Environment:
  BEDROCK_MODEL_ID: anthropic.claude-3-sonnet-20240229-v1:0
  DDB_TABLE: rift-rewind-jobs
```

## Step Functions State Machine

```json
{
  "Comment": "Rift Rewind Generation Workflow",
  "StartAt": "ResolvePlayer",
  "States": {
    "ResolvePlayer": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:rift-rewind-resolve-player",
      "ResultPath": "$.player",
      "Next": "FetchMatches",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "ResultPath": "$.error",
        "Next": "MarkFailed"
      }]
    },
    "FetchMatches": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:rift-rewind-fetch-matches",
      "ResultPath": "$.matches",
      "Next": "BuildInsights",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "ResultPath": "$.error",
        "Next": "MarkFailed"
      }]
    },
    "BuildInsights": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:rift-rewind-build-insights",
      "ResultPath": "$.insights",
      "Next": "GenerateStory",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "ResultPath": "$.error",
        "Next": "MarkFailed"
      }]
    },
    "GenerateStory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:rift-rewind-generate-story",
      "ResultPath": "$.aiContent",
      "Next": "MarkComplete",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "ResultPath": "$.error",
        "Next": "MarkFailed"
      }]
    },
    "MarkComplete": {
      "Type": "Task",
      "Resource": "arn:aws:states:::dynamodb:updateItem",
      "Parameters": {
        "TableName": "rift-rewind-jobs",
        "Key": {
          "PK": {"S.$": "States.Format('JOB#{}', $.jobId)"},
          "SK": {"S": "PROGRESS"}
        },
        "UpdateExpression": "SET #status = :status, completedAt = :now",
        "ExpressionAttributeNames": {"#status": "status"},
        "ExpressionAttributeValues": {
          ":status": {"S": "DONE"},
          ":now": {"S.$": "$$.State.EnteredTime"}
        }
      },
      "End": true
    },
    "MarkFailed": {
      "Type": "Task",
      "Resource": "arn:aws:states:::dynamodb:updateItem",
      "Parameters": {
        "TableName": "rift-rewind-jobs",
        "Key": {
          "PK": {"S.$": "States.Format('JOB#{}', $.jobId)"},
          "SK": {"S": "PROGRESS"}
        },
        "UpdateExpression": "SET #status = :status, #error = :error",
        "ExpressionAttributeNames": {
          "#status": "status",
          "#error": "error"
        },
        "ExpressionAttributeValues": {
          ":status": {"S": "FAILED"},
          ":error": {"S.$": "$.error.Cause"}
        }
      },
      "End": true
    }
  }
}
```

## Amazon Bedrock Configuration

### Enable Model Access

1. Go to Amazon Bedrock console
2. Navigate to Model access
3. Request access to `anthropic.claude-3-sonnet-20240229-v1:0`
4. Wait for approval (usually immediate)

### IAM Policy for Lambda

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
      ]
    }
  ]
}
```

## API Gateway

### Routes

```
POST /api/rewind/start    → Lambda: StartRewindHandler
GET  /api/rewind/{jobId}  → Lambda: GetRewindStatusHandler
POST /api/compare/start   → Lambda: StartCompareHandler
GET  /api/compare/{jobId} → Lambda: GetCompareStatusHandler
```

### CORS Configuration

```json
{
  "AllowOrigins": ["https://riftrewind.gg", "http://localhost:3000"],
  "AllowMethods": ["GET", "POST", "OPTIONS"],
  "AllowHeaders": ["Content-Type", "Authorization"],
  "MaxAge": 86400
}
```

## Environment Variables

Store secrets in SSM Parameter Store:

```bash
# Riot API Key
aws ssm put-parameter \
  --name "/rift-rewind/riot-api-key" \
  --value "RGAPI-xxx" \
  --type SecureString

# Reference in Lambda
RIOT_API_KEY: ${ssm:/rift-rewind/riot-api-key}
```

## Deployment Checklist

1. [ ] Create DynamoDB table
2. [ ] Create S3 bucket with lifecycle policies
3. [ ] Store Riot API key in SSM
4. [ ] Deploy Lambda functions
5. [ ] Create Step Functions state machine
6. [ ] Enable Bedrock model access
7. [ ] Create API Gateway with routes
8. [ ] Configure CORS
9. [ ] Update frontend environment variables
10. [ ] Test end-to-end flow

## Cost Estimation

| Service | Unit Cost | Estimated Monthly |
|---------|-----------|-------------------|
| Lambda | $0.20/1M requests | $2-5 |
| DynamoDB | $1.25/1M writes | $1-3 |
| S3 | $0.023/GB | $0.50 |
| Bedrock (Claude 3 Sonnet) | $3/1M input, $15/1M output | $10-30 |
| Step Functions | $25/1M transitions | $1-2 |
| **Total** | | **~$15-40/month** |

*Estimates based on 1000 rewinds/month*

## Monitoring

### CloudWatch Alarms

```yaml
# High error rate
ErrorRateAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: RiftRewind-HighErrorRate
    MetricName: Errors
    Namespace: AWS/Lambda
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 1
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold

# Step Function failures
StepFunctionFailures:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: RiftRewind-WorkflowFailures
    MetricName: ExecutionsFailed
    Namespace: AWS/States
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 1
    Threshold: 5
```

### X-Ray Tracing

Enable X-Ray for Lambda functions to trace request flow through the system.

