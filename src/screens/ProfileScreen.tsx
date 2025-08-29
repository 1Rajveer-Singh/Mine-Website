import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileWrapper from '../components/ProfileWrapper';
import { 
  FaCog, FaShoppingBag, FaCreditCard, FaHeart, 
  FaBell, FaHeadset, FaUser, FaChartLine, FaArrowRight,
  FaWallet, FaShieldAlt, FaHistory, FaStar
} from 'react-icons/fa';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: FaCreditCard,
      title: 'Payment Methods',
      description: 'Manage cards, billing, and checkout preferences',
      route: '/profile/payment',
      color: 'from-blue-600 to-purple-600',
      highlight: true
    },
    {
      icon: FaShoppingBag,
      title: 'Order History',
      description: 'View past orders and track current ones',
      route: '/profile/orders',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: FaCog,
      title: 'Account Settings',
      description: 'Update personal information and preferences',
      route: '/profile/settings',
      color: 'from-gray-500 to-gray-700'
    },
    {
      icon: FaHeart,
      title: 'Wishlist',
      description: 'Save items for later purchase',
      route: '/profile/wishlist',
      color: 'from-pink-500 to-red-600'
    }
  ];

  const stats = [
    { icon: FaChartLine, label: 'Total Orders', value: '24', color: 'text-blue-600' },
    { icon: FaWallet, label: 'Total Spent', value: '$2,847', color: 'text-green-600' },
    { icon: FaStar, label: 'Rewards Points', value: '1,250', color: 'text-yellow-600' },
    { icon: FaHistory, label: 'Member Since', value: '2023', color: 'text-purple-600' }
  ];

  return (
    <ProfileWrapper title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome back, John!</h2>
                <p className="text-blue-100">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <stat.icon className={`${stat.color} text-xl`} />
                <div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.route)}
                className={`relative cursor-pointer group rounded-xl p-6 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  action.highlight 
                    ? 'bg-gradient-to-r ' + action.color + ' ring-2 ring-blue-200' 
                    : 'bg-gradient-to-r ' + action.color
                }`}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-12 -translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <action.icon size={32} className="group-hover:scale-110 transition-transform duration-300" />
                    {action.highlight && (
                      <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2">{action.title}</h4>
                  <p className="text-sm opacity-90 mb-4">{action.description}</p>
                  
                  <div className="flex items-center text-sm font-medium">
                    <span>Go to {action.title}</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Quick Access - Special Card */}
        <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-6 text-center">
          <div className="max-w-md mx-auto">
            <FaWallet size={48} className="text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Center</h3>
            <p className="text-gray-600 mb-4">
              Complete your payment profile for faster checkout and better security
            </p>
            <button
              onClick={() => navigate('/profile/payment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaShieldAlt className="inline mr-2" />
              Setup Payment Profile
            </button>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default ProfileScreen;
