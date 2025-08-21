import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

export default function BlastDesignerTunnelScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-200 rounded-lg px-6 py-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Blast Designer(BLADEST) for Tunnels</h1>
          </div>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-800">
              Software for design of blasting pattern in tunnels and headings taking into account geotechnical conditions and provides pattern with inclined or parallel hole cut with smooth blasting. Input for the software are size of opening, rock density, compressive strength, joints details, type of cut, empty hole diameter, strength of explosive and charge density. Output consists of burden, spacing, charge distribution for each hole, number of holes and expected pull. Reports of design are provided with powder factor, explosive and accessories consumption.
            </p>
          </div>
          {/* Image placeholder - replace src with your image when ready */}
          <div className="flex flex-col items-center">
            <img src="/assets/blast_tunnel_placeholder.png" alt="Blast Designer Tunnel Screenshot" className="w-full max-w-xl object-contain border rounded shadow mb-2" />
            <a href="/assets/blast_tunnel_placeholder.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
          </div>
        </div>
      </main>
    </div>
  );
} 