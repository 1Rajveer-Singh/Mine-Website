import React from 'react';

export default function BlastInformationSystemUndergroundScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-200 rounded-lg px-6 py-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Blast Information Management System for Underground (BIMSu)</h1>
        </div>
        <div className="space-y-6 mb-10">
          <p className="text-lg text-gray-800">
            Blast Information Management System is software programmed for keeping records of the blasting operations in tunnels, retrieving the recorded information and analyzing the information. It allows records to be maintained of Blast Design Pattern, Location, Explosive, Initiators Used, Video, Fragmentation Analysis, Vibration Analysis, Accidents and Manpower and Associated Costs. Key performance indicators (KPI) are determined along with End of the month reports for Management, IBM, DGMS and PESO.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/assets/bimsu.jpg"
            alt="Blast Information Management System for Underground Screenshot"
            className="w-full max-w-xl object-contain border rounded shadow mb-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('bimsu-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div id="bimsu-fallback" style={{display: 'none', color: 'red', fontWeight: 'bold'}}>
            Image not found: /assets/bimsu.jpg
          </div>
        </div>
      </div>
    </div>
  );
} 