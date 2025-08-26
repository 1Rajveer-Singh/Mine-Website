import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

export default function FlyrockPredictionScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Section 1 */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Flyrock Predictor</h1>
          </div>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-800">
              Inputs to the software are charge mass, burden or stemming height, and a site constant that lies within a general range that can be tightened by site calibration. The output is the distance that rock will be thrown, and this 'design your own flyrock' quantification can be used to establish both safe clearance distances, and the critical range of burdens and stemming heights where the situation changes rapidly from safe to hazardous.
            </p>
            <p className="text-lg text-gray-800">
              Zone of flyrock travel can be indicated by Flyrock Predictor. Using safety factors danger zones for machinery and persons respectively. If it is not possible to remove any structure or person then one can change charging of holes.
            </p>
          </div>
          {/* Section 2 */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Flyrock Prediction Software - Desktop Version</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-800">
              This tool provides desktop based flyrock prediction functionalities. Here are a few snapshots.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {[
                { src: '/assets/fly1.jpg', alt: 'Flyrock Prediction Screenshot 1' },
                { src: '/assets/fly2.jpg', alt: 'Flyrock Prediction Screenshot 2' },
                { src: '/assets/fly3.jpg', alt: 'Flyrock Prediction Screenshot 3' },
                { src: '/assets/fly4.jpg', alt: 'Flyrock Prediction Screenshot 4' },
              ].map((img, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img src={img.src} alt={img.alt} className="w-44 h-40 object-contain border rounded shadow mb-2" />
                  <a href={img.src} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
                </div>
              ))}
            </div>
          </div>
          {/* Section 3: Web Version */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8 mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Flyrock Prediction Software - Web Version</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-800">
              This tool provides web based flyrock prediction functionalities. Here are a few snapshots.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {[
                { src: '/assets/fly5.jpg', alt: 'Flyrock Prediction Web Screenshot 1' },
                { src: '/assets/fly6.jpg', alt: 'Flyrock Prediction Web Screenshot 2' },
                { src: '/assets/fly7.jpg', alt: 'Flyrock Prediction Web Screenshot 3' },
              ].map((img, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img src={img.src} alt={img.alt} className="w-44 h-40 object-contain border rounded shadow mb-2" />
                  <a href={img.src} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 