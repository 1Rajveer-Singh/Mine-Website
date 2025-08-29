import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationDebug: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const testRoutes = [
    '/profile',
    '/profile/settings',
    '/profile/orders',
    '/profile/wishlist',
    '/profile/notifications',
    '/profile/support'
  ];

  return (
    <div className="fixed top-0 right-0 bg-black text-white p-4 z-[9999] max-w-sm">
      <h3 className="text-sm font-bold mb-2">Navigation Debug</h3>
      <p className="text-xs mb-2">Current: {location.pathname}</p>
      <div className="space-y-1">
        {testRoutes.map(route => (
          <button
            key={route}
            onClick={() => navigate(route)}
            className="block w-full text-left text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded"
          >
            {route}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationDebug;
