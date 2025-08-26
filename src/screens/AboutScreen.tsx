import React, { useEffect, useRef, useState } from 'react';
import { FaLightbulb, FaLeaf, FaGraduationCap, FaHandshake } from 'react-icons/fa';

const backgroundImages = [
  '/assets/image.png',
  '/assets/image2.jpg',
  '/assets/image3.jpg',
  '/assets/image4.jpg',
  '/assets/image6.jpg',
  '/assets/image7.jpg',
  '/assets/image8.jpg',
];

export default function AboutScreen() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch p-0 md:p-0 overflow-hidden">
        {/* Left: Full Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="/assets2/abu.png"
            alt="Earth Resource"
            className="w-full h-full object-cover rounded-l-3xl"
            style={{ minHeight: '300px', maxHeight: '600px' }}
          />
              </div>
        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col gap-6 text-gray-800 text-lg p-8 justify-center">
          <p>
            Earth Resource Technology Consultants provide training, consulting and software development services. We are supported by our group of experts who have a background in academics, consulting and industry. Our consultants are recognized in their respective fields in mining and environmental engineering. We have also developed strong software development capabilities and this enables us to further develop our own products and do custom software as well. We currently provide training and consulting services in India.
          </p>
          <p>
            We bring together many years of mining experience, together with up to date knowledge of current technical trends and leading technology to help our customers achieve the most efficient mining operations, reliable resource evaluation and maximum project value. Engineering services cover geotechnical assessment, design criteria, mine design, mine planning, mining method selection, equipment capability and matching, environmental studies spoil design, waste management, detailed mine plans and costing and evaluation studies. Our commitment is to technical excellence and service reliability. We combine our software development team with our mining engineering and environmental engineering personnel.
          </p>
          </div>
      </div>
    </div>
  );
} 