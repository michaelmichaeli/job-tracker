"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApplication = void 0;
const joi_1 = __importDefault(require("joi"));
// Define schema for application validation
const applicationSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    userId: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    company: joi_1.default.string().required(),
    location: joi_1.default.string().allow('').optional(),
    status: joi_1.default.string().valid('SAVED', 'APPLIED', 'INTERVIEWING', 'NEGOTIATING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN').required(),
    salary: joi_1.default.string().allow('').optional(),
    applicationDate: joi_1.default.date().iso().optional(),
    jobUrl: joi_1.default.string().uri().allow('').optional(),
    description: joi_1.default.string().allow('').optional(),
    notes: joi_1.default.string().allow('').optional(),
    contacts: joi_1.default.array().items(joi_1.default.object({
        id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        role: joi_1.default.string().allow('').optional(),
        email: joi_1.default.string().email().allow('').optional(),
        phone: joi_1.default.string().allow('').optional(),
        notes: joi_1.default.string().allow('').optional()
    })).optional(),
    interviews: joi_1.default.array().items(joi_1.default.object({
        id: joi_1.default.string().required(),
        type: joi_1.default.string().required(),
        date: joi_1.default.date().iso().required(),
        time: joi_1.default.string().optional(),
        location: joi_1.default.string().allow('').optional(),
        participants: joi_1.default.string().allow('').optional(),
        notes: joi_1.default.string().allow('').optional(),
        followUp: joi_1.default.boolean().optional()
    })).optional(),
    createdAt: joi_1.default.date().iso().optional(),
    updatedAt: joi_1.default.date().iso().optional()
});
// Validate application data
const validateApplication = (application) => {
    return applicationSchema.validate(application, { abortEarly: false });
};
exports.validateApplication = validateApplication;
//# sourceMappingURL=application.js.map