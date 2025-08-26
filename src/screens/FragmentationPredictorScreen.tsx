import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

export default function FragmentationPredictorScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-200 rounded-lg px-6 py-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Fragmentation Predictor Software</h1>
          </div>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-800">
              The primary purpose of blasting is to fragment rock. Optimum fragmentation is very specific to each operation. Fragmentation Predictor will allow user to 'design most optimized blast design with minimum cost'. Inputs to the software are Blast design information, Rock properties information and explosive information and based on Kuz-Ram fragmentation model and Rosin Rammler equations, this model enables to make fragmentation calculation, graph and table between fragment size and percentage passing. It is anticipated that the use of this predictor will also help to improve blasting operations, its corresponding costs and the overall economics of mines.
            </p>
            <p className="text-lg text-gray-800">
              Software is available in Web based.
            </p>
          </div>
          {/* Image placeholder - replace src with your image when ready */}
          <div className="flex flex-col items-center">
            <img src="/assets/fragmentation_placeholder.png" alt="Fragmentation Predictor Screenshot" className="w-full max-w-xl object-contain border rounded shadow mb-2" />
            <a href="/assets/fragmentation_placeholder.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
          </div>
        </div>
      </main>
    </div>
  );
} 