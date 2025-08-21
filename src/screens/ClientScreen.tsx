import React, { useState } from 'react';

export default function ClientScreen() {
  const [activeTab, setActiveTab] = useState('training');

  const galleryData = {
    training: [
      { img: '/assets/Picture9.jpg', caption: 'Training Program at Jammu & Kashmir' },
      { img: '/assets/Picture10.jpg', caption: 'At Jammu & Kashmir Mines' },
      { img: '/assets/Picture11.jpg', caption: 'Prof. Sushil Bhandari surveying mines' },
    ],
    meeting: [
      { img: '/assets2/Picture11.jpg', caption: "Explo '11 - Australia" },
      { img: '/assets2/Picture12.jpg', caption: "Explo '11 - Australia" },
      { img: '/assets2/Picture13.jpg', caption: "Explo '11 - Australia" },
      { img: '/assets2/Picture14.jpg', caption: 'On-site Presentation at Sri Cement' },
      { img: '/assets2/Picture15.jpg', caption: 'At Yogyakarta, Indonesia' },
      { img: '/assets2/Picture16.jpg', caption: 'At Dalian, China' },
     
      { img: '/assets2/Picture17.jpg', caption: 'At Dalian, China' },
      { img: '/assets2/Picture18.jpg', caption: 'APS Techniques at Dalian, China' },
      
    ],
    skill: [
      { img: '/assets2/Picture19.jpg', caption: 'International Conference in Indonesia' },
      { img: '/assets2/Picture20.jpg', caption: 'Training Program in Jodhpur' },
      { img: '/assets2/Picture21.jpg', caption: 'Training Program at J & K' },
      { img: '/assets2/Picture22.jpg', caption: 'Training Program at Jodhpur' },
    ],
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-6 py-2 rounded-t border border-b-0 ${activeTab === 'training' ? 'bg-white font-bold text-gray-800 border-gray-300' : 'bg-gray-100 font-semibold text-gray-600 border-transparent'}`}
            onClick={() => setActiveTab('training')}
          >
            Training Programs
          </button>
          <button
            className={`px-6 py-2 rounded-t border border-b-0 ${activeTab === 'meeting' ? 'bg-white font-bold text-gray-800 border-gray-300' : 'bg-gray-100 font-semibold text-gray-600 border-transparent'}`}
            onClick={() => setActiveTab('meeting')}
          >
            National and International Meeting
          </button>
          <button
            className={`px-6 py-2 rounded-t border border-b-0 ${activeTab === 'skill' ? 'bg-white font-bold text-gray-800 border-gray-300' : 'bg-gray-100 font-semibold text-gray-600 border-transparent'}`}
            onClick={() => setActiveTab('skill')}
          >
            Skill Development Programs
          </button>
            </div>
        {/* Tab Content */}
        <div className="bg-white rounded shadow p-6 min-h-[220px]">
          {activeTab === 'training' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {galleryData.training.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
                  <img src={item.img} alt={item.caption} className="w-64 h-48 object-cover rounded-lg mb-2 border shadow mx-auto" />
                  <div className="text-lg text-gray-900 text-center mt-2">{item.caption}</div>
            </div>
              ))}
            </div>
          )}
          {activeTab === 'meeting' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {galleryData.meeting.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
                  <img src={item.img} alt={item.caption} className="w-64 h-48 object-cover rounded-lg mb-2 border shadow mx-auto" />
                  <div className="text-lg text-gray-900 text-center mt-2">{item.caption}</div>
            </div>
              ))}
            </div>
          )}
          {activeTab === 'skill' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {galleryData.skill.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
                  <img src={item.img} alt={item.caption} className="w-64 h-48 object-cover rounded-lg mb-2 border shadow mx-auto" />
                  <div className="text-lg text-gray-900 text-center mt-2">{item.caption}</div>
            </div>
              ))}
            </div>
          )}
          </div>
      </div>
    </div>
  );
} 