import React from 'react';

const heroBg = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80'; // Training/education themed

export default function TrainingProgramsScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-400">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-64 md:h-80 mb-8 overflow-hidden">
        <img
          src="/assets/image6.jpg"
          alt="Training Programs"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center drop-shadow-lg">Training Programs</h1>
          <p className="text-lg md:text-2xl text-orange-200 text-center">Specialized Mining Education & Certification</p>
        </div>
      </section>
      {/* Overview Section */}
      <section className="px-5 py-8">
        <h2 className="text-3xl font-bold text-center mb-2">Comprehensive Training Solutions</h2>
        <div className="h-1 bg-orange-500 rounded mx-auto mb-8" style={{ width: 160 }} />
        <div className="bg-gray-800 bg-opacity-90 rounded-2xl p-8 mb-8 shadow-lg max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-100">
            Our specialized training programs are designed to enhance the skills and knowledge of mining professionals. We offer comprehensive courses in blasting technology, environmental management, risk assessment, and safety protocols to ensure your team operates at the highest standards.
          </p>
        </div>
      </section>
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">Ready to Enhance Your Team's Skills?</h3>
        <p className="text-center mb-6 max-w-xl text-gray-200">
          Contact our training team to discuss your specific needs and schedule customized training programs for your mining operations.
        </p>
        <a href="#" className="bg-orange-500 text-gray-400 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition">Schedule Training</a>
      </section>
    </div>
  );
} 