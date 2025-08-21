import React from 'react';
import { FaBomb, FaMapMarkedAlt, FaTools, FaChartBar, FaLeaf } from 'react-icons/fa';

export default function MiningConsultancyScreen() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/assets/image6.jpg"
        alt="Mining Background"
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-black/80" style={{ zIndex: 1 }} />
      <div className="relative z-10 w-full flex flex-row items-start justify-center px-8 py-16">
        {/* Left: Content */}
        <div className="flex-1 max-w-5xl">
          <h1 className="text-5xl font-extrabold text-white mb-4">Mining Consultancy Services</h1>
          <div className="w-32 h-2 bg-orange-500 mb-10 rounded-full" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 items-start">
            {/* Row 1 */}
            <div className="flex items-start">
              <span className="text-3xl text-orange-500 mr-4 mt-1"><FaBomb /></span>
              <span className="text-2xl font-extrabold text-orange-500">Blast Optimization and Design:</span>
            </div>
            <div className="text-xl text-white">Expert design and optimization of blasting operations for maximum efficiency and safety.</div>
            {/* Row 2 */}
            <div className="flex items-start">
              <span className="text-3xl text-orange-500 mr-4 mt-1"><FaMapMarkedAlt /></span>
              <span className="text-2xl font-extrabold text-orange-500">Mine Planning and Design:</span>
            </div>
            <div className="text-xl text-white">Comprehensive mine planning and engineering design for all project stages.</div>
            {/* Row 3 */}
            <div className="flex items-start">
              <span className="text-3xl text-orange-500 mr-4 mt-1"><FaTools /></span>
              <span className="text-2xl font-extrabold text-orange-500">Equipment Selection and Matching:</span>
            </div>
            <div className="text-xl text-white">Guidance on selecting and matching the right equipment for your mining needs.</div>
            {/* Row 4 */}
            <div className="flex items-start">
              <span className="text-3xl text-orange-500 mr-4 mt-1"><FaChartBar /></span>
              <span className="text-2xl font-extrabold text-orange-500">Productivity Improvement Strategies:</span>
            </div>
            <div className="text-xl text-white">Tailored strategies to boost productivity and operational efficiency.</div>
            {/* Row 5 */}
            <div className="flex items-start">
              <span className="text-3xl text-orange-500 mr-4 mt-1"><FaLeaf /></span>
              <span className="text-2xl font-extrabold text-orange-500">Environmental Impact Assessments:</span>
            </div>
            <div className="text-xl text-white">Thorough environmental assessments to ensure compliance and sustainability.</div>
          </div>
        </div>
        {/* Right: Image Card */}
        <div className="ml-12 flex-shrink-0">
          <img src="/assets/image6.jpg" alt="Mining" className="w-[400px] h-[260px] object-cover rounded-2xl shadow-xl" />
        </div>
      </div>
    </div>
  );
} 