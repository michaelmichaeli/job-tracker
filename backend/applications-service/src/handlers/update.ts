import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateApplication } from '../services/dynamoService';
import { formatResponse, formatErrorResponse } from '../utils/responseUtils';

/**
 * Update a job application
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    
    if (!id) {
      return formatErrorResponse(new Error('Missing application ID'));
    }

    if (!event.body) {
      return formatErrorResponse(new Error('Missing application data'));
    }

    const applicationData = JSON.parse(event.body);
    const application = await updateApplication(id, applicationData);
    
    return formatResponse(200, application);
  } catch (error) {
    return formatErrorResponse(error as Error);
  }
}; 