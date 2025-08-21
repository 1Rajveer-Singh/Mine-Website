import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const backgroundImages = [
  '/assets/image.png',
  '/assets/image2.jpg',
  '/assets/image3.jpg',
  '/assets/image4.jpg',
  '/assets/image6.jpg',
  '/assets/image7.jpg',
  '/assets/image8.jpg',
];

const leadership = [
  {
    name: 'John Smithson',
    title: 'Chief Executive Officer',
    bio: `With over 25 years of experience in the mining industry, John leads our company's strategic vision and global operations.`,
    image: 'https://api.a0.dev/assets/image?text=CEO+Portrait&aspect=1:1&seed=701',
  },
  {
    name: 'Sarah Johnson',
    title: 'Chief Technology Officer',
    bio: 'Sarah oversees our technology development, bringing innovative mining solutions from concept to implementation.',
    image: 'https://api.a0.dev/assets/image?text=CTO+Portrait&aspect=1:1&seed=702',
  },
  {
    name: 'Michael Chen',
    title: 'Chief Operations Officer',
    bio: 'Michael manages our global operations, ensuring efficient project delivery and client satisfaction across all regions.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
];

const engineering = [
  {
    name: 'David Rodriguez',
    title: 'Lead Mining Engineer',
    bio: 'David specializes in open-pit mining design and optimization, with expertise in blast engineering and site planning.',
    image: 'https://api.a0.dev/assets/image?text=Engineer+Portrait&aspect=1:1&seed=704',
  },
  {
    name: 'Emily Patel',
    title: 'Environmental Engineer',
    bio: 'Emily leads our environmental assessment team, developing sustainable mining practices and rehabilitation strategies.',
    image: 'https://api.a0.dev/assets/image?text=Engineer+Female+Portrait&aspect=1:1&seed=705',
  },
  {
    name: 'Robert Kim',
    title: 'Software Development Lead',
    bio: 'Robert oversees the development of our mining software solutions, focusing on data analytics and automation.',
    image: 'https://api.a0.dev/assets/image?text=Software+Engineer+Portrait&aspect=1:1&seed=706',
  },
  {
    name: 'James Wilson',
    title: 'Senior Geologist',
    bio: 'James brings extensive experience in mineral exploration and resource estimation to our geological survey team.',
    image: 'https://api.a0.dev/assets/image?text=Geologist+Portrait&aspect=1:1&seed=707',
  },
  {
    name: 'Lisa Thompson',
    title: 'Safety Director',
    bio: 'Lisa ensures the highest safety standards across all our mining projects and leads our safety training programs.',
    image: 'https://api.a0.dev/assets/image?text=Safety+Officer+Portrait&aspect=1:1&seed=708',
  },
  {
    name: 'Thomas Brown',
    title: 'Equipment Specialist',
    bio: 'Thomas manages our equipment rental division, ensuring optimal performance and maintenance of our mining fleet.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2',
  },
];

const consultantTeam = [
  {
    name: 'Dr. Sushil Bhandari',
    title: 'BE (Mining), M.Sc. (Mining Engg.) Ph.D., FIE (I), MMGI, MISTE, MISRMT',
    role: 'Director, Earth Resource Technology Group.',
    extra: 'View Resume',
    image: '/assets/img_sushil.jpg',
  },
  {
    name: 'Dr. Virendra Singh',
    title: 'BE (Mining), Ph.D.',
    role: 'Educational Administration.',
    image: '/assets/Virendrasingh1.jpg',
  },
  {
    name: 'Dr. Dharam Vir Singh',
    title: 'BE (Mining), M.Tech. (Mineral Engineering) Dr. Ing. (Mineral Processing)',
    role: 'Expertise: Mineral Processing, Mine Plant.',
    image: '/assets/img_dev_singh.jpg',
  },
  {
    name: 'Dr. Narendra K. Khandelwal',
    title: 'Ph.D. Indian School of Mines, Dhanbad (India).',
    extra: (
      <span className="relative group cursor-pointer text-blue-700 font-semibold text-sm">
        more..
        <span className="absolute left-1/2 z-20 mt-2 w-96 -translate-x-1/2 rounded border border-gray-700 bg-white p-4 text-black text-base shadow-xl whitespace-pre-line hidden group-hover:block">
          Narendra K Khandelwal, Ph.D. Indian School of Mines, Dhanbad (India). He worked as Associate Professor of Mining Engineering in J. N. V. University, Jodhpur (India) and Papua New Guinea University of Technology, Lae (P. N. G.). Prior to joining teaching he worked as Dy. Superintendent of Mines at Jaduguda Mines, UCIL for eight years and earned his first and second class Manager's certificate and Surveyor's Certificate for Metalliferous Mines. He has carried out extensive research on "Slope Stability of Waste Dumps". He also worked as Principal of Maharishi Arvind Institute of Engineering & Technology, Jaipur for three years.
        </span>
      </span>
    ),
    image: '/assets/Dr.narendra.jpg',
  },
  {
    name: 'Er. P.R. Dave',
    title: 'BE (Mining) Expertise : Underground & Surface Mining.',
    image: '/assets/prdave.jpg',
  },
  {
    name: 'Dr. P.S Lodha',
    title: 'Ph.D (Soil Science)',
    extra: (
      <span className="relative group cursor-pointer text-blue-700 font-semibold text-sm">
        more..
        <span className="absolute left-1/2 z-20 mt-2 w-96 -translate-x-1/2 rounded border border-gray-700 bg-white p-4 text-black text-base shadow-xl whitespace-pre-line hidden group-hover:block">
          Dr. P.S. Lodha obtained Ph.D Soil Science
          Programme of Management In Agriculture From IIM Ahmedabad(1973)
          M.Sc. (Agriculture), B.Sc. (Agriculture)
        </span>
      </span>
    ),
    image: '/assets/lodha.jpg',
  },
  {
    name: 'Sanjay Purohit',
    title: 'BE (Mining)',
    role: 'Drilling & Blasting Consultant\nMD , FAQ International LLC, Oman',
    image: '/assets/sanjay.jpg',
  },
];

const operationalTeam = [
  {
    name: 'Chirasmita Das',
    title: 'Software Developer',
    role: 'B.Tech. (CS)',
    extra: (
      <span className="relative group cursor-pointer text-blue-700 font-semibold text-sm">
        more..
        <span className="absolute left-1/2 z-20 mt-2 w-80 -translate-x-1/2 rounded border border-gray-700 bg-white p-4 text-black text-base shadow-xl whitespace-pre-line hidden group-hover:block">
          Chirasmita Das obtained B.E(EC) from Satyabama University, Chennai. She has more than 3.6 year of Experience. She is working on a Desktop & Web application application.
        </span>
      </span>
    ),
    image: '/assets/chirasmita daas.jpg',
  },
  {
    name: 'Shweta singhal',
    title: 'Software Developer',
    role: 'B.Tech. (CS), Rajasthan Technical University, Kota',
    extra: (
      <span className="relative group cursor-pointer text-blue-700 font-semibold text-sm">
        more..
        <span className="absolute left-1/2 z-20 mt-2 w-80 -translate-x-1/2 rounded border border-gray-700 bg-white p-4 text-black text-base shadow-xl whitespace-pre-line hidden group-hover:block">
          Shweta Singhal obtained B.tech(CSE) from Rajasthan Technical University and joined the company in August. She is working on a web application. Previously, she was working on a windows application and crystal reports.
        </span>
      </span>
    ),
    image: '/assets/shwata.jpg',
  },
  {
    name: 'Sheetal Jain',
    title: 'Business Development Executive',
    role: 'MBA (Human Resource)',
    extra: 'more..',
    image: '/assets/sheetal.jpg',
  },
];

export default function PeopleScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    // Show the first image for the full interval, then start sliding
    const timeout = setTimeout(() => {
    const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % backgroundImages.length);
        setNextIndex(prev => (prev + 1) % backgroundImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen py-12 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-16">
          {/* Consultant Team */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6 text-white">Consultant Team</h2>
            {consultantTeam.map((person, idx) => (
              <div key={person.name} className="flex items-start mb-8 bg-white rounded-xl shadow-lg p-6 text-gray-900">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-28 h-28 object-cover rounded shadow mr-6 border"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900 mb-1">{person.name}</div>
                  <div className="text-gray-800 text-sm mb-1">{person.title}</div>
                  <div className="text-gray-700 text-sm mb-1">{person.role}</div>
                  {person.extra && person.name === 'Dr. Sushil Bhandari' ? (
                    <Link to="/people/sushil-bhandari-resume" className="text-blue-700 font-semibold text-sm underline cursor-pointer">{person.extra}</Link>
                  ) : person.extra ? (
                    typeof person.extra === 'string' ? (
                      <div className="text-blue-700 font-semibold text-sm cursor-pointer">{person.extra}</div>
                    ) : person.extra
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {/* Operational Team */}
          <div className="flex-1 mt-12 md:mt-0">
            <h2 className="text-2xl font-semibold mb-6 text-white">Operational Team</h2>
            {operationalTeam.map((person, idx) => (
              <div key={person.name} className="flex items-start mb-8 bg-white rounded-xl shadow-lg p-6 text-gray-900">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-28 h-28 object-cover rounded shadow mr-6 border"
                />
                <div>
                  <div className="font-bold text-lg text-gray-900 mb-1">{person.name}</div>
                  <div className="text-gray-800 text-sm mb-1">{person.title}</div>
                  <div className="text-gray-700 text-sm mb-1">{person.role}</div>
                  {person.extra && (
                    <div className="text-blue-700 font-semibold text-sm cursor-pointer">{person.extra}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 