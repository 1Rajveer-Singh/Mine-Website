import React from 'react';

const ProfileTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Profile Navigation Works!</h1>
        <p className="text-lg text-gray-700 mb-4">
          If you can see this page, the navigation is working correctly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Navigation Test Results:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>React Router is working ✅</li>
            <li>Profile routes are configured ✅</li>
            <li>Components are loading ✅</li>
            <li>URL navigation is functional ✅</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Quick Navigation Test:</h3>
          <div className="space-x-4">
            <a href="/profile/settings" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profile Settings</a>
            <a href="/profile/orders" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Order History</a>
            <a href="/profile/wishlist" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Wishlist</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTestPage;
