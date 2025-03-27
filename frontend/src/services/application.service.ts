import { JobApplication, ApplicationStatus, ApplicationFilters, ApplicationStats, Contact, ApplicationNote, InterviewEvent } from '@/types/application';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development
const mockApplications: JobApplication[] = [
  {
    id: '1',
    position: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    description: 'Frontend development with React and TypeScript',
    url: 'https://example.com/job/1',
    salary: '$100,000 - $120,000',
    status: 'applied',
    dateApplied: new Date('2023-03-10'),
    dateUpdated: new Date('2023-03-10'),
    userId: '1',
  },
  {
    id: '2',
    position: 'Full Stack Engineer',
    company: 'Startup Inc',
    location: 'New York, NY',
    description: 'Full stack development with React, Node.js, and AWS',
    url: 'https://example.com/job/2',
    salary: '$130,000 - $150,000',
    status: 'interview',
    dateApplied: new Date('2023-03-05'),
    dateUpdated: new Date('2023-03-15'),
    events: [
      {
        id: '1',
        title: 'Phone Interview',
        date: new Date('2023-03-20'),
        type: 'phone',
        completed: true,
        feedback: 'Went well, moving to next round',
      },
      {
        id: '2',
        title: 'Technical Interview',
        date: new Date('2023-03-25'),
        type: 'technical',
        completed: false,
      },
    ],
    userId: '1',
  },
  {
    id: '3',
    position: 'Senior Software Engineer',
    company: 'Big Tech',
    location: 'San Francisco, CA',
    description: 'Senior engineering role focused on cloud infrastructure',
    url: 'https://example.com/job/3',
    salary: '$160,000 - $200,000',
    status: 'wishlist',
    dateUpdated: new Date('2023-03-01'),
    userId: '1',
  },
];

// This is a placeholder for real API integration
export const ApplicationService = {
  // Get all applications for a user
  async getApplications(userId: string, filters?: ApplicationFilters): Promise<JobApplication[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, this would be an API call
    let applications = mockApplications.filter(app => app.userId === userId);

    // Apply filters if provided
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        applications = applications.filter(app => filters.status?.includes(app.status));
      }
      if (filters.company) {
        applications = applications.filter(app => 
          app.company.toLowerCase().includes(filters.company!.toLowerCase())
        );
      }
      if (filters.position) {
        applications = applications.filter(app => 
          app.position.toLowerCase().includes(filters.position!.toLowerCase())
        );
      }
      if (filters.dateRange) {
        applications = applications.filter(app => {
          const appDate = app.dateApplied || app.dateUpdated;
          return appDate >= filters.dateRange!.from && appDate <= filters.dateRange!.to;
        });
      }
    }

    return applications;
  },

  // Get a specific application by ID
  async getApplication(id: string): Promise<JobApplication | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In a real implementation, this would be an API call
    const application = mockApplications.find(app => app.id === id);
    return application || null;
  },

  // Create a new application
  async createApplication(application: Omit<JobApplication, 'id' | 'dateUpdated'>): Promise<JobApplication> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, this would be an API call
    const newApplication: JobApplication = {
      ...application,
      id: uuidv4(),
      dateUpdated: new Date(),
    };

    // Add to mock data
    mockApplications.push(newApplication);
    return newApplication;
  },

  // Update an existing application
  async updateApplication(id: string, application: Partial<JobApplication>): Promise<JobApplication> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, this would be an API call
    const index = mockApplications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }

    const updatedApplication = {
      ...mockApplications[index],
      ...application,
      dateUpdated: new Date(),
    };

    mockApplications[index] = updatedApplication;
    return updatedApplication;
  },

  // Delete an application
  async deleteApplication(id: string): Promise<void> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, this would be an API call
    const index = mockApplications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }

    mockApplications.splice(index, 1);
  },

  // Get application statistics
  async getApplicationStats(userId: string): Promise<ApplicationStats> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation, this would be an API call
    const applications = mockApplications.filter(app => app.userId === userId);
    
    // Calculate statistics
    const total = applications.length;
    
    // Count by status
    const byStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<ApplicationStatus, number>);
    
    // Calculate rates
    const applied = applications.filter(app => app.status !== 'wishlist').length;
    const interviewed = applications.filter(app => 
      ['interview', 'technical', 'offer', 'accepted', 'rejected'].includes(app.status)
    ).length;
    const offers = applications.filter(app => 
      ['offer', 'accepted', 'rejected'].includes(app.status)
    ).length;
    
    const responseRate = applied > 0 ? interviewed / applied : 0;
    const interviewRate = interviewed > 0 ? offers / interviewed : 0;
    const offerRate = applied > 0 ? offers / applied : 0;

    return {
      total,
      byStatus,
      responseRate,
      interviewRate,
      offerRate,
    };
  },

  // Add a contact to an application
  async addContact(applicationId: string, contact: Omit<Contact, 'id'>): Promise<Contact> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newContact: Contact = {
      ...contact,
      id: uuidv4(),
    };

    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    if (!application.contacts) {
      application.contacts = [];
    }

    application.contacts.push(newContact);
    application.dateUpdated = new Date();

    return newContact;
  },

  // Add a note to an application
  async addNote(applicationId: string, content: string): Promise<ApplicationNote> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newNote: ApplicationNote = {
      id: uuidv4(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    if (!application.notes) {
      application.notes = [];
    }

    application.notes.push(newNote);
    application.dateUpdated = new Date();

    return newNote;
  },

  // Add an interview event to an application
  async addEvent(applicationId: string, event: Omit<InterviewEvent, 'id'>): Promise<InterviewEvent> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newEvent: InterviewEvent = {
      ...event,
      id: uuidv4(),
    };

    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    if (!application.events) {
      application.events = [];
    }

    application.events.push(newEvent);
    application.dateUpdated = new Date();

    return newEvent;
  },
}; 