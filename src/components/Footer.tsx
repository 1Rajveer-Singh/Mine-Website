import React from "react";
import { FaGlobe, FaBriefcase, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { GiBirdHouse } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="bg-white text-blue-600 pt-8 sm:pt-12 pb-4 px-4 sm:px-6 lg:px-8 relative z-20"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-6 sm:gap-8">
        {/* Company Info */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Earth Resource Technology</h2>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <p className="mb-4 text-sm sm:text-base text-blue-800">
            Providing innovative solutions for the mining industry through consultancy, software development, and training programs since 1997.
          </p>
          <div className="flex gap-3 sm:gap-4 mt-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-500 rounded-full p-2 hover:bg-blue-700 transition" aria-label="LinkedIn">
              <FaLinkedin size={24} color="#fff" className="sm:w-7 sm:h-7" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-500 rounded-full p-2 hover:bg-blue-700 transition" aria-label="Facebook">
              <FaFacebook size={24} color="#fff" className="sm:w-7 sm:h-7" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="bg-green-500 rounded-full p-2 hover:bg-green-700 transition" aria-label="WhatsApp">
              <FaWhatsapp size={24} color="#fff" className="sm:w-7 sm:h-7" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Quick Links</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-1 text-sm sm:text-base">
            <li><a href="#" className="hover:underline text-blue-800">About our company</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Software</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Gallery</a></li>
            <li><Link to="/jobs" className="hover:underline text-blue-800">career</Link></li>
          </ul>
        </div>
        {/* Services */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Services</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-1 text-sm sm:text-base">
            <li><a href="#" className="hover:underline text-blue-800">Mining Consultancy</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Skill Development</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Software</a></li>
            <li><a href="#" className="hover:underline text-blue-800">Development</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Contact Info</h3>
          <div className="w-16 h-1 bg-blue-400 mb-4" />
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-blue-800">
              'SUKIRAN', A-1, Vijay Nagar, New Pali Road, Jodhpur, Rajasthan - 342001
            </li>
            <li className="text-blue-800">
              Email :
            </li>
            <li className="text-blue-800 break-all">
              sbhandari@earthresourcetechnology.com
            </li>
            <li className="text-blue-800 break-all">
              info@earthresourcetechnology.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-blue-600 text-sm sm:text-base mt-6 sm:mt-8">
        © 2025 Earth Resource Technology. All Rights Reserved.
      </div>
    </footer>
  );
} 