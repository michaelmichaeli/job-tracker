import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getApplicationById } from '../services/dynamoService';
import { formatResponse, formatErrorResponse } from '../utils/responseUtils';

/**
 * Get a single job application by ID
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    
    if (!id) {
      return formatErrorResponse(new Error('Missing application ID'));
    }

    const application = await getApplicationById(id);
    
    if (!application) {
      return formatResponse(404, { message: 'Application not found' });
    }
    
    return formatResponse(200, application);
  } catch (error) {
    return formatErrorResponse(error as Error);
  }
}; 