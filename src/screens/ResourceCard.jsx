import React from "react";

const ResourceCard = ({ resource }) => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-2xl shadow-xl p-6 mb-2">
      <img
        src={resource.image || resource.iconSrc || "/assets/pdf-icon.png"}
        alt={resource.title}
        className="w-14 h-14 object-cover rounded"
        onError={e => { e.target.src = "/assets/pdf-icon.png"; }}
      />
      <div className="flex-1">
        <div className="font-bold text-2xl text-gray-900 mb-1">{resource.title}</div>
        {resource.author && (
          <div className="text-gray-700 text-base mb-3">Author(s): {resource.author}</div>
        )}
        <div className="flex gap-4 mt-2">
          {resource.viewLink ? (
            <a
              href={resource.viewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              View
            </a>
          ) : (
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-lg opacity-60 cursor-not-allowed" disabled>View</button>
          )}
          {resource.downloadLink ? (
            <a
              href={resource.downloadLink}
              download
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-orange-600 transition"
            >
              Download
            </a>
          ) : (
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold text-lg opacity-60 cursor-not-allowed" disabled>Download</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard; 