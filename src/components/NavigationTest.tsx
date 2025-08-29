import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationTest: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testLinks = [
    { label: 'Profile Settings', path: '/profile/settings' },
    { label: 'Order History', path: '/profile/orders' },
    { label: 'Wishlist', path: '/profile/wishlist' },
    { label: 'Notifications', path: '/profile/notifications' },
    { label: 'Support', path: '/profile/support' }
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="font-bold mb-2 text-sm">Navigation Test</h3>
      <p className="text-xs text-gray-600 mb-2">Current: {location.pathname}</p>
      <div className="space-y-1">
        {testLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => {
              console.log('Test Navigation to:', link.path);
              navigate(link.path);
            }}
            className="block w-full text-left text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTest;
