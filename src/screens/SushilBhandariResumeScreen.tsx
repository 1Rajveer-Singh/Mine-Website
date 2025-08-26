import React from 'react';
import { Link } from 'react-router-dom';

export default function SushilBhandariResumeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8 border">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <img src="/assets/img_sushil.jpg" alt="Dr. Sushil Bhandari" className="w-36 h-36 object-cover rounded border mb-4" />
        </div>
        <div className="flex-1">
          <div className="text-center font-extrabold text-3xl mb-2 tracking-widest text-black">RESUME</div>
          <div className="text-left mb-2 text-black">
            <div className="font-bold text-xl md:text-2xl mb-1 text-black">Dr. Sushil Bhandari</div>
            <div className="text-base font-normal mb-1 text-black">BE (Mining), M.Sc. (Mining Engg.) Ph.D., FIE (I), MMGI, MISTE, MISRMT</div>
            <div className="text-base font-normal mb-2 text-black">Director, Earth Resource Technology Consultants.</div>
            <hr className="my-4 border-t-4 border-dashed border-black" />
          </div>
          <div className="text-black text-base space-y-4">
            <p>Dr. Sushil Bhandari obtained BE (Mining) from Jodhpur University, M.Sc. degree in Mining Engineering from Banaras Hindu University and Ph.D. from University of New South Wales (Australia). He remained Professor and Head of the Department of Mining Engineering in Jai Narain Vyas University, Jodhpur. He also worked as Dean, Faculty of Engineering. Before joining University he worked with a leading explosives manufacturer and also in hard rock underground mines of Uranium Corporation of India, Jaduguda & North Broken Hill Limited, Australia and Assistant Director of Geology Mining, Government of Gujarat.</p>
            <p>He has 40 years long experience in Teaching, Mining Industry, Explosives Industry, Educational Administration, and Multimedia & Software Development. He also has teaching experience in Australia and Oman. His consulting and research has been in the field of Rock Blasting, Mine Environment, Mine Computer Applications and Rock Mechanics. He has widely consulted throughout Mineral Industry. He is well recognized mining consultant and researcher. His book Engineering Rock Blasting Operations is used by students, mining engineers and researchers throughout world and is recommended text book for many Universities the world over. He has published over 100 papers and has presented papers in USA, Canada, China, Sweden, Austria and Australia. Consulting assignments involve him actively in Blasting, Rock Mechanics and Mine Environment, Mine Planning and Computer Applications in coal mines, limestone mines, iron ore mines and others. He is recipient of National Mineral Award 2001, of Government of India for his contribution to Mining Technology. Currently, he is Director of Earth Resource Technology Consultants (www.earthresourcetechnology.com) who are involved in providing consulting, developing software and organizing executive development programmes. Presently, he is also Adjunct Professor, University of Ballarat, Australia.</p>
            <p>He also worked as non-executive Director on the Board of Directors, Central Mine Planning and Design Institute and Board of Directors, Tamilnadu Industrial Explosives. He has been, Member of Advisory Board of Indian Bureau of Mines and Standing Committee of Science and Research, Ministry of Coal, Government of India. He has close association with Australian Companies --Terrock Consulting Engineers, Australia. Earlier he worked for business development of AMC Consultants, Melbourne.</p>
          </div>
          <div className="mt-8">
            <Link to="/people" className="text-blue-700 underline text-base">Back to People Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 