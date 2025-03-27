import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Application } from '../models/application';

// Initialize the DynamoDB DocumentClient with local configuration when offline
const isOffline = process.env.IS_OFFLINE;
const dynamoDb = new AWS.DynamoDB.DocumentClient(
  isOffline
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed for local dynamo
        secretAccessKey: 'DEFAULT_SECRET' // needed for local dynamo
      }
    : {}
);

const tableName = process.env.APPLICATIONS_TABLE || '';

// Mock data store for local development
const mockStore: { [key: string]: Application } = {};

/**
 * Create a new application
 */
export const createApplication = async (application: Partial<Application>): Promise<Application> => {
  const timestamp = new Date().toISOString();
  const id = application.id || uuidv4();
  
  const newApplication = {
    ...application,
    id,
    createdAt: timestamp,
    updatedAt: timestamp
  } as Application;

  mockStore[id] = newApplication;
  return newApplication;
};

/**
 * Get all applications
 */
export const getAllApplications = async (): Promise<Application[]> => {
  return Object.values(mockStore);
};

/**
 * Get a single application by ID
 */
export const getApplicationById = async (id: string): Promise<Application | null> => {
  return mockStore[id] || null;
};

/**
 * Update an application
 */
export const updateApplication = async (id: string, application: Partial<Application>): Promise<Application> => {
  const timestamp = new Date().toISOString();
  
  if (!mockStore[id]) {
    throw new Error('Application not found');
  }

  mockStore[id] = {
    ...mockStore[id],
    ...application,
    updatedAt: timestamp
  };

  return mockStore[id];
};

/**
 * Delete an application
 */
export const deleteApplication = async (id: string): Promise<void> => {
  delete mockStore[id];
}; 