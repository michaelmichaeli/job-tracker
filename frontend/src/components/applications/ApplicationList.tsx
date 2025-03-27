import { useApplications } from '@/context/ApplicationContext';
import { ApplicationCard } from './ApplicationCard';
import { useState } from 'react';
import { ApplicationStatus } from '@/types/application';

export const ApplicationList = () => {
  const { applications, isLoading, error, filters, setFilters } = useApplications();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const statusOptions: { value: ApplicationStatus; label: string }[] = [
    { value: 'wishlist', label: 'Wishlist' },
    { value: 'applied', label: 'Applied' },
    { value: 'first_contact', label: 'First Contact' },
    { value: 'interview', label: 'Interview' },
    { value: 'technical', label: 'Technical' },
    { value: 'offer', label: 'Offer' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleStatusFilter = (status: ApplicationStatus) => {
    setFilters({
      ...filters,
      status: filters.status?.includes(status)
        ? filters.status.filter(s => s !== status)
        : [...(filters.status || []), status],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilters({
      ...filters,
      company: searchTerm,
      position: searchTerm,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-between mb-6">
        <div className="w-full md:w-1/3">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search applications"
              type="search"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              view === 'grid'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4V4zm0 6h4v4H4v-4zm0 6h4v4H4v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4z"></path>
            </svg>
            Grid
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              view === 'list'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v2H4V4zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"></path>
            </svg>
            List
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusFilter(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filters.status?.includes(option.value)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
        {(filters.status?.length || 0) > 0 && (
          <button
            onClick={() => setFilters({ ...filters, status: [] })}
            className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new application.</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Application
            </button>
          </div>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}; 