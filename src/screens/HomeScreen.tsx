import React, { useEffect, useState } from 'react';
import { FaTools, FaLaptopCode, FaGraduationCap, FaPlay, FaPause, FaArrowLeft, FaArrowRight, FaRocket, FaCode, FaCogs, FaShieldAlt, FaGem, FaLightbulb } from 'react-icons/fa';

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
  const [isAutoPlay, setIsAutoPlay] = useState(true);
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlay, heroImages.length]);

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particleFloat ${15 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <div className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-gradient-to-r from-cyan-400 to-blue-500 ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-lg rotate-45'}`}></div>
            </div>
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Enhanced Effects */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Hero Background Images with Parallax */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === heroIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-110'
                }`}
              >
                <img
                  src={image}
                  alt={`Hero ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-blue-900/30"></div>
              </div>
            ))}
          </div>

          {/* Advanced Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 group"
          >
            <div className="relative p-4 rounded-2xl bg-gradient-to-r from-slate-800/90 to-blue-800/90 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-110 shadow-2xl">
              <FaArrowLeft className="text-2xl text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 group"
          >
            <div className="relative p-4 rounded-2xl bg-gradient-to-r from-slate-800/90 to-blue-800/90 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-110 shadow-2xl">
              <FaArrowRight className="text-2xl text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>

          {/* Enhanced Control Buttons */}
          <div className="absolute bottom-8 right-8 flex space-x-4 z-30">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="group relative p-3 rounded-xl bg-gradient-to-r from-slate-800/90 to-purple-800/90 backdrop-blur-md border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-110 shadow-2xl"
            >
              {isAutoPlay ? 
                <FaPause className="text-lg text-purple-300 group-hover:text-purple-200" /> : 
                <FaPlay className="text-lg text-purple-300 group-hover:text-purple-200" />
              }
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`relative transition-all duration-300 ${
                  index === heroIndex 
                    ? 'w-12 h-3' 
                    : 'w-3 h-3'
                } rounded-full overflow-hidden`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === heroIndex 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 animate-neonPulse' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}></div>
              </button>
            ))}
          </div>

          {/* Enhanced Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center px-8 max-w-6xl">
              {/* Main Title with Advanced Effects */}
              <div className="relative mb-8">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 mb-6 font-['Orbitron'] leading-tight animate-fadeInScale">
                  EARTH RESOURCE
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl rounded-full opacity-60 animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200 mb-8 font-['Orbitron'] tracking-wider animate-slideRight">
                TECHNOLOGY SOLUTIONS
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-12 font-['Rajdhani'] max-w-4xl mx-auto leading-relaxed animate-fadeInUp opacity-90">
                Pioneering the Future of Mining with Advanced AI Technology, 
                Sustainable Solutions, and Revolutionary Engineering Excellence
              </p>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl font-['Orbitron'] tracking-wide overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>EXPLORE SOLUTIONS</span>
                    <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>
                
                <button className="group relative px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl font-['Orbitron'] tracking-wide overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>CONTACT EXPERTS</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Enhanced Breaking News Bar */}
        <div className="w-full max-w-7xl mx-auto mb-12 px-4">
          <div className="flex items-center overflow-hidden rounded-2xl shadow-2xl border border-cyan-500/30">
            <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white font-black px-8 py-4 text-lg font-['Orbitron'] tracking-wider shadow-lg relative overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span className="animate-pulse">🚀</span>
                <span>BREAKING</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slideRight"></div>
            </div>
            <div className="flex-1 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white px-0 py-4 text-lg overflow-hidden relative border border-cyan-500/20">
              <div
                className={`whitespace-nowrap px-8 font-['Rajdhani'] font-semibold ${animate ? 'animate-newsfloat' : ''}`}
                style={{ display: 'inline-block' }}
                key={currentNews}
              >
                {newsMessages[currentNews]}
              </div>
              {/* Animated border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Company Tabs and Services */}
        <section className="w-full max-w-7xl mx-auto px-4 mb-16">
          {/* Gaming-style Tabs */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {[
              "Earth Resource Technology Consultants",
              "Earth Resource Technology Research Centre", 
              "Earth Resource Training Centre"
            ].map((title, index) => (
              <div key={index} className="flex-1 relative group">
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white rounded-2xl px-6 py-4 text-center font-bold text-lg font-['Orbitron'] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 border border-blue-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mining Consultancy Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaTools className="text-2xl text-white" />
                  </div>
                  <h3 className="font-black text-2xl text-white font-['Orbitron'] group-hover:text-cyan-300 transition-colors duration-300">Mining Consultancy</h3>
                </div>
                <ol className="list-decimal list-inside space-y-3 text-gray-300 text-lg font-['Rajdhani'] font-medium">
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Geological Investigations</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Resource Modeling</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Feasibility Studies</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Mine Planning & Optimization</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Environmental Management in Mining</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Environment Audit</li>
                  <li className="hover:text-blue-300 transition-colors cursor-pointer">Sustainability Measurement & Management</li>
                </ol>
              </div>
            </div>

            {/* Scientific Software Development Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaLaptopCode className="text-2xl text-white" />
                  </div>
                  <h3 className="font-black text-2xl text-white font-['Orbitron'] group-hover:text-purple-300 transition-colors duration-300">Scientific Software Development</h3>
                </div>
                <ol className="list-decimal list-inside space-y-3 text-gray-300 text-lg font-['Rajdhani'] font-medium">
                  <li className="hover:text-purple-300 transition-colors cursor-pointer">Web Based & Mobile Application Development</li>
                  <li className="hover:text-purple-300 transition-colors cursor-pointer">Software Development & Testing Services</li>
                  <li className="hover:text-purple-300 transition-colors cursor-pointer">Blast Information Management System (BIMS)</li>
                </ol>
              </div>
            </div>

            {/* Skill Development Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:scale-105 overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaGraduationCap className="text-2xl text-white" />
                  </div>
                  <h3 className="font-black text-2xl text-white font-['Orbitron'] group-hover:text-emerald-300 transition-colors duration-300">Skill Development</h3>
                </div>
                <ol className="list-decimal list-inside space-y-3 text-gray-300 text-lg font-['Rajdhani'] font-medium mb-6">
                  <li className="hover:text-green-300 transition-colors cursor-pointer">Mining</li>
                  <li className="hover:text-green-300 transition-colors cursor-pointer">Surveying</li>
                  <li className="hover:text-green-300 transition-colors cursor-pointer">Environment</li>
                  <li className="hover:text-green-300 transition-colors cursor-pointer">Ventilation</li>
                  <li className="hover:text-green-300 transition-colors cursor-pointer">Rock Excavation</li>
                </ol>
                <div className="text-right">
                  <button className="relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg font-['Orbitron'] tracking-wide overflow-hidden">
                    <span className="relative z-10">More+</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Blasting, Education, and Training Section (cards and bullet points) */}
        <section className="w-full bg-white bg-opacity-80 py-8 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blasting Solutions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Blasting Solutions</div>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
                  <li>Blasting Audit & Optimisation</li>
                  <li>Blast Vibration Measurement Services</li>
                  <li>Blasting Environmental Hazards Control</li>
                </ul>
              </div>
              {/* Educational Technology & Consultancy */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Educational Technology & Consultancy</div>
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
                  <li>Higher & Technical Education</li>
                  <li>International Collaboration</li>
                  <li>Post Graduate Research Projects</li>
                </ul>
              </div>
              {/* Development Training Programme */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Development Training Programme</div>
                <div className="font-bold text-lg md:text-xl text-gray-800 mt-2">
                  <span className="block">Workshop on Advanced technology for<br/>blasting with emphasis on computer and<br/>mobile application</span>
                  <span className="inline-block align-middle ml-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded rotate-[-12deg] inline-block">New</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Upcoming Events Section (replaces Our Core Services) */}
        <section className="w-full bg-transparent py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-extrabold text-center text-white mb-10">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Event 1 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/Annual-General-Meeting1.jpg" alt="Annual General Meeting" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">Annual General Meeting</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 2 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/1999-Silver-Jubilee.jpg" alt="1999 Silver Jubilee" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">1999 Silver Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 3 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/1984-Ruby-Jubilee.jpg" alt="1984 Ruby Jubilee" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">1984 Ruby Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* Event 4 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/1974-Golden-Jubilee.jpg" alt="1974 Golden Jubilee" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">1974 Golden Jubilee</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 5, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  Events
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
            </div>
          </div>
        </section>
        {/* Latest News Section (move above E-Magazines) */}
        <section className="w-full bg-transparent py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-extrabold text-center text-white mb-10">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* News 1 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/latest1.jpg" alt="Student Achievements" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">Student Achievements</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
                  News
                </div>
                <button className="mt-auto border border-red-700 text-red-700 px-6 py-2 text-lg font-semibold tracking-widest hover:bg-red-700 hover:text-white transition">READ MORE &raquo;</button>
              </div>
              {/* News 2 */}
              <div className="bg-white rounded-lg shadow-lg flex flex-col items-start p-6">
                <img src="/assets/latest2.jpg" alt="New Infrastructure Developments" className="w-full h-40 object-cover rounded mb-4" />
                <div className="text-3xl font-semibold text-blue-700 mb-2">New Infrastructure Developments</div>
                <div className="flex items-center text-gray-700 mb-4 text-lg">
                  <span className="mr-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg></span>
                  July 4, 2024
                  <span className="mx-2">•</span>
                  <span className="ml-2"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg></span>
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
