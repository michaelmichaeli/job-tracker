"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.updateApplication = exports.getApplicationById = exports.getAllApplications = exports.createApplication = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
// Initialize the DynamoDB DocumentClient with local configuration when offline
const isOffline = process.env.IS_OFFLINE;
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient(isOffline
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // needed for local dynamo
        secretAccessKey: 'DEFAULT_SECRET' // needed for local dynamo
    }
    : {});
const tableName = process.env.APPLICATIONS_TABLE || '';
// Mock data store for local development
const mockStore = {};
/**
 * Create a new application
 */
const createApplication = async (application) => {
    const timestamp = new Date().toISOString();
    const id = application.id || (0, uuid_1.v4)();
    const newApplication = {
        ...application,
        id,
        createdAt: timestamp,
        updatedAt: timestamp
    };
    mockStore[id] = newApplication;
    return newApplication;
};
exports.createApplication = createApplication;
/**
 * Get all applications
 */
const getAllApplications = async () => {
    return Object.values(mockStore);
};
exports.getAllApplications = getAllApplications;
/**
 * Get a single application by ID
 */
const getApplicationById = async (id) => {
    return mockStore[id] || null;
};
exports.getApplicationById = getApplicationById;
/**
 * Update an application
 */
const updateApplication = async (id, application) => {
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
exports.updateApplication = updateApplication;
/**
 * Delete an application
 */
const deleteApplication = async (id) => {
    delete mockStore[id];
};
exports.deleteApplication = deleteApplication;
//# sourceMappingURL=dynamoService.js.map