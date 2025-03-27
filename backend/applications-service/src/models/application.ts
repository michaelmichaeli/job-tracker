import Joi from 'joi';

export type ApplicationStatus = 
  | 'SAVED'
  | 'APPLIED'
  | 'INTERVIEWING'
  | 'NEGOTIATING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN';

export interface Contact {
  id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface Interview {
  id: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  participants?: string;
  notes?: string;
  followUp: boolean;
}

export interface Application {
  id: string;
  userId: string;
  position: string;
  company: string;
  location?: string;
  status: ApplicationStatus;
  salary?: string;
  applicationDate?: string;
  jobUrl?: string;
  description?: string;
  notes?: string;
  contacts?: Contact[];
  interviews?: Interview[];
  createdAt?: string;
  updatedAt?: string;
}

// Define schema for application validation
const applicationSchema = Joi.object({
  id: Joi.string().optional(),
  userId: Joi.string().required(),
  position: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string().allow('').optional(),
  status: Joi.string().valid(
    'SAVED',
    'APPLIED',
    'INTERVIEWING',
    'NEGOTIATING',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN'
  ).required(),
  salary: Joi.string().allow('').optional(),
  applicationDate: Joi.date().iso().optional(),
  jobUrl: Joi.string().uri().allow('').optional(),
  description: Joi.string().allow('').optional(),
  notes: Joi.string().allow('').optional(),
  contacts: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      role: Joi.string().allow('').optional(),
      email: Joi.string().email().allow('').optional(),
      phone: Joi.string().allow('').optional(),
      notes: Joi.string().allow('').optional()
    })
  ).optional(),
  interviews: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      type: Joi.string().required(),
      date: Joi.date().iso().required(),
      time: Joi.string().optional(),
      location: Joi.string().allow('').optional(),
      participants: Joi.string().allow('').optional(),
      notes: Joi.string().allow('').optional(),
      followUp: Joi.boolean().optional()
    })
  ).optional(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional()
});

// Validate application data
export const validateApplication = (application: Partial<Application>) => {
  return applicationSchema.validate(application, { abortEarly: false });
}; 