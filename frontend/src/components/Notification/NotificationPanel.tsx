import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { format, isValid, differenceInDays } from 'date-fns';

interface Scholarship {
  _id: string;
  title: string;
  eligibility: {
    deadline_date: string;
  };
}

const API_URL = 'http://localhost:5000/api';

const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Scholarship[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUpcomingScholarships = async () => {
      try {
        const response = await fetch(`${API_URL}/scholarships`);
        if (!response.ok) throw new Error('Failed to fetch scholarships');
        const data = await response.json();
        
        // Filter scholarships with deadlines in next 5 days
        const upcomingScholarships = data.filter((scholarship: Scholarship) => {
          const deadline = new Date(scholarship.eligibility.deadline_date);
          if (!isValid(deadline)) return false;
          const daysUntilDeadline = differenceInDays(deadline, new Date());
          return daysUntilDeadline >= 0 && daysUntilDeadline <= 5;
        });

        setNotifications(upcomingScholarships);
        setUnreadCount(upcomingScholarships.length);
      } catch (error) {
        console.error('Error fetching upcoming scholarships:', error);
      }
    };

    fetchUpcomingScholarships();
    // Refresh notifications every hour
    const interval = setInterval(fetchUpcomingScholarships, 3600000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (!isValid(date)) return '';
    return format(date, 'dd MMM yyyy');
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-panel')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative notification-panel">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform bg-red-600 rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40" />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 transform transition-all duration-200 ease-in-out">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h3>
              <p className="text-sm text-gray-500">Next 5 days</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((scholarship) => (
                  <Link
                    key={scholarship._id}
                    to={`/scholarships/${scholarship._id}`}
                    className="block p-4 hover:bg-gray-50 border-b last:border-b-0 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{scholarship.title}</p>
                        <p className="text-xs text-red-600 mt-1 font-medium">
                          Deadline: {formatDate(scholarship.eligibility.deadline_date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No upcoming deadlines
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel; 