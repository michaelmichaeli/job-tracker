import { useState, useEffect } from 'react';
import { useApplications } from '@/context/ApplicationContext';
import { JobApplication, ApplicationStatus } from '@/types/application';

interface ApplicationFormProps {
  application?: JobApplication;
  onClose: () => void;
}

export const ApplicationForm = ({ application, onClose }: ApplicationFormProps) => {
  const { createApplication, updateApplication } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    description: '',
    url: '',
    salary: '',
    status: 'wishlist' as ApplicationStatus,
    dateApplied: '',
  });

  useEffect(() => {
    if (application) {
      setFormData({
        position: application.position,
        company: application.company,
        location: application.location,
        description: application.description || '',
        url: application.url || '',
        salary: application.salary || '',
        status: application.status,
        dateApplied: application.dateApplied
          ? new Date(application.dateApplied).toISOString().split('T')[0]
          : '',
      });
    }
  }, [application]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Validation
      if (!formData.position.trim() || !formData.company.trim() || !formData.location.trim()) {
        throw new Error('Position, company, and location are required');
      }

      const applicationData = {
        ...formData,
        dateApplied: formData.dateApplied ? new Date(formData.dateApplied) : undefined,
      };

      if (application) {
        // Update existing application
        await updateApplication(application.id, applicationData);
      } else {
        // Create new application
        await createApplication(applicationData);
      }

      onClose();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {application ? 'Edit Application' : 'Add New Application'}
        </h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {formError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{formError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. $100,000 - $120,000"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700">
                Application Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dateApplied"
                  id="dateApplied"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.dateApplied}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Job URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://example.com/jobs/123"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Job description or notes"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            className="mr-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              : null
            }
            {application ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}; 