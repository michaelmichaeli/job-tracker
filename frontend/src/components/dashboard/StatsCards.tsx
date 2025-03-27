import { useApplications } from '@/context/ApplicationContext';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, description, icon, color }: StatCardProps) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
            {description && (
              <dd className="mt-1 text-sm text-gray-500">{description}</dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export const StatsCards = () => {
  const { stats, isLoading } = useApplications();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white overflow-hidden shadow rounded-lg p-5 animate-pulse"
          >
            <div className="flex items-center">
              <div className="rounded-md p-3 bg-gray-200 h-12 w-12"></div>
              <div className="ml-5 w-0 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate rates as percentages
  const responseRate = Math.round(stats.responseRate * 100);
  const interviewRate = Math.round(stats.interviewRate * 100);
  const offerRate = Math.round(stats.offerRate * 100);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Applications"
        value={stats.total}
        icon={
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
        color="bg-indigo-500"
      />

      <StatCard
        title="Response Rate"
        value={`${responseRate}%`}
        description={stats.total > 0 ? `From ${stats.total} applications` : undefined}
        icon={
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
        color="bg-blue-500"
      />

      <StatCard
        title="Interview Rate"
        value={`${interviewRate}%`}
        description="Of applications that got a response"
        icon={
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
        color="bg-purple-500"
      />

      <StatCard
        title="Offer Rate"
        value={`${offerRate}%`}
        description="Of total applications"
        icon={
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        color="bg-green-500"
      />
    </div>
  );
}; 