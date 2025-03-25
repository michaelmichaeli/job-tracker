# Job Tracker Application

A comprehensive job application tracking system built with modern cloud technologies.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Frontend (Next.js)                             │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Auth Module  │  │  Dashboard   │  │ Applications │  │  Calendar    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                  React Query / SWR + Zustand                     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            AWS CloudFront                               │
└───────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            AWS API Gateway                              │
└─┬─────────────────────┬──────────────────────┬────────────────────────┬─┘
  │                     │                      │                        │
  ▼                     ▼                      ▼                        ▼
┌────────────┐    ┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Auth       │    │ Application   │    │ Analytics       │    │ Notification    │
│ Service    │    │ Service       │    │ Service         │    │ Service         │
│ (Lambda)   │    │ (Lambda)      │    │ (Lambda)        │    │ (Lambda)        │
└─┬──────────┘    └─┬─────────────┘    └───┬─────────────┘    └──┬──────────────┘
  │                 │                      │                     │
  ▼                 ▼                      ▼                     ▼
┌────────────┐    ┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Amazon     │    │ Amazon        │    │ Amazon          │    │ Amazon          │
│ Cognito    │    │ DynamoDB      │    │ RDS (Postgres)  │    │ SQS             │
└────────────┘    └───────────────┘    └─────────────────┘    └─────────────────┘
                          │                                            │
                          └────────────────┬─────────────────────────┬┘
                                          │                         │
                                          ▼                         ▼
                              ┌─────────────────────┐    ┌─────────────────┐
                              │ Amazon S3           │    │ Amazon          │
                              │ (Document Storage)  │    │ EventBridge     │
                              └─────────────────────┘    └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js with React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Headless UI
- **State Management**: Zustand
- **Data Fetching**: React Query / SWR
- **Component Library**: Storybook

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Architecture**: Microservices via AWS Lambda
- **API**: REST with OpenAPI + GraphQL option
- **Authentication**: JWT with Amazon Cognito

### AWS Cloud Services
- **Compute**: AWS Lambda
- **API Management**: Amazon API Gateway
- **Authentication**: Amazon Cognito
- **Databases**:
  - Amazon DynamoDB (NoSQL - application data)
  - Amazon RDS/PostgreSQL (relational data - analytics)
  - Amazon ElastiCache (Redis - caching)
- **Storage**: Amazon S3 (documents, files)
- **CDN**: Amazon CloudFront
- **Messaging**: Amazon SQS, Amazon EventBridge
- **Monitoring**: Amazon CloudWatch
- **Infrastructure**: AWS CDK / CloudFormation

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Infrastructure as Code**: AWS CDK
- **Monitoring**: CloudWatch, X-Ray
- **Testing**: Jest, Cypress

## Microservices

### Auth Service
- User registration and authentication
- Profile management
- Permission handling
- Integration with Cognito

### Application Tracking Service
- CRUD operations for job applications
- Status transitions
- Document management
- Contact information

### Analytics Service
- Application metrics and statistics
- Progress tracking
- Success rate analysis
- Data visualization preparation

### Notification Service
- Email notifications
- Calendar reminders
- Follow-up scheduling
- Template management

## Database Schema Design

### Users (Cognito + RDS)
- User profiles
- Preferences
- Authentication

### Applications (DynamoDB)
- Core application data
- Status tracking
- Timeline events
- Documents

### Analytics (RDS - PostgreSQL)
- Aggregated statistics
- Historical data
- Reporting tables

### Notifications (DynamoDB + SQS)
- Notification templates
- Delivery status
- Scheduling information

## Deployment Strategy
- Frontend: AWS Amplify / CloudFront
- Backend: Lambda + API Gateway
- Infrastructure: AWS CDK
- CI/CD: GitHub Actions workflow 