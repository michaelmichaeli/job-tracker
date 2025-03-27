"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorResponse = exports.formatResponse = void 0;
const formatResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body),
    };
};
exports.formatResponse = formatResponse;
const formatErrorResponse = (error) => {
    return {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: error.message || 'Internal server error',
        }),
    };
};
exports.formatErrorResponse = formatErrorResponse;
//# sourceMappingURL=responseUtils.js.map