import React from 'react';
import { FaBomb, FaTools, FaChartPie, FaShieldAlt } from 'react-icons/fa';

export default function BlastManagementScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-400">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-56 bg-gray-800 mb-5">
        <h1 className="text-3xl font-bold mb-2">Blast Management Solution</h1>
        <p className="text-lg">Comprehensive Blasting Operations & Safety Management</p>
      </section>
      {/* Overview Section */}
      <section className="px-5 py-8">
        <h2 className="text-2xl font-bold text-center mb-2">Efficient & Safe Blast Management</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <p className="text-center text-base">
            Our Blast Management Solution provides advanced tools for planning, executing, and monitoring blasting operations in mining. Ensure safety, compliance, and optimal fragmentation with our integrated platform.
          </p>
        </div>
      </section>
      {/* Features Grid */}
      <section className="px-5 py-8">
        <h2 className="text-2xl font-bold text-center mb-2">Key Features</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaBomb size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Blast Planning</div>
            <div className="text-center text-base">Advanced tools for designing blast patterns, charge calculations, and timing sequences.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaTools size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Execution Management</div>
            <div className="text-center text-base">Real-time tracking and management of blasting operations for improved efficiency and safety.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaChartPie size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Blast Analysis</div>
            <div className="text-center text-base">Comprehensive analysis of blast results, fragmentation, and vibration monitoring.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaShieldAlt size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Safety & Compliance</div>
            <div className="text-center text-base">Ensure regulatory compliance and implement best practices for safe blasting operations.</div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h3 className="text-2xl font-bold mb-2">Ready to Optimize Your Blasting Operations?</h3>
        <p className="text-center mb-4 max-w-xl">
          Contact our team to learn more about the Blast Management Solution and how it can help you achieve safe, efficient, and compliant blasting in your mining projects.
        </p>
        <a href="#" className="bg-orange-500 text-gray-400 px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">Learn More About Blast Management</a>
      </section>
    </div>
  );
} 