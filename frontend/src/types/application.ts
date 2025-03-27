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

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus[];
  company?: string;
  position?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface ApplicationStats {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
} 