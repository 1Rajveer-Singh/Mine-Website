import React from 'react';
import { FaLayerGroup, FaLeaf, FaChartLine, FaChartBar } from 'react-icons/fa';

export default function SurfaceOperationsDesignerScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-400">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-56 bg-gray-800 mb-5">
        <h1 className="text-3xl font-bold mb-2">Surface Operations Designer</h1>
        <p className="text-lg">Advanced Surface Mining Design & Optimization</p>
      </section>
      {/* Overview Section */}
      <section className="px-5 py-8">
        <h2 className="text-2xl font-bold text-center mb-2">Comprehensive Surface Mining Design</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <p className="text-center text-base">
            Our Surface Operations Designer is specialized software for designing and optimizing surface mining operations with environmental controls. This advanced platform helps create efficient, safe, and sustainable surface mining layouts.
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
              <FaLayerGroup size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">3D Mine Planning</div>
            <div className="text-center text-base">Advanced 3D modeling and visualization tools for comprehensive mine planning and design.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaLeaf size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Environmental Controls</div>
            <div className="text-center text-base">Integrated environmental impact assessment and mitigation planning tools.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaChartLine size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Optimization Algorithms</div>
            <div className="text-center text-base">AI-powered optimization for pit design, waste management, and production scheduling.</div>
          </div>
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 w-72 flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <FaChartBar size={30} color="#FF7043" />
            </div>
            <div className="font-bold text-lg mb-1">Cost Analysis</div>
            <div className="text-center text-base">Comprehensive cost modeling and financial analysis for surface mining operations.</div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h3 className="text-2xl font-bold mb-2">Ready to Design Your Surface Operations?</h3>
        <p className="text-center mb-4 max-w-xl">
          Contact our team to learn more about the Surface Operations Designer and how it can help you create optimal surface mining layouts with environmental considerations.
        </p>
        <a href="#" className="bg-orange-500 text-gray-400 px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">Learn More About SOD</a>
      </section>
    </div>
  );
} 