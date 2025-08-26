import React, { useEffect, useState } from 'react';
import { FaChartBar, FaTools, FaLeaf, FaMapMarkedAlt, FaHammer, FaWrench, FaBomb, FaSeedling, FaTint } from 'react-icons/fa';

const fieldImage = 'https://api.a0.dev/assets/field.png';

export default function ServicesScreen() {
  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center">Our Services</h1>
          <p className="text-2xl text-orange-300 font-medium mb-2 text-center">Comprehensive Mining Solutions</p>
        </section>
        {/* Mining Consultancy Services */}
        <section className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row items-center bg-white bg-opacity-90 rounded-3xl shadow-2xl mb-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
            <img src="/assets/field.png" alt="Mining Consultancy" className="w-full h-64 md:h-80 object-cover rounded-2xl" />
          </div>
          {/* Right: Text */}
          <div className="flex-1 md:pl-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Mining Consultancy</h2>
            <p className="text-lg text-gray-800 mb-4">
              Earth Resource Technology Consultants provide training, consulting and software development services. We are supported by our group of experts who have a background in academics, consulting and industry. Our consultants are recognized in their respective fields in mining and environmental engineering. We have also developed strong software development capabilities and this enables us to further develop our own products and do custom software as well. We currently provide training and consulting services in India.
            </p>
            <p className="text-lg text-gray-800">
              Mine optimization, Bench marking, Blasting Audit and Optimisation Resource modeling. Mining and Environment and Environment Audit.
            </p>
          </div>
        </section>
        {/* Skill Development Section */}
        <section className="max-w-6xl mx-auto p-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Skill Development</h2>
          <p className="text-lg text-gray-800 mb-4">
            <span className="font-bold">Training Programs:</span> Blasting for Economic Operations in Surface Mines, Advanced Blasting Technology in Mining and Construction Industry, Environmental Hazards due to Blasting and their mitigation, Mine Ventilation, Risk Management in Mining Industry.
          </p>
          <p className="text-lg text-gray-800">
            Over 500 executives from coal, metal, cement, research, planning institutes participated in 19 programmes conducted at Nagpur, Jaipur, Bhubaneshwar, Udaipur, Raipur, Dhanbad, Hyderabad and Jodhpur. In-house training programmes for: Hindustan Zinc Limited Singareni Collieries Company Limited Deepak Fertilizer and Chemicals Ltd.
          </p>
        </section>
        {/* Specialized Services (Updated) */}
        <section className="max-w-7xl mx-auto p-8">
          <h2 className="text-5xl font-extrabold text-center text-white mb-2">Specialized Services</h2>
          <div className="w-32 h-2 bg-orange-500 mx-auto mb-10 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Card 1 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaMapMarkedAlt size={56} color="#38bdf8" />
              <div className="text-2xl font-extrabold mb-2 text-center">Geological Surveys</div>
              <div className="text-center text-lg mb-2">Detailed geological mapping and resource estimation</div>
            </div>
            {/* Card 2 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaHammer size={56} color="#6366f1" />
              <div className="text-2xl font-extrabold mb-2 text-center">Mine Design</div>
              <div className="text-center text-lg mb-2">Optimized mine planning and engineering design</div>
            </div>
            {/* Card 3 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaWrench size={56} color="#a3a3a3" />
              <div className="text-2xl font-extrabold mb-2 text-center">Drilling Services</div>
              <div className="text-center text-lg mb-2">Exploration and production drilling solutions</div>
            </div>
            {/* Card 4 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaBomb size={56} color="#f43f5e" />
              <div className="text-2xl font-extrabold mb-2 text-center">Blasting Operations</div>
              <div className="text-center text-lg mb-2">Controlled blasting with minimal environmental impact</div>
            </div>
            {/* Card 5 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaSeedling size={56} color="#22c55e" />
              <div className="text-2xl font-extrabold mb-2 text-center">Site Rehabilitation</div>
              <div className="text-center text-lg mb-2">Post-mining land restoration and ecosystem recovery</div>
            </div>
            {/* Card 6 */}
            <div className="rounded-2xl shadow-xl p-10 flex flex-col items-center bg-white text-black">
              <FaTint size={56} color="#38bdf8" />
              <div className="text-2xl font-extrabold mb-2 text-center">Water Management</div>
              <div className="text-center text-lg mb-2">Comprehensive water treatment and management systems</div>
            </div>
          </div>
        </section>
        {/* Environmental Management Section */}
        <section className="w-full py-16">
          <h2 className="text-5xl font-extrabold text-center text-white mb-2">Environmental Management</h2>
          <div className="w-48 h-2 bg-orange-400 mx-auto mb-12 rounded-full" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
            {/* Card 1: Water Management */}
            <div className="rounded-3xl shadow-2xl p-10 flex flex-col items-center bg-white text-black">
              <div className="h-2 w-16 bg-orange-400 rounded-full mb-4" />
              <span className="text-6xl mb-4">🌊</span>
              <div className="font-extrabold text-3xl text-center mb-2">Water Management</div>
              <div className="text-center text-lg">Comprehensive solutions for mine water management including treatment, recycling, and discharge strategies.</div>
            </div>
            {/* Card 2: Rehabilitation Planning */}
            <div className="rounded-3xl shadow-2xl p-10 flex flex-col items-center bg-white text-black">
              <div className="h-2 w-16 bg-orange-400 rounded-full mb-4" />
              <span className="text-6xl mb-4">♻️</span>
              <div className="font-extrabold text-3xl text-center mb-2">Rehabilitation Planning</div>
              <div className="text-center text-lg">Expert guidance on mine site rehabilitation and closure planning to meet regulatory requirements.</div>
            </div>
            {/* Card 3: Air Quality Monitoring */}
            <div className="rounded-3xl shadow-2xl p-10 flex flex-col items-center bg-white text-black">
              <div className="h-2 w-16 bg-orange-400 rounded-full mb-4" />
              <span className="text-6xl mb-4">🫧</span>
              <div className="font-extrabold text-3xl text-center mb-2">Air Quality Monitoring</div>
              <div className="text-center text-lg">Advanced systems for monitoring and controlling particulate emissions from mining operations.</div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="relative w-4s py-4">
          <div className="relative z-6 max-w-4xl mx-auto flex flex-col items-center justify-center px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">Ready to Start Your Mining Project?</h2>
            <p className="text-xl text-white text-center mb-8">Contact our team of experts to discuss your mining needs and discover how we can help you achieve your goals.</p>
            <a href="/contact" className="bg-transparent border-2 border-blue-600 text-blue-600 font-extrabold text-2xl px-10 py-4 rounded-full transition hover:bg-blue-50 hover:text-blue-800">Contact Us Today</a>
          </div>
        </section>
      </div>
    </div>
  );
} 