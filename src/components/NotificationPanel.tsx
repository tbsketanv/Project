import React, { useState } from 'react';
import { Bell, AlertCircle, Clock, CheckCircle, XCircle, Calendar, Filter, ChevronDown } from 'lucide-react';

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  status: 'Booked' | 'Posted' | 'Rejected' | 'Pending' | 'Approved';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  policyNumber?: string;
}

const NotificationPanel: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'success',
      status: 'Booked',
      title: 'Policy Premium Booked',
      message: 'POL-2024-001 premium has been successfully booked',
      time: '1 hour ago',
      isRead: false,
      policyNumber: 'POL-2024-001',
    },
    {
      id: 2,
      type: 'success',
      status: 'Posted',
      title: 'Policy Premium Booked',
      message: 'POL-2024-002 premium has been successfully posted',
      time: '2 hours ago',
      isRead: false,
      policyNumber: 'POL-2024-002',
    },
    {
      id: 3,
      type: 'error',
      status: 'Rejected',
      title: 'Policy Failed',
      message: 'POL-2024-003 has been rejected due to incomplete documentation',
      time: '3 hours ago',
      isRead: false,
      policyNumber: 'POL-2024-003',
    },
    {
      id: 4,
      type: 'info',
      status: 'Pending',
      title: 'Policy Pending Review',
      message: 'POL-2024-004 requires immediate attention',
      time: '4 hours ago',
      isRead: false,
      policyNumber: 'POL-2024-004',
    },
    {
      id: 5,
      type: 'success',
      status: 'Approved',
      title: 'Policy Premium Booked',
      message: 'POL-2024-005 has been successfully approved and issued',
      time: '6 hours ago',
      isRead: true,
      policyNumber: 'POL-2024-005',
    },
    {
      id: 6,
      type: 'error',
      status: 'Rejected',
      title: 'Policy Failed',
      message: 'POL-2024-006 payment processing failed',
      time: '1 day ago',
      isRead: true,
      policyNumber: 'POL-2024-006',
    },
    {
      id: 7,
      type: 'success',
      status: 'Posted',
      title: 'Policy Premium Booked',
      message: 'POL-2024-007 premium has been successfully posted',
      time: '1 day ago',
      isRead: true,
      policyNumber: 'POL-2024-007',
    },
  ];

  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'info':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    const opacity = isRead ? '50' : '100';
    switch (type) {
      case 'warning':
        return `bg-orange-${opacity} border-orange-200`;
      case 'info':
        return `bg-blue-${opacity} border-blue-200`;
      case 'success':
        return `bg-green-${opacity} border-green-200`;
      case 'error':
        return `bg-red-${opacity} border-red-200`;
      default:
        return `bg-gray-${opacity} border-gray-200`;
    }
  };

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;
  const totalUnread = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 h-fit">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <p className="text-sm text-gray-600">Recent updates & alerts</p>
          </div>
        </div>
        {totalUnread > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {totalUnread}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </button>
          {filterType !== 'all' && (
            <span className="text-xs text-gray-600">
              {filteredNotifications.length} of {notifications.length} notifications
            </span>
          )}
        </div>

        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilterType('success')}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  filterType === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Success ({notifications.filter(n => n.type === 'success').length})
              </button>
              <button
                onClick={() => setFilterType('error')}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  filterType === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Failed ({notifications.filter(n => n.type === 'error').length})
              </button>
              <button
                onClick={() => setFilterType('warning')}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  filterType === 'warning'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Warning ({notifications.filter(n => n.type === 'warning').length})
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
              notification.isRead 
                ? 'bg-gray-50 border-gray-200 opacity-75' 
                : getNotificationBg(notification.type, notification.isRead)
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${
                    notification.isRead ? 'text-gray-600' : 'text-gray-900'
                  }`}>
                    {notification.title}
                  </p>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                <p className={`text-xs mt-1 ${
                  notification.isRead ? 'text-gray-500' : 'text-gray-700'
                }`}>
                  {notification.message}
                </p>
                {notification.policyNumber && (
                  <p className={`text-xs mt-1 font-mono ${
                    notification.isRead ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Policy: {notification.policyNumber}
                  </p>
                )}
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {notification.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && filterType !== 'all' && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No {filterType} notifications found</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;