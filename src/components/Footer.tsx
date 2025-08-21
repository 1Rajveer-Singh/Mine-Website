import React from "react";
import { FaGlobe, FaBriefcase, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { GiBirdHouse } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-900 via-blue-900 to-slate-800 text-white pt-16 pb-8 px-4 relative z-20 border-t border-blue-500/30">
      {/* Gaming-style top border */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse mb-12"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Enhanced Company Info */}
        <div className="flex-1 min-w-[280px]">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-['Orbitron']">
            Earth Resource Technology
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 shadow-lg shadow-cyan-400/50" />
          <p className="mb-6 text-lg text-gray-300 font-['Rajdhani'] leading-relaxed">
            Pioneering innovative solutions for the mining industry through advanced consultancy, 
            cutting-edge software development, and comprehensive training programs since 1997.
          </p>
          <div className="flex gap-4 mt-6">
            <a 
              href="https://www.linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-full p-3 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/30" 
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} color="#fff" />
            </a>
            <a 
              href="https://www.facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full p-3 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-indigo-500/30" 
              aria-label="Facebook"
            >
              <FaFacebook size={24} color="#fff" />
            </a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-full p-3 hover:from-green-500 hover:to-emerald-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-green-500/30" 
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={24} color="#fff" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-1 text-base">
            <li><a href="#" className="hover:underline text-blue-800">About our company</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Software</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Gallery</a></li>
            <li><Link to="/jobs" className="hover:underline text-blue-800">career</Link></li>
          </ul>
        </div>
        {/* Services */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-xl font-bold mb-2">Services</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-1 text-base">
            <li><a href="#" className="hover:underline text-blue-800">Mining Consultancy</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Skill Development</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Software</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Development</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-xl font-bold mb-2">Contact Info</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-2 text-base">
            <li className="text-blue-800">
              'SUKIRAN', A-1, Vijay Nagar, New Pali Road, Jodhpur, Rajasthan - 342001
            </li>
            <li className="text-blue-800">
              Email :
            </li>
            <li className="text-blue-800">
              sbhandari@earthresourcetechnology.com
            </li>
            <li className="text-blue-800">
              info@earthresourcetechnology.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-blue-600 text-base mt-8">
        © 2025 Earth Resource Technology. All Rights Reserved.
      </div>
    </footer>
  );
} 