"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoService_1 = require("../services/dynamoService");
const responseUtils_1 = require("../utils/responseUtils");
/**
 * Create a new job application
 */
const handler = async (event) => {
    try {
        if (!event.body) {
            return (0, responseUtils_1.formatErrorResponse)(new Error('Missing application data'));
        }
        const applicationData = JSON.parse(event.body);
        const application = await (0, dynamoService_1.createApplication)(applicationData);
        return (0, responseUtils_1.formatResponse)(201, application);
    }
    catch (error) {
        return (0, responseUtils_1.formatErrorResponse)(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=create.js.map