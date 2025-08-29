import React, { useState } from 'react';
import {
  FaBell, FaCheck, FaTrash, FaCog, FaCircle, FaEnvelope,
  FaShoppingCart, FaDownload, FaUser, FaSearch, FaFilter,
  FaBellSlash, FaCheckCircle, FaExclamationCircle, FaInfoCircle
} from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'order' | 'system' | 'download' | 'account' | 'promotional';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actionText?: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #BL-2024-001 for Blast Designer Pro has been shipped and will arrive within 2-3 business days.',
      timestamp: '2024-01-16T10:30:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/orders/BL-2024-001',
      actionText: 'Track Package'
    },
    {
      id: '2',
      type: 'system',
      title: 'Software Update Available',
      message: 'Blast Designer Pro v3.2.1 is now available with bug fixes and performance improvements.',
      timestamp: '2024-01-15T14:20:00Z',
      isRead: false,
      priority: 'medium',
      actionUrl: '/downloads',
      actionText: 'Download Update'
    },
    {
      id: '3',
      type: 'download',
      title: 'Download Ready',
      message: 'Your requested mining data analysis report is ready for download.',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: true,
      priority: 'medium',
      actionUrl: '/downloads/report-001',
      actionText: 'Download Now'
    },
    {
      id: '4',
      type: 'account',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'promotional',
      title: 'New Training Course Available',
      message: 'Join our Advanced Blast Design Optimization course starting next month. Early bird pricing available!',
      timestamp: '2024-01-14T08:00:00Z',
      isRead: false,
      priority: 'low',
      actionUrl: '/training/advanced-blast-design',
      actionText: 'Learn More'
    },
    {
      id: '6',
      type: 'system',
      title: 'Maintenance Scheduled',
      message: 'System maintenance is scheduled for January 20th from 2:00 AM to 4:00 AM EST. Services may be temporarily unavailable.',
      timestamp: '2024-01-13T12:00:00Z',
      isRead: true,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'system' | 'download' | 'account' | 'promotional'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    systemUpdates: true,
    promotional: false,
    weeklyDigest: true
  });
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         notification.type === filter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <FaShoppingCart className="text-blue-500" size={16} />;
      case 'system':
        return <FaCog className="text-gray-500" size={16} />;
      case 'download':
        return <FaDownload className="text-green-500" size={16} />;
      case 'account':
        return <FaUser className="text-purple-500" size={16} />;
      case 'promotional':
        return <FaEnvelope className="text-orange-500" size={16} />;
      default:
        return <FaBell className="text-gray-500" size={16} />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <FaExclamationCircle className="text-red-500" size={14} />;
      case 'medium':
        return <FaInfoCircle className="text-yellow-500" size={14} />;
      case 'low':
        return <FaCheckCircle className="text-green-500" size={14} />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-300 w-full sm:w-auto"
        >
          <FaCog size={16} />
          <span>Settings</span>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Delivery Preferences</h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Email notifications</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Push notifications</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={(e) => setSettings(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Weekly digest email</span>
              </label>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-3">Notification Types</h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.orderUpdates}
                  onChange={(e) => setSettings(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Order updates</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.systemUpdates}
                  onChange={(e) => setSettings(prev => ({ ...prev, systemUpdates: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">System updates</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.promotional}
                  onChange={(e) => setSettings(prev => ({ ...prev, promotional: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Promotional content</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', icon: null },
              { key: 'unread', label: 'Unread', icon: FaCircle },
              { key: 'order', label: 'Orders', icon: FaShoppingCart },
              { key: 'system', label: 'System', icon: FaCog },
              { key: 'download', label: 'Downloads', icon: FaDownload }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  filter === filterOption.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.icon && <filterOption.icon size={12} />}
                <span>{filterOption.label}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-1 px-3 py-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-300"
              >
                <FaCheck size={14} />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={deleteAllRead}
              className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-300"
            >
              <FaTrash size={14} />
              <span>Clear read</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <FaBellSlash className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
                !notification.isRead ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Type Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {getPriorityIcon(notification.priority)}
                        {!notification.isRead && (
                          <FaCircle className="text-blue-500" size={8} />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              {notification.actionText}
                            </button>
                          )}
                          
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-green-600 hover:text-green-800 p-1 rounded transition-colors duration-300"
                              title="Mark as read"
                            >
                              <FaCheck size={12} />
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-300"
                            title="Delete notification"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
