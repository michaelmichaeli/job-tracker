import { Application } from '@/types/application';

// API base URL - replace with your API Gateway URL from serverless deployment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/dev';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

export class ApplicationApiService {
  static async getAllApplications(): Promise<Application[]> {
    try {
      const headers = getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  static async getApplicationById(id: string): Promise<Application> {
    try {
      const headers = getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch application');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }

  static async createApplication(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application> {
    try {
      const headers = getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers,
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error('Failed to create application');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  }

  static async updateApplication(id: string, application: Partial<Application>): Promise<Application> {
    try {
      const headers = getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error('Failed to update application');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  static async deleteApplication(id: string): Promise<void> {
    try {
      const headers = getHeaders();
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
} 