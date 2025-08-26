import React from 'react';

const backgroundImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';

export default function EnvironmentalAssessmentScreen() {
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center">Environmental Assessment</h1>
          <p className="text-2xl text-orange-300 font-medium mb-2 text-center">Comprehensive Environmental Impact Analysis</p>
        </section>
        {/* Overview Section */}
        <section className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Sustainable Mining Solutions</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8" />
          <div className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 mb-8">
            <p className="text-center text-base text-gray-800">
              Our environmental assessment services provide comprehensive analysis of mining operations' environmental impact. We help ensure compliance with regulations while developing sustainable mining practices that protect ecosystems and communities.
            </p>
          </div>
        </section>
        {/* CTA Section */}
        <section className="flex flex-col items-center justify-center py-12">
          <h3 className="text-3xl font-bold mb-2 text-white">Ready to Assess Your Environmental Impact?</h3>
          <p className="text-center mb-4 max-w-xl text-lg text-orange-200">
            Contact our environmental assessment team to discuss your project and ensure sustainable mining practices that protect the environment and communities.
          </p>
          <a href="#" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition">Schedule Assessment</a>
        </section>
      </div>
    </div>
  );
} 