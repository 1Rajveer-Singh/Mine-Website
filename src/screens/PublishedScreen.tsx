import React from 'react';

export default function PublishedScreen() {
  const publications = [
    {
      title: 'Burden and Spacing Relationships in the design of Blasting Patterns',
      authors: '',
    },
    {
      title: 'Post-blast studies of jointed rocks',
      authors: 'S. Bhandari, and R. Badal',
    },
    {
      title: 'On the role of stress waves and quasi-static gas pressure in rock fragmentation by blasting',
      authors: 'Bhandari',
    },
    {
      title: 'Controlled Fracture Growth by Blasting While Protecting Damages to Remaining Rock',
      authors: 'S. S. Rathore and S. Bhandari',
    },
    {
      title: 'Modelling of Near-Source Dust Dispersal from Surface Mine Blasting in Weak Wind and Tropical conditions',
      authors: '',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Published Papers</h1>
        <div className="flex flex-col gap-6">
          {publications.map((pub, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white rounded-xl shadow p-6">
              <img src="/assets/icon.png" alt="Browser Icon" className="w-10 h-10 object-contain mt-1" />
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900">{pub.title}</div>
                {pub.authors && (
                  <div className="text-gray-700 text-sm mt-1">{pub.authors}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 