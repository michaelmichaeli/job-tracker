import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteApplication } from '../services/dynamoService';
import { formatResponse, formatErrorResponse } from '../utils/responseUtils';

/**
 * Delete a job application
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    
    if (!id) {
      return formatErrorResponse(new Error('Missing application ID'));
    }

    await deleteApplication(id);
    return formatResponse(204, null);
  } catch (error) {
    return formatErrorResponse(error as Error);
  }
}; 