import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getAllApplications } from '../services/dynamoService';
import { formatResponse, formatErrorResponse } from '../utils/responseUtils';

/**
 * Get all job applications
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Get applications from DynamoDB
    const applications = await getAllApplications();
    
    // Return the applications
    return formatResponse(200, applications);
  } catch (error) {
    return formatErrorResponse(error as Error);
  }
}; 