import { JobApplication } from '@/types/application';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: JobApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const {
    id,
    position,
    company,
    location,
    status,
    dateApplied,
    dateUpdated,
    events,
  } = application;

  const renderStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      wishlist: { color: 'bg-gray-200 text-gray-800', label: 'Wishlist' },
      applied: { color: 'bg-blue-200 text-blue-800', label: 'Applied' },
      first_contact: { color: 'bg-teal-200 text-teal-800', label: 'First Contact' },
      interview: { color: 'bg-purple-200 text-purple-800', label: 'Interview' },
      technical: { color: 'bg-indigo-200 text-indigo-800', label: 'Technical' },
      offer: { color: 'bg-green-200 text-green-800', label: 'Offer' },
      accepted: { color: 'bg-green-500 text-white', label: 'Accepted' },
      rejected: { color: 'bg-red-200 text-red-800', label: 'Rejected' },
    };

    const { color, label } = statusMap[status] || { color: 'bg-gray-200 text-gray-800', label: status };
    
    return (
      <span className={`${color} px-2 py-1 rounded-full text-xs font-medium`}>
        {label}
      </span>
    );
  };

  const nextEvent = events?.find(event => !event.completed && new Date(event.date) > new Date());

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">
            {position}
          </h3>
          {renderStatusBadge(status)}
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {company} • {location}
        </p>
        
        <div className="mt-4 flex flex-col space-y-2">
          {dateApplied && (
            <div className="text-xs text-gray-500">
              Applied: {formatDistanceToNow(new Date(dateApplied), { addSuffix: true })}
            </div>
          )}
          <div className="text-xs text-gray-500">
            Updated: {formatDistanceToNow(new Date(dateUpdated), { addSuffix: true })}
          </div>
        </div>

        {nextEvent && (
          <div className="mt-4 p-2 bg-yellow-50 border border-yellow-100 rounded text-sm">
            <p className="font-medium text-yellow-800">Next: {nextEvent.title}</p>
            <p className="text-yellow-700 text-xs">
              {new Date(nextEvent.date).toLocaleDateString()} at {new Date(nextEvent.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Link 
            href={`/dashboard/applications/${id}`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}; 