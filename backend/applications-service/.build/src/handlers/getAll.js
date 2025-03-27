"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoService_1 = require("../services/dynamoService");
const responseUtils_1 = require("../utils/responseUtils");
/**
 * Get all job applications
 */
const handler = async (event) => {
    try {
        // Get applications from DynamoDB
        const applications = await (0, dynamoService_1.getAllApplications)();
        // Return the applications
        return (0, responseUtils_1.formatResponse)(200, applications);
    }
    catch (error) {
        return (0, responseUtils_1.formatErrorResponse)(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=getAll.js.map