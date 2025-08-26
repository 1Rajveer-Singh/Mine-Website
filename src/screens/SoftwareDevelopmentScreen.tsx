import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';

const heroBg = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'; // Tech-themed background

export default function SoftwareDevelopmentScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-64 md:h-80 mb-8 overflow-hidden">
        <img
          src="/assets/image6.jpg"
          alt="Software Development"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 text-orange-400"><FaLaptopCode size={48} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center drop-shadow-lg">Software Development</h1>
          <p className="text-lg md:text-2xl text-orange-200 text-center">Custom Mining Technology Solutions</p>
        </div>
      </section>
      {/* Overview Section */}
      <section className="px-5 py-8">
        <h2 className="text-3xl font-bold text-center mb-2">Tailored Software Solutions</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="bg-gray-800 bg-opacity-90 rounded-2xl p-8 mb-8 shadow-lg max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-100">
            We develop customized software solutions specifically designed for mining operations. Our development team creates innovative applications for blast management, vibration analysis, and comprehensive mining operations management that integrate seamlessly with your existing systems.
          </p>
        </div>
      </section>
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">Ready to Build Your Custom Solution?</h3>
        <p className="text-center mb-6 max-w-xl text-gray-200">
          Contact our software development team to discuss your specific needs and start building the perfect solution for your mining operations.
        </p>
        <a href="#" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition">Start Your Project</a>
      </section>
    </div>
  );
} 