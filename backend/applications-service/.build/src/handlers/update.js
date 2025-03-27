"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoService_1 = require("../services/dynamoService");
const responseUtils_1 = require("../utils/responseUtils");
/**
 * Update a job application
 */
const handler = async (event) => {
    var _a;
    try {
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            return (0, responseUtils_1.formatErrorResponse)(new Error('Missing application ID'));
        }
        if (!event.body) {
            return (0, responseUtils_1.formatErrorResponse)(new Error('Missing application data'));
        }
        const applicationData = JSON.parse(event.body);
        const application = await (0, dynamoService_1.updateApplication)(id, applicationData);
        return (0, responseUtils_1.formatResponse)(200, application);
    }
    catch (error) {
        return (0, responseUtils_1.formatErrorResponse)(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=update.js.map