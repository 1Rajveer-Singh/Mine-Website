import React, { useEffect, useState } from 'react';
import { FaTools, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';

const projects = [
  {
    image: '/assets/image.png',
    status: 'Active',
    title: 'Gold Mine Expansion',
    location: 'Western Australia',
  },
  {
    image: '/assets/image2.jpg',
    status: 'Planning',
    title: 'Copper Extraction',
    location: 'Chile',
  },
  {
    image: '/assets/image3.jpg',
    status: 'Active',
    title: 'Coal Mining Operation',
    location: 'Wyoming, USA',
  },
  {
    image: '/assets/image4.jpg',
    status: 'Planning',
    title: 'Diamond Exploration',
    location: 'Botswana',
  },
  {
    image: '/assets/image5.png',
    status: 'Active',
    title: 'Iron Ore Expansion',
    location: 'Brazil',
  },
  {
    image: '/assets/image6.jpg',
    status: 'Planning',
    title: 'Uranium Mining',
    location: 'Kazakhstan',
  },
];

export default function HomeScreen() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    "/assets/hero1.jpeg",
    '/assets/hero2.jpeg',
    '/assets/hero3.jpeg',
    '/assets/hero4.jpeg',
  ];

  const handlePrev = () => {
    setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const newsMessages = [
    "Master the Art of Eco-Friendly Blasting with Global Experts – March 6-8, Jodhpur",
    "Smarter Blasting. Greener Projects. Join Us in Jodhpur, March 2025",
    "Where Innovation Meets Environmental Responsibility – Enroll Today",
    "Transform Blasting Practices with AI, Expertise & Real-World Insights"
  ];
  const [currentNews, setCurrentNews] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 50);
    const timer = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentNews((prev) => (prev + 1) % newsMessages.length);
        setAnimate(true);
      }, 200);
    }, 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
    };
  }, [currentNews]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Main Content */}
      <div className="relative z-10 pb-16 w-full">
        {/* Hero Image Carousel (synced with news) */}
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[400px] sm:min-h-[500px] flex items-center justify-center mb-6 sm:mb-8">
          <img
            src={heroImages[currentNews % heroImages.length]}
            alt={`Hero ${currentNews + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/10" style={{ zIndex: 1 }} />
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-blue-700 hover:text-white text-xl sm:text-2xl md:text-3xl rounded-full p-2 sm:p-3 z-20 shadow transition"
            aria-label="Previous Hero Image"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-blue-700 hover:text-white text-xl sm:text-2xl md:text-3xl rounded-full p-2 sm:p-3 z-20 shadow transition"
            aria-label="Next Hero Image"
          >
            &#8594;
          </button>
         </section>
        {/* Breaking News Bar */}
        <div className="w-full flex items-center mb-4 sm:mb-6 px-2 sm:px-0" style={{ height: '48px' }}>
          <div className="bg-red-700 text-white font-bold px-3 sm:px-6 py-3 text-sm sm:text-lg" style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
            Excited
          </div>
          <div className="flex-1 bg-blue-800 text-white px-0 py-3 text-sm sm:text-lg overflow-hidden" style={{ borderTopRightRadius: 4, borderBottomRightRadius: 4, position: 'relative' }}>
            <div
              className={`whitespace-nowrap px-3 sm:px-6${animate ? ' animate-newsfloat' : ''}`}
              style={{ display: 'inline-block' }}
              key={currentNews}
            >
              {newsMessages[currentNews]}
            </div>
          </div>
        </div>
        {/* Company Tabs and Services (moved above) */}
        <section className="w-full bg-white bg-opacity-80 py-6 sm:py-8 mb-6 sm:mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-blue-600 text-white rounded-xl px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold shadow text-center flex-1">Earth Resource Technology Consultants</div>
              <div className="bg-blue-600 text-white rounded-xl px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold shadow text-center flex-1">Earth Resource Technology Research Centre</div>
              <div className="bg-blue-600 text-white rounded-xl px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold shadow text-center flex-1">Earth Resource Training Centre</div>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Mining Consultancy Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Mining Consultancy</div>
                <ol className="list-decimal list-inside space-y-1 text-gray-800 text-base sm:text-lg">
                  <li>Geological Investigations</li>
                  <li>Resource Modeling</li>
                  <li>Feasibility Studies</li>
                  <li>Mine Planning & Optimization</li>
                  <li>Environmental Management in Mining</li>
                  <li>Environment Audit</li>
                  <li>Sustainability Measurement & Management</li>
                </ol>
              </div>
              {/* Scientific Software Development Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Scientific Software Development</div>
                <ol className="list-decimal list-inside space-y-1 text-gray-800 text-base sm:text-lg">
                  <li>Web Based & Mobile Application Development</li>
                  <li>Software Development & Testing Services</li>
                  <li>Blast Information Management System (BIMS)</li>
                </ol>
              </div>
              {/* Skill Development Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Skill Development</div>
                <ol className="list-decimal list-inside space-y-1 text-gray-800 text-base sm:text-lg">
                  <li>Mining</li>
                  <li>Surveying</li>
                  <li>Environment</li>
                  <li>Ventilation</li>
                  <li>Rock Excavation</li>
                </ol>
                <div className="text-right mt-4 font-bold text-gray-600 text-base sm:text-lg cursor-pointer hover:text-blue-700">More+</div>
              </div>
            </div>
          </div>
        </section>
        {/* Blasting, Education, and Training Section (cards and bullet points) */}
        <section className="w-full bg-white bg-opacity-80 py-6 sm:py-8 mb-6 sm:mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Blasting Solutions */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Blasting Solutions</div>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-base sm:text-lg">
                  <li>Blasting Audit & Optimisation</li>
                  <li>Blast Vibration Measurement Services</li>
                  <li>Blasting Environmental Hazards Control</li>
                </ul>
              </div>
              {/* Educational Technology & Consultancy */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Educational Technology & Consultancy</div>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-base sm:text-lg">
                  <li>Higher & Technical Education</li>
                  <li>International Collaboration</li>
                  <li>Post Graduate Research Projects</li>
                </ul>
              </div>
              {/* Development Training Programme */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:col-span-2 lg:col-span-1">
                <div className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800">Development Training Programme</div>
                <div className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mt-2">
                  <span className="block">Workshop on Advanced technology for<br className="hidden sm:block"/>blasting with emphasis on computer and<br className="hidden sm:block"/>mobile application</span>
                  <span className="inline-block align-middle ml-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded rotate-[-12deg] inline-block">New</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Upcoming Events Section (replaces Our Core Services) */}
        <section className="w-full bg-transparent py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-8 sm:mb-10">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Event 1 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/Annual-General-Meeting1.jpg" alt="Annual General Meeting" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">Annual General Meeting</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 2 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/1999-Silver-Jubilee.jpg" alt="1999 Silver Jubilee" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">1999 Silver Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 3 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/1984-Ruby-Jubilee.jpg" alt="1984 Ruby Jubilee" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">1984 Ruby Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 4 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/1974-Golden-Jubilee.jpg" alt="1974 Golden Jubilee" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">1974 Golden Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
            </div>
          </div>
        </section>
        {/* Latest News Section (move above E-Magazines) */}
        <section className="w-full bg-transparent py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-8 sm:mb-10">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* News 1 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/latest1.jpg" alt="Student Achievements" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">Student Achievements</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  News
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* News 2 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-4 sm:p-6">
                <img src="/assets/latest2.jpg" alt="New Infrastructure Developments" className="w-full h-32 sm:h-40 object-cover rounded mb-4" />
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">New Infrastructure Developments</div>
                <div className="flex items-center text-gray-700 mb-4 text-base sm:text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-4 h-4 sm:w-5 sm:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  News
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* News 3 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/latest3.jpg" alt="Alumni Meet 2023" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">Alumni Meet 2023</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  News
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* News 4 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/latest4.jpg" alt="Dr. A. B. Sharma Awarded Prestigious Fellowship" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">Dr. A. B. Sharma Awarded Prestigious Fellowship</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  News
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
