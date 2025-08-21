import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

export default function PatternAnalyserScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Section 1 */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Vibration Reinforcement Pattern Analyser</h1>
          </div>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-800">
              Wavefront reinforcement has been found to cause substantial increases in both air and ground vibration from both surface and underground blasting operations. Simple alterations to firing patterns can prevent wavefront reinforcement and be used to control vibration levels in many situations.
            </p>
            <p className="text-lg text-gray-800">
              Pattern Analyzer software based on wavefront reinforcement model. The model allows for the time taken for blast vibration wavefronts to travel from each blasthole, and has been successfully used to explain the reason for directional increases in both air and ground vibration in certain situations. The model has been used to identify wavefront reinforcement due to the propagation of air vibration and ground vibrations in certain situations.
            </p>
            <p className="text-lg text-gray-800">
              The software based on this model can help engineers to analyze blast hole timing and sequence and assist them in controlling their vibration levels. This software is property of Terrock Pvt. Ltd., Australia and is developed by Earth Resource Centre.
            </p>
          </div>
          {/* Section 2 */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Vibration Reinforcement Pattern Analyser - Desktop Version</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern1.png" alt="Pattern Analyser Screenshot 1" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern1.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern2.png" alt="Pattern Analyser Screenshot 2" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern2.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern3.png" alt="Pattern Analyser Screenshot 3" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern3.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
          </div>
          {/* Section 3: Web Version */}
          <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8 mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Vibration Reinforcement Pattern Analyser - Web Version</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern1.png" alt="Pattern Analyser Web Screenshot 1" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern1.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern2.png" alt="Pattern Analyser Web Screenshot 2" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern2.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Pattern3.png" alt="Pattern Analyser Web Screenshot 3" className="w-44 h-40 object-contain border rounded shadow mb-2" />
              <a href="/assets/Pattern3.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 