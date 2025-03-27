'use client';

import { useEffect } from 'react';
import { useApplications } from '@/context/ApplicationContext';

export default function DashboardPage() {
  const { fetchApplications, applications, isLoading, error } = useApplications();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Add New Application
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application) => (
          <div key={application.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">{application.company}</h2>
                <p className="text-gray-600 font-medium">{application.position}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {application.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Notes:</span> {application.notes}
              </p>
              <p className="text-sm text-gray-500">
                Applied on: {new Date(application.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 