# Job Tracker Backend

This directory contains the serverless microservices for the Job Tracker application.

## Applications Microservice

The applications microservice handles all CRUD operations for job applications.

### Prerequisites

- Node.js 18+
- AWS Account
- AWS CLI configured locally
- Serverless Framework installed (`npm install -g serverless`)

### Setup

1. Navigate to the applications service directory:

```bash
cd applications-service
```

2. Install dependencies:

```bash
npm install
```

3. Deploy to AWS:

```bash
npm run deploy
```

This will create all the required AWS resources:
- Lambda functions
- API Gateway
- DynamoDB table
- Cognito User Pool

### Environment Variables

After deployment, you'll get outputs containing the API URL, User Pool ID, and User Pool Client ID.
Update the `.env.local` file in the frontend directory with these values:

```
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_USER_POOL_ID=<the-output-user-pool-id>
NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID=<the-output-user-pool-client-id>
NEXT_PUBLIC_API_URL=<the-output-api-url>
```

### Local Development

To run the service locally with serverless-offline:

```bash
npm run offline
```

This will start a local API Gateway at http://localhost:3000/dev

### API Endpoints

All endpoints require authentication via AWS Cognito.

| Method | Path               | Description                     |
|--------|--------------------|---------------------------------|
| GET    | /applications      | Get all applications for user   |
| GET    | /applications/{id} | Get an application by ID        |
| POST   | /applications      | Create a new application        |
| PUT    | /applications/{id} | Update an existing application  |
| DELETE | /applications/{id} | Delete an application           |

### Schema

The application schema includes:

- id (string)
- userId (string)
- position (string, required)
- company (string, required)
- location (string, optional)
- status (enum, required)
- salary (string, optional)
- applicationDate (ISO date, optional)
- jobUrl (URL, optional)
- description (string, optional)
- notes (string, optional)
- contacts (array of contact objects, optional)
- interviews (array of interview objects, optional)
- createdAt (ISO date)
- updatedAt (ISO date)

### Typescript Setup

The backend is written in TypeScript for better type safety and developer experience.

To build the TypeScript code:

```bash
npm run build
```

To type-check without building:

```bash
npm run type-check
```

To run the service locally with TypeScript support:

```bash
npm run start
```

## Future Microservices

Additional microservices will be added in the future:

- User service for more granular user management
- Analytics service for job application insights
- Document management service for resumes and cover letters 