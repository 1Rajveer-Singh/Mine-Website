import React from 'react';
import { FaHeartbeat, FaChartLine, FaFileAlt, FaChartBar } from 'react-icons/fa';

const heroBg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80'; // Vibration/technology themed

export default function VibrationAnalyzerScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-400">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-64 md:h-80 mb-8 overflow-hidden">
        <img
          src="/assets/image6.jpg"
          alt="Vibration Analyzer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center drop-shadow-lg">Vibration Pattern Analyzer</h1>
          <p className="text-lg md:text-2xl text-orange-200 text-center">Advanced Blast Vibration Analysis & Prediction</p>
        </div>
      </section>
      {/* Overview Section */}
      <section className="px-5 py-8">
        <h2 className="text-3xl font-bold text-center mb-2">Precision Vibration Analysis</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="bg-gray-800 bg-opacity-90 rounded-2xl p-8 mb-8 shadow-lg max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-100">
            Our Vibration Pattern Analyzer provides advanced analysis of blast vibration data to predict and control adverse environmental effects. This sophisticated software helps ensure compliance with regulatory limits while optimizing blasting performance.
          </p>
        </div>
      </section>
      {/* Features Grid */}
      <section className="px-5 py-8">
        <h2 className="text-3xl font-bold text-center mb-2">Key Features</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-800 bg-opacity-95 border-2 border-orange-500 rounded-2xl p-8 w-80 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow">
              <FaHeartbeat size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Real-Time Monitoring</div>
            <div className="text-center text-base text-gray-200">Continuous monitoring of vibration levels with instant alerts when thresholds are exceeded.</div>
          </div>
          <div className="bg-gray-800 bg-opacity-95 border-2 border-orange-500 rounded-2xl p-8 w-80 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow">
              <FaChartLine size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Pattern Recognition</div>
            <div className="text-center text-base text-gray-200">AI-powered pattern recognition to identify vibration trends and predict potential issues.</div>
          </div>
          <div className="bg-gray-800 bg-opacity-95 border-2 border-orange-500 rounded-2xl p-8 w-80 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow">
              <FaFileAlt size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Compliance Reporting</div>
            <div className="text-center text-base text-gray-200">Automated generation of compliance reports for regulatory authorities and stakeholders.</div>
          </div>
          <div className="bg-gray-800 bg-opacity-95 border-2 border-orange-500 rounded-2xl p-8 w-80 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow">
              <FaChartBar size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Predictive Modeling</div>
            <div className="text-center text-base text-gray-200">Advanced modeling to predict vibration effects before blasting operations begin.</div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">Ready to Master Vibration Control?</h3>
        <p className="text-center mb-6 max-w-xl text-gray-200">
          Contact our team to learn more about the Vibration Pattern Analyzer and how it can help you achieve optimal blasting performance while maintaining environmental compliance.
        </p>
        <a href="#" className="bg-orange-500 text-gray-400 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition">Learn More About VPA</a>
      </section>
    </div>
  );
} 