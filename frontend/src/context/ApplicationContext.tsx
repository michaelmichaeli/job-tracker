'use client';

import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { Application } from '@/types/application';
import { ApplicationApiService } from '@/services/applicationApi.service';

interface ApplicationState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  selectedApplication: Application | null;
}

type ApplicationAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Application[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SELECTED_APPLICATION'; payload: Application | null }
  | { type: 'CREATE_APPLICATION'; payload: Application }
  | { type: 'UPDATE_APPLICATION'; payload: Application }
  | { type: 'DELETE_APPLICATION'; payload: string };

const initialState: ApplicationState = {
  applications: [
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineer',
      status: 'Applied',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: 'Mountain View, CA',
      notes: 'Applied through company website'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Frontend Developer',
      status: 'Interview',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: 'Redmond, WA',
      notes: 'Technical interview scheduled'
    },
    {
      id: '3',
      company: 'Amazon',
      position: 'Full Stack Developer',
      status: 'Offer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: 'Seattle, WA',
      notes: 'Negotiating offer'
    }
  ],
  isLoading: false,
  error: null,
  selectedApplication: null,
};

const applicationReducer = (state: ApplicationState, action: ApplicationAction): ApplicationState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        applications: action.payload,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SET_SELECTED_APPLICATION':
      return {
        ...state,
        selectedApplication: action.payload,
      };
    case 'CREATE_APPLICATION':
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id ? action.payload : app
        ),
      };
    case 'DELETE_APPLICATION':
      return {
        ...state,
        applications: state.applications.filter((app) => app.id !== action.payload),
      };
    default:
      return state;
  }
};

interface ApplicationContextType extends ApplicationState {
  fetchApplications: () => Promise<void>;
  fetchApplicationById: (id: string) => Promise<void>;
  createApplication: (application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateApplication: (id: string, application: Partial<Application>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  setSelectedApplication: (application: Application | null) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const fetchApplications = useCallback(async () => {
    dispatch({ type: 'FETCH_SUCCESS', payload: initialState.applications });
  }, []);

  const fetchApplicationById = async (id: string) => {
    try {
      dispatch({ type: 'FETCH_START' });
      const application = await ApplicationApiService.getApplicationById(id);
      dispatch({ type: 'SET_SELECTED_APPLICATION', payload: application });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch application' });
    }
  };

  const createApplication = async (application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newApplication = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'CREATE_APPLICATION', payload: newApplication });
  };

  const updateApplication = async (id: string, application: Partial<Application>) => {
    const existingApp = state.applications.find(app => app.id === id);
    if (existingApp) {
      const updatedApplication = {
        ...existingApp,
        ...application,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_APPLICATION', payload: updatedApplication });
    }
  };

  const deleteApplication = async (id: string) => {
    dispatch({ type: 'DELETE_APPLICATION', payload: id });
  };

  const setSelectedApplication = (application: Application | null) => {
    dispatch({ type: 'SET_SELECTED_APPLICATION', payload: application });
  };

  return (
    <ApplicationContext.Provider
      value={{
        ...state,
        fetchApplications,
        fetchApplicationById,
        createApplication,
        updateApplication,
        deleteApplication,
        setSelectedApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}; 