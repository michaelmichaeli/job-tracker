"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoService_1 = require("../services/dynamoService");
const responseUtils_1 = require("../utils/responseUtils");
/**
 * Get a single job application by ID
 */
const handler = async (event) => {
    var _a;
    try {
        const id = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            return (0, responseUtils_1.formatErrorResponse)(new Error('Missing application ID'));
        }
        const application = await (0, dynamoService_1.getApplicationById)(id);
        if (!application) {
            return (0, responseUtils_1.formatResponse)(404, { message: 'Application not found' });
        }
        return (0, responseUtils_1.formatResponse)(200, application);
    }
    catch (error) {
        return (0, responseUtils_1.formatErrorResponse)(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=getOne.js.map