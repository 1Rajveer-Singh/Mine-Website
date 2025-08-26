import React from 'react';
import { FaCloud, FaShieldAlt, FaUsers, FaChartBar } from 'react-icons/fa';

const backgroundImage = 'https://api.a0.dev/assets/image6.jpg';

export default function CloudDataSyncScreen() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" style={{ zIndex: 1 }} />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center">Cloud Data Sync</h1>
          <p className="text-2xl text-orange-300 font-medium mb-2 text-center">Seamless Cloud Integration for Mining Operations</p>
        </section>
        {/* Overview Section */}
        <section className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Real-Time Data Synchronization</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
          <div className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 mb-8">
            <p className="text-center text-base text-gray-800">
              Our Cloud Data Sync solution provides seamless cloud integration for real-time data access and collaboration across mining sites. This platform ensures secure, reliable, and instant data synchronization for improved operational efficiency.
            </p>
          </div>
        </section>
        {/* Features Grid */}
        <section className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Key Features</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaCloud size={30} color="#FF7043" /></div>
              <div className="font-bold text-lg mb-1">Real-Time Sync</div>
              <div className="text-center text-base text-gray-700">Instant synchronization of data across all connected devices and mining sites.</div>
            </div>
            <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaShieldAlt size={30} color="#FF7043" /></div>
              <div className="font-bold text-lg mb-1">Secure Storage</div>
              <div className="text-center text-base text-gray-700">Enterprise-grade security with encryption and access controls for sensitive mining data.</div>
            </div>
            <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaUsers size={30} color="#FF7043" /></div>
              <div className="font-bold text-lg mb-1">Team Collaboration</div>
              <div className="text-center text-base text-gray-700">Multi-user access with role-based permissions for effective team collaboration.</div>
            </div>
            <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaChartBar size={30} color="#FF7043" /></div>
              <div className="font-bold text-lg mb-1">Data Analytics</div>
              <div className="text-center text-base text-gray-700">Advanced analytics and reporting tools for comprehensive data insights.</div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="flex flex-col items-center justify-center py-12">
          <h3 className="text-3xl font-bold mb-2 text-white">Ready to Sync Your Mining Data?</h3>
          <p className="text-center mb-4 max-w-xl text-lg text-orange-200">
            Contact our team to learn more about Cloud Data Sync and how it can transform your mining operations with seamless data integration and collaboration.
          </p>
          <a href="#" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition">Learn More About CDS</a>
        </section>
      </div>
    </div>
  );
} 