import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaCog, FaShoppingBag, 
  FaHeart, FaBell, FaHeadset, FaHome, FaCreditCard 
} from 'react-icons/fa';

interface ProfileWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('ProfileWrapper rendered with title:', title);
  console.log('ProfileWrapper location:', location.pathname);
  console.log('ProfileWrapper authToken:', localStorage.getItem('authToken'));

  // Profile navigation items
  const profileNavItems = [
    { icon: FaCog, label: 'Settings', route: '/profile/settings' },
    { icon: FaShoppingBag, label: 'Orders', route: '/profile/orders' },
    { icon: FaCreditCard, label: 'Payment', route: '/profile/payment' },
    { icon: FaHeart, label: 'Wishlist', route: '/profile/wishlist' },
    { icon: FaBell, label: 'Notifications', route: '/profile/notifications' },
    { icon: FaHeadset, label: 'Support', route: '/profile/support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <FaHome size={16} />
                <span>Home</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-blue-500" size={16} />
                  <span className="text-gray-400">/</span>
                  <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                </div>
              </div>
            </div>
            
            {/* Right side - Quick Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {profileNavItems.map((item) => {
                const isActive = location.pathname === item.route;
                const isPayment = item.route === '/profile/payment';
                return (
                  <button
                    key={item.route}
                    onClick={() => navigate(item.route)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                      isActive 
                        ? isPayment
                          ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-200 font-medium shadow-lg'
                          : 'text-blue-600 bg-blue-50 border border-blue-200 font-medium'
                        : isPayment
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg font-medium'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={14} />
                    <span>{item.label}</span>
                    {isPayment && (
                      <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                        💳
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      {/* Floating Payment Button - Only show on non-payment pages */}
      {location.pathname !== '/profile/payment' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => navigate('/profile/payment')}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="Manage Payment Methods"
          >
            <FaCreditCard size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Payment Methods
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileWrapper;
