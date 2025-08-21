import React from 'react';
import SoftwareSidebar from '../components/SoftwareSidebar';

export default function BlastDesignerScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SoftwareSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-200 rounded-lg px-6 py-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Blast Designer (BLADES)</h1>
          </div>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-800">
              Surface Blast Design software allows easy design of blasts, calculates blast parameters i.e. burden, spacing, square/staggered pattern layout, and layout with charging options. The program provides output, charts and graphs, as well as reports, in real-time and allows output of data via customizable printing capabilities
            </p>
            <p className="text-lg text-gray-800">
              This software provides design of blasting pattern according to rock conditions, rock structure, and results required for optimized results, considering explosives, drilling, environmental restrictions and equipment and subsequent operations. It provides delay timing and sequence.
            </p>
            <p className="text-lg text-gray-800">
              In BLADES (Blast Designer), the pattern drawn can also be saved.and blaster can be provided with charging sheet, It also provides the first movement of rock. It gives approximate vibration values, fragment size and approximate danger zone. Initially the software uses constants which are empirical. However, once after data have been accumulated with use of BIMS then the historical data can be used to determine the specific constants for each pit/bench. Predictions of the rock fragmentation air and ground vibration prediction and flyrock are estimated. Software has Drilling and Blasting cost analysis capabilities.
            </p>
            <p className="text-lg text-gray-800">
              Other blasting software may use information to create charge standards to design specific hole by hole explosives loading and create load sheets according to geotechnical zone characteristics and results required.
            </p>
            <p className="text-lg text-gray-800">
              Bench blast design software provides capabilities of designing blasting pattern according to rock conditions, rock structure and results required for optimized blasting results, considering explosives, drilling, environmental restrictions and equipment and subsequent operations details.
              Software helps to calculate and draw blast parameters i.e. burden, spacing, square/staggered, delays and pattern layout with three different charging options: Same in all holes, Same in all rows, Different in each hole Software uses information about rock, joints and explosive properties. It draws ignition timing.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/blades.png" alt="Blast Designer Screenshot" className="w-full max-w-xl object-contain border rounded shadow mb-2" />
            <a href="/assets/blades.png" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">Enlarge</a>
          </div>
          <div className="space-y-6 mt-10">
            <p className="text-lg text-gray-800">
              Other blasting software may use information to create charge standards to design specific hole by hole explosives loading and create load sheets according to geotechnical zone characteristics and results required.
            </p>
            <p className="text-lg text-gray-800">
              Bench blast design software provides capabilities of designing blasting pattern according to rock conditions, rock structure and results required for optimized blasting results, considering explosives, drilling, environmental restrictions and equipment and subsequent operations details.
              Software helps to calculate and draw blast parameters i.e. burden, spacing, square/staggered, delays and pattern layout with three different charging options: Same in all holes, Same in all rows, Different in each hole Software uses information about rock, joints and explosive properties. It draws ignition timing.
            </p>
            <p className="text-lg text-gray-800">
              The software shows the simulation of ignition sequence. Initially the software uses constants which are empirical. However, after data have been accumulated with use of database software then the data can be used to determine specific constants for each bench.
            </p>
            <p className="text-lg text-gray-800">
              The pattern drawn can also be saved. It gives approximate vibration values, fragment size and approximate danger zone. Software can import/export drill hole data, GPS data, total station records, face profiler records in excel or .csv file. The software can give charging sheet for blaster for loading explosive in each hole and also provides initiator connection.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 