import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';
import { FaFileAlt, FaChartLine, FaChartBar, FaCloud } from 'react-icons/fa';

const backgroundImage = 'https://api.a0.dev/assets/image4.jpg';

export default function BlastInformationSystemScreen() {
  // For the CTA, just use a static link for now
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8 relative">
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
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center">Blast Information Management System</h1>
            <p className="text-2xl text-orange-300 font-medium mb-2 text-center">Comprehensive Blast Data Collection & Analysis</p>
          </section>
          {/* Overview Section */}
          <section className="max-w-5xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Advanced Blast Management</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
            <div className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 mb-8">
              <p className="text-center text-base text-gray-800">
                Our Blast Information Management System (BIMS) provides comprehensive data collection and analysis for pre-blast, during blast, and post-blast operations. This integrated platform helps optimize blasting performance, ensure safety compliance, and improve operational efficiency.
              </p>
            </div>
          </section>
          {/* Features Grid */}
          <section className="max-w-5xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Key Features</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaFileAlt size={30} color="#FF7043" /></div>
                <div className="font-bold text-lg mb-1">Pre-Blast Planning</div>
                <div className="text-center text-base text-gray-700">Comprehensive blast design tools with geological data integration and optimization algorithms.</div>
              </div>
              <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaChartBar size={30} color="#FF7043" /></div>
                <div className="font-bold text-lg mb-1">Real-Time Monitoring</div>
                <div className="text-center text-base text-gray-700">Live data collection during blasting operations with instant feedback and safety alerts.</div>
              </div>
              <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaChartLine size={30} color="#FF7043" /></div>
                <div className="font-bold text-lg mb-1">Post-Blast Analysis</div>
                <div className="text-center text-base text-gray-700">Detailed analysis of blast results including fragmentation, vibration, and environmental impact.</div>
              </div>
              <div className="bg-white bg-opacity-95 border-2 border-orange-500 rounded-xl p-8 w-72 flex flex-col items-center hover:scale-105 transition-transform">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3"><FaCloud size={30} color="#FF7043" /></div>
                <div className="font-bold text-lg mb-1">Cloud Integration</div>
                <div className="text-center text-base text-gray-700">Seamless cloud storage and sharing capabilities for multi-site operations and collaboration.</div>
              </div>
            </div>
          </section>
          {/* CTA Section */}
          <section className="flex flex-col items-center justify-center py-12">
            <h3 className="text-3xl font-bold mb-2 text-white">Ready to Optimize Your Blasting Operations?</h3>
            <p className="text-center mb-4 max-w-xl text-lg text-orange-200">
              Contact our team to learn more about BIMS and how it can transform your blasting operations with advanced data management and analysis capabilities.
            </p>
            <a href="#" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition">Learn More About BIMS</a>
          </section>
        </div>
      </main>
    </div>
  );
} 