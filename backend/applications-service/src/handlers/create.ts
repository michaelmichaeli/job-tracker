import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createApplication } from '../services/dynamoService';
import { formatResponse, formatErrorResponse } from '../utils/responseUtils';

/**
 * Create a new job application
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return formatErrorResponse(new Error('Missing application data'));
    }

    const applicationData = JSON.parse(event.body);
    const application = await createApplication(applicationData);
    
    return formatResponse(201, application);
  } catch (error) {
    return formatErrorResponse(error as Error);
  }
}; 