import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

const sidebarItems = [
  { name: 'Blast Information Management System', path: '/software' },
  { name: 'Pattern Analyser', path: '/software/pattern-analyser' },
  { name: 'Flyrock Predictor', path: '/software/flyrock-prediction' },
  { name: 'Blast Information Management System for Underground', path: '/software/blast-information-underground' },
  { name: 'Blast Designer for Surface Operations', path: '/software/blast-designer-surface' },
  { name: 'Blast Designer(BLADEST) for Tunnels', path: '/software/blast-designer-tunnel' },
  { name: 'Fragmentation Predictor Software', path: '/software/fragmentation-predictor' },
];

export default function SoftwareScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-blue-100 rounded-lg px-6 py-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Blast Information Management System (BIMS)</h1>
          </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-800">
            Mine personnel and management need information for planning, controlling and decision-making. This data needs to be stored, analysed, audited, documented and managed at various stages of a mine or quarry. These data need to be analysed to optimize mine operations. The manual methods of data storage and file management take time and resources for providing critical information for making decisions.
          </p>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex flex-col items-center md:items-start">
              <img src="/assets/bims.jpg" alt="BIMS Blast Information Flowchart" className="w-56 h-44 object-contain border rounded shadow mb-2" />
              <a href="/assets/blast_flowchart.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-800">
                Data collection: pre-blast, during the blast and post-blast is critical to the blasting process, for planning purposes, statutory requirements or environmental compliance. The review and analysis of past data can improve blast design, execution and help in the achievement of desired blasting outcomes and downstream productivity, and improvement and optimization of results by adjustment of drilling and blasting parameters. Based on the database and its search and analysis capabilities, the system can provide opportunities for taking corrective steps by changing charging and initiation timing and sequence for controlling fragmentation size, vibration and flyrock.
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-800">
            Blast Information Management System (BIMS) provides information to meet the strategic and operational needs for planning, controlling and decision-making for optimizing mining operations (Bhandari and Bhandari, 2006). BIMS provides methods to store, manage, document and retrieve drill and blast related information. The system stores blast details, actual blast parameters, blast pattern, face profile, explosive consumption, charging details.
          </p>
          <div className="flex flex-col items-center">
            <img src="/assets/bims2.jpg" alt="BIMS Software UI" className="w-96 h-56 object-contain border rounded shadow mb-2" />
            <a href="/assets/blast_software_ui.jpg" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
          </div>
          </div>
        {/* BIMS Software Clients Section */}
        <section className="max-w-5xl mx-auto mt-12 mb-12">
          <div className="bg-blue-200 rounded-lg px-6 py-3 mb-6">
            <h2 className="text-2xl font-bold text-blue-900">BIMS Software Clients</h2>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center mb-10">
            <img src="/assets/aditya.jpg" alt="Aditya Birla / UltraTech Cement" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
            <img src="/assets/lafarge.png" alt="Lafarge" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
            <img src="/assets/langrag.jpg" alt="National Institute of Technology" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
            <img src="/assets/CMPDI logo.png" alt="CMPDI" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
            <img src="/assets/vasavadatta.jpg" alt="Vasavadatta Cement" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
            <img src="/assets/logo-nit-raipur.jpg" alt="NIT Kurukshetra" className="w-24 h-24 object-contain rounded-xl border shadow bg-white p-2" />
          </div>
          <div className="flex flex-col gap-6 items-start">
            <div className="flex items-center gap-4">
              <a
                href="/assets/bims-brochure.pdf"
                download
                className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded shadow border border-gray-300 hover:bg-gray-300 focus:outline-none"
              >
                Download
              </a>
              <span className="text-lg text-black">Download Blast Information Management System (BIMS) Brochure</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/assets/bims-demo.zip"
                download
                className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded shadow border border-gray-300 hover:bg-gray-300 focus:outline-none"
              >
                Download
              </a>
              <span className="text-lg text-black">Download Blast Information Management System (BIMS) DEMO</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 